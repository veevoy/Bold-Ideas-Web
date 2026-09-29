// Some asset bindings ignore Range and return the entire MP4. Safari needs
// exact byte ranges to decode/seek paused scroll films. Pass native 206s through.
async function videoRange(request, response) {
  const size = Number(response.headers.get("content-length"));
  if (response.status !== 200 || !["GET", "HEAD"].includes(request.method)
    || !response.headers.get("content-type")?.startsWith("video/mp4")
    || response.headers.has("content-encoding") || !Number.isSafeInteger(size) || size <= 0) return response;

  const headers = new Headers(response.headers);
  headers.set("Accept-Ranges", "bytes");
  const ifRange = request.headers.get("if-range");
  const matchesVersion = !ifRange || (!ifRange.startsWith("W/") && ifRange === headers.get("etag"));
  const match = request.method === "GET" && matchesVersion
    && request.headers.get("range")?.match(/^bytes=(\d*)-(\d*)$/);
  if (!match || (!match[1] && !match[2]) || !response.body) {
    return new Response(response.body, { status: 200, headers });
  }

  const start = match[1] ? Number(match[1]) : Math.max(0, size - Number(match[2]));
  const end = match[1] && match[2] ? Math.min(Number(match[2]), size - 1) : size - 1;
  if (!Number.isSafeInteger(start) || !Number.isSafeInteger(end) || start > end || start >= size) {
    await response.body.cancel();
    headers.set("Content-Range", `bytes */${size}`);
    headers.set("Content-Length", "0");
    return new Response(null, { status: 416, headers });
  }

  headers.set("Content-Range", `bytes ${start}-${end}/${size}`);
  headers.set("Content-Length", String(end - start + 1));
  const reader = response.body.getReader();
  let offset = 0, cancelled = false;
  const body = new ReadableStream({
    async pull(controller) {
      try {
        while (!cancelled) {
          const { done, value } = await reader.read();
          if (cancelled) return;
          if (done) throw new Error("Incomplete video asset");
          const from = Math.max(0, start - offset);
          const to = Math.min(value.byteLength, end - offset + 1);
          offset += value.byteLength;
          if (to > from) controller.enqueue(value.subarray(from, to));
          if (offset > end) {
            controller.close();
            await reader.cancel();
            return;
          }
          if (to > from) return;
        }
      } catch (error) {
        if (!cancelled) controller.error(error);
        await reader.cancel().catch(() => {});
      }
    },
    async cancel(reason) { cancelled = true; await reader.cancel(reason); },
  });
  return new Response(body, { status: 206, headers });
}

export default {
  async fetch(request, env) {
    const response = await env.ASSETS.fetch(request);
    const acceptsHtml = request.headers.get("accept")?.includes("text/html");

    if (response.status !== 404 || !acceptsHtml || !["GET", "HEAD"].includes(request.method)) {
      return videoRange(request, response);
    }

    const indexUrl = new URL(request.url);
    // The asset host redirects /index.html to /. Fetch the canonical root
    // internally so the browser keeps the requested page URL.
    indexUrl.pathname = "/";
    indexUrl.search = "";
    return env.ASSETS.fetch(new Request(indexUrl, request));
  },
};
