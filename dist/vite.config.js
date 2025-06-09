// vite.config.js
export default {
  root: "src",
  server: {
    port: 3000,
    cors: true,
  },
  build: {
    outDir: "../dist",
  },
  publicDir: "../",
};
