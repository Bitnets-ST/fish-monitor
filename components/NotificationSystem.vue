<template>
  <div class="fixed top-20 right-4 z-50 w-80">
    <transition-group name="notification">
      <div 
        v-for="notification in notifications" 
        :key="notification.id"
        class="mb-3 p-4 rounded-lg shadow-lg flex items-start"
        :class="getNotificationClass(notification.type)"
      >
        <div class="mr-3 mt-0.5">
          <!-- Icono de éxito -->
          <svg v-if="notification.type === 'success'" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
          </svg>
          
          <!-- Icono de error -->
          <svg v-else-if="notification.type === 'error'" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
          </svg>
          
          <!-- Icono de advertencia -->
          <svg v-else-if="notification.type === 'warning'" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
          </svg>
          
          <!-- Icono de información -->
          <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
          </svg>
        </div>
        
        <div class="flex-1 pr-8">
          <div class="font-medium text-white">{{ notification.title }}</div>
          <div class="text-sm text-white text-opacity-90">{{ notification.message }}</div>
        </div>
        
        <button 
          @click="removeNotification(notification.id)" 
          class="absolute top-2 right-2 text-white text-opacity-80 hover:text-opacity-100"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
          </svg>
        </button>
      </div>
    </transition-group>
  </div>
</template>

<script>
export default {
  name: 'NotificationSystem',
  data() {
    return {
      notifications: [],
      nextId: 1
    };
  },
  methods: {
    addNotification(notification) {
      const id = this.nextId++;
      const newNotification = {
        id,
        title: notification.title || 'Notificación',
        message: notification.message || '',
        type: notification.type || 'info',
        timeout: notification.timeout || 5000
      };
      
      this.notifications.push(newNotification);
      
      // Auto-remove after timeout
      if (newNotification.timeout > 0) {
        setTimeout(() => {
          this.removeNotification(id);
        }, newNotification.timeout);
      }
      
      return id;
    },
    
    removeNotification(id) {
      const index = this.notifications.findIndex(n => n.id === id);
      if (index !== -1) {
        this.notifications.splice(index, 1);
      }
    },
    
    getNotificationClass(type) {
      switch (type) {
        case 'success':
          return 'bg-green-600 dark:bg-green-700 shadow-green-200 dark:shadow-green-900/20';
        case 'error':
          return 'bg-red-600 dark:bg-red-700 shadow-red-200 dark:shadow-red-900/20';
        case 'warning':
          return 'bg-yellow-600 dark:bg-yellow-700 shadow-yellow-200 dark:shadow-yellow-900/20';
        default:
          return 'bg-blue-600 dark:bg-blue-700 shadow-blue-200 dark:shadow-blue-900/20';
      }
    },
    
    // Métodos de conveniencia
    success(message, title = 'Éxito') {
      return this.addNotification({ title, message, type: 'success' });
    },
    
    error(message, title = 'Error') {
      return this.addNotification({ title, message, type: 'error' });
    },
    
    warning(message, title = 'Advertencia') {
      return this.addNotification({ title, message, type: 'warning' });
    },
    
    info(message, title = 'Información') {
      return this.addNotification({ title, message, type: 'info' });
    }
  }
};
</script>

<style scoped>
.notification-enter-active,
.notification-leave-active {
  transition: all 0.3s ease;
}
.notification-enter-from {
  opacity: 0;
  transform: translateX(30px);
}
.notification-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}
</style> 