// Submit the site's URLs to IndexNow (Bing, Yandex, Seznam, …) for instant
// (re)indexing. Run whenever content changes:  node scripts/indexnow.mjs
//
// The key is public by design — it must match the file hosted at
// https://www.miragehotel.co.uk/<key>.txt so IndexNow can verify ownership.

const HOST = "www.miragehotel.co.uk";
const KEY = "7fb20afc4ba64edcbdbcadfacd48e49b";
const ORIGIN = `https://${HOST}`;

// Keep this list in sync with app/sitemap.ts.
const paths = ["/", "/rooms", "/booking", "/gallery", "/contact"];
const urlList = paths.map((p) => `${ORIGIN}${p === "/" ? "" : p}`);

const body = {
  host: HOST,
  key: KEY,
  keyLocation: `${ORIGIN}/${KEY}.txt`,
  urlList,
};

const res = await fetch("https://api.indexnow.org/IndexNow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify(body),
});

const text = await res.text();
console.log(`IndexNow → HTTP ${res.status} ${res.statusText}`);
console.log(`Submitted ${urlList.length} URLs:`);
urlList.forEach((u) => console.log(`  ${u}`));
if (text.trim()) console.log(`Response body: ${text}`);

// 200 = accepted, 202 = accepted (queued). Anything else is a failure.
if (res.status !== 200 && res.status !== 202) {
  console.error("IndexNow submission failed.");
  process.exit(1);
}
