<template>
  <div class="min-h-screen bg-warm-50 dark:bg-gradient-to-b dark:from-gray-900 dark:to-gray-800 py-6 px-4 sm:px-6 lg:px-8 dark:camera-background">
    <div class="max-w-7xl mx-auto">
      <div class="flex justify-between items-center mb-6">
        <div>
          <h1 class="text-2xl font-bold text-gray-800 dark:text-white">Cámaras de lucas</h1>
          <p class="text-sm text-gray-600 dark:text-gray-400">Sistema de monitoreo en vivo de estanques por zonas</p>
        </div>sdf
        <button 
          class="flex items-center text-sm bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors shadow-md ml-auto" 
          @click="goBack"ad
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
          class="px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap" 
          :class="selectedZone === null ? 'bg-blue-600 text-white' : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'"
          @click="selectedZone = null"
        >
          Todas las zonas
        </button>
        <button 
          v-for="zone in zones" 
          :key="zone.id" 
          class="px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap"
          :class="selectedZone === zone.id ? 'bg-blue-600 text-white' : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'"
          @click="selectedZone = zone.id"
        >
          {{ zone.name }}
        </button>
      </div>
      
      <!-- Cámaras por zona -->
      <div v-for="zone in filteredZones" :key="zone.id" class="mb-8">
        <h3 class="text-lg font-medium text-gray-800 dark:text-white mb-4">{{ zone.name }}</h3>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
