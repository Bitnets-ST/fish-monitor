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
  app: {
    head: {
      title: 'Bitnets Fish Monitor',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Sistema de monitoreo de peces BITNETS' }
      ],
      link: [
        // Favicon directo
        { rel: 'icon', type: 'image/png', href: '/images/Logo1.png' },
        { rel: 'apple-touch-icon', href: '/images/Logo1.png' },
        
        // Favicon ICO de respaldo
        { rel: 'icon', type: 'image/x-icon', href: '/assets/icons/bitnets-logo.ico' },
        { rel: 'shortcut icon', type: 'image/x-icon', href: '/assets/icons/bitnets-logo.ico' }
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
    public: {
      loadingIndicator: {
        name: 'custom',
        color: '#3498db',
        background: 'white'
      }
    }
  }
})
