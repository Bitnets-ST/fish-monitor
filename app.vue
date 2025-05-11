<template>
  <div class="app-container">
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