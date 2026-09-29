# Správa case studies

Každá case study má jeden soubor `.json` v této složce. Všechny používají stejnou stránku a jejich náhledy na homepage a na přehledu `/case-studies` se načítají ze stejných dat. Pro změnu textů, fotografií ani pořadí se neupravuje React nebo CSS.

## Úprava existujícího projektu

1. Otevřete `kinable.json`, `love-peace-harmony.json`, `mapwhizz.json` nebo `czech-beer-alliance.json`.
2. Změňte hodnoty v uvozovkách. Názvy polí nechte stejné. Nový odstavec je další položka v poli `paragraphs`.
3. Uložte soubor. V lokálním náhledu se změna projeví automaticky. Veřejný náhled z 29. září 2026 zůstává zmrazený; nové nasazení vyžaduje výslovný pokyn uživatele.

JSON používá dvojité uvozovky a čárky mezi položkami. Uvozovky uvnitř textu zapisujte jako `\"`. Texty se vykreslují jako běžný text; HTML se nevkládá.

## Přidání projektu

1. Zkopírujte jeden z existujících souborů do `nazev-projektu.json`.
2. Nastavte `slug` na `nazev-projektu` (bez diakritiky, malými písmeny, slova oddělená pomlčkou). Soubor i slug musí být jedinečné a shodné.
3. Vyplňte obsah podle přehledu níže a nastavte `order` podle požadovaného pořadí.
4. Během přípravy nastavte `published` na `false`. Po dokončení na `true`.
5. Spusťte kontrolu obsahu. Nový projekt se automaticky objeví na přehledu `/case-studies`, na homepage, na `/work/nazev-projektu` a v sekci „More stories“.

`published: false` skryje stránku a odkazy, ale není to zabezpečený koncept — do zdrojových souborů nepatří důvěrný obsah. Změna již používaného slugu mění URL; pro starou adresu je pak třeba připravit přesměrování.

## Jednotná struktura

| Pole | Význam |
| --- | --- |
| `name` | Název klienta/projektu; na detailu světlý nad hlavním nadpisem v hero fotografii. |
| `headline` | Krátký výsledkový nadpis, např. dvě věty/fráze. Používá se i na homepage. Na detailu se přirozeně zalamuje podle šířky. |
| `summary` | Stručné shrnutí pod hlavním obrázkem, vedle údajů o projektu; také popis stránky v metadatech. |
| `sector` | Obor klienta. |
| `serviceId` | Služba z nabídky; automaticky doplní její název a funkční odkaz. |
| `serviceLabel` | Nepovinný vlastní název řešení, např. BoldLeads.ai · AI Lead Generation. Nahradí text i odkaz v poli Service; `serviceId` zůstává vazbou na související typ služby. |
| `scope` | Co jsme na projektu dělali, v jedné krátké větě. |
| `image` | Hlavní fotografie projektu. Bez objektu `hero` se používá jako pozadí i popředí. Pokud existuje `hero.background`, hlavní fotografie už se automaticky nepřekrývá přes pozadí. |
| `thumbnail` | Volitelná samostatná kompozice náhledu se stejnou strukturou jako jedna položka `showcases`. Použije se na homepage, přehledu a souvisejících projektech; hero se nemění. |
| `thumbnailTone` | Volitelné `"light"` zesvětlí jen fotografické pozadí všech náhledů projektu. Hero a screenshot se nemění. |
| `hero` | Nepovinný objekt s `background` a volitelným `screen`; oba používají strukturu obrázku. Fotografie vyplní hero; pod nadpisem se zobrazí celý `screen`, pokud je dodaný. Bez `screen` zůstane pouze pozadí, jako u CBA. |
| `challenge.title` + `paragraphs` | Výchozí situace / problém klienta. |
| `timeline` | Nepovinný chronologický přehled kroků s `title` a `description`. Doporučené 2–4 stručné kroky; minimálně dva. Bez pole se sekce vynechá. Na desktopu jsou vedle sebe, pod 900 px svisle. |
| `approach` | Seznam částí naší práce. Každá má `title` a `paragraphs`; obvykle stačí 2–4. |
| `items` + `closingParagraphs` | Nepovinné odrážky a navazující odstavce v `challenge`, jednotlivých částech `approach` nebo `nextPhase`. Pořadí je vždy úvodní odstavce → odrážky → závěr. |
| `images` | Nepovinné obrázky přímo v `challenge`, každé části `approach` nebo `nextPhase`. Zobrazí se hned za danou kapitolou. Jeden je široký, dvojice stojí vedle sebe; na mobilu se skládají pod sebe. |
| `showcases` | Volitelné kompozice detailů rozhraní: u kapitoly se vykreslí za ní, na nejvyšší úrovni za galerií. Popis a příklad níže. |
| `gallery` | Volitelná další galerie za poslední částí `approach`. Pro obrázky související s konkrétní kapitolou používejte její `images`. Prázdná pole nevytvářejí prázdné sekce. |
| `outcome.summary` | Konkrétní doložený výsledek nebo aktuální stav, zvýrazněný větším písmem mezi horní a dolní linkou; každá má uprostřed brandovou hvězdu. |
| `outcome.paragraphs` | Nepovinné vysvětlení pod zvýrazněným výsledkem v běžné velikosti textu. |
| `outcome.deliverables` | Krátký seznam odevzdaných výstupů. |
| `outcome.next` | Nepovinný text další fáze. Vynechte, pokud pro projekt nedává smysl. |
| `nextPhase` | Nepovinná samostatná část „What’s next“ s `title`, `paragraphs`, případně `items` a `closingParagraphs`. Odděluje plánovanou práci od dodaných výsledků; použijte místo `outcome.next` pro delší obsah. |
| `testimonialId` | Nepovinné ID reference ze `src/content.ts`, např. `mapwhizz`. Citace se přebírá včetně autora bez duplikování. |
| `callToAction` | Nepovinné `title`, `body`, `label` pro závěrečnou kontaktní sekci. Tlačítko používá společný rezervační odkaz. Bez tohoto pole zůstává standardní výzva. |
| `order` | Číslo určující pořadí. Menší číslo znamená dřívější pozici. Aktuálně Kinable → LPH → Mapwhizz → CBA. |
| `published` | `true` zobrazí projekt, `false` ho skryje ze stránek a navigace. |

