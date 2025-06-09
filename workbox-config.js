module.exports = {
  globDirectory: "dist/",
  globPatterns: [
    "**/*.{html,js,css,png,jpg,gif,ico,woff2}"
  ],
  swDest: "dist/sw.js",
  skipWaiting: true,
  clientsClaim: true,
  runtimeCaching: [{
    urlPattern: new RegExp('https://story-api\\.dicoding\\.dev/v1/.*'),
    handler: 'NetworkFirst',
    options: {
      cacheName: 'api-cache',
      expiration: {
        maxEntries: 100,
        maxAgeSeconds: 72 * 60 * 60 // 72 hours
      }
    }
  }]
};