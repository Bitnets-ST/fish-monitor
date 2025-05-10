<template>
  <div class="app-container">
    <!-- Pantalla de carga inicial -->
    <BitnetsSplashScreen v-if="isInitialLoading" />
    
    <!-- Contenido de la aplicación una vez cargada -->
    <div v-if="!isInitialLoading" class="app-content">
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
import BitnetsSplashScreen from '~/components/BitnetsSplashScreen.vue'
import MouseEffectBackground from '~/components/MouseEffectBackground.vue'

export default {
  name: 'App',
  components: {
    BitnetsSplashScreen,
    MouseEffectBackground
  },
  data() {
    return {
      isInitialLoading: true
    }
  },
  mounted() {
    // Simular tiempo de carga inicial - solo aparece al cargar la aplicación
    setTimeout(() => {
      this.isInitialLoading = false
      console.log('Carga inicial completada, mostrando páginas')
    }, 2500)
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