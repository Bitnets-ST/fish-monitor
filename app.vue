<template>
  <div class="app-container bg-warm-50 dark:bg-dark">
    <!-- Contenido de la aplicación -->
    <div class="app-content">
      <!-- Efecto de partículas que sigue al cursor en toda la aplicación -->
      <MouseEffectBackground />
      
      <!-- Layout y páginas de la aplicación -->
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </div>
  </div>
</template>

<script>
import MouseEffectBackground from '~/components/MouseEffectBackground.vue'

export default {
  name: 'App',
  components: {
    MouseEffectBackground
  }
}
</script>

<style>

/* Ocultar loader de Nuxt (pantalla de carga verde con logo) */
/* Oculta completamente el loader de Nuxt */
#__nuxt-loading,
.nuxt-loading-indicator {
  display: none !important;
  opacity: 0 !important;
  visibility: hidden !important;
}

:root {
  --color-background: #f9f5f0;
}

.dark {
  --color-background: #051215;
}

.app-container {
  width: 100%;
  min-height: 100vh;
  position: relative;
}

.app-content {
  width: 100%;
  min-height: 100vh;
  position: relative;
}
</style> 