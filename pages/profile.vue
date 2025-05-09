<template>
  <div class="min-h-screen bg-gray-100 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-3xl mx-auto">
      <div class="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden">
        <!-- Encabezado del perfil -->
        <div class="bg-gradient-to-r from-blue-500 to-cyan-600 p-6">
          <div class="flex flex-col md:flex-row items-center">
            <div class="w-24 h-24 bg-white dark:bg-gray-700 rounded-full flex items-center justify-center text-3xl font-bold text-blue-500 mb-4 md:mb-0 md:mr-6">
              {{ userInitials }}
            </div>
            <div class="text-center md:text-left">
              <h1 class="text-2xl font-bold text-white">{{ user.name }}</h1>
              <p class="text-blue-100">{{ user.role }}</p>
              <p class="text-blue-100 mt-1">{{ user.email }}</p>
            </div>
          </div>
        </div>

        <!-- Contenido del perfil -->
        <div class="p-6">
          <div class="mb-8">
            <h2 class="text-xl font-semibold text-gray-800 dark:text-white mb-4">Editar Perfil</h2>
            
            <form @submit.prevent="saveProfile" class="space-y-4">
              <!-- Nombre -->
              <div>
                <label for="name" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nombre completo</label>
                <input 
                  type="text" 
                  id="name" 
                  v-model="user.name" 
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                >
              </div>
              
              <!-- Email -->
              <div>
                <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Correo electrónico</label>
                <input 
                  type="email" 
                  id="email" 
                  v-model="user.email" 
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                >
              </div>
              
              <!-- Rol (selector) -->
              <div>
                <label for="role" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Rol</label>
                <select 
                  id="role" 
                  v-model="user.role" 
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                >
                  <option value="Supervisor">Supervisor</option>
                  <option value="Gerente">Gerente</option>
                  <option value="Administrador">Administrador</option>
                  <option value="Técnico">Técnico</option>
                  <option value="Ayudante">Ayudante</option>
                  <option value="Operador">Operador</option>
                </select>
              </div>
              
              <hr class="my-6 border-gray-200 dark:border-gray-700">
              
              <!-- Cambiar contraseña -->
              <div>
                <h3 class="text-lg font-medium text-gray-800 dark:text-white mb-3">Cambiar contraseña</h3>
                
                <div class="space-y-4">
                  <!-- Contraseña actual -->
                  <div>
                    <label for="current_password" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Contraseña actual</label>
                    <input 
                      type="password" 
                      id="current_password" 
                      v-model="passwords.current" 
                      class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    >
                  </div>
                  
                  <!-- Nueva contraseña -->
                  <div>
                    <label for="new_password" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nueva contraseña</label>
                    <input 
                      type="password" 
                      id="new_password" 
                      v-model="passwords.new" 
                      class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    >
                  </div>
                  
                  <!-- Confirmar contraseña -->
                  <div>
                    <label for="confirm_password" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Confirmar nueva contraseña</label>
                    <input 
                      type="password" 
                      id="confirm_password" 
                      v-model="passwords.confirm" 
                      class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    >
                  </div>
                </div>
              </div>
              
              <!-- Preferencias -->
              <div class="mt-6">
                <h3 class="text-lg font-medium text-gray-800 dark:text-white mb-3">Preferencias</h3>
                
                <div class="space-y-4">
                  <!-- Modo oscuro -->
                  <div class="flex items-center justify-between">
                    <div>
                      <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300">Modo oscuro</h4>
                      <p class="text-xs text-gray-500 dark:text-gray-400">Cambiar entre modo claro y oscuro</p>
                    </div>
                    <button 
                      type="button"
                      @click="toggleDarkMode"
                      class="bg-gray-200 dark:bg-gray-700 relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                      :class="{ 'bg-blue-600': isDarkMode }"
                    >
                      <span 
                        class="translate-x-0 pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
                        :class="{ 'translate-x-5': isDarkMode }"
                      ></span>
                    </button>
                  </div>
                  
                  <!-- Notificaciones -->
                  <div class="flex items-center justify-between">
                    <div>
                      <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300">Notificaciones</h4>
                      <p class="text-xs text-gray-500 dark:text-gray-400">Recibir alertas de estanques</p>
                    </div>
                    <button 
                      type="button"
                      @click="user.notifications = !user.notifications"
                      class="bg-gray-200 dark:bg-gray-700 relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                      :class="{ 'bg-blue-600': user.notifications }"
                    >
                      <span 
                        class="translate-x-0 pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
                        :class="{ 'translate-x-5': user.notifications }"
                      ></span>
                    </button>
                  </div>
                  
                  <!-- Alertas por correo -->
                  <div class="flex items-center justify-between">
                    <div>
                      <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300">Alertas por correo</h4>
                      <p class="text-xs text-gray-500 dark:text-gray-400">Recibir alertas por correo electrónico</p>
                    </div>
                    <button 
                      type="button"
                      @click="user.emailAlerts = !user.emailAlerts"
                      class="bg-gray-200 dark:bg-gray-700 relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                      :class="{ 'bg-blue-600': user.emailAlerts }"
                    >
                      <span 
                        class="translate-x-0 pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
                        :class="{ 'translate-x-5': user.emailAlerts }"
                      ></span>
                    </button>
                  </div>
                </div>
              </div>
              
              <!-- Botones de acción -->
              <div class="flex justify-end space-x-3 pt-6">
                <button 
                  type="button" 
                  @click="resetForm"
                  class="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Cancelar
                </button>
                <button 
                  type="submit" 
                  class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  :disabled="isSubmitting"
                >
                  {{ isSubmitting ? 'Guardando...' : 'Guardar cambios' }}
                </button>
              </div>
            </form>
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
      user: {
        name: 'Administrador',
        email: 'admin@bitnets.com',
        role: 'Supervisor',
        notifications: true,
        emailAlerts: false
      },
      passwords: {
        current: '',
        new: '',
        confirm: ''
      },
      originalUser: null,
      isSubmitting: false,
      availableRoles: [
        'Supervisor',
        'Gerente',
        'Administrador',
        'Técnico',
        'Ayudante',
        'Operador'
      ]
    }
  },
  computed: {
    userInitials() {
      if (!this.user.name) return 'U';
      return this.user.name.split(' ').map(n => n[0]).join('').toUpperCase();
    },
    isDarkMode() {
      const nuxtApp = useNuxtApp();
      return nuxtApp.$darkMode?.value || false;
    }
  },
  mounted() {
    // Cargar datos del usuario desde localStorage o API
    this.loadUserData();
    
    // Guardar una copia del usuario original para poder restaurarlo si se cancela
    this.originalUser = JSON.parse(JSON.stringify(this.user));
  },
  methods: {
    loadUserData() {
      // Aquí cargaríamos los datos del usuario desde localStorage o API
      // Por ahora usamos datos de ejemplo
      const savedUser = localStorage.getItem('user');
      if (savedUser) {
        try {
          const parsedUser = JSON.parse(savedUser);
          this.user = { ...this.user, ...parsedUser };
        } catch (e) {
          console.error('Error al cargar datos del usuario:', e);
        }
      }
    },
    saveProfile() {
      const nuxtApp = useNuxtApp();
      
      // Validar campos requeridos
      if (!this.user.name.trim()) {
        nuxtApp.$notifications?.showError('Por favor ingrese su nombre', 'Campo requerido');
        return;
      }
      
      if (!this.user.email.trim()) {
        nuxtApp.$notifications?.showError('Por favor ingrese su correo electrónico', 'Campo requerido');
        return;
      }
      
      // Validar formato de correo electrónico
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(this.user.email)) {
        nuxtApp.$notifications?.showError('Por favor ingrese un correo electrónico válido', 'Formato inválido');
        return;
      }
      
      // Validar contraseñas si se está intentando cambiar
      if (this.passwords.new) {
        if (this.passwords.new !== this.passwords.confirm) {
          nuxtApp.$notifications?.showError('Las contraseñas no coinciden', 'Error de contraseña');
          return;
        }
        
        if (!this.passwords.current) {
          nuxtApp.$notifications?.showError('Por favor ingrese su contraseña actual', 'Campo requerido');
          return;
        }
        
        // Validar longitud mínima de contraseña
        if (this.passwords.new.length < 6) {
          nuxtApp.$notifications?.showError('La contraseña debe tener al menos 6 caracteres', 'Contraseña débil');
          return;
        }
        
        // Aquí iría la lógica para verificar la contraseña actual y actualizar a la nueva
        console.log('Contraseña cambiada');
      }
      
      // Indicar que estamos guardando
      this.isSubmitting = true;
      
      // Simular una petición a la API
      setTimeout(() => {
        // Guardar datos en localStorage
        localStorage.setItem('user', JSON.stringify({
          name: this.user.name,
          email: this.user.email,
          role: this.user.role,
          notifications: this.user.notifications,
          emailAlerts: this.user.emailAlerts
        }));
        
        // Actualizar la copia original
        this.originalUser = JSON.parse(JSON.stringify(this.user));
        
        // Limpiar campos de contraseña
        this.passwords.current = '';
        this.passwords.new = '';
        this.passwords.confirm = '';
        
        // Finalizar estado de guardado
        this.isSubmitting = false;
        
        // Mostrar notificación de éxito (sin bloquear la UI)
        nuxtApp.$notifications?.showSuccess('Perfil actualizado correctamente');
        
        // Redireccionar al dashboard
        this.$router.push('/');
      }, 800); // Simular un retraso de red
    },
    resetForm() {
      const nuxtApp = useNuxtApp();
      
      // Verificar si hay cambios sin guardar
      const hasChanges = this.hasUnsavedChanges();
      
      // Si hay cambios, mostrar confirmación
      if (hasChanges) {
        const confirmCancel = confirm('¿Estás seguro de que deseas cancelar? Los cambios no guardados se perderán.');
        if (!confirmCancel) {
          return; // El usuario canceló la acción
        }
      }
      
      // Restaurar los datos originales
      this.user = JSON.parse(JSON.stringify(this.originalUser));
      
      // Limpiar campos de contraseña
      this.passwords.current = '';
      this.passwords.new = '';
      this.passwords.confirm = '';
      
      // Notificar al usuario
      nuxtApp.$notifications?.showInfo('Cambios descartados');
      
      // Redireccionar al dashboard
      this.$router.push('/');
    },
    hasUnsavedChanges() {
      // Comparar el usuario actual con el original
      const currentUser = {
        name: this.user.name,
        email: this.user.email,
        role: this.user.role,
        notifications: this.user.notifications,
        emailAlerts: this.user.emailAlerts
      };
      
      const originalUser = {
        name: this.originalUser.name,
        email: this.originalUser.email,
        role: this.originalUser.role,
        notifications: this.originalUser.notifications,
        emailAlerts: this.originalUser.emailAlerts
      };
      
      // Verificar si hay contraseñas ingresadas
      const hasPasswordChanges = this.passwords.current || this.passwords.new || this.passwords.confirm;
      
      // Comparar objetos
      return hasPasswordChanges || JSON.stringify(currentUser) !== JSON.stringify(originalUser);
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