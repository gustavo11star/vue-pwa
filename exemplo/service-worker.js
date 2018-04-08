let cachename = 'conhecendo-service-workers';;
let fileToCache = [
    '/',
    'index.html',
    'style.css'
];

self.addEventListener('install', function(e){
    console.log('[ServiceWorker] Installer');
    e.waitUntil(
        caches.open(cachename)
        .then(function (cache) {
            console.log('[ServiceWorker] caching app shell');
            return cache.addAll(fileToCache);
        })
        .catch(function(err){
            console.warn(err);
        })
    );
});

self.addEventListener('activate', function(e){
    console.log('[ServiceWorker] Activate');
});

self.addEventListener('fetch', function(e){
    console.log('[ServiceWorker] Fetch', e.request.url);
    e.respondWith(
        caches.match(e.request).then(function (response) {
            console.log('[ServiceWorker] Get cache for', e.request.url);
            return response || fetch(e.request);
        })
    );
});