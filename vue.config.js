module.exports = {
  devServer: {
    port: 8088,
    proxy: {
      '/': {
        ws: true,
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
    },
  },
}
