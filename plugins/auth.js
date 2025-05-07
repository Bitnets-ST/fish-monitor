// Plugin para gestionar la autenticación
import { User } from '~/models/User';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook('app:created', () => {
    // Configurar interceptor para agregar el token a las solicitudes
    const originalFetch = globalThis.fetch;
    globalThis.fetch = async function (resource, options = {}) {
      // Si es una solicitud a nuestra API y el usuario está autenticado
      if (resource.toString().includes('/api/') && User.isAuthenticated()) {
        const token = localStorage.getItem('token');
        options.headers = options.headers || {};
        
        // Añadir el token al encabezado de autorización
        if (token) {
          options.headers.Authorization = `Bearer ${token}`;
        }
      }
      
      // Realizar la solicitud
      return originalFetch(resource, options);
    };
  });
}); 