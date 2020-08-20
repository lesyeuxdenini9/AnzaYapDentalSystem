module.exports = {
  devServer: {
    port: process.env.DEV_SERVER_PORT
  },
  productionSourceMap: process.env.NODE_ENV != 'production'
}