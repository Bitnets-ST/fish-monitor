<template>
  <div class="min-h-screen bg-gray-100 dark:bg-gray-900 py-12">
    <!-- Botón para volver al dashboard -->
    <div class="max-w-3xl mx-auto mb-4">
      <button 
        @click="goBack" 
        class="flex items-center text-sm bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors shadow-md"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clip-rule="evenodd" />
        </svg>
        Volver al Dashboard
      </button>
    </div>
    
    <div class="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
      <div class="md:flex">
        <!-- Sidebar con foto y menú -->
        <div class="md:w-1/3 bg-gray-50 dark:bg-gray-700 p-6">
          <div class="text-center mb-8">
            <div class="relative inline-block">
              <div v-if="profileImage" class="w-32 h-32 rounded-full mx-auto overflow-hidden">
                <img :src="profileImage" alt="Foto de perfil" class="w-full h-full object-cover" />
              </div>
              <div v-else class="w-32 h-32 rounded-full bg-blue-500 mx-auto flex items-center justify-center text-white text-4xl font-bold">
                {{ userInitials }}
              </div>
              <button @click="triggerFileInput" class="absolute bottom-0 right-0 bg-white dark:bg-gray-800 rounded-full p-2 shadow-md hover:bg-gray-100 dark:hover:bg-gray-700">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-600 dark:text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                </svg>
              </button>
              <input 
                type="file" 
                ref="fileInput" 
                @change="handlePhotoUpload" 
                accept="image/*" 
                class="hidden" 
              />
            </div>
            <h2 class="mt-4 text-xl font-semibold text-gray-800 dark:text-white">{{ user.name }}</h2>
            <p class="text-sm text-gray-500 dark:text-gray-400">{{ user.role }}</p>
          </div>
          
          <nav>
            <ul class="space-y-2">
              <li>
                <button @click="activeTab = 'personal'" class="w-full text-left px-4 py-2 rounded-lg" :class="activeTab === 'personal' ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600/30'">
                  <div class="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
                    </svg>
                    Información Personal
                  </div>
                </button>
              </li>
              <li>
                <button @click="activeTab = 'security'" class="w-full text-left px-4 py-2 rounded-lg" :class="activeTab === 'security' ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600/30'">
                  <div class="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                    </svg>
                    Seguridad
                  </div>
                </button>
              </li>
              <li>
                <button @click="activeTab = 'preferences'" class="w-full text-left px-4 py-2 rounded-lg" :class="activeTab === 'preferences' ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600/30'">
                  <div class="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd" />
                    </svg>
                    Preferencias
                  </div>
                </button>
              </li>
              <li>
                <button @click="activeTab = 'notifications'" class="w-full text-left px-4 py-2 rounded-lg" :class="activeTab === 'notifications' ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600/30'">
                  <div class="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                    </svg>
                    Notificaciones
                  </div>
                </button>
              </li>
            </ul>
          </nav>
        </div>
        
        <!-- Contenido principal -->
        <div class="md:w-2/3 p-6">
          <div v-if="activeTab === 'personal'">
            <h2 class="text-2xl font-semibold text-gray-800 dark:text-white mb-6">Información Personal</h2>
            
            <form @submit.prevent="savePersonalInfo" class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nombre completo</label>
                <input 
                  v-model="user.name" 
                  type="text" 
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Correo electrónico</label>
                <input 
                  v-model="user.email" 
                  type="email" 
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Cargo</label>
                <input 
                  v-model="user.role" 
                  type="text" 
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Teléfono</label>
                <input 
                  v-model="user.phone" 
                  type="tel" 
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
              
              <div class="pt-4">
                <button 
                  type="submit" 
                  class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Guardar cambios
                </button>
              </div>
            </form>
          </div>
          
          <div v-if="activeTab === 'security'">
            <h2 class="text-2xl font-semibold text-gray-800 dark:text-white mb-6">Seguridad</h2>
            
            <form @submit.prevent="changePassword" class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Contraseña actual</label>
                <input 
                  v-model="passwords.current" 
                  type="password" 
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nueva contraseña</label>
                <input 
                  v-model="passwords.new" 
                  type="password" 
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Confirmar nueva contraseña</label>
                <input 
                  v-model="passwords.confirm" 
                  type="password" 
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
              
              <div class="pt-4">
                <button 
                  type="submit" 
                  class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Cambiar contraseña
                </button>
              </div>
            </form>
            
            <div class="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
              <h3 class="text-lg font-medium text-gray-800 dark:text-white mb-4">Sesiones activas</h3>
              
              <div class="space-y-3">
                <div class="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg flex justify-between items-center">
                  <div>
                    <div class="font-medium text-gray-800 dark:text-white">Este dispositivo</div>
                    <div class="text-sm text-gray-500 dark:text-gray-400">Windows 10 · Chrome · Santiago, Chile</div>
                    <div class="text-xs text-green-600 dark:text-green-400 mt-1">Activo ahora</div>
                  </div>
                </div>
                
                <div class="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg flex justify-between items-center">
                  <div>
                    <div class="font-medium text-gray-800 dark:text-white">iPhone 13</div>
                    <div class="text-sm text-gray-500 dark:text-gray-400">iOS 15 · Safari · Santiago, Chile</div>
                    <div class="text-xs text-gray-500 dark:text-gray-400 mt-1">Hace 2 días</div>
                  </div>
                  <button class="text-sm text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300">Cerrar sesión</button>
                </div>
              </div>
            </div>
          </div>
          
          <div v-if="activeTab === 'preferences'">
            <h2 class="text-2xl font-semibold text-gray-800 dark:text-white mb-6">Preferencias</h2>
            
            <div class="space-y-6">
              <div>
                <h3 class="text-lg font-medium text-gray-800 dark:text-white mb-3">Apariencia</h3>
                <div class="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div>
                    <div class="font-medium text-gray-800 dark:text-white">Modo oscuro</div>
                    <div class="text-sm text-gray-500 dark:text-gray-400">Cambiar entre tema claro y oscuro</div>
                  </div>
                  <label class="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" v-model="darkModeEnabled" class="sr-only peer" @change="toggleDarkMode">
                    <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </div>
              
              <div>
                <h3 class="text-lg font-medium text-gray-800 dark:text-white mb-3">Idioma</h3>
                <select class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white">
                  <option value="es">Español</option>
                  <option value="en">English</option>
                  <option value="pt">Português</option>
                </select>
              </div>
              
              <div>
                <h3 class="text-lg font-medium text-gray-800 dark:text-white mb-3">Zona horaria</h3>
                <select class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white">
                  <option value="America/Santiago">(GMT-4) Santiago</option>
                  <option value="America/Mexico_City">(GMT-6) Ciudad de México</option>
                  <option value="America/New_York">(GMT-5) Nueva York</option>
                  <option value="Europe/Madrid">(GMT+1) Madrid</option>
                </select>
              </div>
            </div>
          </div>
          
          <div v-if="activeTab === 'notifications'">
            <h2 class="text-2xl font-semibold text-gray-800 dark:text-white mb-6">Notificaciones</h2>
            
            <div class="space-y-4">
              <div class="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div>
                  <div class="font-medium text-gray-800 dark:text-white">Alertas de estanques</div>
                  <div class="text-sm text-gray-500 dark:text-gray-400">Recibir notificaciones sobre alertas en los estanques</div>
                </div>
                <label class="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" v-model="notifications.ponds" class="sr-only peer">
                  <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                </label>
              </div>
              
              <div class="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div>
                  <div class="font-medium text-gray-800 dark:text-white">Reportes semanales</div>
                  <div class="text-sm text-gray-500 dark:text-gray-400">Recibir resumen semanal de actividad</div>
                </div>
                <label class="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" v-model="notifications.weeklyReports" class="sr-only peer">
                  <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                </label>
              </div>
              
              <div class="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div>
                  <div class="font-medium text-gray-800 dark:text-white">Notificaciones por correo</div>
                  <div class="text-sm text-gray-500 dark:text-gray-400">Recibir notificaciones por correo electrónico</div>
                </div>
                <label class="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" v-model="notifications.email" class="sr-only peer">
                  <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                </label>
              </div>
              
              <div class="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div>
                  <div class="font-medium text-gray-800 dark:text-white">Notificaciones push</div>
                  <div class="text-sm text-gray-500 dark:text-gray-400">Recibir notificaciones push en el navegador</div>
                </div>
                <label class="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" v-model="notifications.push" class="sr-only peer">
                  <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                </label>
              </div>
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
  name: 'ProfilePage',
  data() {
    return {
      activeTab: 'personal',
      user: {
        name: 'Admin',
        email: 'admin@example.com',
        role: 'Supervisor',
        phone: '+56 9 1234 5678'
      },
      passwords: {
        current: '',
        new: '',
        confirm: ''
      },
      darkModeEnabled: false,
      notifications: {
        ponds: true,
        weeklyReports: true,
        email: false,
        push: true
      },
      profileImage: null
    }
  },
  computed: {
    userInitials() {
      if (!this.user.name) return 'A';
      return this.user.name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
    }
  },
  mounted() {
    // Cargar preferencia de modo oscuro
    const nuxtApp = useNuxtApp();
    if (nuxtApp.$darkMode) {
      this.darkModeEnabled = nuxtApp.$darkMode.value;
    }
    
    // Cargar datos del usuario
    this.loadUserData();
  },
  methods: {
    savePersonalInfo() {
      // Guardar información en localStorage
      if (process.client) {
        localStorage.setItem('user', JSON.stringify(this.user));
        
        // Actualizar el nombre de usuario en el header
        const nuxtApp = useNuxtApp();
        if (nuxtApp.$updateUserData) {
          nuxtApp.$updateUserData(this.user);
        }
      }
      
      // Mostrar notificación
      const nuxtApp = useNuxtApp();
      if (nuxtApp.$notifications) {
        nuxtApp.$notifications.success('Información personal actualizada correctamente');
      }
    },
    changePassword() {
      // Validar contraseñas
      const nuxtApp = useNuxtApp();
      if (!this.passwords.current || !this.passwords.new || !this.passwords.confirm) {
        if (nuxtApp.$notifications) {
          nuxtApp.$notifications.error('Por favor complete todos los campos');
        }
        return;
      }
      
      if (this.passwords.new !== this.passwords.confirm) {
        if (nuxtApp.$notifications) {
          nuxtApp.$notifications.error('Las contraseñas no coinciden');
        }
        return;
      }
      
      // Simulación de cambio de contraseña exitoso
      this.passwords = {
        current: '',
        new: '',
        confirm: ''
      };
      
      if (nuxtApp.$notifications) {
        nuxtApp.$notifications.success('Contraseña actualizada correctamente');
      }
    },
    toggleDarkMode() {
      const nuxtApp = useNuxtApp();
      if (nuxtApp.$toggleDarkMode) {
        nuxtApp.$toggleDarkMode();
        this.darkModeEnabled = nuxtApp.$darkMode.value;
      }
    },
    loadUserData() {
      // Cargar datos del usuario desde localStorage o plugin
      const nuxtApp = useNuxtApp();
      
      if (nuxtApp.$userData) {
        // Usar datos del plugin
        this.user = { ...this.user, ...nuxtApp.$userData.value };
      } else if (process.client) {
        // Respaldo: cargar desde localStorage
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
          try {
            const parsedUser = JSON.parse(savedUser);
            this.user = { ...this.user, ...parsedUser };
          } catch (e) {
            console.error('Error al cargar datos del usuario:', e);
          }
        }
      }
      
      // Cargar imagen de perfil
      if (nuxtApp.$profileImage && nuxtApp.$profileImage.value) {
        this.profileImage = nuxtApp.$profileImage.value;
      } else if (process.client) {
        // Respaldo: cargar desde localStorage
        const savedProfileImage = localStorage.getItem('profileImage');
        if (savedProfileImage) {
          this.profileImage = savedProfileImage;
        }
      }
    },
    triggerFileInput() {
      // Activar el input de archivo oculto
      this.$refs.fileInput.click();
    },
    handlePhotoUpload(event) {
      const file = event.target.files[0];
      if (!file) return;
      
      // Leer la imagen y mostrarla
      const reader = new FileReader();
      reader.onload = (e) => {
        this.profileImage = e.target.result;
        
        // Actualizar la foto de perfil usando el plugin
        const nuxtApp = useNuxtApp();
        if (nuxtApp.$updateProfileImage) {
          nuxtApp.$updateProfileImage(this.profileImage);
        } else {
          // Guardar en localStorage como respaldo
          if (process.client) {
            localStorage.setItem('profileImage', this.profileImage);
          }
        }
        
        // Mostrar notificación
        if (nuxtApp.$notifications) {
          nuxtApp.$notifications.success('Foto de perfil actualizada correctamente');
        }
      };
      reader.readAsDataURL(file);
      
      // Resetear el input para permitir seleccionar el mismo archivo nuevamente
      event.target.value = '';
    },
    goBack() {
      this.$router.push('/');
    }
  }
}
</script> 