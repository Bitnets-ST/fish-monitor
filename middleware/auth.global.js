/**
 * Middleware global de autenticación
 * Protege todas las rutas excepto login y registro
 */
export default defineNuxtRouteMiddleware((to, from) => {
  // Rutas públicas que no requieren autenticación
  const publicRoutes = ['/login', '/register'];
  
  // Verificar si se ejecuta en el cliente (no en SSR)
  if (import.meta.client) {
    const isAuthenticated = !!localStorage.getItem('token');
    
    // Si el usuario no está autenticado y no está tratando de acceder a una ruta pública
    if (!isAuthenticated && !publicRoutes.includes(to.path)) {
      // Redireccionar al login
      return navigateTo('/login');
    }
    
    // Si el usuario está autenticado e intenta acceder a login o registro
    if (isAuthenticated && publicRoutes.includes(to.path)) {
      // Redireccionar al dashboard
      return navigateTo('/');
    }
  }
}); 