<template>
  <header class="bg-gradient-to-r from-cyan-900 to-blue-900 text-white p-4 shadow-md z-10">
    <div class="container mx-auto flex justify-between items-center">
      <div class="logo-container flex items-center">
        <img src="/images/Logo1.png" alt="Bitnets Logo" class="h-8 w-8 mr-3">
        <h1 class="text-2xl font-bold">BITNETS</h1>
      </div>
      
      <div class="flex items-center space-x-4">
        <!-- Indicador de estado de API -->
        <div class="bg-green-500 rounded-full w-2 h-2 mr-1" />
        <span class="text-sm mr-4">API Conectada</span>
        
        <!-- Menú de navegación -->
        <nav class="hidden md:flex space-x-4">
          <NuxtLink to="/" class="hover:text-cyan-300 transition">Dashboard</NuxtLink>
          <NuxtLink to="/#" class="hover:text-cyan-300 transition">Reportes</NuxtLink>
          <NuxtLink to="/#" class="hover:text-cyan-300 transition">Configuración</NuxtLink>
        </nav>

        <!-- Información del usuario y botón de cierre de sesión -->
        <div class="user-info flex items-center gap-4">
          <p class="hidden sm:block">{{ username }}</p>
          <button 
            class="bg-red-600 hover:bg-red-700 text-white py-1 px-3 rounded text-sm transition"
            @click="logout"
          >
            Cerrar sesión
          </button>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import { User } from '~/models/User'

export default {
  name: 'AppHeader',
  data() {
    return {
      username: 'Admin',
      apiStatus: 'connected' // Esto podría venir de un store o ser verificado mediante una solicitud API
    }
  },
  mounted() {
    // Aquí podrías obtener el nombre de usuario actual desde una API o localStorage
    const currentUser = User.getCurrentUser();
    if (currentUser && currentUser.username) {
      this.username = currentUser.username;
    }
    
    // Aquí podrías verificar el estado de la API
    this.checkApiStatus();
  },
  methods: {
    logout() {
      User.logout();
      this.$router.push('/login');
    },
    checkApiStatus() {
      // Esta función podría verificar periódicamente el estado de tu API
      // Implementación futura: realizar fetch a un endpoint de estado
      console.log('Verificando estado de API...');
    }
  }
}
</script>

<style scoped>
</style>
  