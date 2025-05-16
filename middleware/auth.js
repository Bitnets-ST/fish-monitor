// Middleware de autenticación
import { useUserStore } from '~/stores/user';

export default defineNuxtRouteMiddleware((to, from) => {
  // Solo ejecutar en el cliente
  if (process.client) {
    const userStore = useUserStore();
    
    // Si el usuario no está autenticado, redirigir al login
    if (!userStore.isAuthenticated) {
      // Intentar cargar desde cookies primero
      const success = userStore.loadFromCookies();
      
      if (!success) {
        // Redirigir al login
        return navigateTo('/login');
      }
    }
  }
});