Pevné nadpisy „The challenge“, „What we did“, „The outcome“ jsou součástí společné šablony. Projekty tak zůstávají konzistentní. Nic se neduplikuje do samostatné stránky.

Dostupná `serviceId`: `proof-of-product`, `tech-strategic-compass`, `built-to-last`, `product-rescue`, `ai-automation-starter`, `vibe-coded-app-to-production`.

## Timeline projektu

Pořadí v poli odpovídá pořadí kroků. Používejte krátký název a jednu větu; čísla a brandové hvězdičky doplní šablona. Jde o pořadí událostí, ne délku jednotlivých etap. Nevymýšlejte datum ani dokončení práce: rozpracovanou nebo plánovanou fázi tak výslovně popište. U Kinable vývoj pokračuje; u Mapwhizz přestavba zbývajícího backendu začala.

```json
"timeline": [
  { "title": "An honest audit", "description": "We assessed what could be saved and what needed replacing." },
  { "title": "Stabilisation and launch", "description": "A steadier core and a new frontend got the product into live use." }
]
```

Přehled projektů i doporučení používají stejný náhled: obrázek, výrazný `name`, podpůrný `headline` a `sector`. Doporučení automaticky nabídne další dva publikované projekty v pořadí, na konci se vrací na začátek. Nikdy neodkazuje na právě otevřený projekt. Pokud existuje jen jeden další projekt, zobrazí se samostatně; bez dalšího projektu se sekce skryje.

## Obrázky

Hero používá `hero.background` jako fotografii přes celou plochu a `hero.screen` jako neuříznutou ukázku produktu pod nadpisem. Obě pole mají `src`, `alt`, `width`, `height` a případná běžná metadata. Pokud `hero` obsahuje pouze `background`, popředí se nezobrazuje. CBA tak ukazuje jen pozadí, protože zakázka neobsahovala návrh rozhraní. Kinable, LPH a Mapwhizz mají skutečné stock fotografie s klidnou plochou oblohy: listí při okraji, jednu květinu a jednoduchou architekturu. CBA používá původní fotografii pivovarského nádvoří z klientova webu, samostatně bez překryvné fotky. `illustrative: true` zde znamená dekorativní kontext, nikoli generovaný původ. V popředí zůstávají původní screenshoty (LPH homepage, Mapwhizz detail reportu), CBA nemá překryvnou fotografii. Nové pozadí nejdříve hledejte ve stocku, bez lidí a složitých scén. `position` určuje výřez pozadí. Náhledy mají standardně 10% tmavou vrstvu; `thumbnailTone: "light"` umožňuje světlý závoj u fotografického náhledu; hero gradient 52 / 24 / 8 %. Fotografie pozadí má při scrollu parallax, který se vypíná při omezeném pohybu v systému. Zdroje jsou v `docs/CASE-HERO-MEDIA.md`.

