<template>
  <header class="fixed top-0 left-0 right-0 bg-gradient-to-r from-cyan-900 to-blue-900 dark:from-gray-900 dark:to-gray-800 text-white p-4 shadow-md z-20">
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
        </nav>

        <!-- Botón de modo oscuro -->
        <button 
          class="p-2 rounded-full hover:bg-gray-700/30 transition"
          @click="toggleDarkMode"
          aria-label="Cambiar modo oscuro"
        >
          <svg v-if="isDarkMode" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
          </svg>
        </button>

        <!-- Botón de cierre de sesión -->
        <button 
          class="bg-red-600 hover:bg-red-700 text-white py-1 px-3 rounded text-sm transition"
          @click="logout"
        >
          Cerrar sesión
        </button>
      </div>
    </div>
  </header>
</template>

<script>
import { User } from '~/models/User'
import { useNuxtApp } from '#app'

export default {
  name: 'AppHeader',
  data() {
    return {
      username: 'Admin',
      apiStatus: 'connected', // Esto podría venir de un store o ser verificado mediante una solicitud API
    }
  },
  computed: {
    isDarkMode() {
      const nuxtApp = useNuxtApp();
      return nuxtApp.$darkMode?.value || false;
    }
  },
  mounted() {
    // Cargar datos del usuario desde localStorage
    this.loadUserData();
    
    // Aquí podrías verificar el estado de la API
    this.checkApiStatus();
  },
  methods: {
    loadUserData() {
      // Cargar datos del usuario desde localStorage
      const savedUser = localStorage.getItem('user');
      if (savedUser) {
        try {
          const parsedUser = JSON.parse(savedUser);
          if (parsedUser.name) {
            this.username = parsedUser.name;
          }
        } catch (e) {
          console.error('Error al cargar datos del usuario:', e);
        }
      } else {
        // Intentar obtener el nombre de usuario desde User.getCurrentUser()
        const currentUser = User.getCurrentUser();
        if (currentUser && currentUser.username) {
          this.username = currentUser.username;
        }
      }
    },
    logout() {
      // Limpiar datos del usuario en localStorage
      localStorage.removeItem('user');
      
      User.logout();
      this.$router.push('/login');
    },
    checkApiStatus() {
      // Esta función podría verificar periódicamente el estado de tu API
      // Implementación futura: realizar fetch a un endpoint de estado
      console.log('Verificando estado de API...');
    },
    toggleDarkMode() {
      const nuxtApp = useNuxtApp();
      if (nuxtApp.$toggleDarkMode) {
        nuxtApp.$toggleDarkMode();
      }
    }
  }
}
</script>

<style scoped>
</style>
  