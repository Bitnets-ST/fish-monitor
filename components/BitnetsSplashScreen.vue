<template>
  <div class="splash-screen">
    <ParticleEffect canvasClass="effect-canvas" />
    
    <!-- Logo centrado con borde blanco circular y efecto de brillo -->
    <div class="relative z-10">
      <div class="logo-container w-40 h-40 rounded-full bg-white shadow-lg flex items-center justify-center p-1">
        <img src="/images/Logo1.png" alt="FISHMONITOR" class="w-36 h-36 object-contain rounded-full">
      </div>
      <div class="glow"></div>
    </div>
    
    <!-- Texto de carga -->
    <div class="loading-text">Cargando...</div>
    
    <!-- Barra de carga mejorada -->
    <div class="loading-bar">
      <div class="loading-progress"></div>
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
  background-color: rgba(1, 55, 74, 0.97);
}

.effect-canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
}

.logo-container {
  position: relative;
  animation: pulse 2s infinite ease-in-out;
  box-shadow: 0 0 15px rgba(255, 255, 255, 0.8);
}

@keyframes pulse {
  0% {
    transform: scale(1);
    box-shadow: 0 0 15px rgba(255, 255, 255, 0.8);
  }
  50% {
    transform: scale(1.05);
    box-shadow: 0 0 25px rgba(255, 255, 255, 0.9);
  }
  100% {
    transform: scale(1);
    box-shadow: 0 0 15px rgba(255, 255, 255, 0.8);
  }
}

.glow {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 160px;
  height: 160px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(30,144,255,0.4) 40%, rgba(0,0,0,0) 70%);
  z-index: -1;
  opacity: 0.7;
  animation: glowPulse 2s infinite alternate;
}

@keyframes glowPulse {
  0% {
    opacity: 0.4;
    width: 160px;
    height: 160px;
  }
  100% {
    opacity: 0.7;
    width: 200px;
    height: 200px;
  }
}

.loading-text {
  color: white;
  font-size: 1rem;
  margin-top: 1.2rem;
  font-weight: 500;
  letter-spacing: 1px;
  opacity: 0;
  animation: fadeIn 0.5s ease-out 0.5s forwards;
}

.loading-bar {
  position: relative;
  width: 140px;
  height: 3px;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 1.5px;
  overflow: hidden;
  z-index: 2;
  margin-top: 0.8rem;
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
  border-radius: 1.5px;
  animation: loadingBar 1.5s infinite ease;
  box-shadow: 0 0 8px rgba(255, 255, 255, 0.8);
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