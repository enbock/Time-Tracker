"use strict";var precacheConfig=[["/Time-Tracker/index.html","3dbd010abef17103dbdac7cf6d884bb2"],["/Time-Tracker/static/js/main.346ad37e.js","a782df150519a134d895253e9a9fa4dd"],["Style/Application.css","4e88f7c4d57ea35e84fab9c90f78d1c3"],["Style/Menu/Main.css","56e12ad4a86b8dadd96a8d08ad94fa4c"],["Style/Settings.css","f019c4c09b5fe7ccc069ab7ddca8f346"],["Style/Themes/Codefrog.css","9f17b46d1bd3180686b44ca2158ad4ed"],["Style/Themes/Dark.css","29fdd696caccbe199f68e9c408ed295c"],["Style/Themes/Google.css","8d2b4a0c4e2944b6e30eb175be453fcf"],["Style/google.css","07f56c5e7ecbaadb92de2872bf8082de"],["Style/material-components-web.min.css","1a0cbdede0f23440e66d3a23398fbe4c"],["Template/Application.html.tpl","a4c2ca6d61d699f5055d06e1fe6158d8"],["Template/Menu/Main.html.tpl","394f49595f6498dfcd794fcae4d9adb7"],["Template/Settings.html.tpl","a881ec4dbde3bd509d4983891f31df75"],["favicon-128.png","363a2cf25dc93920c7e0749c106d3619"],["favicon-196x196.png","5dc83246d290118ad1171b231c2ee385"],["favicon-196x196.webp","e6be13eb9e555a45b6e8eb43228fd0ed"],["favicon-512x512.png","63829a87d9a4b4ef9aa5c428dfe0ecf0"],["favicon-512x512.webp","10fb6f0869ac9afaa05bbcfcb15b8b50"],["favicon.ico","50681116745f1117478e43b56e2e755f"],["font/2fcrYFNaTjcS6g4U3t-Y5ZjZjT5FdEJ140U2DJYC3mY.woff2","78a1f8748dc202eda5424c1603d28bfc"],["font/CWB0XYA8bzo0kSThX0UTuA.woff2","a2647ffe169bbbd94a3238020354c732"],["font/RxZJdnzeo3R5zSexge8UUVtXRa8TVwTICgirnJhmVJw.woff2","4b218fc7ca179e548471ff37e3060081"],["lib/babel.min.js","1e94b101e37980af103a7a217877145e"],["lib/material-components-web.min.js","923707fae7783401d2b151b6df6566c1"]],cacheName="sw-precache-v3-sw-precache-webpack-plugin-"+(self.registration?self.registration.scope:""),ignoreUrlParametersMatching=[/^utm_/],addDirectoryIndex=function(e,t){var n=new URL(e);return"/"===n.pathname.slice(-1)&&(n.pathname+=t),n.toString()},cleanResponse=function(e){return e.redirected?("body"in e?Promise.resolve(e.body):e.blob()).then(function(t){return new Response(t,{headers:e.headers,status:e.status,statusText:e.statusText})}):Promise.resolve(e)},createCacheKey=function(e,t,n,a){var r=new URL(e);return a&&r.pathname.match(a)||(r.search+=(r.search?"&":"")+encodeURIComponent(t)+"="+encodeURIComponent(n)),r.toString()},isPathWhitelisted=function(e,t){if(0===e.length)return!0;var n=new URL(t).pathname;return e.some(function(e){return n.match(e)})},stripIgnoredUrlParameters=function(e,t){var n=new URL(e);return n.hash="",n.search=n.search.slice(1).split("&").map(function(e){return e.split("=")}).filter(function(e){return t.every(function(t){return!t.test(e[0])})}).map(function(e){return e.join("=")}).join("&"),n.toString()},hashParamName="_sw-precache",urlsToCacheKeys=new Map(precacheConfig.map(function(e){var t=e[0],n=e[1],a=new URL(t,self.location),r=createCacheKey(a,hashParamName,n,/\.\w{8}\./);return[a.toString(),r]}));function setOfCachedUrls(e){return e.keys().then(function(e){return e.map(function(e){return e.url})}).then(function(e){return new Set(e)})}self.addEventListener("install",function(e){e.waitUntil(caches.open(cacheName).then(function(e){return setOfCachedUrls(e).then(function(t){return Promise.all(Array.from(urlsToCacheKeys.values()).map(function(n){if(!t.has(n)){var a=new Request(n,{credentials:"same-origin"});return fetch(a).then(function(t){if(!t.ok)throw new Error("Request for "+n+" returned a response with status "+t.status);return cleanResponse(t).then(function(t){return e.put(n,t)})})}}))})}).then(function(){return self.skipWaiting()}))}),self.addEventListener("activate",function(e){var t=new Set(urlsToCacheKeys.values());e.waitUntil(caches.open(cacheName).then(function(e){return e.keys().then(function(n){return Promise.all(n.map(function(n){if(!t.has(n.url))return e.delete(n)}))})}).then(function(){return self.clients.claim()}))}),self.addEventListener("fetch",function(e){if("GET"===e.request.method){var t,n=stripIgnoredUrlParameters(e.request.url,ignoreUrlParametersMatching),a="index.html";(t=urlsToCacheKeys.has(n))||(n=addDirectoryIndex(n,a),t=urlsToCacheKeys.has(n));var r="/Time-Tracker/index.html";!t&&"navigate"===e.request.mode&&isPathWhitelisted(["^(?!\\/__).*"],e.request.url)&&(n=new URL(r,self.location).toString(),t=urlsToCacheKeys.has(n)),t&&e.respondWith(caches.open(cacheName).then(function(e){return e.match(urlsToCacheKeys.get(n)).then(function(e){if(e)return e;throw Error("The cached response that was expected is missing.")})}).catch(function(t){return console.warn('Couldn\'t serve response for "%s" from cache: %O',e.request.url,t),fetch(e.request)}))}});