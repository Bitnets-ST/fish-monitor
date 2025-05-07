/**
 * Modelo de usuario para la aplicación
 */
export class User {
  constructor(id = null, username = '', email = '', name = '', isAdmin = false) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.name = name;
    this.isAdmin = isAdmin;
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
      data.isAdmin || false
    );
  }

  /**
   * Verifica si el usuario está autenticado
   * @returns {boolean} Estado de autenticación
   */
  static isAuthenticated() {
    return !!localStorage.getItem('token');
  }

  /**
   * Obtiene el usuario actual desde localStorage
   * @returns {User|null} Usuario autenticado o null
   */
  static getCurrentUser() {
    const isAuthenticated = this.isAuthenticated();
    if (!isAuthenticated) return null;

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
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData));
  }

  /**
   * Cierra la sesión del usuario
   */
  static logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
} 