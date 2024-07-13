// https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API
// https://github.com/mdn/dom-examples/blob/main/service-worker/simple-service-worker/sw.js
// https://gist.github.com/cferdinandi/6e4a73a69b0ee30c158c8dd37d314663

const coreAssets = [
    "/",
    "/index.html",
    "/offline/",
    "/recipes/",
    "/favicon.ico",
    "/favicon.svg",
  ];
  
  // On install, cache core assets
  self.addEventListener("install", async (event) => {
    // Cache core assets
    const cache = await caches.open("app");
    for (const asset of coreAssets) {
      await cache.add(new Request(asset));
    }
  });
  
  // Listen for request events
  self.addEventListener("fetch", (event) => {
    const { request } = event;
    const url = new URL(request.url);
  
    // Exclude files
    // https://stackoverflow.com/questions/45663796/setting-service-worker-to-exclude-certain-urls-only
    // if (
    //   url.pathname.includes("admin") ||
    //   url.pathname.includes("netlify") ||
    //   url.pathname.includes("api") ||
    //   url.pathname.includes("decap")
    // ) {
    //   return false;
    // }
  
    // Bug fix
    // https://stackoverflow.com/a/49719964
    if (
      event.request.cache === "only-if-cached" &&
      event.request.mode !== "same-origin"
    ) {
      return;
    }
  
    if (
      // Network-first
      request.headers.get("Accept").includes("text/html") ||
      request.headers.get("Accept").includes("application/xml") ||
      request.headers.get("Accept").includes("text/xml")
    ) {
      event.respondWith(
        fetch(request)
          .then((response) => {
            // Create a copy of the response and save it to the cache
            const copy = response.clone();
            event.waitUntil(
              caches.open("app").then((cache) => {
                return cache.put(request, copy);
              })
            );
  
            // Return the response
            return response;
          })
          .catch(async (error) => {
            // If there's no item in cache, respond with a fallback
            const response = await caches.match(request);
            return response || (await caches.match("/offline/"));
          })
      );
    } else {
      // Get everything else from the cache
      event.respondWith(
        caches.match(request).then((response) => {
          return (
            response ||
            fetch(request).then((response) => {
              // Save a copy of it in cache
              const copy = response.clone();
              event.waitUntil(
                caches.open("app").then((cache) => {
                  return cache.put(request, copy);
                })
              );
  
              // Return the response
              return response;
            })
          );
        })
      );
    }
  });
  