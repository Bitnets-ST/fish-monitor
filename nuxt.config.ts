// nuxt.config.ts
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: [
    '@nuxt/eslint',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxtjs/tailwindcss'
  ],
  css: [
    '~/assets/css/variables.css'
  ],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {}
    }
  },
  // Plugins personalizados
  plugins: [
    '~/plugins/notifications.js',
    '~/plugins/darkMode.js',
  ],
  app: {
    head: {
      title: 'Bitnets Fish Monitor',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Sistema de monitoreo de peces BITNETS' }
      ],
      link: [
        // Favicon 
        { rel: 'icon', type: 'image/png', href: '/images/Logo1.png' },
        { rel: 'apple-touch-icon', href: '/images/Logo1.png' },
        { rel: 'shortcut icon', type: 'image/png', href: '/images/Logo1.png' }
      ]
    },
    pageTransition: { name: 'page', mode: 'out-in' },
    layoutTransition: { name: 'layout', mode: 'out-in' }
  },
  // Configuraciones para la carga
  experimental: {
    payloadExtraction: false
  },
  runtimeConfig: {
    // Variables privadas de servidor (no expuestas al cliente)
    cosmosEndpoint: process.env.COSMOS_ENDPOINT,
    cosmosKey: process.env.COSMOS_KEY,
    cosmosDatabase: process.env.COSMOS_DATABASE,
    cosmosContainer: process.env.COSMOS_CONTAINER,
    jwtSecret: process.env.JWT_SECRET,
    jwtExpiresIn: process.env.JWT_EXPIRES_IN,
    
    // Variables públicas (accesibles desde el cliente)
    public: {
      loadingIndicator: {
        name: 'custom',
        color: '#3498db',
        background: 'white'
      }
    }
  },
  // Cargar variables de entorno en desarrollo
  nitro: {
    routeRules: {
      '/api/**': { cors: true }
    },
    // Añadir configuración para Azure
    preset: 'azure',
  }
})
