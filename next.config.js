// next.config.js
const localeSubpaths = {}

module.exports = {
  experimental: {
    async rewrites() {
      return [
        {
          source: '/:page/:queryPath*',
          destination: '/:page',
        }
      ]
    }
  },
  publicRuntimeConfig: {
    localeSubpaths,
  },
}
