// service-worker.js

self.addEventListener("install", function (event) {
  // מיידי – לא מחכה לגרסה קודמת
  self.skipWaiting();
});

self.addEventListener("activate", function (event) {
  // מוחק את כל הקאש
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames.map(function (cacheName) {
          return caches.delete(cacheName);
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener("fetch", function (event) {
  // תמיד יביא מהשרת – בלי cache
  event.respondWith(
    fetch(event.request, { cache: "no-store" }).catch(function () {
      return new Response("Offline", { status: 503, statusText: "Offline" });
    })
  );
});
