
const staticCacheName = 'site-static-v2';
const dynamic='dynamic-v2'
const assets =[
    '/',
'/index.html',
'/src/index.js',
'/src/app.css',
'/src/fallback.html'
]

//limit cache
const limitCacheSize = (name,size)=>{
    caches.open(name).then(cache=>{
        cache.keys().then(keys=>{
            if(keys.length>size){
                cache.delete(keys[7]).then(limitCacheSize(name,size));
            }
        })
    })
};

self.addEventListener("install",evt=>{
    // console.log("service worker installed");
evt.waitUntil(
    caches.open(staticCacheName).then(cache =>{
    //console.log('cashing shell assets');
        cache.addAll(assets);
})
);

});
self.addEventListener('activate',evt=>{
    // console.log("service worker activated");
evt.waitUntil(
    caches.keys().then(keys=>{
        return Promise.all(keys
            .filter(key=>key !==staticCacheName)
            .map(key=>caches.delete(key))
            )
    })
);

});
self.addEventListener('fetch',evt=>{
    if (evt.request.url.indexOf("/api/")===-1) {

        
  evt.respondWith(
      caches.match(evt.request).then(cachRes=>{
          return cachRes || fetch(evt.request);
          
      }).catch(()=>{
          if (evt.request.url.indexOf('.html')) {
             return caches.match('/src/fallback.html'); 
          }
      })
  );
  evt.waitUntil(update(evt.request).then(refresh));
 }
});

//update
// self.addEventListener('update', evt=>{
//   return  fetch(request.url).then(
//         response=>
//         cache(request,response)
//         .then(()=>response)
//     )
// })
function update(request) {
    return fetch(request.url).then(
      response =>
       caches.open(dynamic).then(dynamicache=>{
           dynamicache.put(request,response)
        //    limitCacheSize(dynamic,10);
        }).then(()=>
       response
       )
    //   caches.open
    //     Cache.put(request, response) // we can put response in cache
        //   .then(() => response) // resolve promise with the Response object
    );
  }
  //refresh
  function refresh(response) {
      var res=response.json();
    return res // read and parse JSON response
      .then(jsonResponse => {
        self.clients.matchAll().then(clients => {
          clients.forEach(client => {
            // report and send new data to client
            client.postMessage(
              JSON.stringify({
                type: response.url,
                data: jsonResponse.data
              })
            );
          });
        });
        return jsonResponse.data; // resolve promise with new data
      });
  }