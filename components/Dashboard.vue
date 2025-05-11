<template>
  <div class="dashboard-layout min-h-screen flex bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
    <!-- Barra lateral -->
    <DashboardSidebar 
      :username="username" 
      :userImage="userProfileImage"
      @reset-dashboard="resetDashboard"
      @show-cameras="showCamerasView"
      @show-statistics="showStatistics"
      @show-user-profile="showUserProfile"
      @logout="logout"
    />

    <!-- Contenido principal -->
    <div class="flex-1 flex flex-col overflow-hidden">
      <!-- Cabecera mejorada -->
      <header class="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm">
        <div class="p-4">
          <!-- Estadísticas generales -->
          <div class="grid grid-cols-4 gap-4">
            <div class="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 p-3 rounded-lg">
              <div class="flex justify-between items-center">
                <div>
                  <div class="text-xs text-gray-500 dark:text-gray-400">Total Estanques</div>
                  <div class="text-xl font-semibold text-blue-700 dark:text-blue-400">{{ ponds.length }}</div>
                </div>
                <div class="w-10 h-10 bg-blue-100 dark:bg-blue-800/30 rounded-lg flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-600 dark:text-blue-400 animate-pulse" style="animation-duration: 2s" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                </div>
              </div>
            </div>
            
            <div class="bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 p-3 rounded-lg">
              <div class="flex justify-between items-center">
                <div>
                  <div class="text-xs text-gray-500 dark:text-gray-400">Total Peces</div>
                  <div class="text-xl font-semibold text-green-700 dark:text-green-400">{{ getTotalFish() }}</div>
                </div>
                <div class="w-10 h-10 bg-green-100 dark:bg-green-800/30 rounded-lg flex items-center justify-center">
                  <svg class="h-6 w-6 text-green-600 dark:text-green-400 animate-bounce" style="animation-duration: 3s" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19.8978 12.4188C19.8417 12.2648 19.5335 11.4089 18.4217 10.6591C18.4217 10.6591 18.4217 10.6591 18.4217 10.6651C18.1136 10.4631 17.7372 10.2611 17.2926 10.0771C17.1524 10.031 17.0062 9.97895 16.854 9.92689C16.8359 9.93292 16.8118 9.93895 16.7937 9.95099C16.3371 10.1892 15.8564 10.3071 15.3698 10.3071C14.8772 10.3071 14.3905 10.1892 13.9399 9.95099C12.5779 9.18723 12.5779 7.78901 12.5779 7.48499V5.68727C12.5779 5.10747 12.3299 4.57564 11.909 4.19558C11.488 3.81552 10.9233 3.60147 10.3343 3.66557C9.44989 3.76368 8.77473 4.51541 8.77473 5.40735V7.4429C8.77473 7.74692 8.77473 9.13312 7.40668 9.89687C6.95006 10.1351 6.45145 10.2531 5.9649 10.2531C5.47832 10.2531 4.99172 10.1351 4.541 9.90291C4.52288 9.89086 4.49872 9.87884 4.4686 9.87281C4.31034 9.93089 4.15812 9.98897 4.01793 10.0471C3.57929 10.231 3.19682 10.4271 2.89475 10.6351C2.89475 10.6351 2.88874 10.6351 2.88874 10.6411C1.77702 11.3908 1.46892 12.2467 1.41274 12.4007C1.1167 13.1886 1.1167 14.0624 1.41274 14.8443C1.46892 14.9983 1.77702 15.8542 2.88874 16.604C2.88874 16.604 2.89475 16.604 2.89475 16.61C3.20283 16.812 3.5793 17.014 4.02394 17.198C4.16413 17.244 4.31634 17.2961 4.47461 17.348C4.49272 17.342 4.51687 17.336 4.53499 17.324C4.99172 17.086 5.47229 16.9679 5.9649 16.9679C6.45748 16.9679 6.94407 17.086 7.40069 17.324C8.76272 18.0877 8.76272 19.4859 8.76272 19.79V21.5877C8.76272 22.1675 9.01069 22.6993 9.43168 23.0794C9.85267 23.4594 10.4173 23.6735 11.0063 23.6094C11.8907 23.5112 12.5659 22.7595 12.5659 21.8676V19.832C12.5659 19.528 12.5659 18.1418 13.9339 17.3781C14.3905 17.1399 14.8832 17.0219 15.3698 17.0219C15.8564 17.0219 16.343 17.1399 16.7937 17.3721C16.8118 17.3841 16.8359 17.3961 16.866 17.3961C17.0243 17.3381 17.1765 17.28 17.3167 17.2219C17.7553 17.038 18.1437 16.842 18.4458 16.634C18.4458 16.634 18.4518 16.634 18.4518 16.628C19.5635 15.8782 19.8716 15.0223 19.9278 14.8683C20.212 14.0864 20.212 13.2186 19.8978 12.4188ZM4.37446 13.6453C4.37446 12.6031 5.22179 11.7593 6.26754 11.7593C7.31329 11.7593 8.16062 12.6031 8.16062 13.6453C8.16062 14.6875 7.31329 15.5312 6.26754 15.5312C5.22179 15.5312 4.37446 14.6875 4.37446 13.6453Z" fill="currentColor"/>
                  </svg>
                </div>
              </div>
            </div>
            
            <div class="bg-gradient-to-r from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20 p-3 rounded-lg">
              <div class="flex justify-between items-center">
                <div>
                  <div class="text-xs text-gray-500 dark:text-gray-400">Temp. Promedio</div>
                  <div class="text-xl font-semibold text-yellow-700 dark:text-yellow-400">{{ getAvgTempTotal() }}°C</div>
                </div>
                <div class="w-10 h-10 bg-yellow-100 dark:bg-yellow-800/30 rounded-lg flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-yellow-600 dark:text-yellow-400 animate-ping" style="animation-duration: 4s" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>
            
            <div class="bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 p-3 rounded-lg">
              <div class="flex justify-between items-center">
                <div>
                  <div class="text-xs text-gray-500 dark:text-gray-400">Biomasa Total</div>
                  <div class="text-xl font-semibold text-purple-700 dark:text-purple-400">{{ getTotalBiomass() }} kg</div>
                </div>
                <div class="w-10 h-10 bg-purple-100 dark:bg-purple-800/30 rounded-lg flex items-center justify-center">
                  <svg class="h-6 w-6 text-purple-600 dark:text-purple-400 animate-pulse" style="animation-duration: 2.5s" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3.74388 20.5L4.49988 16.5H17.6859L20.4999 9.5H7.31388L8.06988 5.5H21.2559L24.0699 5.68248e-04H0.929876L0.173828 4.0001H3.73988L0.925827 20H3.74388V20.5Z" fill="currentColor"/>
                    <path d="M7.925 24C9.4825 24 10.75 22.7325 10.75 21.175C10.75 19.6175 9.4825 18.35 7.925 18.35C6.3675 18.35 5.1 19.6175 5.1 21.175C5.1 22.7325 6.3675 24 7.925 24Z" fill="currentColor"/>
                    <path d="M19.925 24C21.4825 24 22.75 22.7325 22.75 21.175C22.75 19.6175 21.4825 18.35 19.925 18.35C18.3675 18.35 17.1 19.6175 17.1 21.175C17.1 22.7325 18.3675 24 19.925 24Z" fill="currentColor"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <!-- Contenido -->
      <main class="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-900 p-6">
        <!-- Resultados de búsqueda -->
        <div v-if="showSearchResults && searchResults.length > 0" class="mb-6">
          <div class="flex justify-between items-center mb-4">
            <h2 class="text-lg font-semibold text-gray-800 dark:text-white">
              Resultados de búsqueda: "{{ searchQuery }}"
            </h2>
            <button 
              @click="resetSearch" 
              class="flex items-center text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
              Cerrar búsqueda
            </button>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div v-for="pond in searchResults" :key="pond.id" 
                class="bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 cursor-pointer overflow-hidden search-result"
                @click="selectPond(pond)">
              <div class="p-4 border-b border-gray-100 dark:border-gray-700">
                <div class="flex justify-between items-center">
                  <h3 class="font-medium text-gray-800 dark:text-white">{{ pond.name }}</h3>
                  <span class="w-3 h-3 rounded-full" :class="getStatusDotClass(pond.status)"></span>
                </div>
                <div class="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {{ getZoneName(pond.zoneId) }}
                </div>
              </div>
              
              <div class="p-4">
                <div class="grid grid-cols-2 gap-3">
                  <div class="col-span-1">
                    <div class="text-xs text-gray-500 dark:text-gray-400 mb-1">Peces</div>
                    <div class="text-sm font-medium dark:text-gray-200">{{ pond.count }}</div>
                  </div>
                  <div class="col-span-1">
                    <div class="text-xs text-gray-500 dark:text-gray-400 mb-1">Temperatura</div>
                    <div class="text-sm font-medium dark:text-gray-200">{{ pond.temperature }}°C</div>
                  </div>
                </div>
              </div>
              
              <div class="px-4 py-3 bg-gray-50 dark:bg-gray-700 flex justify-between items-center">
                <div class="flex items-center">
                  <span class="px-2 py-1 text-xs rounded-full" :class="getStatusClass(pond.status)">
                    {{ getStatusLabel(pond.status) }}
                  </span>
                </div>
                <button class="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors">Ver detalle</button>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Secciones destacadas y advertencias -->
        <div v-if="!selectedZone && !selectedPond && !selectedView" class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <!-- Destacadas -->
          <div class="featured-card bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden border-l-4 border-blue-500 cursor-pointer"
               @click="showFeaturedView()"
               @mouseenter="featuredHovered = true"
               @mouseleave="featuredHovered = false"
               @mousemove="updateFeaturedGlowPosition($event)">
            <div class="glow-cursor glow-cursor-featured" v-if="featuredHovered"></div>
            <div class="p-4 border-b border-gray-100 dark:border-gray-700">
              <h3 class="font-medium text-gray-800 dark:text-white">Destacadas</h3>
            </div>
            <div class="p-4">
              <div class="flex items-center mb-4">
                <div class="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold mr-3">
                  {{ getBestZone().icon }}
                </div>
                <div>
                  <h4 class="font-medium text-gray-800 dark:text-white">{{ getBestZone().name }}</h4>
                  <p class="text-sm text-gray-500 dark:text-gray-400">Mejor rendimiento general</p>
                </div>
              </div>
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <div class="text-xs text-gray-500 mb-1 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                    </svg>
                    Estanques
                  </div>
                  <div class="text-sm font-medium">{{ getBestZone().pondCount }}</div>
                </div>
                <div>
                  <div class="text-xs text-gray-500 mb-1 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1 text-blue-500 animate-pulse" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M3 12v3c0 1.657 3.134 3 7 3s7-1.343 7-3v-3c0 1.657-3.134 3-7 3s-7-1.343-7-3z" />
                      <path d="M3 7v3c0 1.657 3.134 3 7 3s7-1.343 7-3V7c0 1.657-3.134 3-7 3S3 8.657 3 7z" />
                      <path d="M17 5c0 1.657-3.134 3-7 3S3 6.657 3 5s3.134-3 7-3 7 1.343 7 3z" />
                    </svg>
                    Peces
                  </div>
                  <div class="text-sm font-medium">{{ getBestZone().fishCount }}</div>
                </div>
                <div>
                  <div class="text-xs text-gray-500 mb-1 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1 text-green-500 animate-bounce" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd" />
                    </svg>
                    Salud promedio
                  </div>
                  <div class="text-sm font-medium text-green-600">{{ getBestZone().health }}</div>
                </div>
                <div>
                  <div class="text-xs text-gray-500 mb-1 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1 text-red-500 animate-ping" style="animation-duration: 3s;" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd" />
                    </svg>
                    Temperatura
                  </div>
                  <div class="text-sm font-medium">{{ getBestZone().temperature }}°C</div>
                </div>
              </div>
            </div>
          </div>

          <!-- Advertencias -->
          <div class="warning-card bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden border-l-4 border-red-500 cursor-pointer"
               @click="showWarningsView()"
               @mouseenter="warningHovered = true"
               @mouseleave="warningHovered = false"
               @mousemove="updateWarningGlowPosition($event)">
            <div class="glow-cursor glow-cursor-warning" v-if="warningHovered"></div>
            <div class="p-4 border-b border-gray-100 dark:border-gray-700">
              <h3 class="font-medium text-gray-800 dark:text-white">Advertencias</h3>
            </div>
            <div class="p-4">
              <div v-if="getWarnings().length === 0" class="text-center py-4 text-gray-500 dark:text-gray-400">
                No hay advertencias activas
              </div>
              <div v-else class="space-y-3">
                <div 
                  v-for="(warning, index) in getWarnings()" 
                  :key="index" 
                  class="p-3 rounded-lg flex items-start"
                  :class="{
                    'bg-red-50 dark:bg-red-900/20': warning.status === 'danger',
                    'bg-yellow-50 dark:bg-yellow-900/20': warning.status === 'warning'
                  }"
                >
                  <div 
                    class="w-8 h-8 rounded-full flex items-center justify-center mr-3 flex-shrink-0"
                    :class="{
                      'bg-red-100 dark:bg-red-800/30 text-red-600 dark:text-red-400': warning.status === 'danger',
                      'bg-yellow-100 dark:bg-yellow-800/30 text-yellow-600 dark:text-yellow-400': warning.status === 'warning'
                    }"
                  >
                    <svg v-if="warning.status === 'danger'" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
                    </svg>
                    <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h4 
                      class="font-medium"
                      :class="{
                        'text-red-800 dark:text-red-300': warning.status === 'danger',
                        'text-yellow-800 dark:text-yellow-300': warning.status === 'warning'
                      }"
                    >
                      {{ warning.title }}
                    </h4>
                    <p 
                      class="text-sm"
                      :class="{
                        'text-red-600 dark:text-red-400': warning.status === 'danger',
                        'text-yellow-600 dark:text-yellow-400': warning.status === 'warning'
                      }"
                    >
                      {{ warning.message }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Zonas de estanques -->
        <div v-if="!selectedZone && !selectedPond && !selectedView" class="mb-6">
          <h2 class="text-lg font-semibold text-gray-800 dark:text-white mb-4">Zonas de Estanques</h2>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div v-for="zoneId in [1, 2, 3]" :key="zoneId" 
                class="zone-card bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 cursor-pointer overflow-hidden"
                :class="{
                  'pulsing-glow': zoneGlowing === zoneId,
                  'zone-glow-1': zoneId === 1,
                  'zone-glow-2': zoneId === 2,
                  'zone-glow-3': zoneId === 3
                }"
                @click="showZoneDetails(zoneId); pulseZoneGlow(zoneId)"
                @mouseenter="zoneHovered = zoneId"
                @mouseleave="zoneHovered = null"
                @mousemove="updateGlowPosition($event)">
              <div :class="`glow-cursor glow-cursor-zone-${zoneId}`" v-if="zoneHovered === zoneId" ref="glowCursor"></div>
              <div class="p-4 border-b border-gray-100 dark:border-gray-700">
                <div class="flex justify-between items-center">
                  <h3 class="font-medium text-gray-800 dark:text-white">
                    {{ zoneId === 1 ? 'Zona Norte' : zoneId === 2 ? 'Zona Central' : 'Zona Sur' }}
                  </h3>
                  <span class="text-xs font-semibold px-2 py-1 rounded-full" 
                      :class="getZoneStatusClass(zoneId)">
                    {{ getZoneStatus(zoneId) }}
                  </span>
                </div>
              </div>
              <div class="p-4 dark:text-gray-300">
                <div class="flex justify-between mb-2">
                  <span class="text-sm text-gray-500 dark:text-gray-400">Estanques</span>
                  <span class="text-sm font-medium">{{ getPondsByZone(zoneId).length }}</span>
                </div>
                <div class="flex justify-between mb-2">
                  <span class="text-sm text-gray-500 dark:text-gray-400">Peces</span>
                  <span class="text-sm font-medium">{{ getTotalFishByZone(zoneId) }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-sm text-gray-500 dark:text-gray-400">Temp. Prom.</span>
                  <span class="text-sm font-medium">{{ getAvgTempByZone(zoneId) }}°C</span>
                </div>
              </div>
              <div class="px-4 py-3 bg-gray-50 dark:bg-gray-700 flex justify-between items-center">
                <div class="avatars flex -space-x-2">
                  <div v-for="(pond, index) in getPondsByZone(zoneId).slice(0, 3)" :key="pond.id" 
                      class="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-medium"
                      :class="getBackgroundClass(index)">
                    {{ pond.name.substring(0, 1) }}
                  </div>
                </div>
                <button class="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors">Detalles</button>
              </div>
            </div>
          </div>
        </div>

        <!-- Detalle de Zona Seleccionada -->
        <div v-if="selectedZone && !selectedPond" class="mb-6">
          <div class="flex justify-between items-center mb-4">
            <h2 class="text-lg font-semibold text-gray-800 dark:text-white">
              {{ selectedZone === 1 ? 'Zona Norte' : selectedZone === 2 ? 'Zona Central' : 'Zona Sur' }}
            </h2>
            <button 
              @click="selectedZone = null" 
              class="flex items-center text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clip-rule="evenodd" />
              </svg>
              Volver a zonas
            </button>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div v-for="pond in getPondsByZone(selectedZone)" :key="pond.id" 
                class="pond-card bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 cursor-pointer overflow-hidden"
                :class="{
                  'pulsing-glow': pondGlowing === pond.id,
                  'pond-glow-1': selectedZone === 1,
                  'pond-glow-2': selectedZone === 2,
                  'pond-glow-3': selectedZone === 3
                }"
                @click="selectPond(pond); pulsePondGlow(pond.id)"
                @mouseenter="pondHovered = pond.id"
                @mouseleave="pondHovered = null"
                @mousemove="updatePondGlowPosition($event)">
              <div :class="`glow-cursor glow-cursor-pond-${selectedZone}`" v-if="pondHovered === pond.id"></div>
              <div class="p-4 border-b border-gray-100 dark:border-gray-700">
                <div class="flex justify-between items-center">
                  <h3 class="font-medium text-gray-800 dark:text-white">{{ pond.name }}</h3>
                  <span class="w-3 h-3 rounded-full" :class="getStatusDotClass(pond.status)"></span>
                </div>
              </div>
              
              <div class="p-4">
                <div class="grid grid-cols-2 gap-3">
                  <div class="col-span-1">
                    <div class="text-xs text-gray-500 dark:text-gray-400 mb-1">Peces</div>
                    <div class="text-sm font-medium dark:text-gray-200">{{ pond.count }}</div>
                  </div>
                  <div class="col-span-1">
                    <div class="text-xs text-gray-500 dark:text-gray-400 mb-1">Temperatura</div>
                    <div class="text-sm font-medium dark:text-gray-200">{{ pond.temperature }}°C</div>
                  </div>
                </div>
              </div>
              
              <div class="px-4 py-3 bg-gray-50 dark:bg-gray-700 flex justify-between items-center">
                <div class="flex items-center">
                  <span class="px-2 py-1 text-xs rounded-full" :class="getStatusClass(pond.status)">
                    {{ getStatusLabel(pond.status) }}
                  </span>
                </div>
                <button class="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors">Ver completo</button>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Detalle de Estanque Seleccionado -->
        <div v-if="selectedPond" class="mb-6">
          <div class="flex justify-between items-center mb-4">
            <h2 class="text-lg font-semibold text-gray-800 dark:text-white">{{ selectedPond.name }}</h2>
            <button 
              @click="backFromPondDetail" 
              class="flex items-center text-sm bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors shadow-md ml-auto"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clip-rule="evenodd" />
              </svg>
              {{ selectedZone ? 'Volver a zona' : 'Volver al dashboard' }}
            </button>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <!-- Tarjeta principal -->
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow">
              <div class="p-4 border-b border-gray-200 dark:border-gray-700">
                <div class="flex justify-between items-center">
                  <div class="flex items-center">
                    <div class="w-10 h-10 rounded-full flex items-center justify-center mr-3 text-white font-medium"
                        :class="getPondAvatarClass(selectedPond)">
                      {{ selectedPond.name.substring(0, 1) }}
                    </div>
                    <div>
                      <h3 class="font-medium text-gray-800 dark:text-white">{{ selectedPond.name }}</h3>
                      <div class="text-xs text-gray-500 dark:text-gray-400">
                        Zona {{ selectedPond.zoneId === 1 ? 'Norte' : selectedPond.zoneId === 2 ? 'Central' : 'Sur' }}
                      </div>
                    </div>
                  </div>
                  <span class="px-2 py-1 text-xs rounded-full" :class="getStatusClass(selectedPond.status)">
                    {{ getStatusLabel(selectedPond.status) }}
                  </span>
                </div>
              </div>
              
              <div class="p-4">
                <div class="grid grid-cols-2 gap-4 mb-6">
                  <div class="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3">
                    <div class="text-xs text-gray-500 dark:text-gray-400 mb-1">Población</div>
                    <div class="text-xl font-medium text-blue-700 dark:text-blue-400">{{ selectedPond.count }}</div>
                    <div class="text-xs text-gray-500 dark:text-gray-400">peces</div>
                  </div>
                  <div class="bg-green-50 dark:bg-green-900/20 rounded-lg p-3">
                    <div class="text-xs text-gray-500 dark:text-gray-400 mb-1">Biomasa</div>
                    <div class="text-xl font-medium text-green-700 dark:text-green-400">{{ selectedPond.biomass }}</div>
                    <div class="text-xs text-gray-500 dark:text-gray-400">kg</div>
                  </div>
                </div>
                
                <div class="space-y-4">
                  <!-- Temperatura -->
                  <div>
                    <div class="flex justify-between mb-1">
                      <div class="text-sm font-medium flex items-center text-gray-800 dark:text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1 text-blue-600 dark:text-blue-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                          <path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z" />
                        </svg>
                        Temperatura
                      </div>
                      <div class="text-sm font-medium text-blue-600 dark:text-blue-400">{{ selectedPond.temperature }}°C</div>
                    </div>
                    <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div class="bg-blue-600 dark:bg-blue-500 h-2 rounded-full" 
                          :style="`width: ${getTempPercentage(selectedPond.temperature)}%`"></div>
                    </div>
                  </div>
                  
                  <!-- Nivel de oxígeno -->
                  <div>
                    <div class="flex justify-between mb-1">
                      <div class="text-sm font-medium flex items-center text-gray-800 dark:text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" :class="getIconColorClass(selectedPond.oxygen)" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z" />
                        </svg>
                        Oxígeno
                      </div>
                      <div class="text-sm font-medium" :class="getTextColorClass(selectedPond.oxygen)">
                        {{ selectedPond.oxygenLabel }}
                      </div>
                    </div>
                    <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div class="h-2 rounded-full" 
                          :class="getBarColorClass(selectedPond.oxygen)"
                          :style="`width: ${getOxygenPercentage(selectedPond.oxygen)}`"></div>
                    </div>
                  </div>
                  
                  <!-- Nivel de agua -->
                  <div>
                    <div class="flex justify-between mb-1">
                      <div class="text-sm font-medium flex items-center text-gray-800 dark:text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1 text-blue-600 dark:text-blue-400 animate-bounce" style="animation-duration: 3s;" viewBox="0 0 20 20" fill="currentColor">
                          <path fill-rule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                        </svg>
                        Nivel de agua
                      </div>
                      <div class="text-sm font-medium text-blue-600 dark:text-blue-400">{{ selectedPond.waterLevel }}%</div>
                    </div>
                    <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div class="bg-blue-600 dark:bg-blue-500 h-2 rounded-full" 
                          :style="`width: ${selectedPond.waterLevel}%`"></div>
                    </div>
                  </div>
                  
                  <!-- Nivel de luz -->
                  <div>
                    <div class="flex justify-between mb-1">
                      <div class="text-sm font-medium flex items-center text-gray-800 dark:text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1 text-yellow-600 dark:text-yellow-400 animate-pulse" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.476.859h4.002z" />
                        </svg>
                        Nivel de luz
                      </div>
                      <div class="text-sm font-medium text-yellow-600 dark:text-yellow-400">{{ selectedPond.lightLevel }}%</div>
                    </div>
                    <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div class="bg-yellow-500 dark:bg-yellow-400 h-2 rounded-full" 
                          :style="`width: ${selectedPond.lightLevel}%`"></div>
                    </div>
                  </div>
                  
                  <!-- Desperdicio de pellet -->
                  <div>
                    <div class="flex justify-between mb-1">
                      <div class="text-sm font-medium flex items-center text-gray-800 dark:text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" :class="selectedPond.pelletWaste > 40 ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400'" viewBox="0 0 20 20" fill="currentColor">
                          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586l-1.707 1.707a1 1 0 001.414 1.414l2-2a1 1 0 00.293-.707V7z" clip-rule="evenodd" />
                        </svg>
                        Desperdicio pellet
                      </div>
                      <div class="text-sm font-medium" 
                          :class="selectedPond.pelletWaste > 40 ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400'">
                        {{ selectedPond.pelletWaste }}%
                      </div>
                    </div>
                    <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div class="h-2 rounded-full" 
                          :class="selectedPond.pelletWaste > 40 ? 'bg-red-500 dark:bg-red-400' : 'bg-green-500 dark:bg-green-400'"
                          :style="`width: ${selectedPond.pelletWaste}%`"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Tarjeta de webcam y corriente -->
            <div class="space-y-6">
              <div class="bg-white dark:bg-gray-800 rounded-lg shadow">
                <div class="p-4 border-b border-gray-200 dark:border-gray-700">
                  <h3 class="font-medium text-gray-800 dark:text-white">Corriente y flujo</h3>
                </div>
                <div class="p-4">
                  <div class="flex justify-between mb-4">
                    <div>
                      <div class="text-sm text-gray-500 dark:text-gray-400">Corriente</div>
                      <div class="text-lg font-medium" :class="getCurrentClass(selectedPond.current)">
                        {{ selectedPond.currentLabel }}
                      </div>
                    </div>
                    <div>
                      <div class="text-sm text-gray-500 dark:text-gray-400">Estado flujo</div>
                      <div class="flex items-center">
                        <span class="w-3 h-3 rounded-full mr-2" 
                            :class="getFlowStatusClass(selectedPond.flowStatus)"></span>
                        <span class="text-lg font-medium text-gray-800 dark:text-white">
                          {{ getFlowStatusLabel(selectedPond.flowStatus) }}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div class="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 flex items-center justify-center h-32">
                    <div class="text-center">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mx-auto text-blue-300 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                      <div class="mt-2 text-sm text-gray-500 dark:text-gray-400">Visualización de corriente</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div class="bg-white dark:bg-gray-800 rounded-lg shadow">
                <div class="p-4 border-b border-gray-200 dark:border-gray-700">
                  <h3 class="font-medium text-gray-800 dark:text-white">Webcam en vivo</h3>
                </div>
                <div class="p-4">
                  <div class="bg-gray-900 rounded-lg overflow-hidden h-48 flex items-center justify-center">
                    <div class="text-center text-gray-400">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      <div class="text-sm">Transmisión no disponible</div>
                    </div>
                  </div>
                  
                  <div class="mt-3 flex justify-end">
                    <button class="bg-blue-600 text-white text-sm py-2 px-4 rounded hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600">
                      Activar cámara
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Vista detallada de Destacados -->
        <div v-if="selectedView === 'featured'" class="mb-6">
          <div class="flex justify-between items-center mb-4">
            <h2 class="text-lg font-semibold text-gray-800 dark:text-white">
              Destacados - {{ getBestZone().name }}
            </h2>
            <button 
              @click="backToMainView" 
              class="flex items-center text-sm bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors shadow-md ml-auto"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clip-rule="evenodd" />
              </svg>
              Volver al dashboard
            </button>
          </div>
          
          <!-- Información de por qué es una zona destacada -->
          <div class="bg-white dark:bg-gray-800 rounded-lg shadow mb-6">
            <div class="p-4 border-b border-gray-100 dark:border-gray-700">
              <h3 class="font-medium text-gray-800 dark:text-white">Análisis de rendimiento</h3>
            </div>
            <div class="p-6">
              <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 class="text-lg font-medium text-gray-800 dark:text-white mb-4">Factores de éxito</h4>
                  <ul class="space-y-3">
                    <li class="flex items-start">
                      <div class="flex-shrink-0 w-5 h-5 rounded-full bg-green-500 mt-1 mr-3 flex items-center justify-center text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                          <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <p class="font-medium text-gray-800 dark:text-white">Distribución óptima de peces</p>
                        <p class="text-sm text-gray-600 dark:text-gray-400">{{ getBestZone().fishCount }} peces distribuidos en {{ getBestZone().pondCount }} estanques, manteniendo una densidad ideal por estanque.</p>
                      </div>
                    </li>
                    <li class="flex items-start">
                      <div class="flex-shrink-0 w-5 h-5 rounded-full bg-green-500 mt-1 mr-3 flex items-center justify-center text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                          <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <p class="font-medium text-gray-800 dark:text-white">Control de temperatura preciso</p>
                        <p class="text-sm text-gray-600 dark:text-gray-400">Mantiene una temperatura estable de {{ getBestZone().temperature }}°C, ideal para el crecimiento y metabolismo de los peces.</p>
                      </div>
                    </li>
                    <li class="flex items-start">
                      <div class="flex-shrink-0 w-5 h-5 rounded-full bg-green-500 mt-1 mr-3 flex items-center justify-center text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                          <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <p class="font-medium text-gray-800 dark:text-white">Oxigenación superior</p>
                        <p class="text-sm text-gray-600 dark:text-gray-400">Sistema de oxigenación automático que mantiene niveles óptimos en todos los estanques.</p>
                      </div>
                    </li>
                    <li class="flex items-start">
                      <div class="flex-shrink-0 w-5 h-5 rounded-full bg-green-500 mt-1 mr-3 flex items-center justify-center text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                          <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <p class="font-medium text-gray-800 dark:text-white">Alimentación eficiente</p>
                        <p class="text-sm text-gray-600 dark:text-gray-400">Sistema de alimentación programado con menor desperdicio de pellet y mejor conversión alimenticia.</p>
                      </div>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h4 class="text-lg font-medium text-gray-800 dark:text-white mb-4">Estrategias transferibles</h4>
                  <ul class="space-y-3">
                    <li class="flex items-start">
                      <div class="flex-shrink-0 w-6 h-6 rounded-full bg-blue-500 mt-1 mr-3 flex items-center justify-center text-white">
                        <span class="text-xs">1</span>
                      </div>
                      <div>
                        <p class="font-medium text-gray-800 dark:text-white">Sistema de oxigenación por tiempo</p>
                        <p class="text-sm text-gray-600 dark:text-gray-400">Implementar ciclos de oxigenación cada 3 horas durante 20 minutos, como en {{ getBestZone().name }}.</p>
                      </div>
                    </li>
                    <li class="flex items-start">
                      <div class="flex-shrink-0 w-6 h-6 rounded-full bg-blue-500 mt-1 mr-3 flex items-center justify-center text-white">
                        <span class="text-xs">2</span>
                      </div>
                      <div>
                        <p class="font-medium text-gray-800 dark:text-white">Redistribución de biomasa</p>
                        <p class="text-sm text-gray-600 dark:text-gray-400">Limitar la densidad a máximo {{ Math.round(getBestZone().fishCount / getBestZone().pondCount * 1.1) }} peces por estanque para óptima circulación.</p>
                      </div>
                    </li>
                    <li class="flex items-start">
                      <div class="flex-shrink-0 w-6 h-6 rounded-full bg-blue-500 mt-1 mr-3 flex items-center justify-center text-white">
                        <span class="text-xs">3</span>
                      </div>
                      <div>
                        <p class="font-medium text-gray-800 dark:text-white">Monitoreo preventivo</p>
                        <p class="text-sm text-gray-600 dark:text-gray-400">Implementar sistema de alertas tempranas siguiendo los umbrales establecidos en {{ getBestZone().name }}.</p>
                      </div>
                    </li>
                    <li class="flex items-start">
                      <div class="flex-shrink-0 w-6 h-6 rounded-full bg-blue-500 mt-1 mr-3 flex items-center justify-center text-white">
                        <span class="text-xs">4</span>
                      </div>
                      <div>
                        <p class="font-medium text-gray-800 dark:text-white">Sistema de alimentación optimizado</p>
                        <p class="text-sm text-gray-600 dark:text-gray-400">Adaptar horarios de alimentación a 4 veces por día en cantidades menores para mejor absorción.</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <!-- Comparativa entre zonas -->
          <div v-if="selectedView === 'featured'" class="bg-white dark:bg-gray-800 rounded-lg shadow mb-6">
            <div class="p-4 border-b border-gray-100 dark:border-gray-700">
              <h3 class="font-medium text-gray-800 dark:text-white">Estado comparativo de zonas</h3>
            </div>
            <div class="p-6">
              <div class="overflow-x-auto">
                <table class="min-w-full bg-white dark:bg-gray-800 rounded-lg overflow-hidden">
                  <thead class="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Zona</th>
                      <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Estanques</th>
                      <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Salud General</th>
                      <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Temperatura</th>
                      <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Rendimiento</th>
                      <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Acciones</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
                    <tr v-for="zoneId in [1, 2, 3]" :key="zoneId" :class="zoneId === getBestZone().zoneId ? 'bg-blue-50 dark:bg-blue-900/20' : ''">
                      <td class="px-4 py-3 whitespace-nowrap">
                        <div class="flex items-center">
                          <div class="w-8 h-8 rounded-full flex items-center justify-center mr-3 text-white font-medium"
                              :class="zoneId === 1 ? 'bg-blue-500' : zoneId === 2 ? 'bg-purple-500' : 'bg-cyan-500'">
                            {{ zoneId === 1 ? 'N' : zoneId === 2 ? 'C' : 'S' }}
                          </div>
                          <span class="font-medium text-gray-800 dark:text-white">{{ getZoneName(zoneId) }}</span>
                        </div>
                      </td>
                      <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                        {{ getPondsByZone(zoneId).length }}
                      </td>
                      <td class="px-4 py-3 whitespace-nowrap">
                        <span class="px-2 py-1 text-xs rounded-full" :class="getZoneStatusClass(zoneId)">
                          {{ getZoneStatus(zoneId) }}
                        </span>
                      </td>
                      <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                        {{ getAvgTempByZone(zoneId) }}°C
                      </td>
                      <td class="px-4 py-3 whitespace-nowrap">
                        <div class="flex items-center">
                          <div class="w-16 bg-gray-200 dark:bg-gray-700 rounded-full h-2 mr-2">
                            <div class="h-2 rounded-full" 
                                 :class="zoneId === getBestZone().zoneId ? 'bg-blue-500' : 'bg-gray-400 dark:bg-gray-500'"
                                 :style="`width: ${getZonePerformanceScore(zoneId)}%`"></div>
                          </div>
                          <span class="text-sm font-medium" 
                                :class="zoneId === getBestZone().zoneId ? 'text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-400'">
                            {{ getZonePerformanceScore(zoneId) }}%
                          </span>
                        </div>
                      </td>
                      <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                        <button v-if="zoneId !== getBestZone().zoneId" 
                                class="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-md text-xs"
                                @click="showZoneDetails(zoneId)">
                          Ver zona
                        </button>
                        <span v-else class="text-xs text-green-600 dark:text-green-400 font-medium">Zona destacada</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <!-- Métricas clave -->
          <div v-if="selectedView === 'featured'" class="bg-white dark:bg-gray-800 rounded-lg shadow">
            <div class="p-4 border-b border-gray-100 dark:border-gray-700">
              <h3 class="font-medium text-gray-800 dark:text-white">Métricas clave por zona</h3>
            </div>
            <div class="p-6">
              <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div class="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-100 dark:border-gray-700">
                  <h5 class="text-sm font-medium text-gray-800 dark:text-white mb-3 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M3 3a1 1 0 000 2h10a1 1 0 100-2H3zm0 4a1 1 0 000 2h10a1 1 0 100-2H3zm0 4a1 1 0 100 2h10a1 1 0 100-2H3z" clip-rule="evenodd" />
                      <path d="M15 8a1 1 0 100-2 1 1 0 000 2zm0 4a1 1 0 100-2 1 1 0 000 2z" />
                    </svg>
                    Población promedio por estanque
                  </h5>
                  <div class="space-y-3">
                    <div v-for="zoneId in [1, 2, 3]" :key="`pop-${zoneId}`">
                      <div class="flex justify-between text-xs mb-1">
                        <span class="text-gray-500 dark:text-gray-400">{{ getZoneName(zoneId) }}</span>
                        <span class="font-medium" :class="zoneId === getBestZone().zoneId ? 'text-blue-600 dark:text-blue-400' : 'text-gray-700 dark:text-gray-300'">
                          {{ Math.round(getTotalFishByZone(zoneId) / getPondsByZone(zoneId).length) }}
                        </span>
                      </div>
                      <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                        <div class="h-1.5 rounded-full" 
                            :class="zoneId === getBestZone().zoneId ? 'bg-blue-500' : 'bg-gray-400 dark:bg-gray-500'"
                            :style="`width: ${Math.min(100, (getTotalFishByZone(zoneId) / getPondsByZone(zoneId).length) / 2)}%`"></div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div class="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-100 dark:border-gray-700">
                  <h5 class="text-sm font-medium text-gray-800 dark:text-white mb-3 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd" />
                    </svg>
                    Temperatura promedio
                  </h5>
                  <div class="space-y-3">
                    <div v-for="zoneId in [1, 2, 3]" :key="`temp-${zoneId}`">
                      <div class="flex justify-between text-xs mb-1">
                        <span class="text-gray-500 dark:text-gray-400">{{ getZoneName(zoneId) }}</span>
                        <span class="font-medium" :class="zoneId === getBestZone().zoneId ? 'text-blue-600 dark:text-blue-400' : 'text-gray-700 dark:text-gray-300'">
                          {{ getAvgTempByZone(zoneId) }}°C
                        </span>
                      </div>
                      <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                        <div class="h-1.5 rounded-full" 
                            :class="zoneId === getBestZone().zoneId ? 'bg-blue-500' : 'bg-gray-400 dark:bg-gray-500'"
                            :style="`width: ${getTempPercentage(parseFloat(getAvgTempByZone(zoneId)))}%`"></div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div class="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-100 dark:border-gray-700">
                  <h5 class="text-sm font-medium text-gray-800 dark:text-white mb-3 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M5 3a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V5a2 2 0 00-2-2H5zm9 4a1 1 0 10-2 0v6a1 1 0 102 0V7zm-3 2a1 1 0 10-2 0v4a1 1 0 102 0V9zm-3 3a1 1 0 10-2 0v1a1 1 0 102 0v-1z" clip-rule="evenodd" />
                    </svg>
                    Salud general
                  </h5>
                  <div class="space-y-3">
                    <div v-for="zoneId in [1, 2, 3]" :key="`health-${zoneId}`">
                      <div class="flex justify-between text-xs mb-1">
                        <span class="text-gray-500 dark:text-gray-400">{{ getZoneName(zoneId) }}</span>
                        <span class="font-medium" :class="zoneId === getBestZone().zoneId ? 'text-blue-600 dark:text-blue-400' : 'text-gray-700 dark:text-gray-300'">
                          {{ getZoneHealthPercentage(zoneId) }}%
                        </span>
                      </div>
                      <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                        <div class="h-1.5 rounded-full" 
                            :class="zoneId === getBestZone().zoneId ? 'bg-blue-500' : 'bg-gray-400 dark:bg-gray-500'"
                            :style="`width: ${getZoneHealthPercentage(zoneId)}%`"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Vista detallada de Advertencias -->
        <div v-if="selectedView === 'warnings'" class="mb-6">
          <div class="flex justify-between items-center mb-4">
            <h2 class="text-lg font-semibold text-gray-800 dark:text-white">
              Análisis de alertas y recomendaciones
            </h2>
            <button 
              @click="backToMainView" 
              class="flex items-center text-sm bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors shadow-md ml-auto"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clip-rule="evenodd" />
              </svg>
              Volver al dashboard
            </button>
          </div>

          <!-- Análisis de causas y recomendaciones -->
          <div class="bg-white dark:bg-gray-800 rounded-lg shadow mb-6">
            <div class="p-4 border-b border-gray-100 dark:border-gray-700">
              <h3 class="font-medium text-gray-800 dark:text-white">Análisis de causas y recomendaciones</h3>
            </div>
            <div class="p-6">
              <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 class="text-lg font-medium text-gray-800 dark:text-white mb-4">Causas principales</h4>
                  <ul class="space-y-3">
                    <li class="flex items-start">
                      <div class="flex-shrink-0 w-5 h-5 rounded-full bg-red-500 mt-1 mr-3 flex items-center justify-center text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                          <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <p class="font-medium text-gray-800 dark:text-white">Sistemas de oxigenación deficientes</p>
                        <p class="text-sm text-gray-600 dark:text-gray-400">Los estanques con niveles bajos de oxígeno muestran fallas en los sistemas automáticos de circulación y oxigenación.</p>
                      </div>
                    </li>
                    <li class="flex items-start">
                      <div class="flex-shrink-0 w-5 h-5 rounded-full bg-red-500 mt-1 mr-3 flex items-center justify-center text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                          <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <p class="font-medium text-gray-800 dark:text-white">Temperaturas elevadas</p>
                        <p class="text-sm text-gray-600 dark:text-gray-400">Incremento en temperaturas por encima de los 20°C, acelerando el metabolismo de los peces y reduciendo la capacidad del agua para retener oxígeno.</p>
                      </div>
                    </li>
                    <li class="flex items-start">
                      <div class="flex-shrink-0 w-5 h-5 rounded-full bg-red-500 mt-1 mr-3 flex items-center justify-center text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                          <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <p class="font-medium text-gray-800 dark:text-white">Sobredensidad de peces</p>
                        <p class="text-sm text-gray-600 dark:text-gray-400">Estanques con densidad de población excesiva, particularmente en la Zona Sur, limitando la disponibilidad de oxígeno por individuo.</p>
                      </div>
                    </li>
                    <li class="flex items-start">
                      <div class="flex-shrink-0 w-5 h-5 rounded-full bg-red-500 mt-1 mr-3 flex items-center justify-center text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                          <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <p class="font-medium text-gray-800 dark:text-white">Gestión ineficiente de alimentación</p>
                        <p class="text-sm text-gray-600 dark:text-gray-400">Alto desperdicio de pellet que contribuye a la descomposición y consumo de oxígeno en los estanques afectados.</p>
                      </div>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h4 class="text-lg font-medium text-gray-800 dark:text-white mb-4">Acciones recomendadas</h4>
                  <ul class="space-y-3">
                    <li class="flex items-start">
                      <div class="flex-shrink-0 w-6 h-6 rounded-full bg-amber-500 mt-1 mr-3 flex items-center justify-center text-white">
                        <span class="text-xs">1</span>
                      </div>
                      <div>
                        <p class="font-medium text-gray-800 dark:text-white">Activación de oxigenadores de emergencia</p>
                        <p class="text-sm text-gray-600 dark:text-gray-400">Iniciar oxigenación intensiva inmediata en Punta Austral y Talofa Sur para elevar niveles a rangos normales.</p>
                      </div>
                    </li>
                    <li class="flex items-start">
                      <div class="flex-shrink-0 w-6 h-6 rounded-full bg-amber-500 mt-1 mr-3 flex items-center justify-center text-white">
                        <span class="text-xs">2</span>
                      </div>
                      <div>
                        <p class="font-medium text-gray-800 dark:text-white">Reducción controlada de biomasa</p>
                        <p class="text-sm text-gray-600 dark:text-gray-400">Trasladar 20-30% de la población de Punta Austral a estanques con menor densidad para aliviar la presión sobre los recursos.</p>
                      </div>
                    </li>
                    <li class="flex items-start">
                      <div class="flex-shrink-0 w-6 h-6 rounded-full bg-amber-500 mt-1 mr-3 flex items-center justify-center text-white">
                        <span class="text-xs">3</span>
                      </div>
                      <div>
                        <p class="font-medium text-gray-800 dark:text-white">Implementación de sistema de enfriamiento</p>
                        <p class="text-sm text-gray-600 dark:text-gray-400">Activar sistemas de enfriamiento de agua en los estanques con temperaturas superiores a 20°C para reducir el estrés térmico.</p>
                      </div>
                    </li>
                    <li class="flex items-start">
                      <div class="flex-shrink-0 w-6 h-6 rounded-full bg-amber-500 mt-1 mr-3 flex items-center justify-center text-white">
                        <span class="text-xs">4</span>
                      </div>
                      <div>
                        <p class="font-medium text-gray-800 dark:text-white">Ajuste de protocolos de alimentación</p>
                        <p class="text-sm text-gray-600 dark:text-gray-400">Reducir temporalmente la alimentación en un 30% y modificar horarios para minimizar el impacto sobre los niveles de oxígeno.</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <!-- Distribución de alertas por zona -->
          <div class="bg-white dark:bg-gray-800 rounded-lg shadow mb-6">
            <div class="p-4 border-b border-gray-100 dark:border-gray-700">
              <h3 class="font-medium text-gray-800 dark:text-white">Distribución de alertas por zona</h3>
            </div>
            <div class="p-6">
              <div class="overflow-x-auto">
                <table class="min-w-full bg-white dark:bg-gray-800 rounded-lg overflow-hidden">
                  <thead class="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Zona</th>
                      <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Estanques Totales</th>
                      <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Alertas</th>
                      <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Críticos</th>
                      <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">% Afectado</th>
                      <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Acciones</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
                    <tr v-for="zoneId in [1, 2, 3]" :key="zoneId" :class="zoneId === 3 ? 'bg-red-50 dark:bg-red-900/20' : (zoneId === 2 ? 'bg-yellow-50 dark:bg-yellow-900/20' : '')">
                      <td class="px-4 py-3 whitespace-nowrap">
                        <div class="flex items-center">
                          <div class="w-8 h-8 rounded-full flex items-center justify-center mr-3 text-white font-medium"
                              :class="zoneId === 1 ? 'bg-blue-500' : zoneId === 2 ? 'bg-purple-500' : 'bg-red-500'">
                            {{ zoneId === 1 ? 'N' : zoneId === 2 ? 'C' : 'S' }}
                          </div>
                          <span class="font-medium text-gray-800 dark:text-white">{{ getZoneName(zoneId) }}</span>
                        </div>
                      </td>
                      <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                        {{ getPondsByZone(zoneId).length }}
                      </td>
                      <td class="px-4 py-3 whitespace-nowrap text-sm">
                        <span :class="getWarningCountByZone(zoneId).warning > 0 ? 'text-yellow-600 dark:text-yellow-400 font-medium' : 'text-gray-600 dark:text-gray-400'">
                          {{ getWarningCountByZone(zoneId).warning }}
                        </span>
                      </td>
                      <td class="px-4 py-3 whitespace-nowrap text-sm">
                        <span :class="getWarningCountByZone(zoneId).danger > 0 ? 'text-red-600 dark:text-red-400 font-medium' : 'text-gray-600 dark:text-gray-400'">
                          {{ getWarningCountByZone(zoneId).danger }}
                        </span>
                      </td>
                      <td class="px-4 py-3 whitespace-nowrap">
                        <div class="flex items-center">
                          <div class="w-16 bg-gray-200 dark:bg-gray-700 rounded-full h-2 mr-2">
                            <div class="h-2 rounded-full" 
                                  :class="getAffectedPercentageByZone(zoneId) > 50 ? 'bg-red-500' : getAffectedPercentageByZone(zoneId) > 20 ? 'bg-yellow-500' : 'bg-gray-400 dark:bg-gray-500'"
                                  :style="`width: ${getAffectedPercentageByZone(zoneId)}%`"></div>
                          </div>
                          <span class="text-sm font-medium" 
                                :class="getAffectedPercentageByZone(zoneId) > 50 ? 'text-red-600 dark:text-red-400' : getAffectedPercentageByZone(zoneId) > 20 ? 'text-yellow-600 dark:text-yellow-400' : 'text-gray-600 dark:text-gray-400'">
                            {{ getAffectedPercentageByZone(zoneId) }}%
                          </span>
                        </div>
                      </td>
                      <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                        <button v-if="getWarningCountByZone(zoneId).total > 0" 
                                class="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-md text-xs"
                                @click="showZoneDetails(zoneId)">
                          Ver zona
                        </button>
                        <span v-else class="text-xs text-green-600 dark:text-green-400 font-medium">Sin alertas</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <!-- Niveles críticos -->
          <div class="bg-white dark:bg-gray-800 rounded-lg shadow">
            <div class="p-4 border-b border-gray-100 dark:border-gray-700">
              <h3 class="font-medium text-gray-800 dark:text-white">Indicadores críticos</h3>
            </div>
            <div class="p-6">
              <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div class="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-100 dark:border-gray-700">
                  <h5 class="text-sm font-medium text-gray-800 dark:text-white mb-3 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z" />
                    </svg>
                    Niveles críticos de oxígeno
                  </h5>
                  <div class="space-y-3">
                    <div v-for="pond in getPondsWithLowOxygen()" :key="`oxygen-${pond.id}`">
                      <div class="flex justify-between text-xs mb-1">
                        <span class="text-gray-500 dark:text-gray-400">{{ pond.name }}</span>
                        <span class="font-medium text-red-600 dark:text-red-400">
                          {{ pond.oxygenLabel }}
                        </span>
                      </div>
                      <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                        <div class="h-1.5 rounded-full bg-red-500" 
                            :style="`width: ${getOxygenPercentage(pond.oxygen).replace('%', '')}%`"></div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div class="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-100 dark:border-gray-700">
                  <h5 class="text-sm font-medium text-gray-800 dark:text-white mb-3 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd" />
                    </svg>
                    Temperatura elevada
                  </h5>
                  <div class="space-y-3">
                    <div v-for="pond in getPondsWithHighTemp()" :key="`temp-${pond.id}`">
                      <div class="flex justify-between text-xs mb-1">
                        <span class="text-gray-500 dark:text-gray-400">{{ pond.name }}</span>
                        <span class="font-medium text-red-600 dark:text-red-400">
                          {{ pond.temperature }}°C
                        </span>
                      </div>
                      <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                        <div class="h-1.5 rounded-full bg-red-500" 
                            :style="`width: ${getTempPercentage(pond.temperature)}%`"></div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div class="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-100 dark:border-gray-700">
                  <h5 class="text-sm font-medium text-gray-800 dark:text-white mb-3 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M5 3a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V5a2 2 0 00-2-2H5zm9 4a1 1 0 10-2 0v6a1 1 0 102 0V7zm-3 2a1 1 0 10-2 0v4a1 1 0 102 0V9zm-3 3a1 1 0 10-2 0v1a1 1 0 102 0v-1z" clip-rule="evenodd" />
                    </svg>
                    Desperdicio de pellet
                  </h5>
                  <div class="space-y-3">
                    <div v-for="pond in getPondsWithHighWaste()" :key="`waste-${pond.id}`">
                      <div class="flex justify-between text-xs mb-1">
                        <span class="text-gray-500 dark:text-gray-400">{{ pond.name }}</span>
                        <span class="font-medium text-red-600 dark:text-red-400">
                          {{ pond.pelletWaste }}%
                        </span>
                      </div>
                      <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                        <div class="h-1.5 rounded-full bg-red-500" 
                            :style="`width: ${pond.pelletWaste}%`"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import { ref, reactive, computed, onMounted, watch } from 'vue';
