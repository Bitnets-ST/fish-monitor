// Plugin para configurar el título de la página
export default defineNuxtPlugin(() => {
  // Establecer el título global de la aplicación
  useHead({
    title: 'Bitnets Fish Monitor',
    titleTemplate: 'Bitnets Fish Monitor',
    meta: [
      { name: 'description', content: 'Sistema avanzado de monitoreo y conteo de peces BITNETS' }
    ],
    link: [
      // Favicon directo
      { rel: 'icon', type: 'image/png', href: '/images/Logo1.png' },
      { rel: 'apple-touch-icon', href: '/images/Logo1.png' },
      
      // Favicon ICO de respaldo
      { rel: 'icon', type: 'image/x-icon', href: '/icon/bitnets-logo.ico' },
      { rel: 'shortcut icon', type: 'image/x-icon', href: '/icon/bitnets-logo.ico' }
    ]
  })
}) 