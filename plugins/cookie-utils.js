// Plugin para manejar cookies
export default defineNuxtPlugin(() => {
  const cookieUtils = {
    // Establecer una cookie
    setCookie(name, value, days = 7, path = '/') {
      if (process.client) {
        const expires = new Date(Date.now() + days * 864e5).toUTCString();
        document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=${path}; SameSite=Strict; Secure`;
      }
    },
    
    // Obtener el valor de una cookie
    getCookie(name) {
      if (process.client) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) {
          return decodeURIComponent(parts.pop().split(';').shift());
        }
      }
      return null;
    },
    
    // Eliminar una cookie
    deleteCookie(name, path = '/') {
      if (process.client) {
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=${path}; SameSite=Strict; Secure`;
      }
    }
  };
  
  return {
    provide: {
      cookieUtils
    }
  };
});
