const CACHE_VERSION = 1;

const BASE_CACHE_FILES = [
  "/css/custom.css",
  "/css/style-dark.css",
  "/css/style-light.css",
  "/css/style.css",
  "/css/syntax-monokai.css",
  "/css/syntax-monokailight.css",
  "/css/syntax.css",
  "/images/favicomatic/apple-touch-icon-57x57.png",
  "/images/favicomatic/apple-touch-icon-60x60.png",
  "/images/favicomatic/apple-touch-icon-72x72.png",
  "/images/favicomatic/apple-touch-icon-76x76.png",
  "/images/favicomatic/apple-touch-icon-114x114.png",
  "/images/favicomatic/apple-touch-icon-120x120.png",
  "/images/favicomatic/apple-touch-icon-144x144.png",
  "/images/favicomatic/apple-touch-icon-152x152.png",
  "/images/favicomatic/code.txt",
  "/images/favicomatic/favicon-16x16.png",
  "/images/favicomatic/favicon-32x32.png",
  "/images/favicomatic/favicon-96x96.png",
  "/images/favicomatic/favicon-128.png",
  "/images/favicomatic/favicon-196x196.png",
  "/images/favicomatic/favicon.ico",
  "/images/favicomatic/mstile-70x70.png",
  "/images/favicomatic/mstile-144x144.png",
  "/images/favicomatic/mstile-150x150.png",
  "/images/favicomatic/mstile-310x150.png",
  "/images/favicomatic/mstile-310x310.png",
  "/images/favicomatic/splash.png",
  "/images/9748pepslogo.ico",
  "/images/logo.png",
  "/js/custom.js",
  "/js/fontawesome.js",
  "/js/script.js",
  "/manifest.json",
];

const OFFLINE_CACHE_FILES = [
  "/css/custom.css",
  "/css/style-dark.css",
  "/css/style-light.css",
  "/css/style.css",
  "/css/syntax-monokai.css",
  "/css/syntax-monokailight.css",
  "/css/syntax.css",
  "/images/favicomatic/apple-touch-icon-57x57.png",
  "/images/favicomatic/apple-touch-icon-60x60.png",
  "/images/favicomatic/apple-touch-icon-72x72.png",
  "/images/favicomatic/apple-touch-icon-76x76.png",
  "/images/favicomatic/apple-touch-icon-114x114.png",
  "/images/favicomatic/apple-touch-icon-120x120.png",
  "/images/favicomatic/apple-touch-icon-144x144.png",
  "/images/favicomatic/apple-touch-icon-152x152.png",
  "/images/favicomatic/code.txt",
  "/images/favicomatic/favicon-16x16.png",
  "/images/favicomatic/favicon-32x32.png",
  "/images/favicomatic/favicon-96x96.png",
  "/images/favicomatic/favicon-128.png",
  "/images/favicomatic/favicon-196x196.png",
  "/images/favicomatic/favicon.ico",
  "/images/favicomatic/mstile-70x70.png",
  "/images/favicomatic/mstile-144x144.png",
  "/images/favicomatic/mstile-150x150.png",
  "/images/favicomatic/mstile-310x150.png",
  "/images/favicomatic/mstile-310x310.png",
  "/images/favicomatic/splash.png",
  "/images/9748pepslogo.ico",
  "/images/logo.png",
  "/js/custom.js",
  "/js/fontawesome.js",
  "/js/script.js",
  "/manifest.json",
];

const NOT_FOUND_CACHE_FILES = [
  "/css/custom.css",
  "/css/style-dark.css",
  "/css/style-light.css",
  "/css/style.css",
  "/css/syntax-monokai.css",
  "/css/syntax-monokailight.css",
  "/css/syntax.css",
  "/images/favicomatic/apple-touch-icon-57x57.png",
  "/images/favicomatic/apple-touch-icon-60x60.png",
  "/images/favicomatic/apple-touch-icon-72x72.png",
  "/images/favicomatic/apple-touch-icon-76x76.png",
  "/images/favicomatic/apple-touch-icon-114x114.png",
  "/images/favicomatic/apple-touch-icon-120x120.png",
  "/images/favicomatic/apple-touch-icon-144x144.png",
  "/images/favicomatic/apple-touch-icon-152x152.png",
  "/images/favicomatic/code.txt",
  "/images/favicomatic/favicon-16x16.png",
  "/images/favicomatic/favicon-32x32.png",
  "/images/favicomatic/favicon-96x96.png",
  "/images/favicomatic/favicon-128.png",
  "/images/favicomatic/favicon-196x196.png",
  "/images/favicomatic/favicon.ico",
  "/images/favicomatic/mstile-70x70.png",
  "/images/favicomatic/mstile-144x144.png",
  "/images/favicomatic/mstile-150x150.png",
  "/images/favicomatic/mstile-310x150.png",
  "/images/favicomatic/mstile-310x310.png",
  "/images/favicomatic/splash.png",
  "/images/9748pepslogo.ico",
  "/images/logo.png",
  "/js/custom.js",
  "/js/fontawesome.js",
  "/js/script.js",
  "/manifest.json",
];

const OFFLINE_PAGE = "/offline/index.html";
const NOT_FOUND_PAGE = "/404.html";

const CACHE_VERSIONS = {
  assets: "assets-v" + CACHE_VERSION,
  content: "content-v" + CACHE_VERSION,
  offline: "offline-v" + CACHE_VERSION,
  notFound: "404-v" + CACHE_VERSION,
};
const MAX_TTL = {
  // Define MAX_TTL's in SECONDS for specific file extensions
  "/": 3600,
  html: 3600,
  json: 86400,
  js: 86400,
  css: 86400,
};
const CACHE_BLACKLIST = [
  //(str) => {
  //    return !str.startsWith('http://localhost') && !str.startsWith('https://gohugohq.com');
  //},
];
const SUPPORTED_METHODS = ["GET"];

