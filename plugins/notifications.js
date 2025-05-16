// Plugin para manejar notificaciones a nivel global
import { v4 as uuidv4 } from 'uuid';

export default defineNuxtPlugin((nuxtApp) => {
  // Crear un objeto para gestionar las notificaciones
  const notifications = {
    notificationSystem: null,
    headerNotifications: [],
    unreadCount: 0,
    
    // Establecer el sistema de notificaciones
    setNotificationSystem(system) {
      // Puede ser una referencia directa o un elemento del DOM
      this.notificationSystem = system;
    },
    
    // Agregar una notificación
    notify({ title, message, type = 'info', showToast = true }) {
      // Crear un ID único para la notificación
      const id = uuidv4();
      
      // Crear la notificación
      const notification = {
        id,
        title,
        message,
        type,
        timestamp: new Date(),
        read: false
      };
      
      // Agregar a la lista de notificaciones del header
      this.headerNotifications.unshift(notification);
      
      // Incrementar contador de no leídas
      this.unreadCount++;
      
      // Si se debe mostrar como toast, usar el sistema de notificaciones
      if (showToast && this.notificationSystem) {
        this.notificationSystem.addNotification({
          title,
          message,
          type,
          timeout: 5000
        });
      }
      
      return id;
    },
    
    // Métodos de conveniencia
    success(message, title = 'Éxito', showToast = true) {
      return this.notify({ title, message, type: 'success', showToast });
    },
    
    error(message, title = 'Error', showToast = true) {
      return this.notify({ title, message, type: 'error', showToast });
    },
    
    warning(message, title = 'Advertencia', showToast = true) {
      return this.notify({ title, message, type: 'warning', showToast });
    },
    
    info(message, title = 'Información', showToast = true) {
      return this.notify({ title, message, type: 'info', showToast });
    },
    
    // Marcar una notificación como leída
    markAsRead(id) {
      const notification = this.headerNotifications.find(n => n.id === id);
      if (notification && !notification.read) {
        notification.read = true;
        this.unreadCount = Math.max(0, this.unreadCount - 1);
      }
    },
    
    // Marcar todas las notificaciones como leídas
    markAllAsRead() {
      this.headerNotifications.forEach(notification => {
        notification.read = true;
      });
      this.unreadCount = 0;
    },
    
    // Eliminar una notificación
    deleteNotification(id) {
      const index = this.headerNotifications.findIndex(n => n.id === id);
      if (index !== -1) {
        // Si la notificación no estaba leída, reducir el contador
        if (!this.headerNotifications[index].read) {
          this.unreadCount = Math.max(0, this.unreadCount - 1);
        }
        // Eliminar la notificación
        this.headerNotifications.splice(index, 1);
      }
    }
  };
  
  // Registrar el objeto de notificaciones
  nuxtApp.provide('notifications', notifications);
}); 