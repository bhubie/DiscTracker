/* eslint-disable camelcase */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-console */
/* eslint-disable no-undef */

const dataCacheName = 'dgBagManagerCache';

function getAndCacheRequest(event, cache, response) {
  return fetch(event.request).then((response_1) => {
    cache.put(event.request.url, response_1.clone());
    return response_1;
  }).catch(() => {
    console.log('Error Fetching URL - Returning Cached results');
    return response;
  });
}


self.addEventListener('fetch', (event) => {
  event.respondWith(caches.open(dataCacheName).then(async (cache) => {
    const cachedResponse = await cache.match(event.request.url);
    const discEndpoint = 'https://8gxj6ygocf.execute-api.us-east-1.amazonaws.com/dev/discs';
    const requestURL = event.request.url;
    const weAreRequestingDiscs = requestURL === discEndpoint;

    if (cachedResponse && weAreRequestingDiscs) {
      const responceCacheTime = new Date(cachedResponse.headers.get('date'));
      const timeSinceLastFetched = Date.now() - responceCacheTime.getTime();
      const twentyFoutHours = 24 * 60 * 60 * 1000;

      if (timeSinceLastFetched > twentyFoutHours) {
        console.log('Old response of cached discs.. getting latest');
        return getAndCacheRequest(event, cache, cachedResponse);
      }

      return cachedResponse;
    }

    return getAndCacheRequest(event, cache, cachedResponse);
  }));
});

