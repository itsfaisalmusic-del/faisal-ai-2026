const CACHE="faisal-ai-v2";
const ASSETS=["./","./index.html","./style.css","./app.js","./manifest.json"];
self.addEventListener("install",event=>event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(ASSETS))));
self.addEventListener("activate",event=>event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key!==CACHE).map(key=>caches.delete(key))))));
self.addEventListener("fetch",event=>{
  const url=new URL(event.request.url);
  if(event.request.method!=="GET"||url.pathname.includes("/api/"))return;
  event.respondWith(caches.match(event.request).then(cached=>cached||fetch(event.request)));
});
