<template>
  <div class="counter-page p-6">
    <div class="container mx-auto">
      <h1 class="text-2xl font-bold text-cyan-300 mb-6">Panel de Conteo de Peces</h1>
      <Counter />
    </div>
  </div>
</template>

<script>
import Counter from '~/components/Counter.vue'

export default {
  name: 'CounterPage',
  components: {
    Counter
  }
}
</script>

<style scoped>
.counter-page {
  background-color: #051525;
  min-height: 100vh;
  padding-bottom: 50px;
}
</style> 