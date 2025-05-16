<template>
  <div>
    <Dashboard/>
  </div>
</template>

<script>
import Dashboard from '../components/dashboard/Dashboard.vue'

export default {
  middleware: 'auth',
  components: {
    Dashboard
  },
  name: 'IndexPage',
  data() {
    return {
      
    }
  },
  methods: {
   
  }
}
</script>

<style scoped>
/* Solo agregar estilos específicos si es necesario */
</style>