<template>
  <div class="dashboard-layout min-h-screen flex bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
    <!-- Barra lateral -->
    <aside class="sidebar w-16 md:w-64 bg-white dark:bg-gray-800 shadow-lg flex flex-col">
      <!-- Logo -->
      <div class="sidebar-header p-4 border-b border-gray-200 dark:border-gray-700">
        <div class="flex items-center space-x-3">
          <div v-if="userProfileImage" class="w-8 h-8 rounded-full overflow-hidden">
            <img :src="userProfileImage" alt="Foto de perfil" class="w-full h-full object-cover" />
          </div>
          <div v-else class="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
            {{ getUserInitials() }}
          </div>
          <!-- Usuario -->
          <div class="hidden md:block">
            <div class="text-lg font-semibold text-blue-600 dark:text-blue-400">{{ username }}</div>
            <div class="text-xs text-gray-500 dark:text-gray-400">Supervisor</div>
          </div>
        </div>
      </div>
      
      <!-- Menú principal -->
      <nav class="flex-1 py-4">
        <ul class="space-y-1">
          <li>
            <a href="#" @click.prevent="resetDashboard" 
              class="flex items-center px-4 py-3 transition-colors duration-200 hover:bg-blue-50 dark:hover:bg-blue-900/20"
              :class="{'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-600 dark:border-blue-400': !selectedZone && !selectedPond}">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
              </svg>
              <span class="hidden md:inline">Dashboard</span>
            </a>
          </li>
          <li>
            <a href="#" @click.prevent="showCamerasView" 
              class="flex items-center px-4 py-3 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors duration-200">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
                <path stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.001 7.002V11.002C14.001 11.5542 14.4488 12.002 15.001 12.002H19.001C19.5532 12.002 20.001 11.5542 20.001 11.002V7.002C20.001 6.44979 19.5532 6.002 19.001 6.002H15.001C14.4488 6.002 14.001 6.44979 14.001 7.002Z" />
              </svg>
              <span class="hidden md:inline">Cámaras</span>
            </a>
          </li>
          <li>
            <a href="#" @click.prevent="showStatistics" 
              class="flex items-center px-4 py-3 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors duration-200">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" />
                <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z" />
              </svg>
              <span class="hidden md:inline">Estadísticas</span>
            </a>
          </li>
          <li>
            <a href="#" @click.prevent="showUserProfile" 
              class="flex items-center px-4 py-3 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors duration-200">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
              </svg>
              <span class="hidden md:inline">Perfil</span>
            </a>
          </li>
        </ul>
      </nav>
    </aside>

    <!-- Contenido principal -->
    <div class="flex-1 flex flex-col overflow-hidden">
      <!-- Cabecera mejorada -->
      <header class="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm">
        <div class="p-4">
          <div class="flex justify-between items-center mb-4">
            <div class="flex items-center">
              <div class="relative mr-4">
                <input 
                  v-model="searchQuery" 
                  type="text" 
                  placeholder="Buscar estanque..." 
                  class="pl-8 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  @keyup.enter="searchPonds" 
                />
                <svg 
                  @click="searchPonds"
                  xmlns="http://www.w3.org/2000/svg" 
                  class="h-4 w-4 text-gray-400 dark:text-gray-500 absolute left-2.5 top-2.5 cursor-pointer" 
                  viewBox="0 0 20 20" 
                  fill="currentColor"
                >
                  <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
                </svg>
              </div>
            </div>
            <div class="relative">
              <button 
                @click="toggleNotifications" 
                class="relative bg-gray-100 dark:bg-gray-700 p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-600 dark:text-gray-300" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                </svg>
                <span 
                  v-if="$notifications && $notifications.unreadCount > 0" 
                  class="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center"
                >
                  {{ $notifications.unreadCount }}
                </span>
              </button>
              
              <!-- Menú desplegable de notificaciones -->
              <div 
                v-if="showNotifications" 
                class="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto notifications-menu"
              >
                <div class="p-3 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                  <h3 class="font-medium text-gray-800 dark:text-white">Notificaciones</h3>
                  <button 
                    v-if="$notifications && $notifications.headerNotifications.length > 0" 
                    @click="markAllAsRead()" 
                    class="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                  >
                    Marcar todas como leídas
                  </button>
                </div>
                
                <div v-if="!$notifications || $notifications.headerNotifications.length === 0" class="p-4 text-center text-gray-500 dark:text-gray-400">
                  No hay notificaciones
                </div>
                
                <div v-else class="divide-y divide-gray-100 dark:divide-gray-700">
                  <div 
                    v-for="notification in $notifications.headerNotifications" 
                    :key="notification.id" 
                    class="p-3 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
                    :class="{ 'bg-blue-50 dark:bg-blue-900/20': !notification.read }"
                    @click="markAsRead(notification.id)"
                  >
                    <div class="flex justify-between">
                      <div class="font-medium text-gray-800 dark:text-white" :class="{ 'text-blue-600 dark:text-blue-400': !notification.read }">
                        {{ notification.title }}
                      </div>
                      <button 
                        @click.stop="deleteNotification(notification.id)" 
                        class="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                          <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                        </svg>
                      </button>
                    </div>
                    <div class="text-sm text-gray-500 dark:text-gray-400">{{ notification.message }}</div>
                    <div class="text-xs text-gray-400 dark:text-gray-500 mt-1">
                      {{ formatTimestamp(notification.timestamp) }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
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
        <!-- Secciones destacadas y advertencias -->
        <div v-if="!selectedZone && !selectedPond" class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <!-- Destacadas -->
          <div class="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden border-l-4 border-blue-500">
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
          <div class="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden border-l-4 border-red-500">
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
        <div v-if="!selectedZone && !selectedPond" class="mb-6">
          <h2 class="text-lg font-semibold text-gray-800 dark:text-white mb-4">Zonas de Estanques</h2>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div v-for="zoneId in [1, 2, 3]" :key="zoneId" 
                class="bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 cursor-pointer overflow-hidden"
                @click="showZoneDetails(zoneId)">
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
                class="bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 cursor-pointer overflow-hidden"
                @click="selectPond(pond)">
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
                  <div class="col-span-1">
                    <div class="text-xs text-gray-500 dark:text-gray-400 mb-1">Oxígeno</div>
                    <div class="text-sm font-medium" :class="getTextColorClass(pond.oxygen)">
                      {{ pond.oxygenLabel }}
                    </div>
                  </div>
                  <div class="col-span-1">
                    <div class="text-xs text-gray-500 dark:text-gray-400 mb-1">Agua</div>
                    <div class="text-sm font-medium dark:text-gray-200">{{ pond.waterLevel }}%</div>
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
      </main>
    </div>
  </div>
</template>

<script>
import { useNuxtApp } from '#app'

export default {
  name: 'Dashboard',
  data() {
    return {
      username: 'Admin',
      selectedZone: null,
      selectedPond: null,
      isSidebarCollapsed: true,
      searchQuery: '',
      searchResults: [],
      showSearchResults: false,
      showNotifications: false,
      profileImage: null,
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
      // Calcula puntos para cada zona basados en diferentes métricas
      const zoneScores = [1, 2, 3].map(zoneId => {
        const ponds = this.getPondsByZone(zoneId);
        const totalFish = this.getTotalFishByZone(zoneId);
        const avgTemp = parseFloat(this.getAvgTempByZone(zoneId));
        const healthyPonds = ponds.filter(p => p.status === 'normal').length;
        const avgOxygenScore = ponds.reduce((sum, p) => {
          return sum + (p.oxygen === 'Alto' ? 3 : p.oxygen === 'Normal' ? 2 : 1);
        }, 0) / ponds.length;
        
        // Calcula puntuación (mayor es mejor)
        const score = totalFish * 0.5 + healthyPonds * 20 + avgOxygenScore * 15;
        
        return {
          zoneId,
          score,
          name: zoneId === 1 ? 'Zona Norte' : zoneId === 2 ? 'Zona Central' : 'Zona Sur',
          icon: zoneId === 1 ? 'N' : zoneId === 2 ? 'C' : 'S',
          pondCount: ponds.length,
          fishCount: totalFish,
          temperature: avgTemp,
          health: healthyPonds === ponds.length ? 'Óptima' : 
                  healthyPonds >= ponds.length / 2 ? 'Buena' : 'Regular'
        };
      });
      
      // Devuelve la zona con mejor puntuación
      return zoneScores.sort((a, b) => b.score - a.score)[0];
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
    searchPonds() {
      if (!this.searchQuery.trim()) {
        this.showSearchResults = false;
        return;
      }
      
      const query = this.searchQuery.toLowerCase().trim();
      this.searchResults = this.ponds.filter(pond => {
        return pond.name.toLowerCase().includes(query) || 
               this.getZoneName(pond.zoneId).toLowerCase().includes(query);
      });
      
      if (this.searchResults.length === 1) {
        // Si solo hay un resultado, mostrar directamente ese estanque
        this.selectPond(this.searchResults[0]);
        this.showSearchResults = false;
      } else if (this.searchResults.length > 0) {
        // Si hay múltiples resultados, mostrarlos
        this.showSearchResults = true;
        
        // Mostrar la zona con más resultados
        const zoneCount = {};
        this.searchResults.forEach(pond => {
          zoneCount[pond.zoneId] = (zoneCount[pond.zoneId] || 0) + 1;
        });
        
        const maxZone = Object.keys(zoneCount).reduce((a, b) => 
          zoneCount[a] > zoneCount[b] ? a : b
        );
        
        this.selectedZone = parseInt(maxZone);
        this.selectedPond = null;
      } else {
        // Si no hay resultados
        this.showSearchResults = false;
      }
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
      // Eliminar una notificación específica
      const nuxtApp = useNuxtApp();
      if (nuxtApp.$notifications) {
        nuxtApp.$notifications.deleteNotification(notificationId);
      }
    }
  }
}
</script>

<style scoped>
/* Solo agregar estilos específicos si es necesario */
</style>