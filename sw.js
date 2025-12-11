const CACHE_NAME = 'arissa-blooms-unfold-cache';

self.addEventListener('install', (event) => {
  event.waitUntil(self.skipWaiting());
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

self.addEventListener('message', (event) => {
  if (event.data.type === 'CACHE_NEW_VERSION') {
    caches.open(CACHE_NAME).then((cache) => {
      cache.add(event.data.sdkPath).then(() => {
        event.source.postMessage({ type: 'NEW_VERSION_CACHED' });
      });
    });
  }
});