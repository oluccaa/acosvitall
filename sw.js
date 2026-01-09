
const CACHE_NAME = 'acos-vital-v3';
const IMAGE_CACHE_NAME = 'acos-vital-images-v3';

const PRECACHE_ASSETS = [
  '/',
  '/index.html',
  '/index.css'
];

const IMAGE_DOMAINS = [
  'mxbsygruslepfcyhtmqr.supabase.co',
  'images.builderservices.io',
  'storage.googleapis.com',
  'images.unsplash.com',
  'yrhedrhkfgvaeoavcazg.supabase.co'
];

// Tempo de vida para o cache de imagens (7 dias em milissegundos)
const IMAGE_CACHE_EXPIRATION = 7 * 24 * 60 * 60 * 1000;

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

  // Estratégia Especial para Imagens de Domínios Conhecidos
  if (event.request.destination === 'image' || IMAGE_DOMAINS.some(domain => url.hostname.includes(domain))) {
    event.respondWith(
      caches.open(IMAGE_CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((cachedResponse) => {
          if (cachedResponse) {
            // Se existir no cache, retorna imediatamente.
            return cachedResponse;
          }

          return fetch(event.request).then((networkResponse) => {
            if (networkResponse.ok) {
              // Armazena no cache e clona para resposta
              cache.put(event.request, networkResponse.clone());
            }
            return networkResponse;
          });
        });
      })
    );
    return;
  }

  // Estratégia Stale-While-Revalidate para o restante (Scripts, CSS, HTML)
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        // Atualiza o cache em background para a próxima visita
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
