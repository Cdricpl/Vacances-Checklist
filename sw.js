/* Service worker de la Checklist Vacances.
   Stratégie « réseau d'abord, cache en secours » : on affiche toujours la
   dernière version publiée quand il y a du réseau, et la dernière version
   consultée quand il n'y en a pas (utile au camping). */

const CACHE = "checklist-vacances-v5.3";

/* Seul le strict nécessaire est pré-chargé : les icônes 512 px pèsent
   680 Ko à elles deux et ne servent qu'à l'installation, que le système
   gère de son côté. Elles restent mises en cache si elles sont demandées. */
const ASSETS = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./icons/icon-192.png?v=4.7",
  "./icons/apple-touch-icon.png?v=4.7"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE)
      .then(c => c.addAll(ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", event => {
  const req = event.request;
  if (req.method !== "GET") return;
  if (new URL(req.url).origin !== self.location.origin) return;

  event.respondWith(
    fetch(req)
      .then(res => {
        if (res && res.status === 200 && res.type === "basic") {
          const copy = res.clone();
          caches.open(CACHE).then(c => c.put(req, copy));
        }
        return res;
      })
      .catch(() =>
        caches.match(req).then(hit => hit || caches.match("./index.html"))
      )
  );
});
