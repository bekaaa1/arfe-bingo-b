self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open('bingo-cache').then((cache) => {
            return cache.addAll([
                '/index.html',
                '/login.html',
                '/styles.css',
                '/script.js',
                '/auth.js'
            ]);
        })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});
