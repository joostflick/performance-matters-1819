self.addEventListener('install', event => {
  console.log('Installing ' + event)

  event.waitUntil(
    caches
      .open('core-cache')
      .then(cache =>
        cache.addAll([
          '/offline',
          '/about',
          '/styles/style.css',
          '/Ubuntu/Ubuntu-Regular.woff2'
        ])
      )
      .then(() => self.skipWaiting())
  )
})

const offlineUrl = 'offline'

self.addEventListener('fetch', event => {
  console.log('Activating ' + event)

  if (
    event.request.mode === 'navigate' ||
    (event.request.method === 'GET' &&
      event.request.headers.get('accept').includes('text/html'))
  ) {
    event.respondWith(
      fetch(event.request.url).catch(error => {
        // Return the offline page
        return caches.match(offlineUrl)
      })
    )
  } else {
    // Respond with everything else if we can
    event.respondWith(
      caches.match(event.request).then(function(response) {
        return response || fetch(event.request)
      })
    )
  }
})
