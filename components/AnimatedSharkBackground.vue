<template>
  <canvas ref="canvas" class="fixed top-0 left-0 w-full h-full z-[-1]"/>
</template>

<script setup>
import { onMounted, onBeforeUnmount, ref } from 'vue'

const canvas = ref(null)
let ctx
let sharks = []
let particles = []
let animationFrameId
const sharkImage = new Image()
sharkImage.src = 'https://cdn-icons-png.flaticon.com/512/1878/1878898.png'
sharkImage.onerror = () => {
  console.error('No se pudo cargar la imagen del tiburón')
}

class Shark {
  constructor(width, height) {
    this.x = Math.random() * width
    this.y = Math.random() * height
    this.size = 100 + Math.random() * 50
    this.speed = 1 + Math.random() * 1.5
    this.direction = Math.random() < 0.5 ? 1 : -1
  }

  update(width) {
    this.x += this.speed * this.direction
    if (this.x > width + this.size) this.x = -this.size
    if (this.x < -this.size) this.x = width + this.size
  }

  draw(ctx) {
    ctx.save()
    ctx.translate(this.x, this.y)
    ctx.scale(this.direction, 1)
    ctx.drawImage(sharkImage, -this.size / 2, -this.size / 2, this.size, this.size)
    ctx.restore()
  }
}

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

function initSharks(width, height, count = 5) {
  sharks = []
  for (let i = 0; i < count; i++) {
    sharks.push(new Shark(width, height))
  }
}

function initParticles(width, height, count = 100) {
  particles = []
  for (let i = 0; i < count; i++) {
    particles.push(new Particle(width, height))
  }
}

function animate(width, height) {
  ctx.clearRect(0, 0, width, height)

  particles.forEach(p => {
    p.update(height)
    p.draw(ctx)
  })

  sharks.forEach(shark => {
    shark.update(width)
    shark.draw(ctx)
  })

  animationFrameId = requestAnimationFrame(() => animate(width, height))
}

onMounted(() => {
  const c = canvas.value
  ctx = c.getContext('2d')

  function resize() {
    c.width = window.innerWidth
    c.height = window.innerHeight
    initSharks(c.width, c.height)
    initParticles(c.width, c.height)
  }

  window.addEventListener('resize', resize)
  resize()

  sharkImage.onload = () => animate(c.width, c.height)
})

onBeforeUnmount(() => {
  cancelAnimationFrame(animationFrameId)
  window.removeEventListener('resize', () => {})
})
</script>

<style scoped>
canvas {
  pointer-events: none;
  background: #01374a;
}
</style> 