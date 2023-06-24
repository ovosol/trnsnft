import * as dotenv from 'dotenv'

dotenv.config()

const BASE_URL = process.env.BASE_URL

if (!BASE_URL) {
  throw new Error('Please set the BASE_URL environment variable in .env file')
}

export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  build: {
    publicPath: '/_nuxt/'
  },
  ssr: false,
  env: {
    BASE_URL: BASE_URL
  },
  server: {
    host: '0.0.0.0'
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'transneft-nuxt',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, user-scalable=no' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['~layouts/global.css'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/vuex-shared-mutations.js', ssr: false },
    { src: '~/plugins/vuex-cache.js', ssr: false },
    { src: '~/plugins/vidle.js', ssr: false },
    { src: '~/plugins/api.js', ssr: false }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: {
    dirs: [
      '~/components'
    ]
  },

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/proxy'

  ],
  proxy: {
    '/api': {
      target: BASE_URL,
      changeOrigin: true
    },
    '/unity':{
      target: "http://localhost:3090",
      changeOrigin: true,
      pathRewrite: {
        '^/unity': ''
      }
    }
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    proxy: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
    },
    proxyHeaders: true,
    credentials: true
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
  }
}