v-for="camera in zone.cameras" :key="camera.id" 
               class="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer camera-card border border-transparent dark:border-gray-700"
               @click="viewCamera(camera)">
            <div class="relative">
              <div class="bg-gray-900 h-48 flex items-center justify-center">
                <div v-if="camera.isActive" class="relative w-full h-full">
                  <img :src="camera.thumbnailUrl" alt="Vista de cámara" class="w-full h-full object-cover" >
                  <div class="absolute inset-0 bg-black bg-opacity-15 dark:bg-opacity-30 camera-overlay"/>
                  <div class="absolute top-2 right-2 flex items-center">
                    <span class="flex h-3 w-3 relative">
                      <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"/>
                      <span class="relative inline-flex rounded-full h-3 w-3 bg-red-500"/>
                    </span>
                    <span class="ml-2 text-xs bg-black bg-opacity-50 text-white px-2 py-1 rounded">EN VIVO</span>
                  </div>
                </div>
                <div v-else class="text-center text-gray-400 dark:text-gray-300 camera-inactive">
                  <div class="camera-inactive-bg"/>
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto mb-2 relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  <p class="text-sm relative z-10">Cámara inactiva</p>
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
                <div class="camera-view-badge bg-blue-600 text-white px-3 py-1 text-sm rounded-md transition-colors">
                  Ver cámara
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Modal de visualización de cámara -->
      <div v-if="selectedCamera" class="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4">
        <div class="bg-white dark:bg-gradient-to-b dark:from-gray-900 dark:to-gray-800 rounded-lg shadow-xl w-full max-w-4xl overflow-hidden">
          <div class="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
            <h3 class="text-lg font-medium text-gray-800 dark:text-white">{{ selectedCamera.name }}</h3>
            <button class="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300" @click="selectedCamera = null">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div class="p-4">
            <div class="bg-black h-80 md:h-[400px] flex items-center justify-center mb-4 relative overflow-hidden rounded-lg">
              <div v-if="selectedCamera.isActive" class="relative w-full h-full camera-live-feed">
                <!-- Webcam en vivo cuando está activa -->
                <div v-if="webcamActive" class="absolute inset-0 z-10">
                  <video ref="webcamVideo" autoplay class="w-full h-full object-cover"/>
                </div>
                <!-- Cámara RTSP usando la misma implementación del profesor -->
                <div v-else-if="selectedCamera.rtspUrl" class="absolute inset-0 z-10">
                  <video 
                    ref="rtspVideo" 
                    autoplay 
                    controls 
                    muted
                    class="w-full h-full object-cover"
                  />
                </div>
                <!-- Imagen estática cuando no hay transmisión activa -->
                <div v-else>
                  <img :src="selectedCamera.thumbnailUrl" alt="Vista de cámara" class="w-full h-full object-cover brightness-110 contrast-105" >
                </div>
                
                <!-- Controles y overlays para la vista detallada -->
                <div class="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black to-transparent h-16 opacity-80"/>
                
                <!-- Indicadores y métricas -->
                <div class="absolute top-4 left-4 flex flex-col space-y-2">
                  <div class="flex items-center bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs">
                    <span class="w-2 h-2 rounded-full bg-green-500 mr-2"/>
                    Oxígeno: 7.8 mg/L
                  </div>
                  <div class="flex items-center bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs">
                    <span class="w-2 h-2 rounded-full bg-blue-500 mr-2"/>
                    Temperatura: 12.3°C
                  </div>
                  <div class="flex items-center bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs">
                    <span class="w-2 h-2 rounded-full bg-yellow-500 mr-2"/>
                    Turbidez: Normal
                  </div>
                </div>
                
                <!-- Contador y estado de grabación -->
                <div class="absolute top-2 right-2 flex items-center space-x-2">
                  <span class="flex h-3 w-3 relative">
                    <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"/>
                    <span class="relative inline-flex rounded-full h-3 w-3 bg-red-500"/>
                  </span>
                  <div class="flex items-center bg-black bg-opacity-70 text-white px-2 py-1 rounded text-xs">
                    <span class="font-mono">{{ webcamActive ? 'EN VIVO' : 'ACTIVAR PARA VER EN VIVO' }}</span>
                  </div>
                </div>
                
                <!-- Controles de cámara -->
                <div class="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center space-x-4 camera-controls">
                  <button class="p-2 rounded-full bg-black bg-opacity-50 text-white hover:bg-opacity-70 transition-opacity">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button 
                    class="p-3 rounded-full bg-black bg-opacity-50 text-white hover:bg-opacity-70 transition-opacity" 
                    @click="toggleWebcam"
                  >
                    <svg v-if="!webcamActive" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </button>
                  <button class="p-2 rounded-full bg-black bg-opacity-50 text-white hover:bg-opacity-70 transition-opacity">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
              <div v-else class="text-center text-gray-400 dark:text-gray-300 camera-inactive h-full w-full">
                <div class="camera-inactive-bg"/>
                <div class="relative z-10 h-full flex flex-col items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  <p>Cámara inactiva</p>
                  <button 
                    class="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700" 
                    @click="activateCamera(selectedCamera)"
                  >
                    Activar cámara
                  </button>
                </div>
              </div>
            </div>
            
            <!-- Información y estadísticas -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div class="bg-gray-50 dark:bg-gray-800/50 p-3 rounded-lg border border-transparent dark:border-gray-700">
                <p class="text-sm text-gray-500 dark:text-gray-400">Estanque</p>
                <p class="font-medium text-gray-900 dark:text-white">{{ selectedCamera.pondName }}</p>
              </div>
              <div class="bg-gray-50 dark:bg-gray-800/50 p-3 rounded-lg border border-transparent dark:border-gray-700">
                <p class="text-sm text-gray-500 dark:text-gray-400">Estado</p>
                <span class="px-2 py-1 text-xs rounded-full" :class="getStatusClass(selectedCamera.status)">
                  {{ getStatusLabel(selectedCamera.status) }}
                </span>
              </div>
              <div class="bg-gray-50 dark:bg-gray-800/50 p-3 rounded-lg border border-transparent dark:border-gray-700">
                <p class="text-sm text-gray-500 dark:text-gray-400">Última actividad</p>
                <p class="font-medium text-gray-900 dark:text-white">Hace 3 minutos</p>
              </div>
            </div>
            
            <div class="mb-4 bg-gray-50 dark:bg-gray-800/50 p-3 rounded-lg border border-transparent dark:border-gray-700">
              <p class="text-sm text-gray-500 dark:text-gray-400 mb-1">Descripción</p>
              <p class="text-gray-900 dark:text-white">{{ selectedCamera.description }}</p>
            </div>
            
            <div class="flex justify-end space-x-3">
              <button 
                v-if="!selectedCamera.isActive" 
                class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2" 
                @click="activateCamera(selectedCamera)"
              >
                Activar cámara
              </button>
              <button 
                v-else 
                class="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2" 
                @click="deactivateCamera(selectedCamera)"
              >
                Desactivar cámara
              </button>
              <button 
                class="bg-gray-300 text-gray-800 dark:bg-gray-600 dark:text-white px-4 py-2 rounded-md hover:bg-gray-400 dark:hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2" 
                @click="showCameraSettings = true"
              >
                Configurar
              </button>
              <button 
                class="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2" 
                @click="checkMediaMTXConnection"
              >
                Diagnosticar
              </button>
              <button 
                class="bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-white px-4 py-2 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2" 
                @click="selectedCamera = null"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Modal de configuración de cámara -->
      <div v-if="showCameraSettings" class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div class="bg-white dark:bg-gray-800 rounded-lg max-w-md w-full shadow-lg">
          <div class="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
            <h3 class="text-lg font-medium text-gray-900 dark:text-white">Configuración de cámara</h3>
            <button class="text-gray-400 hover:text-gray-500" @click="showCameraSettings = false">
              <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div class="p-4">
            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nombre</label>
              <input 
                v-model="selectedCamera.name" 
                type="text" 
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              >
            </div>
            
            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Estanque asociado</label>
              <input 
                v-model="selectedCamera.pondName" 
                type="text" 
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              >
            </div>
            
            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Descripción</label>
              <textarea 
                v-model="selectedCamera.description" 
                rows="2"
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              />
            </div>
            
            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">URL de RTSP</label>
              <input 
                v-model="selectedCamera.rtspUrl" 
                type="text" 
                placeholder="rtsp://usuario:contraseña@dirección:puerto/ruta"
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              >
              <p class="mt-1 text-xs text-gray-500 dark:text-gray-400">URL completa del stream RTSP de la cámara</p>
            </div>
            
            <div class="flex justify-between mt-6">
              <button class="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700" @click="showCameraSettings = false">
                Cancelar
              </button>
              <button class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700" @click="saveCameraSettings">
                Guardar cambios
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
      webcamActive: false,
      webcamStream: null,
      showCameraSettings: false,
      // Servidor de streameo simulado que usaríamos en producción
      streamServer: 'https://demo.mediamtx.com/streams',
      zones: [
        {
          id: 1,
          name: 'Zona Norte',
          cameras: [
            {
              id: 1,
              name: 'Cámara Principal (MediaMTX)',
              pondName: 'Estanque Central',
              description: 'Cámara RTSP implementada por el profesor para monitoreo principal',
              status: 'online',
              isActive: true,
              rtspUrl: 'rtsp://localhost:8554/cam1',
              streamKey: 'cam1',
              thumbnailUrl: 'https://via.placeholder.com/640x360.png?text=Cámara+Principal+MediaMTX'
            },
            {
              id: 2,
              name: 'Cámara Alao Oeste',
              pondName: 'Alao Oeste',
              description: 'Vista principal del estanque Alao Oeste',
              status: 'online',
              isActive: true,
              rtspUrl: 'rtsp://localhost:8554/cam2',
              streamKey: 'cam2',
              thumbnailUrl: 'https://via.placeholder.com/640x360.png?text=Cámara+Alao+Oeste'
            },
            {
              id: 3,
              name: 'Cámara Ensenada',
              pondName: 'Estanque Ensenada',
              description: 'Vista subacuática para monitoreo de salud',
              status: 'offline',
              isActive: false,
              rtspUrl: 'rtsp://localhost:8554/cam3',
              streamKey: 'cam3',
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
              rtspUrl: 'rtsp://localhost:8554/cam4',
              streamKey: 'cam4',
              thumbnailUrl: 'https://via.placeholder.com/640x360.png?text=Cámara+Bahía+2'
            },
            {
              id: 5,
              name: 'Cámara Arrecife Central',
              pondName: 'Arrecife Central',
              description: 'Monitoreo de calidad del agua y comportamiento',
              status: 'maintenance',
              isActive: false,
              rtspUrl: 'rtsp://localhost:8554/cam5',
              streamKey: 'cam5',
              thumbnailUrl: 'https://via.placeholder.com/640x360.png?text=Cámara+Arrecife+Central'
            },
            {
              id: 6,
              name: 'Cámara Marina Centro',
              pondName: 'Marina Centro',
              description: 'Vista de alimentadores automáticos',
              status: 'online',
              isActive: false,
              rtspUrl: 'rtsp://localhost:8554/cam6',
              streamKey: 'cam6',
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
              rtspUrl: 'rtsp://localhost:8554/cam7',
              streamKey: 'cam7',
              thumbnailUrl: 'https://via.placeholder.com/640x360.png?text=Cámara+Talofa+Sur'
            },
            {
              id: 8,
              name: 'Cámara Butan 7',
              pondName: 'Butan 7',
              description: 'Vista general del estanque',
              status: 'online',
              isActive: false,
              rtspUrl: 'rtsp://localhost:8554/cam8',
              streamKey: 'cam8',
              thumbnailUrl: 'https://via.placeholder.com/640x360.png?text=Cámara+Butan+7'
            },
            {
              id: 9,
              name: 'Cámara Punta Austral',
              pondName: 'Punta Austral',
              description: 'Monitoreo de emergencia por condiciones críticas',
              status: 'alert',
              isActive: true,
              rtspUrl: 'rtsp://localhost:8554/cam9',
              streamKey: 'cam9',
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
  beforeUnmount() {
    this.stopWebcam();
  },
  methods: {
    goBack() {
      this.$router.push('/');
    },
    viewCamera(camera) {
      this.selectedCamera = camera;
      
      // Si tiene URL RTSP, intentamos iniciar automáticamente la transmisión
      if (camera.rtspUrl && camera.isActive) {
        // Primero verificamos si MediaMTX está disponible
        const testUrl = 'http://localhost:8889/';
        
        fetch(testUrl, { method: 'HEAD', mode: 'no-cors' })
          .then(_ => {
            console.log('MediaMTX está disponible, iniciando stream...');
            // Si está disponible, iniciamos el stream
            this.$nextTick(() => {
              this.startRtspStream();
            });
          })
          .catch(error => {
            console.error('Error de conexión a MediaMTX:', error);
            const nuxtApp = useNuxtApp();
            if (nuxtApp.$notifications) {
              nuxtApp.$notifications.warning(`No se pudo conectar automáticamente a MediaMTX. Use el botón Diagnosticar para verificar la conexión.`);
            }
          });
      }
    },
    activateCamera(camera) {
      camera.isActive = true;
      
      // Si tiene URL RTSP, iniciar la transmisión
      if (camera.rtspUrl) {
        this.$nextTick(() => {
          this.startRtspStream();
        });
      }
      
      // Mostrar notificación
      const nuxtApp = useNuxtApp();
      if (nuxtApp.$notifications) {
        nuxtApp.$notifications.success(`Cámara ${camera.name} activada correctamente`);
      }
    },
    deactivateCamera(camera) {
      camera.isActive = false;
      // Si hay una transmisión de webcam activa, la detenemos
      this.stopWebcam();
      
      // Mostrar notificación
      const nuxtApp = useNuxtApp();
      if (nuxtApp.$notifications) {
        nuxtApp.$notifications.info(`Cámara ${camera.name} desactivada`);
      }
    },
    async toggleWebcam() {
      if (this.webcamActive) {
        this.stopWebcam();
      } else {
        await this.startWebcam();
      }
    },
    async startRtspStream() {
      try {
        if (this.selectedCamera && this.selectedCamera.rtspUrl) {
          // Implementación ajustada para usar exactamente la misma configuración que el profesor
          this.$nextTick(() => {
            if (this.$refs.rtspVideo) {
              // Configuración específica para MediaMTX según lo que muestra la terminal del profesor
              // Cambiamos para usar cam1/index.m3u8 que es el formato que está usando en su servidor
              let streamKey = 'cam1';
              if (this.selectedCamera.id === 1) {
                // Primera cámara usa el mismo stream que configuró el profesor
                streamKey = 'cam1';
              } else {
                // Las demás cámaras usan cam2, cam3, etc.
                streamKey = `cam${this.selectedCamera.id}`;
              }
              
              // El servidor HTTP de MediaMTX parece estar en puerto 8889 según la salida
              const mediaUrl = `http://localhost:8889/${streamKey}/index.m3u8`;
              
              console.log(`Intentando conectar a: ${mediaUrl}`);
              
              this.$refs.rtspVideo.src = mediaUrl;
              this.$refs.rtspVideo.play().catch(err => {
                console.error('Error al reproducir stream:', err);
                // Mensaje de error más específico
                const nuxtApp = useNuxtApp();
                if (nuxtApp.$notifications) {
                  nuxtApp.$notifications.warning(`No se pudo conectar al stream de la cámara. Verifique que la cámara esté transmitiendo al servidor MediaMTX en el puerto correcto.`);
                }
              });
            }
          });
          
          // Mostrar notificación
          const nuxtApp = useNuxtApp();
          if (nuxtApp.$notifications) {
            nuxtApp.$notifications.success(`Conexión a cámara iniciada`);
          }
        }
      } catch (error) {
        console.error('Error con la transmisión de la cámara:', error);
        const nuxtApp = useNuxtApp();
        if (nuxtApp.$notifications) {
          nuxtApp.$notifications.error(`Error con la transmisión: ${error.message}`);
        }
      }
    },
    async startWebcam() {
      try {
        // Solicitar acceso a la cámara del usuario
        const stream = await navigator.mediaDevices.getUserMedia({ 
          video: { 
            width: { ideal: 1280 },
            height: { ideal: 720 },
            facingMode: "environment" // Preferir cámara trasera si está disponible
          }
        });
        
        this.webcamStream = stream;
        this.webcamActive = true;
        
        // En el próximo ciclo de renderizado, cuando el video exista
        this.$nextTick(() => {
          if (this.$refs.webcamVideo) {
            this.$refs.webcamVideo.srcObject = stream;
          }
        });
        
        // Mostrar notificación
        const nuxtApp = useNuxtApp();
        if (nuxtApp.$notifications) {
          nuxtApp.$notifications.success(`Transmisión en vivo iniciada`);
        }
      } catch (error) {
        console.error('Error al acceder a la cámara:', error);
        // Mostrar notificación de error
        const nuxtApp = useNuxtApp();
        if (nuxtApp.$notifications) {
          nuxtApp.$notifications.error(`No se pudo acceder a la cámara: ${error.message}`);
        }
      }
    },
    stopWebcam() {
      if (this.webcamStream) {
        // Detener todas las pistas de la transmisión
        this.webcamStream.getTracks().forEach(track => {
          track.stop();
        });
        this.webcamStream = null;
      }
      this.webcamActive = false;
      
      // Mostrar notificación
      const nuxtApp = useNuxtApp();
      if (nuxtApp.$notifications) {
        nuxtApp.$notifications.info(`Transmisión en vivo detenida`);
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
    },
    getCompatibleStreamUrl() {
      if (!this.selectedCamera || !this.selectedCamera.rtspUrl) return null;
      
      // En un entorno real, aquí convertiríamos la URL RTSP a una URL compatible con navegadores
      // Usualmente esto requiere un servidor de medios como MediaMTX, Wowza, etc.
      
      // Para demostración, usamos videos de muestra
      const cameraId = this.selectedCamera.id;
      
      // Mapeo de IDs de cámara a videos de demo
      const demoStreams = {
        1: 'https://cph-p2p-msl.akamaized.net/hls/live/2000341/test/master.m3u8', // HLS stream de demo
        2: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
        3: 'https://playertest.longtailvideo.com/adaptive/wowzaid3/playlist.m3u8',
        4: 'https://bitdash-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8',
        5: 'https://d2zihajmogu5jn.cloudfront.net/sintel/master.m3u8',
        6: 'https://devstreaming-cdn.apple.com/videos/streaming/examples/img_bipbop_adv_example_ts/master.m3u8',
        7: 'https://test-streams.mux.dev/dai-discontinuity-deltatre/manifest.m3u8',
        8: 'https://moctobpltc-i.akamaihd.net/hls/live/571329/eight/playlist.m3u8',
        9: 'https://multiplatform-f.akamaihd.net/i/multi/will/bunny/big_buck_bunny_,640x360_400,640x360_700,640x360_1000,950x540_1500,.f4v.csmil/master.m3u8'
      };
      
      if (demoStreams[cameraId]) {
        // Para demostración, generamos un embed de un reproductor HLS compatible
        return `https://embed.api.video/live-streams/${demoStreams[cameraId]}?autoplay=1&muted=0`;
      }
      
      // En un sistema real, podríamos tener algo como:
      // return `${this.streamServer}/${this.selectedCamera.streamKey}/index.m3u8`;
      
      return null;
    },
    saveCameraSettings() {
      // Aquí puedes implementar la lógica para guardar los cambios
      // Por ejemplo, hacer una petición API o actualizar el estado
      
      // Mostrar una notificación
      const nuxtApp = useNuxtApp();
      if (nuxtApp.$notifications) {
        nuxtApp.$notifications.success('Configuración guardada correctamente');
      }
      
      // Cerrar el modal
      this.showCameraSettings = false;
      
      // Reiniciar la transmisión si es necesario
      if (this.selectedCamera.rtspUrl) {
        this.startRtspStream();
      }
    },
    checkMediaMTXConnection() {
      // Función de diagnóstico para verificar conexión con MediaMTX
      const testUrl = 'http://localhost:8889/';
      
      fetch(testUrl, { method: 'HEAD', mode: 'no-cors' })
        .then(_ => {
          console.log('MediaMTX está disponible');
          const nuxtApp = useNuxtApp();
          if (nuxtApp.$notifications) {
            nuxtApp.$notifications.success('Conexión a MediaMTX establecida');
          }
        })
        .catch(error => {
          console.error('Error de conexión a MediaMTX:', error);
          const nuxtApp = useNuxtApp();
          if (nuxtApp.$notifications) {
            nuxtApp.$notifications.error(`No se pudo conectar a MediaMTX en ${testUrl}. Verifique que el servidor esté en ejecución.`);
          }
        });
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

/* Mejoras para el modo oscuro */
.dark .bg-black {
  background-color: #000;
}

/* Animación suave para la transición entre modos */
.dark-mode-transition {
  transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease;
}

/* Estilo para tarjetas de cámaras */
.camera-card {
  transition: all 0.2s ease;
  position: relative;
  background-color: white;
}

.camera-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  border-color: rgba(59, 130, 246, 0.5);
}

.camera-card:hover .camera-overlay {
  background-opacity: 0.1 !important;
}

.camera-card:hover .camera-view-badge {
  background-color: rgb(37 99 235);
}

/* Mejora de visibilidad para cámara en modo oscuro */
.dark img {
  filter: brightness(1.15) contrast(1.1);
}

/* Estilos para los videos de cámara en vivo */
.camera-live-feed {
  position: relative;
}

.camera-controls {
  opacity: 0;
  transition: opacity 0.2s ease;
}

.camera-live-feed:hover .camera-controls {
  opacity: 1;
}

/* Fondo de la página con efecto solo en modo oscuro */
.dark .camera-background {
  position: relative;
  background-image: radial-gradient(circle at 80% 10%, rgba(59, 130, 246, 0.08) 0%, transparent 70%);
}

/* Color de fondo cálido para modo claro */
.bg-warm-50 {
  background-color: #f9f5f0; /* Tono beige suave */
}

/* Mejora para cámaras inactivas */
.camera-inactive {
  position: relative;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.camera-inactive-bg {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(240, 240, 240, 0.7) 0%, rgba(230, 230, 230, 0.95) 100%);
  z-index: 1;
}

.dark .camera-inactive-bg {
  background: linear-gradient(135deg, rgba(15, 23, 42, 0.5) 0%, rgba(3, 7, 18, 0.95) 100%);
  opacity: 0.7;
}
</style> 