Nahrajte soubor do `prototype/public/images/`, ideálně do podsložky projektu, a do JSON zadejte cestu začínající `/images/`. Doporučujeme WebP nebo AVIF. Fotografie pozadí by měla mít alespoň 1800 px na šířku; ořezává se podle formátu náhledu. Pokud není zadané `thumbnail`, náhledy na homepage, přehledu i v doporučeních používají stejné dvě vrstvy jako hero: `hero.background` a nad ním celý `hero.screen`, pokud je dodaný. CBA používá pouze pozadí. Popředí se neořezává. Na homepage se při scrollu hýbe jen pozadí; na přehledu a v doporučeních se pozadí jemně zvětší při hoveru. Nové detaily uvnitř kapitol používají `showcases` a podklad v barvě klienta; Kinable zachovává levandulovou. Starší celé portrétní obrázky mají nadále světle levandulový podklad. Screenshoty nezvětšujte uměle nad původní rozlišení. Pole `images` u kapitol a `gallery` zachovávají celý obrázek bez ořezu.

Každý obrázek má `src`, krátký věcný popis `alt` a skutečné rozměry `width` / `height`. Volitelná pole: `position` pro ohnisko ořezu (např. `54% center`), `caption` pro popisek a `credit` s `label` + HTTPS `href` pro zdroj. Pole `illustrative: true` zaznamenává ilustrativní charakter. Tyto popisky, odkazy na zdroj ani ilustrativní označení se na detailu viditelně nevykreslují; ponechte je jako metadata. Druh obrázku musí zůstat jasný z obsahu, alt textu a zdrojových záznamů.

Nepřidávejte neověřené metriky ani vymyšlené citace. LPH používá homepage v hero a thumbnailech; galerie má čtyři exporty veřejných stránek dodané Figmy: Support Others, Heal the Planet, About Us a Global Map. Celé sekce jsou složené do čtyř větších samostatných kompozic a závěrečné dvojice projektů/komunitní galerie. Dlouhý export homepage je archivovaný mimo public/. Knihovna meditací byla z galerie vyřazena. CBA má stock pivovar a původní nádvoří; nejde o screenshoty produktu. Kinable má tři screenshoty skutečného pracovního buildu; vývoj stále probíhá a produkt není uvedený na trh. Mapwhizz má pět hotových kompozic připravených uživatelem ve Figmě (sekce 1492:8466); v galerii se zobrazují celé bez přidaného rámu, ořezu či pozadí. Duplicitní přehled reportu je z galerie odstraněný a tabulka poštovních směrovacích čísel je před grafy dojíždění. Původní detail reportu zůstává v hero; thumbnail používá stejné fotografické pozadí s panelem grafů dojíždění. Nahrazené screenshoty, company setup a oba fotografické mobilní mockupy jsou archivované mimo public/. Čísla v reportech nejsou metrikami dopadu zakázky. Popisky a odkazy na zdroj ponechte v metadatech. Každý veřejný soubor musí mít také záznam v `docs/assets.json`.

Zdrojem aktualizace z 25. září 2026 je dodané `CS.pptx`: Kinable na slidech 2–4, Mapwhizz na slidech 5–8 a LPH na slidu 9. Pět nových WebP vzniklo z původních PNG bez ořezu a změny rozměrů (Kinable ze slidu 3, Mapwhizz ze slidů 6–7). U Mapwhizz již začala přestavba zbývajícího backendu; nedokládejte její dokončení. Zachovejte přímé citace dodané uživatelem v `src/content.ts`, nenahrazujte je verzemi z prezentace. CBA zachovává původní texty; timeline shrnuje doložené kroky nastavení pravidel, denního průzkumu a práce s profily v CRM.

Příklad přidání obrázku ke kapitole (stejné pole funguje i v části `approach`):

```json
"challenge": {
  "title": "The challenge",
  "paragraphs": ["Text kapitoly."],
  "images": [{
    "src": "/images/projekt/ukazka.webp",
    "alt": "Krátký věcný popis obrázku",
    "width": 1800,
    "height": 1200,
    "caption": "Co obrázek ukazuje."
  }]
}
```

Vyplňujte skutečné rozměry souboru. Chcete-li dvojici, přidejte druhý objekt do `images`. Celé pole lze vynechat. Pořadí stránky je hero s názvem projektu a nadpisem nad skutečným screenem nebo hlavní fotografií → údaje a shrnutí → výchozí problém s obrázky → timeline → kapitoly práce s obrázky → případná reference → výsledky → další fáze → dva další příběhy. Timeline je na tmavě zeleném pozadí, samotná karta reference je tmavě zelená na světlém pozadí stránky. Údaje a reference mají rámeček se čtyřmi rohovými hvězdami; výsledky horní a dolní linku se dvěma středovými hvězdami.

