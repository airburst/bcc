if(!self.define){let e,s={};const a=(a,i)=>(a=new URL(a+".js",i).href,s[a]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=a,e.onload=s,document.head.appendChild(e)}else e=a,importScripts(a),s()})).then((()=>{let e=s[a];if(!e)throw new Error(`Module ${a} didn’t register its module`);return e})));self.define=(i,c)=>{const n=e||("document"in self?document.currentScript.src:"")||location.href;if(s[n])return;let t={};const r=e=>a(e,n),d={module:{uri:n},exports:t,require:r};s[n]=Promise.all(i.map((e=>d[e]||r(e)))).then((e=>(c(...e),t)))}}define(["./workbox-588899ac"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/chunks/330-899855e11bd24677.js",revision:"899855e11bd24677"},{url:"/_next/static/chunks/877-acca2630c68a97ed.js",revision:"acca2630c68a97ed"},{url:"/_next/static/chunks/framework-7751730b10fa0f74.js",revision:"7751730b10fa0f74"},{url:"/_next/static/chunks/main-d7bc67dc844d8c96.js",revision:"d7bc67dc844d8c96"},{url:"/_next/static/chunks/pages/_app-2dac3d2710e4ea91.js",revision:"2dac3d2710e4ea91"},{url:"/_next/static/chunks/pages/_error-e4f561a102d9bb14.js",revision:"e4f561a102d9bb14"},{url:"/_next/static/chunks/pages/embed-e920158c6f454180.js",revision:"e920158c6f454180"},{url:"/_next/static/chunks/pages/embed/%5Bid%5D-1fd6171236fa7443.js",revision:"1fd6171236fa7443"},{url:"/_next/static/chunks/pages/index-c229fbe18a07ec31.js",revision:"c229fbe18a07ec31"},{url:"/_next/static/chunks/pages/privacy-d795ed746a9ece15.js",revision:"d795ed746a9ece15"},{url:"/_next/static/chunks/pages/profile-0901faffe1fe16dc.js",revision:"0901faffe1fe16dc"},{url:"/_next/static/chunks/pages/ride/%5Bid%5D/%5Bdate%5D-eac9e7a894086f3a.js",revision:"eac9e7a894086f3a"},{url:"/_next/static/chunks/pages/ride/%5Bid%5D/copy-4bcdf069726179f1.js",revision:"4bcdf069726179f1"},{url:"/_next/static/chunks/pages/ride/%5Bid%5D/edit-7faaef756c964804.js",revision:"7faaef756c964804"},{url:"/_next/static/chunks/pages/ride/%5Bid%5D/join-27af49e8ac7fd414.js",revision:"27af49e8ac7fd414"},{url:"/_next/static/chunks/pages/ride/new-c9fc329fca129b6e.js",revision:"c9fc329fca129b6e"},{url:"/_next/static/chunks/pages/ride/planner-06e4f53d879ae6f4.js",revision:"06e4f53d879ae6f4"},{url:"/_next/static/chunks/pages/ride/planner/%5Bdate%5D-a52803093447eea0.js",revision:"a52803093447eea0"},{url:"/_next/static/chunks/polyfills-c67a75d1b6f99dc8.js",revision:"837c0df77fd5009c9e46d446188ecfd0"},{url:"/_next/static/chunks/webpack-59c5c889f52620d6.js",revision:"59c5c889f52620d6"},{url:"/_next/static/css/1b1cf59279a9b628.css",revision:"1b1cf59279a9b628"},{url:"/_next/static/css/d8560a4446c8bfbf.css",revision:"d8560a4446c8bfbf"},{url:"/_next/static/fmjB43S6F7GFx4ItO8JD0/_buildManifest.js",revision:"c5eabb49a18ba692e3f0d0df27e6964b"},{url:"/_next/static/fmjB43S6F7GFx4ItO8JD0/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/media/bath-cc-logo.ea54e894.svg",revision:"f005c559f8be2880650ac3a7f6c92238"},{url:"/favicon.ico",revision:"57e5c058e690b067a43059270996a4d2"},{url:"/static/android-chrome-192x192.png",revision:"ba1b504178e5bb81ae2081b7242c8994"},{url:"/static/android-chrome-512x512.png",revision:"68a2d17448ea22461895650742e037e3"},{url:"/static/apple-touch-icon.png",revision:"c5579009855712551c01dbe5489c7c48"},{url:"/static/browserconfig.xml",revision:"61bfd064535af0c276bb63b3fd579733"},{url:"/static/favicon-16x16.png",revision:"6b5e723368a7b0ab5c3b86d1364ffad5"},{url:"/static/favicon-32x32.png",revision:"f4dededcc28b75906de44ed7550cd239"},{url:"/static/favicon.ico",revision:"0fd6ae4bc93c8849b7f79db0424068d1"},{url:"/static/images/bath-cc-logo.svg",revision:"f005c559f8be2880650ac3a7f6c92238"},{url:"/static/images/biking-48.png",revision:"ef361e5a200b4abd4898cfbf85a79c05"},{url:"/static/images/biking-neutral-500-64.png",revision:"6846fe7f1d6c12e4e7b0caa4d0afbc76"},{url:"/static/images/biking-neutral-700-64.png",revision:"ea7a150d39856a4f1dbc4e77758c0dcf"},{url:"/static/images/hamburger-50.png",revision:"d38c1a058612c578febf683b3722d1a6"},{url:"/static/mstile-150x150.png",revision:"acb8ef35a19bda9f2aad1d07a3ee03ae"},{url:"/static/safari-pinned-tab.svg",revision:"b666adaa63ae6b42b632be3b51a2a75c"},{url:"/static/site.webmanifest",revision:"e9876d238a045674d4c7939bfa9d03ff"},{url:"/static/splashscreens/ipad_splash.png",revision:"98841db556477b4a594d8c7912780734"},{url:"/static/splashscreens/ipadpro1_splash.png",revision:"5ee816241c81765c8cc6e9958fb202e6"},{url:"/static/splashscreens/ipadpro2_splash.png",revision:"39c02d34c5aef02d09679aa0b915a172"},{url:"/static/splashscreens/ipadpro3_splash.png",revision:"c93481916b4146c74d1cbd72300ac7db"},{url:"/static/splashscreens/iphone5_splash.png",revision:"bc197372d0e7d218b805efd56c958bba"},{url:"/static/splashscreens/iphone6_splash.png",revision:"ebc2d7451526469d59a452d8534c9df6"},{url:"/static/splashscreens/iphoneplus_splash.png",revision:"4738fcd3095700522bbeb461b4392039"},{url:"/static/splashscreens/iphonex_splash.png",revision:"f4a9a45df6f3887380adcc0db51c3ea6"},{url:"/static/splashscreens/iphonexr_splash.png",revision:"bd87bf9bcbbd733862e987bf8004be29"},{url:"/static/splashscreens/iphonexsmax_splash.png",revision:"d94032291231e3fd074d785374ec4fd3"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:a,state:i})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
