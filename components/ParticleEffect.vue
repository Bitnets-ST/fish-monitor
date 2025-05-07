<template>
  <canvas ref="canvas" :class="['effect-canvas', canvasClass]" />
</template>

<script>
export default {
  name: 'ParticleEffect',
  props: {
    canvasClass: {
      type: String,
      default: 'fixed top-0 left-0 w-full h-full z-[-1]'
    }
  },
  data() {
    return {
      ctx: null,
      canvas: null,
      particles: [],
      mouseX: 0,
      mouseY: 0,
      width: 0,
      height: 0,
      animationFrameId: null,
      backgroundColor: '#01374a' // Valor por defecto
    }
  },
  mounted() {
    this.canvas = this.$refs.canvas;
    this.ctx = this.canvas.getContext('2d');
    
    // Usar color de fondo predeterminado en lugar de buscar una variable CSS
    // que podría no existir
    this.backgroundColor = '#01374a';
    
    // Set canvas dimensions
    this.resize();
    
    // Event listeners
    window.addEventListener('resize', this.resize);
    window.addEventListener('mousemove', this.handleMouseMove);
    
    // Initialize particles
    this.initParticles();
    
    // Start animation
    this.animate();
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.resize);
    window.removeEventListener('mousemove', this.handleMouseMove);
    cancelAnimationFrame(this.animationFrameId);
  },
  methods: {
    resize() {
      this.width = window.innerWidth;
      this.height = window.innerHeight;
      this.canvas.width = this.width;
      this.canvas.height = this.height;
      
      // Reinitialize particles when resizing
      this.initParticles();
    },
    
    handleMouseMove(e) {
      this.mouseX = e.clientX;
      this.mouseY = e.clientY;
    },
    
    initParticles() {
      this.particles = [];
      // Reducir el número de partículas para mejor rendimiento
      const particlesCount = Math.min(Math.floor(this.width / 20), 80);
      
      for (let i = 0; i < particlesCount; i++) {
        this.particles.push({
          x: Math.random() * this.width,
          y: Math.random() * this.height,
          size: Math.random() * 3 + 1,
          speedX: Math.random() * 2 - 1,
          speedY: Math.random() * 2 - 1,
          color: this.getRandomBlueShade()
        });
      }
    },
    
    getRandomBlueShade() {
      const r = Math.floor(Math.random() * 30);
      const g = Math.floor(Math.random() * 150 + 100);
      const b = Math.floor(Math.random() * 100 + 155);
      return `rgb(${r},${g},${b})`;
    },
    
    drawLight() {
      if (this.mouseX === 0 && this.mouseY === 0) return;
      
      // Create radial gradient for light effect
      const gradient = this.ctx.createRadialGradient(
        this.mouseX, this.mouseY, 10,
        this.mouseX, this.mouseY, 300
      );
      
      gradient.addColorStop(0, 'rgba(30, 144, 255, 0.6)');
      gradient.addColorStop(0.2, 'rgba(30, 144, 255, 0.3)');
      gradient.addColorStop(1, 'rgba(30, 144, 255, 0)');
      
      this.ctx.fillStyle = gradient;
      this.ctx.fillRect(0, 0, this.width, this.height);
    },
    
    animate() {
      this.ctx.clearRect(0, 0, this.width, this.height);
      
      // Draw background
      this.ctx.fillStyle = this.backgroundColor;
      this.ctx.fillRect(0, 0, this.width, this.height);
      
      // Draw light effect following cursor
      this.drawLight();
      
      // Update and draw particles
      this.particles.forEach(particle => {
        // Calculate distance to mouse
        const dx = this.mouseX - particle.x;
        const dy = this.mouseY - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        // Move particles slightly towards mouse when close
        if (distance < 300) {
          const force = 5 / distance;
          particle.x += dx * force;
          particle.y += dy * force;
        }
        
        // Regular movement
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        // Boundary checking
        if (particle.x < 0 || particle.x > this.width) particle.speedX *= -1;
        if (particle.y < 0 || particle.y > this.height) particle.speedY *= -1;
        
        // Draw particle
        this.ctx.beginPath();
        this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        this.ctx.fillStyle = particle.color;
        this.ctx.fill();
      });
      
      this.animationFrameId = requestAnimationFrame(this.animate);
    }
  }
}
</script>

<style scoped>
.effect-canvas {
  pointer-events: none;
}
</style> 