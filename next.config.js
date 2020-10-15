// next.config.js
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
}
