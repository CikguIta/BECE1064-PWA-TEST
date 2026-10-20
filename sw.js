/* Test-repository-only offline cache; paths are relative to this service worker's scope. */
const CACHE_NAME = 'bece1064-pwa-test-topic4-v16.17-release';
const CACHE_PREFIX = 'bece1064-pwa-test-';
const APP_SHELL = [
  './', './index.html', './manifest.webmanifest', './icon-192.png', './icon-512.png',
  './topic1_illustration_1.jpg', './topic1_illustration_2.jpg', './topic2-integration.js',
  './topic2_figure_1.png', './topic2_figure_2.png', './topic2_figure_3.png',
  './topic2_figure_4.png', './topic2_figure_5.png', './topic2_figure_6.png',
  './topic2_figure_7.png', './topic2_figure_8.png',
  './topic3-integration.js', './topic4-integration.js', './topic4-quiz-data.js',
  './topic4_figure_1.png', './topic4_figure_2.png', './topic4_figure_3.png',
  './topic4_figure_4.png', './topic4_figure_5.png'
];
self.addEventListener('install', event => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    await cache.addAll(APP_SHELL);
    await self.skipWaiting();
  })());
});
self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(key => key.startsWith(CACHE_PREFIX) && key !== CACHE_NAME).map(key => caches.delete(key)));
    await self.clients.claim();
  })());
});
self.addEventListener('fetch', event => {
  const request = event.request;
  const url = new URL(request.url);
  if (request.method !== 'GET' || url.origin !== self.location.origin || !url.pathname.startsWith(new URL(self.registration.scope).pathname)) return;
  if (request.mode === 'navigate') {
    event.respondWith((async () => {
      const cache = await caches.open(CACHE_NAME);
      try {
        const response = await fetch(request);
        if (response.ok) await cache.put(request, response.clone());
        return response;
      } catch (error) {
        return (await cache.match(request)) || (await cache.match(new URL('./index.html', self.registration.scope))) || (await cache.match(new URL('./', self.registration.scope))) || new Response('BECE1064 test app is offline. Open the app once online first.', {status: 503, headers: {'Content-Type': 'text/plain; charset=utf-8'}});
      }
    })());
    return;
  }
  event.respondWith((async () => {
    const cache = await caches.open(CACHE_NAME);
    const cached = await cache.match(request);
    if (cached) return cached;
    try {
      const response = await fetch(request);
      if (response.ok) await cache.put(request, response.clone());
      return response;
    } catch (error) { return new Response('', {status: 504}); }
  })());
});