## Kompozice detailů rozhraní

Pole `showcases` lze přidat ke kapitole nebo na nejvyšší úroveň JSON. Nepotřebuje nové rastrové soubory: ořez se vykreslí z původního exportu, který zůstane dostupný pro hero či další detail. `image` má stejná metadata jako běžný obrázek; `alt` popisuje konkrétní výřez. `crop` obsahuje souřadnice v **původních pixelech**, nikoli procenta. Ořez musí zůstat uvnitř skutečných rozměrů zdroje, zachovat celý vybraný komponent a neodříznout popisky grafu. `background` je barva klienta ve formátu šestimístného hex kódu.

Rozložení: `canvas` (1 celý výřez v ploše 2050:1318), `canvas-pair` (2 celé výřezy ve stejné ploše, vedle sebe i na mobilu), `artwork` (1 hotová kompozice bez přidaného obalu), `artwork-pair` (2 hotové kompozice vedle sebe i na mobilu), `focus` (1 detail), `cards` (3 karty s posunutím), `feature` (větší detail vlevo a dva menší vpravo), `report` (2 detaily nad širokým grafem), `comparison` (užší a širší detail vedle sebe), `screen` (1 celý screen s přirozenou výškou, nejvýše 68svh plus odsazení), `pages` (2 rovné části stránek v ohraničené ploše 3:2), `stack` (větší hlavní analýza a menší doplňující detail), `phones` (2 stejně velké telefony), `care` (4 samostatné dlaždice v mřížce a 2 další detaily; celkem 6 položek).

Pro hotové kompozice `artwork` a `artwork-pair` použijte `crop` přes celý zdroj; pozadí, rámečky a rozestupy jsou již součástí obrázku. Web pouze zachová poměr stran.

`pages` zůstávají vedle sebe i na mobilu; vybrané části stránek se celé vejdou do plátna 3:2 bez přesahů. `stack` se na mobilu řadí pod sebe s hlavním obrazem přes celou dostupnou šířku. `screen` se celý vejde do výškového limitu. Délka původního exportu nezvětšuje délku case study. Pro `phones` lze u každé položky zadat `footerCrop` se stejnými pravidly jako `crop`: skutečná spodní navigace se připne ke spodnímu okraji stejně vysokého telefonu. U Kinable tak mizí pouze stavový řádek OS a přebytečný bílý spodek; nevytváří se nová navigace. Čtyři dlaždice v `care` zůstávají v mřížce 2 × 2 bez šedého podkladu.

Volitelné `thumbnail` umožňuje samostatnou kompozici náhledu. LPH nyní používá přímo homepage a fotografii květiny z hero; nevracejte dvě malé stránky do náhledu. Mapwhizz používá `thumbnailScreen` se stejnými metadaty jako `image`: nahradí pouze obrazovku v náhledech, pozadí převezme z hero. Obsah hero se tím nemění. Kinable a CBA zachovávají původní fotografické náhledy. Čísla z reportů zůstávají příklady produktu, nikoli výsledky zakázky. Nevymýšlejte chybějící UI.
```json
"showcases": [{
  "label": "Commute estimates by transport mode",
  "background": "#F8F3EC",
  "layout": "artwork",
  "items": [{
    "image": {
      "src": "/images/cases/mapwhizz-case-commute.webp",
      "alt": "Comparing commute times by driving, public transport and cycling.",
      "width": 2050,
      "height": 1318
    },
    "crop": { "x": 0, "y": 0, "width": 2050, "height": 1318 }
  }]
}]
```

## Kontrola a technická návaznost

Z adresáře `prototype` (Node.js 22.18+):

```sh
npm run validate:content
npm run typecheck
npm run test:content
npm run build
```

Build automaticky kontroluje povinná pole, služby, jedinečnost adres a existenci obrázků. Chyba vypíše soubor a problematické pole.

Šablona: `src/components/CaseStudyPage.tsx`. Model a validace: `src/case-study-model.ts`. Kolekce: `src/case-studies.ts`. Strukturu lze později napojit na CMS, který bude dodávat stejná pole. V této verzi se obsah spravuje soubory; administrace ani editor v prohlížeči nejsou vytvořené.

`presentation: "screen"` na médiu kapitoly zapne zaoblený světlý rámeček s 32% krytím a 12px blurem pozadí. U fotografií a již složených mockupů pole vynechte. Mapwhizz hero používá viewport detailu reportu; LPH homepage.
