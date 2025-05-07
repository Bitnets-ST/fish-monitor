<template>
  <ParticleEffect canvas-class="fixed top-0 left-0 w-full h-full z-[-1]" />
</template>

<script>
import ParticleEffect from '~/components/ParticleEffect.vue'

export default {
  name: 'MouseEffectBackground',
  components: {
    ParticleEffect
  }
}
</script>

<style scoped>
canvas {
  pointer-events: none;
}
</style> 