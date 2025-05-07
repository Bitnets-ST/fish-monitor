<template>
  <div class="splash-screen">
    <ParticleEffect canvas-class="effect-canvas" />
    
    <!-- Logo centrado con borde blanco circular -->
    <div class="relative z-10">
      <div class="w-40 h-40 rounded-full bg-white shadow-lg flex items-center justify-center p-1">
        <img src="/images/Logo1.png" alt="FISHMONITOR" class="w-36 h-36 object-contain rounded-full">
      </div>
    </div>
    
    <!-- Barra de carga -->
    <div class="loading-bar">
      <div class="loading-progress"/>
    </div>
  </div>
</template>

<script>
import ParticleEffect from '~/components/ParticleEffect.vue'

export default {
  name: 'BitnetsSplashScreen',
  components: {
    ParticleEffect
  }
}
</script>

<style scoped>
.splash-screen {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.effect-canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
}

.loading-bar {
  position: relative;
  width: 120px;
  height: 2px;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 1px;
  overflow: hidden;
  z-index: 2;
  margin-top: 1.5rem;
  animation: fadeIn 0.5s ease-out 0.8s forwards;
  opacity: 0;
}

@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

.loading-progress {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 30%;
  background-color: #ffffff;
  border-radius: 1px;
  animation: loadingBar 2s infinite ease;
}

@keyframes loadingBar {
  0% {
    left: -30%;
    width: 30%;
  }
  50% {
    width: 30%;
  }
  100% {
    left: 100%;
    width: 30%;
  }
}
</style> 