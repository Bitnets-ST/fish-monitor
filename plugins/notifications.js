// Plugin para manejar notificaciones a nivel global
export default defineNuxtPlugin((nuxtApp) => {
  // Crear una referencia global para el componente de notificaciones
  const notificationSystem = ref(null);
  
  // Estado para las notificaciones de la campanita
  const headerNotifications = ref([]);
  const unreadCount = ref(0);
  
  // Funciones para mostrar notificaciones toast
  const showNotification = (notification) => {
    if (notificationSystem.value) {
      return notificationSystem.value.addNotification(notification);
    }
    return null;
  };

  const showSuccess = (message, title = 'Éxito') => {
    return showNotification({ title, message, type: 'success' });
  };

  const showError = (message, title = 'Error') => {
    return showNotification({ title, message, type: 'error' });
  };

  const showWarning = (message, title = 'Advertencia') => {
    return showNotification({ title, message, type: 'warning' });
  };

  const showInfo = (message, title = 'Información') => {
    return showNotification({ title, message, type: 'info' });
  };

  // Registrar el sistema de notificaciones
  const setNotificationSystem = (system) => {
    notificationSystem.value = system;
  };
  
  // Funciones para gestionar notificaciones de la campanita
  const addHeaderNotification = (notification) => {
    // Generar un ID único para la notificación
    const id = Date.now();
    
    // Crear la notificación con valores por defecto
    const newNotification = {
      id,
      title: notification.title || 'Notificación',
      message: notification.message || '',
      type: notification.type || 'info',
      read: false,
      timestamp: new Date(),
      link: notification.link || null
    };
    
    // Añadir al inicio del array para que las más recientes aparezcan primero
    headerNotifications.value.unshift(newNotification);
    
    // Actualizar contador de no leídas
    unreadCount.value++;
    
    // Guardar en localStorage para persistencia
    if (process.client) {
      saveNotificationsToStorage();
    }
    
    return id;
  };
  
  const removeHeaderNotification = (id) => {
    const index = headerNotifications.value.findIndex(n => n.id === id);
    if (index !== -1) {
      // Si la notificación no estaba leída, decrementar el contador
      if (!headerNotifications.value[index].read) {
        unreadCount.value--;
      }
      
      // Eliminar la notificación
      headerNotifications.value.splice(index, 1);
      
      // Guardar en localStorage
      if (process.client) {
        saveNotificationsToStorage();
      }
    }
  };
  
  // Alias más explícito para eliminar notificaciones
  const deleteNotification = (id) => {
    removeHeaderNotification(id);
  };
  
  const markAsRead = (id) => {
    const notification = headerNotifications.value.find(n => n.id === id);
    if (notification && !notification.read) {
      notification.read = true;
      unreadCount.value--;
      
      // Guardar en localStorage
      if (process.client) {
        saveNotificationsToStorage();
      }
    }
  };
  
  const markAllAsRead = () => {
    headerNotifications.value.forEach(notification => {
      notification.read = true;
    });
    unreadCount.value = 0;
    
    // Guardar en localStorage
    if (process.client) {
      saveNotificationsToStorage();
    }
  };
  
  // Función para guardar notificaciones en localStorage
  const saveNotificationsToStorage = () => {
    try {
      localStorage.setItem('headerNotifications', JSON.stringify(headerNotifications.value));
      localStorage.setItem('unreadCount', unreadCount.value.toString());
    } catch (e) {
      console.error('Error al guardar notificaciones:', e);
    }
  };
  
  // Función para cargar notificaciones desde localStorage
  const loadNotificationsFromStorage = () => {
    try {
      const savedNotifications = localStorage.getItem('headerNotifications');
      const savedUnreadCount = localStorage.getItem('unreadCount');
      
      if (savedNotifications) {
        const parsedNotifications = JSON.parse(savedNotifications);
        headerNotifications.value = parsedNotifications.map(n => ({
          ...n,
          timestamp: new Date(n.timestamp) // Convertir string a Date
        }));
      }
      
      if (savedUnreadCount) {
        unreadCount.value = parseInt(savedUnreadCount, 10) || 0;
      }
    } catch (e) {
      console.error('Error al cargar notificaciones:', e);
    }
  };
  
  // Cargar notificaciones al iniciar (solo en el cliente)
  if (process.client) {
    loadNotificationsFromStorage();
  }
  
  // Función para añadir una notificación tanto al header como mostrar un toast
  const notify = (options) => {
    // Añadir a las notificaciones del header
    addHeaderNotification(options);
    
    // Mostrar también como toast si se especifica
    if (options.showToast !== false) {
      const toastType = options.type === 'danger' ? 'error' : options.type;
      if (toastType === 'success') showSuccess(options.message, options.title);
      else if (toastType === 'error') showError(options.message, options.title);
      else if (toastType === 'warning') showWarning(options.message, options.title);
      else showInfo(options.message, options.title);
    }
  };

  // Exponer funciones y estado globalmente
  nuxtApp.$notifications = {
    // Toast notifications
    setNotificationSystem,
    showNotification,
    showSuccess,
    showError,
    showWarning,
    showInfo,
    
    // Header notifications
    headerNotifications,
    unreadCount,
    addHeaderNotification,
    removeHeaderNotification,
    deleteNotification,
    markAsRead,
    markAllAsRead,
    
    // Combined
    notify
  };

  return {
    provide: {
      notifications: {
        // Toast notifications
        setNotificationSystem,
        showNotification,
        showSuccess,
        showError,
        showWarning,
        showInfo,
        
        // Header notifications
        headerNotifications,
        unreadCount,
        addHeaderNotification,
        removeHeaderNotification,
        deleteNotification,
        markAsRead,
        markAllAsRead,
        
        // Combined
        notify
      }
    }
  };
}); 