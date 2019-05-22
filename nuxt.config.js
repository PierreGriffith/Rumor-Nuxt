module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'nuxt-bulma-boilerplate',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project + Bulma CSS Framework' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],
    script: [

      ]

  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Global CSS
  */
  css: [
    { src: '~/assets/scss/app.scss', lang: 'scss' },
  ],

  /*
  ** plugins
  */
  plugins: ['~/plugins/zondicon',
    '~/plugins/vue-moment',
    '~/plugins/vue-lodash',
    { src: "~/plugins/chart", ssr: false }


  ],
  /*
  ** modules
  */

  modules: [
    '@nuxtjs/moment',
    '@nuxtjs/apollo',
    '@nuxtjs/axios',
  ],

  /*
  ** Axios
  */

  axios: {
    // proxyHeaders: false
  },

  /*
  ** Apollo
  */

  apollo: {
    tokenName: 'yourApolloTokenName', // optional, default: apollo-token
    tokenExpires: 10, // optional, default: 7 (days)
    includeNodeModules: true, // optional, default: false (this includes graphql-tag for node_modules folder)
    authenticationType: 'Basic', // optional, default: 'Bearer'
    // optional
    errorHandler (error) {
      console.log('%cError', 'background: red; color: white; padding: 2px 4px; border-radius: 3px; font-weight: bold;', error.message)
    },
    // required
    clientConfigs: {
      default: {
        httpEndpoint: 'http://localhost:4000',
      },
    }
  },

  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}

