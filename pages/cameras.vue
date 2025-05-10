<template>
  <div class="min-h-screen bg-skin-base dark:bg-gray-900 py-6 px-4 sm:px-6 lg:px-8">
    <div class="max-w-7xl mx-auto">
      <div class="flex justify-between items-center mb-6">
        <div>
          <h1 class="text-2xl font-bold text-gray-800 dark:text-white">Cámaras</h1>
          <p class="text-sm text-gray-600 dark:text-gray-400">Sistema de monitoreo en vivo de estanques por zonas</p>
        </div>
        <button 
          @click="goBack" 
          class="flex items-center text-sm bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors shadow-md ml-auto"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clip-rule="evenodd" />
          </svg>
          Volver al Dashboard
        </button>
      </div>
      
      <!-- Selector de zonas -->
      <div class="flex space-x-2 mb-6 overflow-x-auto pb-2">
        <button 
          @click="selectedZone = null" 
          class="px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap"
          :class="selectedZone === null ? 'bg-blue-600 text-white' : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'"
        >
          Todas las zonas
        </button>
        <button 
          v-for="zone in zones" 
          :key="zone.id" 
          @click="selectedZone = zone.id"
          class="px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap"
          :class="selectedZone === zone.id ? 'bg-blue-600 text-white' : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'"
        >
          {{ zone.name }}
        </button>
      </div>
      
      <!-- Cámaras por zona -->
      <div v-for="zone in filteredZones" :key="zone.id" class="mb-8">
        <h3 class="text-lg font-medium text-gray-800 dark:text-white mb-4">{{ zone.name }}</h3>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div v-for="camera in zone.cameras" :key="camera.id" class="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <div class="relative">
              <div class="bg-gray-900 h-48 flex items-center justify-center">
                <div v-if="camera.isActive" class="relative w-full h-full">
                  <img :src="camera.thumbnailUrl" alt="Vista de cámara" class="w-full h-full object-cover" />
                  <div class="absolute top-2 right-2 flex items-center">
                    <span class="flex h-3 w-3 relative">
                      <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                      <span class="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                    </span>
                    <span class="ml-2 text-xs bg-black bg-opacity-50 text-white px-2 py-1 rounded">EN VIVO</span>
                  </div>
                </div>
                <div v-else class="text-center text-gray-500">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  <p class="text-sm">Cámara inactiva</p>
                </div>
              </div>
            </div>
            
            <div class="p-4">
              <div class="flex justify-between items-center mb-2">
                <h4 class="font-medium text-gray-800 dark:text-white">{{ camera.name }}</h4>
                <span class="px-2 py-1 text-xs rounded-full" :class="getStatusClass(camera.status)">
                  {{ getStatusLabel(camera.status) }}
                </span>
              </div>
              
              <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">{{ camera.description }}</p>
              
              <div class="flex justify-between items-center">
                <div class="text-sm text-gray-500 dark:text-gray-400">
                  <span>Estanque: {{ camera.pondName }}</span>
                </div>
                <button 
                  @click="viewCamera(camera)" 
                  class="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium"
                >
                  Ver cámara
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Modal de visualización de cámara -->
      <div v-if="selectedCamera" class="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-4xl">
          <div class="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
            <h3 class="text-lg font-medium text-gray-800 dark:text-white">{{ selectedCamera.name }}</h3>
            <button @click="selectedCamera = null" class="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div class="p-4">
            <div class="bg-black h-72 md:h-96 flex items-center justify-center mb-4">
              <div v-if="selectedCamera.isActive" class="relative w-full h-full">
                <img :src="selectedCamera.thumbnailUrl" alt="Vista de cámara" class="w-full h-full object-cover" />
                <div class="absolute top-2 right-2 flex items-center">
                  <span class="flex h-3 w-3 relative">
                    <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span class="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                  </span>
                  <span class="ml-2 text-xs bg-black bg-opacity-50 text-white px-2 py-1 rounded">EN VIVO</span>
                </div>
              </div>
              <div v-else class="text-center text-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                <p>Cámara inactiva</p>
              </div>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <p class="text-sm text-gray-500 dark:text-gray-400">Estanque</p>
                <p class="font-medium text-gray-900 dark:text-white">{{ selectedCamera.pondName }}</p>
              </div>
              <div>
                <p class="text-sm text-gray-500 dark:text-gray-400">Estado</p>
                <span class="px-2 py-1 text-xs rounded-full" :class="getStatusClass(selectedCamera.status)">
                  {{ getStatusLabel(selectedCamera.status) }}
                </span>
              </div>
            </div>
            
            <div class="mb-4">
              <p class="text-sm text-gray-500 dark:text-gray-400 mb-1">Descripción</p>
              <p class="text-gray-900 dark:text-white">{{ selectedCamera.description }}</p>
            </div>
            
            <div class="flex justify-end space-x-3">
              <button 
                v-if="!selectedCamera.isActive" 
                @click="activateCamera(selectedCamera)" 
                class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Activar cámara
              </button>
              <button 
                v-else 
                @click="deactivateCamera(selectedCamera)" 
                class="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              >
                Desactivar cámara
              </button>
              <button 
                @click="selectedCamera = null" 
                class="bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-white px-4 py-2 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useNuxtApp } from '#app'

