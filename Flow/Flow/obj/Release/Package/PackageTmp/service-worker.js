(function () {

    // Update 'version' if you need to refresh the cache
    var staticCacheName = 'static';
    var version = 'v.24';

    // Store core files in a cache (including a page to display when offline)
    function updateStaticCache() {
        return caches.open(version + staticCacheName)
            .then(function (cache) {
                return cache.addAll([
                    '/',
                    '/offline'
                    //'/Content/bootstrap.css',
                    //'/Content/Site.css',
                    //'/Content/StyleSheet',
                    //'Scripts/src/dataFetcher.js'
                ]);
            });
    };

    self.addEventListener('install', function (event) {
        event.waitUntil(updateStaticCache());
    });

    self.addEventListener('activate', function (event) {
        event.waitUntil(
            caches.keys()
                .then(function (keys) {
                    // Remove caches whose name is no longer valid
                    return Promise.all(keys
                        .filter(function (key) {
                            return key.indexOf(version) !== 0;
                        })
                        .map(function (key) {
                            return caches.delete(key);
                        })
                    );
                })
        );
    });

    self.addEventListener('fetch', function(event) {
        var request = event.request;
        
        event.respondWith(
  fetch(event.request).then(response => {
      response.redirectToFinalURL = true;
      return response;
  })
        });

})();