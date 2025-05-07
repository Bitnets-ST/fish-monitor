<template>
  <canvas ref="canvas" class="fixed top-0 left-0 w-full h-full z-[-1]" />
</template>

<script setup>
import { onMounted, onBeforeUnmount, ref } from 'vue'

const canvas = ref(null)
let ctx
let particles = []
let animationFrameId

class Particle {
  constructor(width, height) {
    this.x = Math.random() * width
    this.y = Math.random() * height
    this.radius = Math.random() * 2 + 1
    this.speedY = Math.random() * 0.5 + 0.2
    this.alpha = Math.random() * 0.5 + 0.2
  }

  update(height) {
    this.y += this.speedY
    if (this.y > height) {
      this.y = 0
      this.x = Math.random() * canvas.value.width
    }
  }

  draw(ctx) {
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
    ctx.fillStyle = `rgba(255, 255, 255, ${this.alpha})`
    ctx.fill()
  }
}

function initParticles(width, height, count = 40) {
  particles = []
  for (let i = 0; i < count; i++) {
    particles.push(new Particle(width, height))
  }
}

function animate() {
  if (!canvas.value) return
  
  ctx.clearRect(0, 0, canvas.value.width, canvas.value.height)
  ctx.fillStyle = 'rgba(1, 25, 54, 0.8)'
  ctx.fillRect(0, 0, canvas.value.width, canvas.value.height)
  
  // Dibujar partículas que simulan burbujas de agua
  particles.forEach(particle => {
    particle.update(canvas.value.height)
    particle.draw(ctx)
  })
  
  animationFrameId = requestAnimationFrame(animate)
}

onMounted(() => {
  canvas.value.width = window.innerWidth
  canvas.value.height = window.innerHeight
  ctx = canvas.value.getContext('2d')
  
  initParticles(canvas.value.width, canvas.value.height)
  animate()
  
  window.addEventListener('resize', handleResize)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize)
  cancelAnimationFrame(animationFrameId)
})

function handleResize() {
  canvas.value.width = window.innerWidth
  canvas.value.height = window.innerHeight
  initParticles(canvas.value.width, canvas.value.height)
}
</script>

<style scoped>
canvas {
  pointer-events: none;
  background: #01374a;
}
</style> 