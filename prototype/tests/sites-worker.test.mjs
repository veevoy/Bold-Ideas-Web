import assert from "node:assert/strict";
import { access } from "node:fs/promises";
import test from "node:test";
import worker from "../worker/index.js";

test("serves existing static assets without a fallback", async () => {
  const calls = [];
  const response = await worker.fetch(new Request("https://example.test/assets/app.js"), {
    ASSETS: {
      fetch: async (request) => {
        calls.push(new URL(request.url).pathname);
        return new Response("asset", { status: 200 });
      },
    },
  });

  assert.equal(response.status, 200);
  assert.deepEqual(calls, ["/assets/app.js"]);
});

test("falls back to the root document for an unknown app route", async () => {
  const calls = [];
  const response = await worker.fetch(
    new Request("https://example.test/flow/step-two?source=share", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async (request) => {
          const url = new URL(request.url);
          calls.push(url.pathname + url.search);
          return new Response(url.pathname === "/" ? "app" : "missing", {
            status: url.pathname === "/" ? 200 : 404,
          });
        },
      },
    },
  );

  assert.equal(response.status, 200);
  assert.deepEqual(calls, ["/flow/step-two?source=share", "/"]);
});

test("does not turn missing API or write requests into the app shell", async () => {
  for (const request of [
    new Request("https://example.test/api/missing", { headers: { accept: "application/json" } }),
    new Request("https://example.test/flow", { method: "POST", headers: { accept: "text/html" } }),
  ]) {
    let calls = 0;
    const response = await worker.fetch(request, {
      ASSETS: {
        fetch: async () => {
          calls += 1;
          return new Response("missing", { status: 404 });
        },
      },
    });

    assert.equal(response.status, 404);
    assert.equal(calls, 1);
  }
});

test("page links return HTML without forwarding the host's index.html redirect", async () => {
  // The live asset binding canonicalises /index.html to / with a 307.
  const env = { ASSETS: { fetch: async (request) => {
    const url = new URL(request.url);
    if (url.pathname === "/index.html") return new Response(null, { status: 307, headers: { Location: "/" } });
    if (url.pathname === "/" && !url.search) return new Response(request.method === "HEAD" ? null : '<div id="root"></div>', { headers: { "Content-Type": "text/html" } });
    return new Response("missing", { status: 404 });
  } } };

  for (const path of ["/case-studies", "/services?nav=classic", "/testimonials", "/work/kinable", "/work/love-peace-harmony", "/work/mapwhizz", "/work/czech-beer-alliance"]) {
    for (const method of ["GET", "HEAD"]) {
      const request = new Request(`https://example.test${path}`, { method, headers: { Accept: "text/html" } });
      const response = await worker.fetch(request, env);
      assert.equal(response.status, 200, `${method} ${path} must load the page, not redirect home`);
      assert.equal(response.headers.get("location"), null);
      assert.equal(response.headers.get("content-type"), "text/html");
      assert.equal(await response.text(), method === "HEAD" ? "" : '<div id="root"></div>');
      assert.equal(request.url, `https://example.test${path}`);
    }
  }
});

test("emits the files required by Sites packaging", async () => {
  await access(new URL("../dist/client/index.html", import.meta.url));
  await access(new URL("../dist/server/index.js", import.meta.url));
  await access(new URL("../dist/.openai/hosting.json", import.meta.url));
});

// Reproduce the live asset binding: it returns the WHOLE mobile MP4 with 200,
// even when Safari requests only bytes 0-1. Exercise the real Worker response.
const videoBytes = Uint8Array.from({ length: 128 }, (_, index) => index);
const mobilePaths = ["bold-story-scroll-mobile.mp4", "collaboration-bridge-scroll-mobile.mp4"];
function videoAssets() {
  return { ASSETS: { fetch: async request => new Response(request.method === "HEAD" ? null : videoBytes, {
    headers: { "Content-Type": "video/mp4", "Content-Length": String(videoBytes.length), ETag: '"video-v1"' },
  }) } };
}

test("Safari's two-byte probe receives a partial MP4 for both mobile films", async () => {
  for (const name of mobilePaths) {
    const response = await worker.fetch(new Request(`https://example.test/video/${name}`, { headers: { Range: "bytes=0-1" } }), videoAssets());
    assert.equal(response.status, 206, name);
    assert.equal(response.headers.get("content-range"), "bytes 0-1/128");
    assert.equal(response.headers.get("content-length"), "2");
    assert.equal(response.headers.get("accept-ranges"), "bytes");
    assert.equal(response.headers.get("content-type"), "video/mp4");
    assert.deepEqual(new Uint8Array(await response.arrayBuffer()), videoBytes.slice(0, 2));
  }
});

test("video seeking returns exact middle, open-ended, suffix and clamped ranges", async () => {
  for (const [range, start, end] of [["bytes=37-69", 37, 69], ["bytes=99-", 99, 127], ["bytes=-11", 117, 127], ["bytes=120-999", 120, 127]]) {
    const response = await worker.fetch(new Request("https://example.test/video/film.mp4", { headers: { Range: range } }), videoAssets());
    assert.equal(response.status, 206, range);
    assert.equal(response.headers.get("content-range"), `bytes ${start}-${end}/128`);
    assert.equal(response.headers.get("content-length"), String(end - start + 1));
    assert.deepEqual(new Uint8Array(await response.arrayBuffer()), videoBytes.slice(start, end + 1));
  }
});

