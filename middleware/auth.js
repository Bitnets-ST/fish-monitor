// Middleware de autenticación
import { useUserStore } from '~/stores/user';

export default defineNuxtRouteMiddleware((to, from) => {
  // Evitar redirecciones infinitas
  if (to.path === '/login' || to.path === '/register') {
    return;
  }
  
  // Ejecutar tanto en cliente como en servidor
  const userStore = useUserStore();
  
  // Si el usuario no está autenticado, redirigir al login
  if (!userStore.isAuthenticated) {
    // Intentar cargar desde cookies primero
    const success = userStore.loadFromCookies();
    
    if (!success) {
      // Redirigir al login inmediatamente
      return navigateTo('/login', { replace: true });
    }
  }
});
