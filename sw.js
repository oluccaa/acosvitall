
const CACHE_NAME = 'acos-vital-v2';
const IMAGE_CACHE_NAME = 'acos-vital-images-v2';

const PRECACHE_ASSETS = [
  '/',
  '/index.html',
  '/index.css',
  '/index.tsx'
];

const IMAGE_DOMAINS = [
  'mxbsygruslepfcyhtmqr.supabase.co',
  'images.builderservices.io',
  'storage.googleapis.com',
  'images.unsplash.com',
  'yrhedrhkfgvaeoavcazg.supabase.co'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(PRECACHE_ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME && cacheName !== IMAGE_CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // Strategy: Cache-First with Aggressive Overriding for Images
  if (event.request.destination === 'image' || IMAGE_DOMAINS.some(domain => url.hostname.includes(domain))) {
    event.respondWith(
      caches.open(IMAGE_CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((cachedResponse) => {
          if (cachedResponse) {
            // Revalidate in background to keep it fresh
            fetch(event.request).then((networkResponse) => {
                if (networkResponse.ok) cache.put(event.request, networkResponse);
            }).catch(() => {});
            return cachedResponse;
          }

          return fetch(event.request).then((networkResponse) => {
            // Clone the response before putting it in cache
            if (networkResponse.ok) {
                cache.put(event.request, networkResponse.clone());
            }
            return networkResponse;
          });
        });
      })
    );
    return;
  }

  // Default: Stale-While-Revalidate
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        fetch(event.request).then((networkResponse) => {
          if (networkResponse.ok) {
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, networkResponse));
          }
        }).catch(() => {});
        return cachedResponse;
      }
      return fetch(event.request);
    })
  );
});
