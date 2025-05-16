// Store para manejar el estado del usuario
import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    id: null,
    name: null,
    email: null,
    username: null,
    role: null,
    isAuthenticated: false,
    token: null
  }),
  
  getters: {
    isAdmin: (state) => state.role === 'admin',
    getUserId: (state) => state.id,
    getUserName: (state) => state.name,
    getUserRole: (state) => state.role
  },
  
  actions: {
    setUser(userData) {
      this.id = userData.id;
      this.name = userData.name;
      this.email = userData.email;
      this.username = userData.username;
      this.role = userData.role || 'user';
      this.isAuthenticated = true;
      
      // Guardar datos en cookies
      if (process.client) {
        const { $cookieUtils } = useNuxtApp();
        if ($cookieUtils) {
          $cookieUtils.setCookie('user_id', this.id);
          $cookieUtils.setCookie('user_name', this.name);
          $cookieUtils.setCookie('user_role', this.role);
        }
      }
    },
    
    setToken(token) {
      this.token = token;
      
      // Guardar token en cookie
      if (process.client) {
        const { $cookieUtils } = useNuxtApp();
        if ($cookieUtils) {
          $cookieUtils.setCookie('auth_token', token);
        }
      }
    },
    
    login(userData, token) {
      this.setUser(userData);
      this.setToken(token);
    },
    
    logout() {
      // Limpiar cookies
      if (process.client) {
        const { $cookieUtils } = useNuxtApp();
        if ($cookieUtils) {
          $cookieUtils.deleteCookie('user_id');
          $cookieUtils.deleteCookie('user_name');
          $cookieUtils.deleteCookie('user_role');
          $cookieUtils.deleteCookie('auth_token');
        }
      }
      
      // Limpiar estado
      this.id = null;
      this.name = null;
      this.email = null;
      this.username = null;
      this.role = null;
      this.isAuthenticated = false;
      this.token = null;
    },
    
    // Cargar datos desde cookies
    loadFromCookies() {
      if (process.client) {
        const { $cookieUtils } = useNuxtApp();
        if ($cookieUtils) {
          const token = $cookieUtils.getCookie('auth_token');
          const id = $cookieUtils.getCookie('user_id');
          const name = $cookieUtils.getCookie('user_name');
          const role = $cookieUtils.getCookie('user_role');
          
          if (token && id) {
            this.token = token;
            this.id = id;
            this.name = name;
            this.role = role;
            this.isAuthenticated = true;
            return true;
          }
        }
      }
      return false;
    }
  },
  
  persist: false // Ya no necesitamos persistencia automática porque usamos cookies
});
