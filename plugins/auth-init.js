// Plugin para inicializar la autenticación desde cookies
import { useUserStore } from '~/stores/user';

export default defineNuxtPlugin(nuxtApp => {
  // Solo ejecutar en el cliente
  if (process.client) {
    const userStore = useUserStore();
    
    // Intentar cargar datos desde cookies
    const success = userStore.loadFromCookies();
    
    if (!success) {
      // Si no hay cookies, intentar cargar desde localStorage (para compatibilidad)
      try {
        const token = localStorage.getItem('token');
        const userData = localStorage.getItem('user');
        
        if (token && userData) {
          const user = JSON.parse(userData);
          userStore.login(user, token);
          
          console.log('Usuario cargado desde localStorage (compatibilidad)');
        }
      } catch (error) {
        console.error('Error al cargar datos de usuario desde localStorage:', error);
      }
    } else {
      console.log('Usuario cargado desde cookies');
    }
  }
});