export default {
  name: 'CamerasPage',
  data() {
    return {
      selectedZone: null,
      selectedCamera: null,
      zones: [
        {
          id: 1,
          name: 'Zona Norte',
          cameras: [
            {
              id: 1,
              name: 'Cámara Alao Oeste',
              pondName: 'Alao Oeste',
              description: 'Vista principal del estanque Alao Oeste',
              status: 'online',
              isActive: true,
              thumbnailUrl: 'https://via.placeholder.com/640x360.png?text=Cámara+Alao+Oeste'
            },
            {
              id: 2,
              name: 'Cámara Puerto Varas',
              pondName: 'Estanque Puerto Varas',
              description: 'Monitoreo de alimentación y comportamiento',
              status: 'online',
              isActive: false,
              thumbnailUrl: 'https://via.placeholder.com/640x360.png?text=Cámara+Puerto+Varas'
            },
            {
              id: 3,
              name: 'Cámara Ensenada',
              pondName: 'Estanque Ensenada',
              description: 'Vista subacuática para monitoreo de salud',
              status: 'offline',
              isActive: false,
              thumbnailUrl: 'https://via.placeholder.com/640x360.png?text=Cámara+Ensenada'
            }
          ]
        },
        {
          id: 2,
          name: 'Zona Central',
          cameras: [
            {
              id: 4,
              name: 'Cámara Bahía 2',
              pondName: 'Bahía 2',
              description: 'Vista panorámica de estanque principal',
              status: 'online',
              isActive: true,
              thumbnailUrl: 'https://via.placeholder.com/640x360.png?text=Cámara+Bahía+2'
            },
            {
              id: 5,
              name: 'Cámara Arrecife Central',
              pondName: 'Arrecife Central',
              description: 'Monitoreo de calidad del agua y comportamiento',
              status: 'maintenance',
              isActive: false,
              thumbnailUrl: 'https://via.placeholder.com/640x360.png?text=Cámara+Arrecife+Central'
            },
            {
              id: 6,
              name: 'Cámara Marina Centro',
              pondName: 'Marina Centro',
              description: 'Vista de alimentadores automáticos',
              status: 'online',
              isActive: false,
              thumbnailUrl: 'https://via.placeholder.com/640x360.png?text=Cámara+Marina+Centro'
            }
          ]
        },
        {
          id: 3,
          name: 'Zona Sur',
          cameras: [
            {
              id: 7,
              name: 'Cámara Talofa Sur',
              pondName: 'Talofa Sur',
              description: 'Monitoreo de condiciones críticas',
              status: 'alert',
              isActive: true,
              thumbnailUrl: 'https://via.placeholder.com/640x360.png?text=Cámara+Talofa+Sur'
            },
            {
              id: 8,
              name: 'Cámara Butan 7',
              pondName: 'Butan 7',
              description: 'Vista general del estanque',
              status: 'online',
              isActive: false,
              thumbnailUrl: 'https://via.placeholder.com/640x360.png?text=Cámara+Butan+7'
            },
            {
              id: 9,
              name: 'Cámara Punta Austral',
              pondName: 'Punta Austral',
              description: 'Monitoreo de emergencia por condiciones críticas',
              status: 'alert',
              isActive: true,
              thumbnailUrl: 'https://via.placeholder.com/640x360.png?text=Cámara+Punta+Austral'
            }
          ]
        }
      ]
    }
  },
  computed: {
    filteredZones() {
      if (this.selectedZone === null) {
        return this.zones;
      }
      return this.zones.filter(zone => zone.id === this.selectedZone);
    }
  },
  methods: {
    goBack() {
      this.$router.push('/');
    },
    viewCamera(camera) {
      this.selectedCamera = camera;
    },
    activateCamera(camera) {
      camera.isActive = true;
      
      // Mostrar notificación
      const nuxtApp = useNuxtApp();
      if (nuxtApp.$notifications) {
        nuxtApp.$notifications.success(`Cámara ${camera.name} activada correctamente`);
      }
    },
    deactivateCamera(camera) {
      camera.isActive = false;
      
      // Mostrar notificación
      const nuxtApp = useNuxtApp();
      if (nuxtApp.$notifications) {
        nuxtApp.$notifications.info(`Cámara ${camera.name} desactivada`);
      }
    },
    getStatusClass(status) {
      switch (status) {
        case 'online':
          return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
        case 'offline':
          return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-400';
        case 'maintenance':
          return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
        case 'alert':
          return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
        default:
          return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-400';
      }
    },
    getStatusLabel(status) {
      switch (status) {
        case 'online':
          return 'En línea';
        case 'offline':
          return 'Desconectada';
        case 'maintenance':
          return 'Mantenimiento';
        case 'alert':
          return 'Alerta';
        default:
          return 'Desconocido';
      }
    }
  }
}
</script>

<style scoped>
/* Animaciones para los elementos al pasar el mouse */
.hover\:shadow-lg {
  transition: box-shadow 0.3s ease, transform 0.2s ease;
}

.hover\:shadow-lg:hover {
  transform: translateY(-2px);
}
</style> 