const CACHE_NAME = 'cache-v1'; 

const URLS = [
    '/',
    '/src/App.tsx',
]; 

this.addEventListener("install", event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then(cache => {
          console.log("Opened cache");
          return cache.addAll(URLS);
        })
        .catch(err => { 
          console.log(err);
          throw err;
        })
    );
}); 

this.addEventListener("activate", event => {
    console.log("activate");
}); 

this.addEventListener('fetch', event => { 
  console.log(event.request.url)
  // event.respondWith(
  //   caches.match(event.request)
  // )
}); 