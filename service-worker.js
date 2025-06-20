// service-worker.js

self.addEventListener("install", function (event) {
  console.log("🔧 Installing service worker...");
  self.skipWaiting(); // מתקין מיידית
});

self.addEventListener("activate", function (event) {
  console.log("✅ Activating new service worker...");
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames.map(function (cacheName) {
          console.log("🧹 Deleting cache:", cacheName);
          return caches.delete(cacheName);
        })
      );
    })
  );
  self.clients.claim(); // תופס שליטה מיידית
});

self.addEventListener("fetch", function (event) {
  // תמיד מושך מהשרת - ללא cache
  event.respondWith(
    fetch(event.request, { cache: "no-store" })
      .then(response => {
        return response;
      })
      .catch(() => {
        return new Response(
          "<h1>אין חיבור לאינטרנט</h1><p>נסה שוב מאוחר יותר</p>",
          { status: 503, headers: { "Content-Type": "text/html" } }
        );
      })
  );
});
