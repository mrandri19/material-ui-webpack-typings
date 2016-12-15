this.addEventListener('install', event => {
    console.log('Service worker installed');

    // Add to cache a file. The file will be GETed by the sw
    event.waitUntil(caches.open('v1').then(cache => {
        return cache.addAll([
        ]);
    }));

    // This will skip the waiting for the other service workers to close
    // and jump directly to the activation stage
    // this.skipWaiting();
});

this.addEventListener('activate', event => {
    // When a sw is upgraded the activate event is fired,
    // we can then claim the other clients which are still controlled
    // by the other workers
    console.log('SW is now active');
});

this.addEventListener('fetch', event => {
    console.log('Intercepted a fetch request', event.request);
    event.respondWith(
        caches.match(event.request).then(resp => {
            return resp || fetch(event.request).then(r => {
                console.log(event.request.url);
                console.log('wasn\'t found in the cache so thus fetched');
                return r;
            });
        })
    );
});