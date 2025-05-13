<template>
  <header class="fixed top-0 left-0 right-0 bg-[#1e293b] text-white py-3 px-6 z-20 shadow-lg">
    <div class="flex items-center justify-between">
      <!-- Logo y título a la izquierda -->
      <div class="flex items-center">
        <div class="p-1 rounded-lg bg-white/10 mr-4">
          <img src="/images/Logo1.png" alt="Logo" class="h-10 w-10">
        </div>
        <span class="text-xl font-bold text-white">Bitnets Fish Monitor</span>
      </div>
      
      <!-- Buscador centrado con tooltip -->
      <div class="flex-grow mx-8 max-w-xl">
        <div class="relative group">
          <input 
            v-model="searchQuery" 
            type="text" 
            placeholder="Buscar estanque..." 
            class="w-full bg-[#2c3e50] bg-opacity-70 text-base text-white placeholder-gray-400 border-0 rounded-lg py-2.5 px-12 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-inner"
            @keyup.enter="searchPonds"
          />
          <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
            </svg>
          </div>
          <!-- Tooltip añadido -->
          <div class="absolute left-1/2 -translate-x-1/2 -bottom-10 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
            Busque por estanque
            <div class="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45"></div>
          </div>
        </div>
      </div>
      
      <!-- Elementos a la derecha -->
      <div class="flex items-center space-x-5">
        <!-- API Connected -->
        <div class="flex items-center px-3 py-1.5 bg-[#243042] rounded-full">
          <div class="bg-green-500 rounded-full w-3 h-3 mr-2 animate-pulse"></div>
          <span class="text-sm font-medium text-white">API Conectada</span>
        </div>
        
        <!-- Campanita -->
        <div class="relative">
          <button 
            @click="toggleNotifications"
            class="relative p-2.5 rounded-full hover:bg-white/15 transition-all"
            aria-label="Notificaciones"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
            </svg>
            <span 
              v-if="notificationCount > 0" 
              class="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center border border-[#1e293b]"
            >
              {{ notificationCount }}
            </span>
          </button>
          
          <!-- Menú desplegable de notificaciones -->
          <div 
            v-if="showNotifications" 
            class="absolute right-0 mt-2 w-96 bg-white dark:bg-gray-800 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto notifications-menu"
          >
            <div class="p-3 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
              <h3 class="font-medium text-gray-800 dark:text-white">Notificaciones</h3>
              <button 
                v-if="$notifications && $notifications.headerNotifications.length > 0" 
                @click="markAllAsRead()" 
                class="text-xs font-medium text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 bg-blue-50 dark:bg-blue-900/20 px-2 py-1 rounded-md transition-colors"
              >
                Marcar todas como leídas
              </button>
            </div>
            
            <div v-if="!$notifications || $notifications.headerNotifications.length === 0" class="p-6 text-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto text-gray-300 dark:text-gray-600 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <p class="text-gray-500 dark:text-gray-400 font-medium">No hay notificaciones</p>
            </div>
            
            <div v-else class="divide-y divide-gray-100 dark:divide-gray-700">
              <transition-group name="fade-list" tag="div">
                <div 
                  v-for="notification in $notifications.headerNotifications" 
                  :key="notification.id" 
                  class="p-3 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
                  :class="{ 'bg-blue-50 dark:bg-blue-900/20': !notification.read }"
                  @click="markAsRead(notification.id)"
                >
                  <div class="flex justify-between items-start">
                    <div class="font-medium text-gray-800 dark:text-white flex items-center" :class="{ 'text-blue-600 dark:text-blue-400': !notification.read }">
                      <div v-if="!notification.read" class="w-2 h-2 bg-blue-600 rounded-full mr-2"></div>
                      {{ notification.title }}
                    </div>
                    <button 
                      @click.stop="deleteNotification(notification.id)" 
                      class="text-gray-400 dark:text-gray-500 hover:text-red-500 dark:hover:text-red-400 transition-colors p-1 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-full"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                      </svg>
                    </button>
                  </div>
                  <div class="text-sm text-gray-500 dark:text-gray-400 mt-1">{{ notification.message }}</div>
                  <div class="flex justify-between items-center mt-2">
                    <div class="text-xs text-gray-400 dark:text-gray-500">
                      {{ formatTimestamp(notification.timestamp) }}
                    </div>
                    <button 
                      v-if="!notification.read"
                      @click.stop="markAsRead(notification.id)" 
                      class="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                    >
                      Marcar como leída
                    </button>
                  </div>
                </div>
              </transition-group>
            </div>
          </div>
        </div>
        
        <!-- Botón de modo oscuro -->
        <button 
          class="p-2.5 rounded-full hover:bg-white/15 transition-all"
          @click="toggleDarkMode"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
          </svg>
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
      apiStatus: 'connected',
      searchQuery: '',
      showNotifications: false,
      isSearching: false,
      searchFeedback: '',
      loadingNotification: false
    }
  },
  computed: {
    isDarkMode() {
      const nuxtApp = useNuxtApp();
      return nuxtApp.$darkMode?.value || false;
    },
    notificationCount() {
      const nuxtApp = useNuxtApp();
      return nuxtApp.$notifications?.unreadCount || 0;
    }
  },
  mounted() {
    // Cargar datos del usuario desde el plugin userData
    this.loadUserData();
    
    // Aquí podrías verificar el estado de la API
    this.checkApiStatus();
    
    // Cerrar menú de notificaciones al hacer clic fuera
    document.addEventListener('click', this.closeNotificationsOnClickOutside);
    
    // Carga las advertencias como notificaciones al iniciar
    this.$nextTick(() => {
      setTimeout(() => {
        this.loadWarningsAsNotifications();
      }, 500);
    });
  },
  beforeUnmount() {
    document.removeEventListener('click', this.closeNotificationsOnClickOutside);
  },
  methods: {
    loadUserData() {
      const nuxtApp = useNuxtApp();
      if (nuxtApp.$userData) {
        this.username = nuxtApp.$userData.value.name || 'Admin';
      } else {
        // Fallback: Cargar datos del usuario desde localStorage
        if (process.client) {
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
        }
      }
    },
    closeNotificationsOnClickOutside(event) {
      // Cerrar menú de notificaciones si está abierto y se hace clic fuera
      if (this.showNotifications && !event.target.closest('.notifications-menu') && !event.target.closest('button[aria-label="Notificaciones"]')) {
        this.showNotifications = false;
      }
    },
    logout() {
      // Limpiar datos del usuario en localStorage
      if (process.client) {
        localStorage.removeItem('user');
      }
      
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
    },
    searchPonds() {
      if (!this.searchQuery.trim()) return;
      
      this.isSearching = true;
      
      // Emitir evento al bus global para que Dashboard lo capture
      const nuxtApp = useNuxtApp();
      if (nuxtApp.$emitter) {
        nuxtApp.$emitter.emit('search-ponds', this.searchQuery);
        
        // Simular una respuesta rápida para feedback visual
        setTimeout(() => {
          this.isSearching = false;
          // Proporcionar feedback visual de que la búsqueda ha sido realizada
          this.searchFeedback = 'Búsqueda completada';
          setTimeout(() => {
            this.searchFeedback = '';
          }, 2000);
        }, 300);
      } else {
        // Fallback directo al evento window si $emitter no está disponible
        if (process.client) {
          window.dispatchEvent(new CustomEvent('search-ponds', { detail: this.searchQuery }));
          this.isSearching = false;
        }
      }
    },
    toggleNotifications() {
      this.showNotifications = !this.showNotifications;
    },
    markAllAsRead() {
      this.loadingNotification = true;
      
      // Marcar todas las notificaciones como leídas
      const nuxtApp = useNuxtApp();
      if (nuxtApp.$notifications) {
        nuxtApp.$notifications.markAllAsRead();
        
        // Dar feedback instantáneo
        setTimeout(() => {
          this.loadingNotification = false;
        }, 300);
      }
    },
    markAsRead(notificationId) {
      // Marcar una notificación específica como leída
      const nuxtApp = useNuxtApp();
      if (nuxtApp.$notifications) {
        // Provee feedback visual instantáneo
        nuxtApp.$notifications.markAsRead(notificationId);
      }
    },
    deleteNotification(notificationId) {
      const nuxtApp = useNuxtApp();
      if (nuxtApp.$notifications) {
        // Eliminar la notificación instantáneamente
        nuxtApp.$notifications.deleteNotification(notificationId);
      }
    },
    loadWarningsAsNotifications() {
      // Esta función cargará las advertencias del sistema como notificaciones
      const nuxtApp = useNuxtApp();
      if (!nuxtApp.$notifications) return;
      
      // Ejemplos de advertencias (puedes modificarlos según tus necesidades)
      const warnings = [
        {
          id: 'warning-1',
          title: 'Temperatura alta en Estanque A1',
          message: 'La temperatura ha superado los 24°C en las últimas 2 horas',
          type: 'warning',
          timestamp: new Date(Date.now() - 1000 * 60 * 30) // 30 minutos atrás
        },
        {
          id: 'warning-2',
          title: 'Nivel de oxígeno bajo en Estanque C3',
          message: 'El nivel de oxígeno ha caído por debajo del umbral recomendado',
          type: 'danger',
          timestamp: new Date(Date.now() - 1000 * 60 * 15) // 15 minutos atrás
        }
      ];
      
      // Agregar las advertencias como notificaciones
      warnings.forEach(warning => {
        nuxtApp.$notifications.addNotification({
          id: warning.id,
          title: warning.title,
          message: warning.message,
          type: warning.type === 'danger' ? 'error' : 'warning',
          read: false,
          timestamp: warning.timestamp
        });
      });
    },
    formatTimestamp(timestamp) {
      if (!timestamp) return '';
      
      const date = new Date(timestamp);
      const now = new Date();
      const diffMs = now - date;
      const diffMins = Math.floor(diffMs / 60000);
      const diffHours = Math.floor(diffMs / 3600000);
      const diffDays = Math.floor(diffMs / 86400000);
      
      if (diffMins < 1) {
        return 'Ahora mismo';
      } else if (diffMins < 60) {
        return `Hace ${diffMins} ${diffMins === 1 ? 'minuto' : 'minutos'}`;
      } else if (diffHours < 24) {
        return `Hace ${diffHours} ${diffHours === 1 ? 'hora' : 'horas'}`;
      } else if (diffDays < 7) {
        return `Hace ${diffDays} ${diffDays === 1 ? 'día' : 'días'}`;
      } else {
        return date.toLocaleDateString('es-ES', { 
          year: 'numeric', 
          month: 'short', 
          day: 'numeric' 
        });
      }
    }
  }
}
</script>

<style scoped>
.fade-list-enter-active,
.fade-list-leave-active {
  transition: all 0.3s ease;
}
.fade-list-enter-from,
.fade-list-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>