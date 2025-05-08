/**
 * Middleware de autenticación para proteger rutas
 * Verifica si el usuario está autenticado antes de acceder a rutas protegidas
 */
import { User } from '~/models/User';

export default defineNuxtRouteMiddleware((to) => {
  // En modo desarrollo, permitir todas las rutas para debugging
  if (process.dev) {
    return;
  }
  
  // Verificar si se ejecuta en el cliente (no en SSR)
  if (process.client) {
    const isAuthenticated = User.isAuthenticated();
    
    // Si el usuario no está autenticado y no está tratando de acceder a login o registro
    if (!isAuthenticated && to.path !== '/login' && to.path !== '/register') {
      // Redireccionar al login
      return navigateTo('/login');
    }
    
    // Si el usuario está autenticado e intenta acceder a login o registro
    if (isAuthenticated && (to.path === '/login' || to.path === '/register')) {
      // Redireccionar al dashboard
      return navigateTo('/');
    }
  }
}); 