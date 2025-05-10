<template>
  <div class="fixed inset-0 z-50 overflow-y-auto" v-if="show" @click.self="$emit('close')">
    <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
      <div class="fixed inset-0 transition-opacity" aria-hidden="true">
        <div class="absolute inset-0 bg-gray-500 dark:bg-gray-900 opacity-75"></div>
      </div>

      <div class="inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
        <div class="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <div class="flex justify-between items-center mb-4">
            <h3 class="text-lg font-medium text-gray-900 dark:text-white">
              Notificaciones
            </h3>
            <div class="flex space-x-2">
              <button @click="markAllAsRead" 
                  class="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300">
                Marcar todas como leídas
              </button>
              <button @click="$emit('close')" 
                  class="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
                <span class="sr-only">Cerrar</span>
                <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          <div class="mt-2">
            <div v-if="notifications.length === 0" class="text-center py-4">
              <p class="text-gray-500 dark:text-gray-400">No hay notificaciones</p>
            </div>
            <div v-else class="space-y-4">
              <div v-for="notification in notifications" :key="notification.id" 
                  class="flex items-start p-4 rounded-lg"
                  :class="getNotificationClass(notification.type)">
                <div class="flex-shrink-0">
                  <svg class="h-6 w-6" :class="getNotificationIconClass(notification.type)" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
                  </svg>
                </div>
                <div class="ml-3 w-0 flex-1">
                  <div class="flex justify-between">
                    <p class="text-sm font-medium" :class="getNotificationTextClass(notification.type)">
                      {{ notification.title }}
                    </p>
                    <div class="flex space-x-2">
                      <button @click="markAsRead(notification.id)" 
                          class="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
                        Marcar como leída
                      </button>
                      <button @click="deleteNotification(notification.id)"
                          class="text-sm text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300">
                        Eliminar
                      </button>
                    </div>
                  </div>
                  <p class="mt-1 text-sm" :class="getNotificationTextClass(notification.type)">
                    {{ notification.message }}
                  </p>
                  <p class="mt-1 text-xs text-gray-500 dark:text-gray-400">
                    {{ formatTimestamp(notification.timestamp) }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DashboardNotifications',
  props: {
    show: {
      type: Boolean,
      required: true
    },
    notifications: {
      type: Array,
      required: true
    }
  },
  methods: {
    formatTimestamp(timestamp) {
      const date = new Date(timestamp);
      const now = new Date();
      const diff = now - date;
      
      // Si es menos de 24 horas, mostrar tiempo relativo
      if (diff < 24 * 60 * 60 * 1000) {
        const hours = Math.floor(diff / (60 * 60 * 1000));
        if (hours === 0) {
          const minutes = Math.floor(diff / (60 * 1000));
          return `Hace ${minutes} ${minutes === 1 ? 'minuto' : 'minutos'}`;
        }
        return `Hace ${hours} ${hours === 1 ? 'hora' : 'horas'}`;
      }
      
      // Si es más de 24 horas, mostrar fecha
      return date.toLocaleDateString();
    },
    getNotificationClass(type) {
      switch (type) {
        case 'danger':
          return 'bg-red-50 dark:bg-red-900/20';
        case 'warning':
          return 'bg-yellow-50 dark:bg-yellow-900/20';
        default:
          return 'bg-blue-50 dark:bg-blue-900/20';
      }
    },
    getNotificationIconClass(type) {
      switch (type) {
        case 'danger':
          return 'text-red-400';
        case 'warning':
          return 'text-yellow-400';
        default:
          return 'text-blue-400';
      }
    },
    getNotificationTextClass(type) {
      switch (type) {
        case 'danger':
          return 'text-red-700 dark:text-red-400';
        case 'warning':
          return 'text-yellow-700 dark:text-yellow-400';
        default:
          return 'text-blue-700 dark:text-blue-400';
      }
    },
    markAsRead(notificationId) {
      this.$emit('mark-as-read', notificationId);
    },
    markAllAsRead() {
      this.$emit('mark-all-as-read');
    },
    deleteNotification(notificationId) {
      this.$emit('delete-notification', notificationId);
    }
  }
}
</script>

<style scoped>
/* Los estilos están manejados por Tailwind CSS */
</style> 