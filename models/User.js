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
    return localStorage.getItem('isAuthenticated') === 'true';
  }

  /**
   * Obtiene el usuario actual desde localStorage
   * @returns {User|null} Usuario autenticado o null
   */
  static getCurrentUser() {
    const isAuthenticated = this.isAuthenticated();
    if (!isAuthenticated) return null;

    return new User(
      null,
      localStorage.getItem('username') || '',
      localStorage.getItem('registeredEmail') || '',
      localStorage.getItem('registeredName') || '',
      localStorage.getItem('username') === 'admin'
    );
  }

  /**
   * Cierra la sesión del usuario
   */
  static logout() {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('username');
  }
} 