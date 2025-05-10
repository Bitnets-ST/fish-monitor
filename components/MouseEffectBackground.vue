<template>
  <ParticleEffect canvasClass="fixed top-0 left-0 w-full h-full z-0" />
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
/* Aseguramos que el canvas tenga prioridad visual */
:deep(canvas) {
  pointer-events: none;
  z-index: 0 !important;
}
</style> 