test("unsatisfiable video ranges return 416 without a video body", async () => {
  for (const range of ["bytes=128-", "bytes=50-30", "bytes=-0"]) {
    const response = await worker.fetch(new Request("https://example.test/video/film.mp4", { headers: { Range: range } }), videoAssets());
    assert.equal(response.status, 416);
    assert.equal(response.headers.get("content-range"), "bytes */128");
    assert.equal((await response.arrayBuffer()).byteLength, 0);
  }
});

test("full video, HEAD, unsupported ranges and stale If-Range preserve whole-file semantics", async () => {
  for (const [method, headers] of [["GET", {}], ["HEAD", { Range: "bytes=0-1" }], ["GET", { Range: "bytes=0-1,5-6" }], ["GET", { Range: "bytes=0-1", "If-Range": '"old-video"' }], ["GET", { Range: "bytes=0-1", "If-Range": 'W/"video-v1"' }]]) {
    const response = await worker.fetch(new Request("https://example.test/video/film.mp4", { method, headers }), videoAssets());
    assert.equal(response.status, 200);
    assert.equal(response.headers.get("content-length"), "128");
    assert.equal(response.headers.get("accept-ranges"), "bytes");
    assert.equal(response.headers.get("content-range"), null);
    assert.deepEqual(new Uint8Array(await response.arrayBuffer()), method === "HEAD" ? new Uint8Array() : videoBytes);
  }
});

test("an upstream partial response is left intact", async () => {
  const response = await worker.fetch(new Request("https://example.test/video/film.mp4", { headers: { Range: "bytes=0-1" } }), {
    ASSETS: { fetch: async () => new Response(videoBytes.slice(0, 2), { status: 206, headers: { "Content-Type": "video/mp4", "Content-Range": "bytes 0-1/128", "Content-Length": "2" } }) },
  });
  assert.equal(response.status, 206);
  assert.equal(response.headers.get("content-range"), "bytes 0-1/128");
  assert.deepEqual(new Uint8Array(await response.arrayBuffer()), videoBytes.slice(0, 2));
});

test("a seek spans input chunks and stops reading after the requested bytes", async () => {
  let offset = 0, cancelled = false;
  const input = new ReadableStream({
    pull(controller) {
      if (offset >= videoBytes.length) { controller.close(); return; }
      controller.enqueue(videoBytes.slice(offset, offset + 16));
      offset += 16;
    },
    cancel() { cancelled = true; },
  }, { highWaterMark: 0 });
  const response = await worker.fetch(new Request("https://example.test/video/film.mp4", { headers: { Range: "bytes=13-36", "If-Range": '"video-v1"' } }), {
    ASSETS: { fetch: async () => new Response(input, { headers: { "Content-Type": "video/mp4", "Content-Length": "128", ETag: '"video-v1"' } }) },
  });
  assert.equal(response.status, 206);
  assert.deepEqual(new Uint8Array(await response.arrayBuffer()), videoBytes.slice(13, 37));
  assert.equal(cancelled, true);
  assert.equal(offset, 48); // No later chunks or whole-file buffering for this seek.
});

test("the production Worker serves exact bytes from both real mobile MP4 files", async () => {
  const { readFile } = await import("node:fs/promises");
  const { default: builtWorker } = await import("../dist/server/index.js");
  for (const name of mobilePaths) {
    const original = await readFile(new URL(`../public/video/${name}`, import.meta.url));
    const env = { ASSETS: { fetch: async () => new Response(original, { headers: { "Content-Type": "video/mp4", "Content-Length": String(original.length) } }) } };
    for (const [start, end] of [[0, 1], [1000000, 1001023], [original.length - 1024, original.length - 1]]) {
      const response = await builtWorker.fetch(new Request(`https://example.test/video/${name}`, { headers: { Range: `bytes=${start}-${end}` } }), env);
      assert.equal(response.status, 206, `${name}: ${start}-${end}`);
      assert.equal(response.headers.get("content-range"), `bytes ${start}-${end}/${original.length}`);
      assert.deepEqual(Buffer.from(await response.arrayBuffer()), original.subarray(start, end + 1));
    }
  }
});

test("Sites packaging removes direct mobile URLs while preserving all original video bytes", async t => {
  const { mkdtemp, mkdir, copyFile, readFile, rm } = await import("node:fs/promises");
  const { tmpdir } = await import("node:os");
  const path = await import("node:path");
  const { createHash } = await import("node:crypto");
  const { packageMobileScrollMedia } = await import("../scripts/package-mobile-scroll-media.mjs");
  const directory = await mkdtemp(path.join(tmpdir(), "bold-scroll-packaging-"));
  t.after(() => rm(directory, { recursive: true, force: true }));
  await mkdir(path.join(directory, "video"));
  for (const name of mobilePaths) await copyFile(new URL(`../public/video/${name}`, import.meta.url), path.join(directory, "video", name));
  const manifest = packageMobileScrollMedia(directory);
  for (const name of mobilePaths) {
    await assert.rejects(access(path.join(directory, "video", name)), { code: "ENOENT" });
    const original = await readFile(new URL(`../public/video/${name}`, import.meta.url));
    const record = manifest[`/video/${name}`];
    assert.equal(record.size, original.length);
    const parts = await Promise.all(record.parts.map(async part => {
      const bytes = await readFile(path.join(directory, part.url));
      assert.equal(bytes.length, part.size);
      assert.ok(bytes.length <= 4 * 1024 * 1024);
      return bytes;
    }));
    assert.deepEqual(Buffer.concat(parts), original);
    assert.equal(record.sha256, createHash("sha256").update(original).digest("hex"));
  }
});