/**
 * isBlackListed
 * @param {string} url
 * @returns {boolean}
 */
function isBlacklisted(url) {
  return CACHE_BLACKLIST.length > 0
    ? !CACHE_BLACKLIST.filter(rule => {
      if (typeof rule === "function") {
        return !rule(url);
      } else {
        return false;
      }
    }).length
    : false;
}
/**
 * getFileExtension
 * @param {string} url
 * @returns {string}
 */
function getFileExtension(url) {
  let extension = url.split(".").reverse()[0].split("?")[0];
  return extension.endsWith("/") ? "/" : extension;
}
/**
 * getTTL
 * @param {string} url
 */
function getTTL(url) {
  if (typeof url === "string") {
    let extension = getFileExtension(url);
    if (typeof MAX_TTL[extension] === "number") {
      return MAX_TTL[extension];
    } else {
      return null;
    }
  } else {
    return null;
  }
}
/**
 * installServiceWorker
 * @returns {Promise}
 */
function installServiceWorker() {
  return Promise.all([
    caches.open(CACHE_VERSIONS.assets).then(cache => {
      return cache.addAll(BASE_CACHE_FILES);
    }),
    caches.open(CACHE_VERSIONS.offline).then(cache => {
      return cache.addAll(OFFLINE_CACHE_FILES);
    }),
    caches.open(CACHE_VERSIONS.notFound).then(cache => {
      return cache.addAll(NOT_FOUND_CACHE_FILES);
    }),
  ]).then(() => {
    return self.skipWaiting();
  });
}
/**
 * cleanupLegacyCache
 * @returns {Promise}
 */
function cleanupLegacyCache() {

  let currentCaches = Object.keys(CACHE_VERSIONS).map(key => {
    return CACHE_VERSIONS[key];
  });

  return new Promise((resolve, reject) => {
    caches
      .keys()
      .then(keys => {
        return (legacyKeys = keys.filter(key => {
          return !~currentCaches.indexOf(key);
        }));
      })
      .then(legacy => {
        if (legacy.length) {
          Promise.all(
            legacy.map(legacyKey => {
              return caches.delete(legacyKey);
            })
          )
            .then(() => {
              resolve();
            })
            .catch(err => {
              reject(err);
            });
        } else {
          resolve();
        }
      })
      .catch(() => {
        reject();
      });
  });
}
function precacheUrl(url) {
  if (!isBlacklisted(url)) {
    caches.open(CACHE_VERSIONS.content).then(cache => {
      cache
        .match(url)
        .then(response => {
          if (!response) {
            return fetch(url);
          } else {
            // already in cache, nothing to do.
            return null;
          }
        })
        .then(response => {
          if (response) {
            return cache.put(url, response.clone());
          } else {
            return null;
          }
        });
    });
  }
}

self.addEventListener("install", event => {
  event.waitUntil(Promise.all([installServiceWorker(), self.skipWaiting()]));
});
self.addEventListener("activate", event => {
  // The activate handler takes care of cleaning up old caches.
  event.waitUntil(
    Promise.all([
      cleanupLegacyCache(),
      self.clients.claim(),
      self.skipWaiting(),
    ]).catch(err => {
      event.skipWaiting();
    })
  );
});
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.open(CACHE_VERSIONS.content).then(cache => {
      return cache
        .match(event.request)
        .then(response => {
          if (response) {
            let headers = response.headers.entries();
            let date = null;

            for (let pair of headers) {
              if (pair[0] === "date") {
                date = new Date(pair[1]);
              }
            }

            if (date) {
              let age = parseInt(
                (new Date().getTime() - date.getTime()) / 1000
              );
              let ttl = getTTL(event.request.url);

              if (ttl && age > ttl) {
                return new Promise(resolve => {
                  return fetch(event.request.clone())
                    .then(updatedResponse => {
                      if (updatedResponse) {
                        cache.put(event.request, updatedResponse.clone());
                        resolve(updatedResponse);
                      } else {
                        resolve(response);
                      }
                    })
                    .catch(() => {
                      resolve(response);
                    });
                }).catch(err => {
                  return response;
                });
              } else {
                return response;
              }
            } else {
              return response;
            }
          } else {
            return null;
          }
        })
        .then(response => {
          if (response) {
            return response;
          } else {
            return fetch(event.request.clone())
              .then(response => {
                if (response.status < 400) {
                  if (
                    ~SUPPORTED_METHODS.indexOf(event.request.method) &&
                    !isBlacklisted(event.request.url)
                  ) {
                    if (event.request.url.startsWith('http'))
                      cache.put(event.request, response.clone());
                  }
                  return response;
                } else {
                  return caches.open(CACHE_VERSIONS.notFound).then(cache => {
                    return cache.match(NOT_FOUND_PAGE);
                  });
                }
              })
              .then(response => {
                if (response) {
                  return response;
                }
              })
              .catch(() => {
                return caches
                  .open(CACHE_VERSIONS.offline)
                  .then(offlineCache => {
                    return offlineCache.match(OFFLINE_PAGE);
                  });
              });
          }
        })
        .catch(error => {
          console.error("  Error in fetch handler:", error);
          throw error;
        });
    })
  );
});
self.addEventListener("message", event => {
  if (typeof event.data === "object" && typeof event.data.action === "string") {
    switch (event.data.action) {
      case "cache":
        precacheUrl(event.data.url);
        break;
      default:
        console.log("Unknown action: " + event.data.action);
        break;
    }
  }
});