import { useNuxtApp } from '#app';
import { User } from '~/models/User';
import DashboardSidebar from './dashboard/sidebar/DashboardSidebar.vue';

export default {
  name: 'Dashboard',
  components: {
    DashboardSidebar
  },
  data() {
    return {
      username: 'Admin',
      selectedZone: null,
      selectedPond: null,
      selectedView: null, // Propiedad para controlar las vistas detalladas (featured, warnings)
      isSidebarCollapsed: true,
      searchQuery: '',
      searchResults: [],
      showSearchResults: false,
      showNotifications: false,
      profileImage: null,
      zoneGlowing: null,
      zoneHovered: null,
      pondGlowing: null,
      pondHovered: null,
      featuredHovered: false,
      warningHovered: false,
      ponds: [
        {
          id: 1,
          zoneId: 1,
          name: 'Alao Oeste',
          count: 145,
          oxygen: 'Normal',
          oxygenLabel: 'Normal',
          current: 'Suave',
          currentLabel: 'Suave',
          temperature: 18.5,
          status: 'normal',
          waterLevel: 85,
          lightLevel: 75,
          biomass: 230,
          pelletWaste: 15,
          flowStatus: "green",
          showStats: false,
        },
        {
          id: 2,
          zoneId: 1,
          name: "Estanque Puerto Varas",
          count: 165,
          oxygen: "Normal",
          oxygenLabel: "Normal",
          current: "Suave",
          currentLabel: "Suave",
          temperature: 17.8,
          status: "normal",
          waterLevel: 80,
          lightLevel: 70,
          biomass: 210,
          pelletWaste: 18,
          flowStatus: "green",
          showStats: false,
        },
        {
          id: 3,
          zoneId: 1,
          name: " Estanque Ensenada",
          count: 130,
          oxygen: "Alto",
          oxygenLabel: "Alto",
          current: "Media",
          currentLabel: "Media",
          temperature: 19.0,
          status: "normal",
          waterLevel: 88,
          lightLevel: 65,
          biomass: 195,
          pelletWaste: 20,
          flowStatus: "green",
          showStats: true,
        },
        {
          id: 4,
          zoneId: 2,
          name: 'Bahía 2',
          count: 230,
          oxygen: 'Alto',
          oxygenLabel: 'Alto',
          current: 'Media',
          currentLabel: 'Media',
          temperature: 19.2,
          status: 'normal',
          waterLevel: 92,
          lightLevel: 68,
          lightLevel: 68,
          biomass: 410,
          pelletWaste: 28,
          flowStatus: "green",
          showStats: true,
        },
        {
          id: 5,
          zoneId: 2,
          name: 'Arrecife Central',
          count: 205,
          oxygen: 'Normal',
          oxygenLabel: 'Normal',
          current: 'Media',
          currentLabel: 'Media',
          temperature: 20.0,
          status: 'warning',
          waterLevel: 65,
          lightLevel: 60,
          biomass: 375,
          pelletWaste: 35,
          flowStatus: 'yellow',
          showStats: true
        },
        {
          id: 6,
          zoneId: 2,
          name: 'Marina Centro',
          count: 190,
          oxygen: 'Normal',
          oxygenLabel: 'Normal',
          current: 'Suave',
          currentLabel: 'Suave',
          temperature: 19.5,
          status: 'normal',
          waterLevel: 75,
          lightLevel: 70,
          biomass: 350,
          pelletWaste: 25,
          flowStatus: 'green',
          showStats: false
        },
        {
          id: 7,
          zoneId: 3,
          name: 'Talofa Sur',
          count: 78,
          oxygen: 'Bajo',
          oxygenLabel: 'Bajo',
          current: 'Fuerte',
          currentLabel: 'Fuerte',
          temperature: 20.1,
          status: 'warning',
          waterLevel: 60,
          lightLevel: 45,
          biomass: 130,
          pelletWaste: 45,
          flowStatus: 'yellow',
          showStats: true
        },
        {
          id: 8,
          zoneId: 3,
          name: 'Butan 7',
          count: 185,
          oxygen: 'Normal',
          oxygenLabel: 'Normal',
          current: 'Suave',
          currentLabel: 'Suave',
          temperature: 17.8,
          status: 'normal',
          waterLevel: 78,
          lightLevel: 82,
          biomass: 320,
          pelletWaste: 22,
          flowStatus: 'green',
          showStats: false
        },
        {
          id: 9,
          zoneId: 3,
          name: 'Punta Austral',
          count: 45,
          oxygen: 'Bajo',
          oxygenLabel: 'Bajo',
          current: 'Fuerte',
          currentLabel: 'Fuerte',
          temperature: 21.0,
          status: 'danger',
          waterLevel: 45,
          lightLevel: 30,
          biomass: 85,
          pelletWaste: 60,
          flowStatus: 'red',
          showStats: true
        }
      ]
    }
  },
  computed: {
    isDarkMode() {
      const nuxtApp = useNuxtApp();
      return nuxtApp.$darkMode?.value || false;
    },
    notifications() {
      const nuxtApp = useNuxtApp();
      return nuxtApp.$notifications || null;
    },
    userProfileImage() {
      const nuxtApp = useNuxtApp();
      return nuxtApp.$profileImage?.value || this.profileImage;
    }
  },
  mounted() {
    // Cargar datos del usuario
    this.loadUserData();
    
    // Cargar la foto de perfil
    this.loadProfileImage();
    
    // Cargar advertencias como notificaciones después de que el componente esté montado
    this.$nextTick(() => {
      // Esperar un poco para asegurarse de que el sistema de notificaciones esté disponible
      setTimeout(() => {
        this.loadWarningsAsNotifications();
      }, 500);
    });

    // Escuchar eventos de búsqueda desde el AppHeader
    const nuxtApp = useNuxtApp();
    if (nuxtApp.$emitter) {
      nuxtApp.$emitter.on('search-ponds', this.handleSearch);
    }
    
    // Alternativa usando window para eventos globales
    if (process.client) {
      window.addEventListener('search-ponds', (event) => {
        this.handleSearch(event.detail);
      });
    }
    
    // Add event listeners for mouse movements
    document.addEventListener('mousemove', this.handleMouseMove);
  },
  beforeUnmount() {
    // Limpiar listeners al desmontar el componente
    const nuxtApp = useNuxtApp();
    if (nuxtApp.$emitter) {
      nuxtApp.$emitter.off('search-ponds', this.handleSearch);
    }
    
    if (process.client) {
      window.removeEventListener('search-ponds', this.handleSearch);
    }
  },
  unmounted() {
    // Clean up event listeners
    document.removeEventListener('mousemove', this.handleMouseMove);
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
      }
    },
    loadProfileImage() {
      // Cargar la imagen de perfil desde localStorage
      if (process.client) {
        const savedProfileImage = localStorage.getItem('profileImage');
        if (savedProfileImage) {
          this.profileImage = savedProfileImage;
        }
      }
    },
    getUserInitials() {
      if (!this.username) return 'A';
      return this.username.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
    },
    toggleSidebar() {
      this.isSidebarCollapsed = !this.isSidebarCollapsed;
    },
    selectPond(pond) {
      this.selectedPond = pond;
    },
    showZoneDetails(zoneId) {
      this.selectedZone = zoneId;
    },
    getTotalFish() {
      return this.ponds.reduce((total, pond) => total + pond.count, 0);
    },
    getAvgTempTotal() {
      const totalTemp = this.ponds.reduce((sum, pond) => sum + pond.temperature, 0);
      return (totalTemp / this.ponds.length).toFixed(1);
    },
    getTotalBiomass() {
      return this.ponds.reduce((total, pond) => total + pond.biomass, 0);
    },
    getBestZone() {
      // Determinar qué zona tiene el mejor rendimiento
      const zones = [1, 2, 3];
      let bestZone = 1;
      let bestScore = 0;
      
      zones.forEach(zoneId => {
        const ponds = this.getPondsByZone(zoneId);
        const totalFish = ponds.reduce((sum, pond) => sum + pond.count, 0);
        const healthyPonds = ponds.filter(p => p.status === 'normal').length;
        const avgTemp = ponds.reduce((sum, pond) => sum + pond.temperature, 0) / ponds.length;
        
        // Calcular puntuación (mayor es mejor)
        const score = totalFish * 0.5 + healthyPonds * 20 + (healthyPonds / ponds.length) * 50;
        
        if (score > bestScore) {
          bestScore = score;
          bestZone = zoneId;
        }
      });
      
      const bestZonePonds = this.getPondsByZone(bestZone);
      const totalFish = bestZonePonds.reduce((sum, pond) => sum + pond.count, 0);
      const avgTemp = bestZonePonds.reduce((sum, pond) => sum + pond.temperature, 0) / bestZonePonds.length;
      const healthyPonds = bestZonePonds.filter(p => p.status === 'normal').length;
      const healthStatus = healthyPonds === bestZonePonds.length ? 'Óptima' : 
                         healthyPonds >= bestZonePonds.length / 2 ? 'Buena' : 'Regular';
      
      return {
        zoneId: bestZone,
        name: this.getZoneName(bestZone),
        icon: bestZone === 1 ? 'N' : bestZone === 2 ? 'C' : 'S',
        pondCount: bestZonePonds.length,
        fishCount: totalFish,
        temperature: avgTemp.toFixed(1),
        health: healthStatus
      };
    },
    getWarnings() {
      const warnings = [];
      
      // Busca estanques con problemas
      this.ponds.forEach(pond => {
        if (pond.status === 'danger') {
          warnings.push({
            status: 'danger',
            title: `${pond.name} (${pond.zoneId === 1 ? 'Zona Norte' : pond.zoneId === 2 ? 'Zona Central' : 'Zona Sur'})`,
            message: this.getWarningMessage(pond)
          });
        } else if (pond.status === 'warning') {
          warnings.push({
            status: 'warning',
            title: `${pond.name} (${pond.zoneId === 1 ? 'Zona Norte' : pond.zoneId === 2 ? 'Zona Central' : 'Zona Sur'})`,
            message: this.getWarningMessage(pond)
          });
        }
      });
      
      return warnings;
    },
    getWarningMessage(pond) {
      // Determina el mensaje de advertencia basado en los parámetros del estanque
      if (pond.oxygen === 'Bajo') {
        return 'Nivel de oxígeno bajo';
      } else if (pond.temperature > 20) {
        return 'Temperatura elevada';
      } else if (pond.waterLevel < 50) {
        return 'Nivel de agua bajo';
      } else if (pond.pelletWaste > 40) {
        return 'Alto desperdicio de pellet';
      } else if (pond.current === 'Fuerte') {
        return 'Corriente fuerte';
      } else if (pond.flowStatus === 'red') {
        return 'Flujo de agua comprometido';
      } else {
        return 'Requiere atención';
      }
    },
    getPondsByZone(zoneId) {
      return this.ponds.filter(pond => pond.zoneId === zoneId);
    },
    getTotalFishByZone(zoneId) {
      return this.getPondsByZone(zoneId).reduce((total, pond) => total + pond.count, 0);
    },
    getAvgTempByZone(zoneId) {
      const ponds = this.getPondsByZone(zoneId);
      if (ponds.length === 0) return "0.0";
      const total = ponds.reduce((sum, pond) => sum + pond.temperature, 0);
      return (total / ponds.length).toFixed(1);
    },
    getZoneStatus(zoneId) {
      const ponds = this.getPondsByZone(zoneId);
      if (ponds.some(pond => pond.status === 'danger')) {
        return 'Alerta';
      } else if (ponds.some(pond => pond.status === 'warning')) {
        return 'Precaución';
      } else {
        return 'Normal';
      }
    },
    getZoneStatusClass(zoneId) {
      const status = this.getZoneStatus(zoneId);
      if (status === 'Alerta') {
        return 'bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400';
      } else if (status === 'Precaución') {
        return 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400';
      } else {
        return 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400';
      }
    },
    getBackgroundClass(index) {
      const colors = ['bg-blue-500', 'bg-purple-500', 'bg-green-500', 'bg-yellow-500'];
      return colors[index % colors.length];
    },
    getPondAvatarClass(pond) {
      if (pond.status === 'danger') {
        return 'bg-red-500 text-white';
      } else if (pond.status === 'warning') {
        return 'bg-yellow-500 text-white';
      } else {
        return 'bg-blue-500 text-white';
      }
    },
    getStatusClass(status) {
      if (status === 'danger') {
        return 'bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400';
      } else if (status === 'warning') {
        return 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400';
      } else {
        return 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400';
      }
    },
    getStatusLabel(status) {
      if (status === 'danger') {
        return 'Crítico';
      } else if (status === 'warning') {
        return 'Alerta';
      } else {
        return 'Normal';
      }
    },
    getTempPercentage(temperature) {
      return Math.min(100, Math.max(0, (temperature - 15) / (30 - 15) * 100));
    },
    getOxygenPercentage(oxygen) {
      if (oxygen === 'Alto') return '90%';
      if (oxygen === 'Normal') return '70%';
      if (oxygen === 'Bajo') return '30%';
      return '50%';
    },
    getCurrentClass(current) {
      if (current === 'Fuerte') return 'text-red-600 dark:text-red-400';
      if (current === 'Media') return 'text-yellow-600 dark:text-yellow-400';
      if (current === 'Suave') return 'text-green-600 dark:text-green-400';
      return 'text-gray-600 dark:text-gray-400';
    },
    getTextColorClass(oxygen) {
      if (oxygen === 'Alto') return 'text-green-600 dark:text-green-400';
      if (oxygen === 'Normal') return 'text-blue-600 dark:text-blue-400';
      if (oxygen === 'Bajo') return 'text-red-600 dark:text-red-400';
      return 'text-gray-600 dark:text-gray-400';
    },
    getBarColorClass(oxygen) {
      if (oxygen === 'Alto') return 'bg-green-500';
      if (oxygen === 'Normal') return 'bg-blue-500';
      if (oxygen === 'Bajo') return 'bg-red-500';
      return 'bg-gray-500';
    },
    getStatusDotClass(status) {
      return status === 'normal' ? 'bg-green-500' : status === 'warning' ? 'bg-yellow-500' : 'bg-red-500';
    },
    getFlowStatusClass(status) {
      return status === 'green' ? 'bg-green-500' : status === 'yellow' ? 'bg-yellow-500' : 'bg-red-500';
    },
    getFlowStatusLabel(status) {
      return status === 'green' ? 'Normal' : status === 'yellow' ? 'Precaución' : 'Alerta';
    },
    getIconColorClass(oxygen) {
      if (oxygen === 'Alto') return 'text-green-600 dark:text-green-400';
      if (oxygen === 'Normal') return 'text-blue-600 dark:text-blue-400';
      if (oxygen === 'Bajo') return 'text-red-600 dark:text-red-400';
      return 'text-gray-600 dark:text-gray-400';
    },
    backFromPondDetail() {
      if (this.selectedZone) {
        // Si hay una zona seleccionada, volvemos a la vista de zona
        this.selectedPond = null;
      } else {
        // Si no hay zona seleccionada, volvemos al dashboard principal
        this.selectedPond = null;
        this.selectedZone = null;
      }
    },
    resetDashboard() {
      this.selectedZone = null;
      this.selectedPond = null;
      this.searchQuery = '';
      this.searchResults = [];
      this.showSearchResults = false;
    },
    resetSearch() {
      this.searchQuery = '';
      this.searchResults = [];
      this.showSearchResults = false;
    },
    searchPonds() {
      if (!this.searchQuery.trim()) {
        this.showSearchResults = false;
        this.searchResults = [];
        return;
      }
      
      const query = this.searchQuery.toLowerCase().trim();
      
      // Buscar estanques por nombre o ID
      const directPondMatches = this.ponds.filter(pond => 
        pond.name.toLowerCase().includes(query) || 
        pond.id.toString() === query
      );
      
      // Buscar también por zonas
      const zoneNames = {
        1: 'zona norte',
        2: 'zona central',
        3: 'zona sur'
      };
      
      const zoneMatches = Object.entries(zoneNames).filter(([_, name]) => 
        name.includes(query)
      ).map(([zoneId]) => parseInt(zoneId));
      
      // Estanques que pertenecen a las zonas encontradas
      const zoneBasedPondMatches = zoneMatches.length > 0 
        ? this.ponds.filter(pond => zoneMatches.includes(pond.zoneId))
        : [];
      
      // Combinar resultados y eliminar duplicados
      this.searchResults = [...new Set([...directPondMatches, ...zoneBasedPondMatches])];
      
      if (this.searchResults.length === 0) {
        // No hay resultados
        this.showSearchResults = false;
        
        // Notificar al usuario que no se encontraron resultados
        const nuxtApp = useNuxtApp();
        if (nuxtApp.$notifications) {
          nuxtApp.$notifications.notify({
            title: 'Búsqueda',
            message: `No se encontraron resultados para "${this.searchQuery}"`,
            type: 'info',
            duration: 3000
          });
        }
        
        return;
      }
      
      if (this.searchResults.length === 1) {
        // Si solo hay un resultado, ir directamente a ese estanque
        this.selectPond(this.searchResults[0]);
        this.showSearchResults = false;
      } else if (zoneMatches.length === 1) {
        // Si corresponde a una zona específica, mostrar esa zona
        this.selectedZone = zoneMatches[0];
        this.selectedPond = null;
        this.showSearchResults = false;
      } else {
        // Múltiples resultados - puede ser de diferentes zonas
        this.showSearchResults = true;
        
        // Si los resultados son mayoritariamente de una zona, mostrar esa zona
        const zoneCount = {};
        this.searchResults.forEach(pond => {
          zoneCount[pond.zoneId] = (zoneCount[pond.zoneId] || 0) + 1;
        });
        
        const maxZoneId = Object.entries(zoneCount)
          .sort((a, b) => b[1] - a[1])[0][0];
        
        this.selectedZone = parseInt(maxZoneId);
        this.selectedPond = null;
      }
      
      // Centrar la vista en los resultados si hay alguno
      this.$nextTick(() => {
        const resultElement = document.querySelector('.search-result');
        if (resultElement) {
          resultElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      });
    },
    getZoneName(zoneId) {
      return zoneId === 1 ? 'Zona Norte' : zoneId === 2 ? 'Zona Central' : 'Zona Sur';
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
    },
    loadWarningsAsNotifications() {
      // Obtener todas las advertencias
      const warnings = this.getWarnings();
      
      // Verificar que el sistema de notificaciones esté disponible
      const nuxtApp = useNuxtApp();
      if (!nuxtApp.$notifications) {
        console.error('Sistema de notificaciones no disponible');
        return;
      }
      
      // Convertirlas en notificaciones
      if (warnings.length > 0) {
        warnings.forEach(warning => {
          nuxtApp.$notifications.notify({
            title: warning.title,
            message: warning.message,
            type: warning.status === 'danger' ? 'error' : 'warning',
            showToast: false // No mostrar toast para evitar sobrecargar la interfaz
          });
        });
        
        console.log(`${warnings.length} advertencias cargadas como notificaciones`);
      }
    },
    toggleNotifications() {
      this.showNotifications = !this.showNotifications;
      
      // Si se está abriendo el menú, cerrar al hacer clic fuera
      if (this.showNotifications) {
        setTimeout(() => {
          const closeNotifications = (e) => {
            if (!e.target.closest('.notifications-menu')) {
              this.showNotifications = false;
              document.removeEventListener('click', closeNotifications);
            }
          };
          document.addEventListener('click', closeNotifications);
        }, 0);
      }
    },
    showStatistics() {
      // Navegar a la página de estadísticas
      this.$router.push('/statistics');
    },
    showUserProfile() {
      // Navegar a la página de perfil
      this.$router.push('/profile');
    },
    showCamerasView() {
      // Navegar a la página de cámaras
      this.$router.push('/cameras');
    },
    uploadProfilePhoto() {
      // Activar el input de archivo oculto
      this.$refs.photoInput.click();
    },
    handlePhotoChange(event) {
      const file = event.target.files[0];
      if (!file) return;
      
      // Aquí puedes implementar la lógica para subir la imagen
      // Por ahora, solo mostraremos un mensaje en la consola
      console.log('Foto seleccionada:', file.name);
      
      // Para una implementación completa, podrías:
      // 1. Crear un objeto URL para previsualizar la imagen
      // const imageUrl = URL.createObjectURL(file);
      // this.profilePhotoUrl = imageUrl;
      
      // 2. Subir la imagen a un servidor (simulado aquí)
      this.$notifications.notify({
        title: 'Foto de perfil',
        message: 'La foto se ha actualizado correctamente',
        type: 'success'
      });
    },
    markAllAsRead() {
      // Marcar todas las notificaciones como leídas
      const nuxtApp = useNuxtApp();
      if (nuxtApp.$notifications) {
        nuxtApp.$notifications.markAllAsRead();
      }
    },
    markAsRead(notificationId) {
      // Marcar una notificación específica como leída
      const nuxtApp = useNuxtApp();
      if (nuxtApp.$notifications) {
        nuxtApp.$notifications.markAsRead(notificationId);
      }
    },
    deleteNotification(notificationId) {
      const nuxtApp = useNuxtApp();
      if (nuxtApp.$notifications) {
        nuxtApp.$notifications.deleteNotification(notificationId);
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
    handleSearch(query) {
      this.searchQuery = query;
      this.searchPonds();
    },
    pulseZoneGlow(zoneId) {
      this.zoneGlowing = zoneId;
      setTimeout(() => {
        this.zoneGlowing = null;
      }, 800);
    },
    
    pulsePondGlow(pondId) {
      this.pondGlowing = pondId;
      setTimeout(() => {
        this.pondGlowing = null;
      }, 800);
    },
    
    handleMouseMove(event) {
      // Update all glow cursors
      if (this.zoneHovered || this.pondHovered) {
        const glowCursors = document.querySelectorAll('.glow-cursor');
        glowCursors.forEach(cursor => {
          const parent = cursor.parentElement;
          const rect = parent.getBoundingClientRect();
          const x = event.clientX - rect.left;
          const y = event.clientY - rect.top;
          cursor.style.left = `${x}px`;
          cursor.style.top = `${y}px`;
        });
      }
    },
    
    updateGlowPosition(event) {
      if (this.zoneHovered) {
        // Get all glow cursors
        const glowCursors = document.querySelectorAll('.glow-cursor');
        if (glowCursors.length > 0) {
          // Find the one in the current hovered zone
          const currentGlowCursor = glowCursors[0];
          const rect = event.currentTarget.getBoundingClientRect();
          const x = event.clientX - rect.left;
          const y = event.clientY - rect.top;
          
          // Update position
          currentGlowCursor.style.left = `${x}px`;
          currentGlowCursor.style.top = `${y}px`;
        }
      }
    },
    
    updatePondGlowPosition(event) {
      if (this.pondHovered) {
        // Get all glow cursors
        const glowCursors = document.querySelectorAll('.glow-cursor');
        if (glowCursors.length > 0) {
          // Find the one in the current hovered pond
          const currentGlowCursor = glowCursors[0];
          const rect = event.currentTarget.getBoundingClientRect();
          const x = event.clientX - rect.left;
          const y = event.clientY - rect.top;
          
          // Update position
          currentGlowCursor.style.left = `${x}px`;
          currentGlowCursor.style.top = `${y}px`;
        }
      }
    },
    
    updateFeaturedGlowPosition(event) {
      if (this.featuredHovered) {
        const glowCursor = document.querySelector('.glow-cursor-featured');
        if (glowCursor) {
          const rect = event.currentTarget.getBoundingClientRect();
          const x = event.clientX - rect.left;
          const y = event.clientY - rect.top;
          
          glowCursor.style.left = `${x}px`;
          glowCursor.style.top = `${y}px`;
        }
      }
    },
    
    updateWarningGlowPosition(event) {
      if (this.warningHovered) {
        const glowCursor = document.querySelector('.glow-cursor-warning');
        if (glowCursor) {
          const rect = event.currentTarget.getBoundingClientRect();
          const x = event.clientX - rect.left;
          const y = event.clientY - rect.top;
          
          glowCursor.style.left = `${x}px`;
          glowCursor.style.top = `${y}px`;
        }
      }
    },
    showFeaturedView() {
      console.log('Mostrando vista destacados');
      this.selectedView = 'featured';
      this.selectedZone = null;
      this.selectedPond = null;
      
      // Scroll al inicio de la vista
      this.$nextTick(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    },
    showWarningsView() {
      console.log('Mostrando vista advertencias');
      this.selectedView = 'warnings';
      this.selectedZone = null;
      this.selectedPond = null;
      
      // Scroll al inicio de la vista
      this.$nextTick(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    },
    backToMainView() {
      console.log('Volviendo al dashboard principal');
      this.selectedView = null;
      this.selectedZone = null;
      this.selectedPond = null;
    },
    getZonePerformanceScore(zoneId) {
      const bestZone = this.getBestZone();
      const zone = this.getPondsByZone(zoneId);
      const totalFish = zone.reduce((sum, pond) => sum + pond.count, 0);
      const healthyPonds = zone.filter(p => p.status === 'normal').length;
      const avgTemp = zone.reduce((sum, pond) => sum + pond.temperature, 0) / zone.length;
      
      const score = totalFish * 0.5 + healthyPonds * 20 + (healthyPonds / zone.length) * 50;
      
      return Math.round((score / (bestZone.fishCount * 0.5 + bestZone.pondCount * 20 + bestZone.pondCount * 50)) * 100);
    },
    getZoneHealthPercentage(zoneId) {
      const bestZone = this.getBestZone();
      const zone = this.getPondsByZone(zoneId);
      const healthyPonds = zone.filter(p => p.status === 'normal').length;
      
      return Math.round((healthyPonds / zone.length) * 100);
    },
    getWarningCountByZone(zoneId) {
      const ponds = this.getPondsByZone(zoneId);
      const warningCount = ponds.filter(p => p.status === 'warning').length;
      const dangerCount = ponds.filter(p => p.status === 'danger').length;
      return {
        warning: warningCount,
        danger: dangerCount,
        total: warningCount + dangerCount
      };
    },
    getAffectedPercentageByZone(zoneId) {
      const ponds = this.getPondsByZone(zoneId);
      const affectedCount = ponds.filter(p => p.status === 'warning' || p.status === 'danger').length;
      return Math.round((affectedCount / ponds.length) * 100);
    },
    getPondsWithLowOxygen() {
      return this.ponds.filter(pond => pond.oxygen === 'Bajo');
    },
    getPondsWithHighTemp() {
      return this.ponds.filter(pond => pond.temperature > 20);
    },
    getPondsWithHighWaste() {
      return this.ponds.filter(pond => pond.pelletWaste > 40);
    }
  }
}
</script>

<style scoped>
/* Solo agregar estilos específicos si es necesario */

/* Glow effects for zone and pond cards */
.zone-card, .pond-card {
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
}

/* Zone specific glow effects when hovered */
.zone-card:hover.zone-glow-1 {
  box-shadow: 0 0 15px rgba(0, 120, 255, 0.6);
}

.zone-card:hover.zone-glow-2 {
  box-shadow: 0 0 15px rgba(120, 80, 255, 0.6);
}

.zone-card:hover.zone-glow-3 {
  box-shadow: 0 0 15px rgba(80, 200, 255, 0.6);
}

/* Pond specific glow effects when hovered */
.pond-card:hover.pond-glow-1 {
  box-shadow: 0 0 15px rgba(50, 180, 120, 0.6);
}

.pond-card:hover.pond-glow-2 {
  box-shadow: 0 0 15px rgba(100, 150, 50, 0.6);
}

.pond-card:hover.pond-glow-3 {
  box-shadow: 0 0 15px rgba(200, 180, 40, 0.6);
}

/* Zone specific glow effects when clicked */
.zone-card.pulsing-glow.zone-glow-1 {
  animation: pulse-glow-blue 0.8s ease-in-out;
}

.zone-card.pulsing-glow.zone-glow-2 {
  animation: pulse-glow-purple 0.8s ease-in-out;
}

.zone-card.pulsing-glow.zone-glow-3 {
  animation: pulse-glow-cyan 0.8s ease-in-out;
}

/* Pond specific glow effects when clicked */
.pond-card.pulsing-glow.pond-glow-1 {
  animation: pulse-glow-green 0.8s ease-in-out;
}

.pond-card.pulsing-glow.pond-glow-2 {
  animation: pulse-glow-lime 0.8s ease-in-out;
}

.pond-card.pulsing-glow.pond-glow-3 {
  animation: pulse-glow-yellow 0.8s ease-in-out;
}

/* Custom cursor glows for each zone */
.glow-cursor-zone-1 {
  background: radial-gradient(circle, 
    rgba(0, 140, 255, 0.7) 0%, 
    rgba(0, 120, 255, 0.5) 30%, 
    rgba(0, 80, 200, 0.3) 60%, 
    transparent 70%);
  animation: none !important;
}

.glow-cursor-zone-2 {
  background: radial-gradient(circle, 
    rgba(120, 80, 255, 0.7) 0%, 
    rgba(100, 60, 220, 0.5) 30%, 
    rgba(80, 40, 200, 0.3) 60%, 
    transparent 70%);
  animation: none !important;
}

.glow-cursor-zone-3 {
  background: radial-gradient(circle, 
    rgba(80, 200, 255, 0.7) 0%, 
    rgba(60, 180, 220, 0.5) 30%, 
    rgba(40, 160, 200, 0.3) 60%, 
    transparent 70%);
  animation: none !important;
}

/* Custom cursor glows for each pond zone */
.glow-cursor-pond-1 {
  background: radial-gradient(circle, 
    rgba(50, 180, 120, 0.7) 0%, 
    rgba(30, 160, 100, 0.5) 30%, 
    rgba(20, 140, 80, 0.3) 60%, 
    transparent 70%);
  animation: none !important;
}

.glow-cursor-pond-2 {
  background: radial-gradient(circle, 
    rgba(100, 150, 50, 0.7) 0%, 
    rgba(80, 130, 30, 0.5) 30%, 
    rgba(60, 110, 20, 0.3) 60%, 
    transparent 70%);
  animation: none !important;
}

.glow-cursor-pond-3 {
  background: radial-gradient(circle, 
    rgba(200, 180, 40, 0.7) 0%, 
    rgba(180, 160, 30, 0.5) 30%, 
    rgba(160, 140, 20, 0.3) 60%, 
    transparent 70%);
  animation: none !important;
}

/* Destacadas and warning cards styles */
.featured-card, .warning-card {
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
}

.featured-card:hover {
  box-shadow: 0 0 20px rgba(59, 130, 246, 0.6);
}

.warning-card:hover {
  box-shadow: 0 0 20px rgba(239, 68, 68, 0.6);
}

/* Custom cursor glows for featured and warning cards */
.glow-cursor-featured {
  background: radial-gradient(circle, 
    rgba(59, 130, 246, 0.7) 0%, 
    rgba(37, 99, 235, 0.5) 30%, 
    rgba(29, 78, 216, 0.3) 60%, 
    transparent 70%);
  animation: none !important;
  width: 140px;
  height: 140px;
}

.glow-cursor-warning {
  background: radial-gradient(circle, 
    rgba(239, 68, 68, 0.7) 0%, 
    rgba(220, 38, 38, 0.5) 30%, 
    rgba(185, 28, 28, 0.3) 60%, 
    transparent 70%);
  animation: none !important;
  width: 140px;
  height: 140px;
}

/* Animations for warning items */
.warning-card :deep(.avatars .w-8) {
  transition: all 0.3s ease;
}

.warning-card:hover :deep(.avatars .w-8) {
  transform: scale(1.1);
}

/* Make the highlighted zone in featured card pulse */
.featured-card:hover :deep(.w-10.h-10.rounded-full.bg-blue-500) {
  animation: featured-pulse 2s infinite;
}

@keyframes featured-pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.7);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(59, 130, 246, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(59, 130, 246, 0);
  }
}

/* Make the warning icons pulse */
.warning-card:hover :deep(svg) {
  animation: warning-pulse 1.5s infinite;
}

@keyframes warning-pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}

