/**
 * Modelo de usuario para la aplicación
 */
export class User {
  constructor(id = null, username = '', email = '', name = '', role = 'user') {
    this.id = id;
    this.username = username;
    this.email = email;
    this.name = name;
    this.role = role;
    this.isAdmin = role === 'admin';
  }

  /**
   * Crea un modelo de usuario a partir de datos JSON
   * @param {Object} data Datos del usuario
   * @returns {User} Instancia de usuario
   */
  static fromJson(data) {
    return new User(
      data.id || null,
      data.username || '',
      data.email || '',
      data.name || '',
      data.role || 'user'
    );
  }

  /**
   * Verifica si el usuario está autenticado
   * @returns {boolean} Estado de autenticación
   */
  static isAuthenticated() {
    if (process.client) {
      // Intentar obtener el token de la cookie
      const cookies = document.cookie.split(';');
      for (const cookie of cookies) {
        const [name, value] = cookie.trim().split('=');
        if (name === 'auth_token' && value) {
          return true;
        }
      }
      
      // Compatibilidad con localStorage
      return !!localStorage.getItem('token');
    }
    return false;
  }

  /**
   * Obtiene el usuario actual desde cookies o localStorage
   * @returns {User|null} Usuario autenticado o null
   */
  static getCurrentUser() {
    if (!process.client) return null;
    
    const isAuthenticated = this.isAuthenticated();
    if (!isAuthenticated) return null;
    
    // Intentar obtener datos de las cookies
    const cookies = {};
    document.cookie.split(';').forEach(cookie => {
      const [name, value] = cookie.trim().split('=');
      if (name) cookies[name] = decodeURIComponent(value || '');
    });
    
    if (cookies.user_id && cookies.user_name) {
      return new User(
        cookies.user_id,
        cookies.username || '',
        cookies.email || '',
        cookies.user_name,
        cookies.user_role || 'user'
      );
    }
    
    // Fallback a localStorage para compatibilidad
    const userData = localStorage.getItem('user');
    if (!userData) return null;
    
    try {
      const user = JSON.parse(userData);
      return this.fromJson(user);
    } catch (error) {
      console.error('Error al obtener el usuario actual:', error);
      return null;
    }
  }

  /**
   * Inicia sesión con un usuario y token
   * @param {Object} userData Datos del usuario
   * @param {string} token Token JWT
   */
  static login(userData, token) {
    if (process.client) {
      // Obtener utilidades de cookies si están disponibles
      let cookieUtils = null;
      try {
        const nuxtApp = useNuxtApp();
        cookieUtils = nuxtApp.$cookieUtils;
      } catch (error) {
        console.log('No se pudo acceder a cookieUtils, usando método directo');
      }
      
      // Guardar en cookies
      if (cookieUtils) {
        cookieUtils.setCookie('auth_token', token);
        cookieUtils.setCookie('user_id', userData.id);
        cookieUtils.setCookie('user_name', userData.name);
        cookieUtils.setCookie('user_role', userData.role || 'user');
      } else {
        // Método directo si no está disponible cookieUtils
        const expires = new Date(Date.now() + 7 * 864e5).toUTCString();
        document.cookie = `auth_token=${encodeURIComponent(token)}; expires=${expires}; path=/; SameSite=Strict; Secure`;
        document.cookie = `user_id=${encodeURIComponent(userData.id)}; expires=${expires}; path=/; SameSite=Strict; Secure`;
        document.cookie = `user_name=${encodeURIComponent(userData.name)}; expires=${expires}; path=/; SameSite=Strict; Secure`;
        document.cookie = `user_role=${encodeURIComponent(userData.role || 'user')}; expires=${expires}; path=/; SameSite=Strict; Secure`;
      }
      
      // Mantener compatibilidad con localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(userData));
      
      // Disparar un evento personalizado para notificar el cambio de autenticación
      window.dispatchEvent(new CustomEvent('auth:login', { detail: { user: userData } }));
    }
  }

  /**
   * Cierra la sesión del usuario
   */
  static logout() {
    if (process.client) {
      // Obtener utilidades de cookies si están disponibles
      let cookieUtils = null;
      try {
        const nuxtApp = useNuxtApp();
        cookieUtils = nuxtApp.$cookieUtils;
      } catch (error) {
        console.log('No se pudo acceder a cookieUtils, usando método directo');
      }
      
      // Eliminar cookies
      if (cookieUtils) {
        cookieUtils.deleteCookie('auth_token');
        cookieUtils.deleteCookie('user_id');
        cookieUtils.deleteCookie('user_name');
        cookieUtils.deleteCookie('user_role');
      } else {
        // Método directo si no está disponible cookieUtils
        document.cookie = `auth_token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; SameSite=Strict; Secure`;
        document.cookie = `user_id=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; SameSite=Strict; Secure`;
        document.cookie = `user_name=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; SameSite=Strict; Secure`;
        document.cookie = `user_role=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; SameSite=Strict; Secure`;
      }
      
      // Mantener compatibilidad con localStorage
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
  }
} 