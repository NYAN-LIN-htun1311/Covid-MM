const { GenerateSW } = require("workbox-webpack-plugin");

module.exports = {
  publicPath: process.env.NODE_ENV === "development" ? "/covidmm-dashboard/" : "",
  pwa: {
    workboxOptions: {
      skipWaiting: true
    }
  },
  configureWebpack: {
    plugins: [new GenerateSW()]
  },
  devServer: {
    disableHostCheck: true,
  },

  transpileDependencies: ['vuetify'],

  pluginOptions: {
    i18n: {
      locale: 'en',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableInSFC: false,
    },
  },

  chainWebpack: config => {
    if (config.plugins.store.get('prefetch')) {
      config
        .plugin('prefetch')
        .tap(args => {
          args[0].fileBlacklist = [
            /\.map$/,
            /pdfmake\.[^.]+\.js$/,
            /xlsx\.[^.]+\.js$/,
            /fabric[^.]*\.[^.]+\.js$/,
            /responsivedefaults\.[^.]+\.js$/
          ]
          return args
        })
    }
  }
}