/* Pulse animations for different colors */
@keyframes pulse-glow-blue {
  0% {
    box-shadow: 0 0 5px rgba(0, 120, 255, 0.4);
  }
  50% {
    box-shadow: 0 0 30px rgba(0, 120, 255, 0.9);
  }
  100% {
    box-shadow: 0 0 5px rgba(0, 120, 255, 0.4);
  }
}

@keyframes pulse-glow-purple {
  0% {
    box-shadow: 0 0 5px rgba(120, 80, 255, 0.4);
  }
  50% {
    box-shadow: 0 0 30px rgba(120, 80, 255, 0.9);
  }
  100% {
    box-shadow: 0 0 5px rgba(120, 80, 255, 0.4);
  }
}

@keyframes pulse-glow-cyan {
  0% {
    box-shadow: 0 0 5px rgba(80, 200, 255, 0.4);
  }
  50% {
    box-shadow: 0 0 30px rgba(80, 200, 255, 0.9);
  }
  100% {
    box-shadow: 0 0 5px rgba(80, 200, 255, 0.4);
  }
}

@keyframes pulse-glow-green {
  0% {
    box-shadow: 0 0 5px rgba(50, 180, 120, 0.4);
  }
  50% {
    box-shadow: 0 0 30px rgba(50, 180, 120, 0.9);
  }
  100% {
    box-shadow: 0 0 5px rgba(50, 180, 120, 0.4);
  }
}

@keyframes pulse-glow-lime {
  0% {
    box-shadow: 0 0 5px rgba(100, 150, 50, 0.4);
  }
  50% {
    box-shadow: 0 0 30px rgba(100, 150, 50, 0.9);
  }
  100% {
    box-shadow: 0 0 5px rgba(100, 150, 50, 0.4);
  }
}

@keyframes pulse-glow-yellow {
  0% {
    box-shadow: 0 0 5px rgba(200, 180, 40, 0.4);
  }
  50% {
    box-shadow: 0 0 30px rgba(200, 180, 40, 0.9);
  }
  100% {
    box-shadow: 0 0 5px rgba(200, 180, 40, 0.4);
  }
}

.glow-cursor {
  pointer-events: none;
  position: absolute;
  top: 0;
  left: 0;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
  mix-blend-mode: screen;
  opacity: 0.8;
  filter: blur(8px);
}
</style>