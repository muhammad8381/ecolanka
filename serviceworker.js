//Setting up cache name and adding files to add to it
const CACHE_NAME = 'EcoLanka_Cache';
const CACHE_URLS =  [
                     'index.html',
                    'styles/style.css',
                     'scripts/app.js',
                     ];

//Add all URLs to the cache when installed
self.addEventListener("install", function(event){
    console.log("Service worker installed");
    event.waitUntil(
        //create and open cache
        caches.open(CACHE_NAME)
            .then(function(cache){
                console.log("Cache opened");
                return cache.addAll(CACHE_URLS);
        })
    );
});