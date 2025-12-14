// sw.js - VAS-HD (FAP) v3
const CACHE = "vas-hd-fap-v3";

const ASSETS = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./splash.png",
  "./bg-nurse.jpg",
  "./bg-patient.jpg",
  "./bg-access.jpg",
  "./bg-checklist.jpg",
  "./bg-result.jpg"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE).then((cache) => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.map((k) => (k !== CACHE ? caches.delete(k) : null)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cached) => {
      return cached || fetch(event.request);
    })
  );
});
