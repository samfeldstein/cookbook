const coreAssets=["/","/index.html","/offline/","/recipes/","/favicon.ico","/favicon.svg"];self.addEventListener("install",async t=>{const e=await caches.open("app");for(const a of coreAssets)await e.add(new Request(a))}),self.addEventListener("fetch",t=>{const{request:e}=t,a=new URL(e.url);t.request.cache==="only-if-cached"&&t.request.mode!=="same-origin"||(e.headers.get("Accept").includes("text/html")||e.headers.get("Accept").includes("application/xml")||e.headers.get("Accept").includes("text/xml")?t.respondWith(fetch(e).then(c=>{const n=c.clone();return t.waitUntil(caches.open("app").then(s=>s.put(e,n))),c}).catch(async c=>await caches.match(e)||await caches.match("/offline/"))):t.respondWith(caches.match(e).then(c=>c||fetch(e).then(n=>{const s=n.clone();return t.waitUntil(caches.open("app").then(r=>r.put(e,s))),n}))))});
