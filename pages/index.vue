<template>
  <div>
    <ClientOnly>
      <Dashboard v-if="isAuthenticated" />
      <div v-else class="flex justify-center items-center h-screen">
        <p>Verificando autenticación...</p>
      </div>
    </ClientOnly>
  </div>
</template>

<script>
import Dashboard from '../components/dashboard/DashboardC.vue'
import { useUserStore } from '~/stores/user'

export default {
  middleware: 'auth',
  components: {
    Dashboard
  },
  name: 'IndexPage',
  data() {
    return {
      isAuthenticated: false
    }
  },
  mounted() {
    const userStore = useUserStore();
    this.isAuthenticated = userStore.isAuthenticated;
  },
  methods: {
   
  }
}
</script>

<style scoped>
/* Solo agregar estilos específicos si es necesario */
</style>