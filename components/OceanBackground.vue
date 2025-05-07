<template>
  <div class="ocean-background">
    <!-- Coral izquierdo inferior -->
    <div class="coral-left">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 120" class="coral">
        <path
d="M10,120 C15,100 5,90 15,80 C25,70 20,60 10,50 C0,40 5,30 15,20 C25,10 20,0 30,0" 
              stroke="currentColor" stroke-width="2" fill="none" class="coral-path" />
        <path
d="M20,120 C25,100 15,90 25,80 C35,70 30,60 20,50 C10,40 15,30 25,20 C35,10 30,0 40,0" 
              stroke="currentColor" stroke-width="2" fill="none" class="coral-path" />
        <path
d="M30,120 C35,100 25,90 35,80 C45,70 40,60 30,50 C20,40 25,30 35,20 C45,10 40,0 50,0" 
              stroke="currentColor" stroke-width="2" fill="none" class="coral-path" />
      </svg>
    </div>
    
    <!-- Medusa superior derecha -->
    <div class="jellyfish jellyfish-top-right">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 150" class="jellyfish-svg">
        <ellipse cx="50" cy="30" rx="35" ry="25" fill="currentColor" class="jellyfish-body" />
        <path d="M15,30 C15,70 15,110 25,150" stroke="currentColor" stroke-width="2" fill="none" class="jellyfish-tentacle" />
        <path d="M30,30 C30,70 30,110 20,150" stroke="currentColor" stroke-width="2" fill="none" class="jellyfish-tentacle" />
        <path d="M50,30 C50,70 50,110 50,150" stroke="currentColor" stroke-width="2" fill="none" class="jellyfish-tentacle" />
        <path d="M70,30 C70,70 70,110 80,150" stroke="currentColor" stroke-width="2" fill="none" class="jellyfish-tentacle" />
        <path d="M85,30 C85,70 85,110 75,150" stroke="currentColor" stroke-width="2" fill="none" class="jellyfish-tentacle" />
      </svg>
    </div>
    
    <!-- Medusa inferior derecha -->
    <div class="jellyfish jellyfish-bottom-right">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 150" class="jellyfish-svg">
        <ellipse cx="50" cy="30" rx="35" ry="25" fill="currentColor" class="jellyfish-body" />
        <path d="M15,30 C15,70 15,110 25,150" stroke="currentColor" stroke-width="2" fill="none" class="jellyfish-tentacle" />
        <path d="M30,30 C30,70 30,110 20,150" stroke="currentColor" stroke-width="2" fill="none" class="jellyfish-tentacle" />
        <path d="M50,30 C50,70 50,110 50,150" stroke="currentColor" stroke-width="2" fill="none" class="jellyfish-tentacle" />
        <path d="M70,30 C70,70 70,110 80,150" stroke="currentColor" stroke-width="2" fill="none" class="jellyfish-tentacle" />
        <path d="M85,30 C85,70 85,110 75,150" stroke="currentColor" stroke-width="2" fill="none" class="jellyfish-tentacle" />
      </svg>
    </div>
    
    <!-- Radar de fondo -->
    <div class="radar">
      <div class="radar-circle"/>
      <div class="radar-circle"/>
      <div class="radar-circle"/>
      <div class="radar-line"/>
    </div>
    
    <!-- Contenido -->
    <slot/>
  </div>
</template>

<script>
export default {
  name: 'OceanBackground'
}
</script>

<style scoped>
.ocean-background {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: linear-gradient(to bottom, #062c43, #05192a);
  z-index: 0;
}

/* Coral */
.coral-left {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 200px;
  height: 300px;
  opacity: 0.3;
  color: #0099cc;
}

.coral-path {
  animation: sway 8s ease-in-out infinite;
}

@keyframes sway {
  0%, 100% {
    transform: translateX(-5px) rotateZ(-2deg);
  }
  50% {
    transform: translateX(5px) rotateZ(2deg);
  }
}

/* Jellyfish */
.jellyfish {
  position: absolute;
  width: 120px;
  height: 180px;
  color: #39c8c6;
  opacity: 0.6;
}

.jellyfish-top-right {
  top: 10%;
  right: 10%;
  animation: float 12s ease-in-out infinite;
}

.jellyfish-bottom-right {
  bottom: 30%;
  right: 5%;
  animation: float 14s ease-in-out infinite;
  transform: scale(0.7);
}

.jellyfish-body {
  opacity: 0.4;
}

.jellyfish-tentacle {
  animation: tentacle 8s ease-in-out infinite;
}

@keyframes float {
  0%, 100% {
    transform: translateY(-10px);
  }
  50% {
    transform: translateY(10px);
  }
}

@keyframes tentacle {
  0%, 100% {
    transform-origin: top;
    transform: scaleY(0.95);
  }
  50% {
    transform-origin: top;
    transform: scaleY(1.05);
  }
}

/* Radar */
.radar {
  position: absolute;
  top: 100px;
  right: 100px;
  width: 100px;
  height: 100px;
  opacity: 0.3;
}

.radar-circle {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 1px solid #39c8c6;
  border-radius: 50%;
}

.radar-circle:nth-child(1) {
  width: 30px;
  height: 30px;
}

.radar-circle:nth-child(2) {
  width: 60px;
  height: 60px;
}

.radar-circle:nth-child(3) {
  width: 90px;
  height: 90px;
}

.radar-line {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 45px;
  height: 2px;
  background: #39c8c6;
  transform-origin: 0 0;
  animation: radar-sweep 4s linear infinite;
}

@keyframes radar-sweep {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style> 