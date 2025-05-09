// Plugin para manejar los datos de usuario a través de componentes
export default defineNuxtPlugin((nuxtApp) => {
  // Crear un objeto reactivo para los datos del usuario
  const userData = ref({
    name: 'Admin',
    email: '',
    role: 'Supervisor',
    phone: ''
  });
  
  // Función para actualizar los datos del usuario
  const updateUserData = (newUserData) => {
    userData.value = { ...userData.value, ...newUserData };
    
    // Guardar en localStorage
    if (process.client) {
      localStorage.setItem('user', JSON.stringify(userData.value));
    }
  };
  
  // Inicializar con datos del localStorage si existen
  if (process.client) {
    try {
      const savedUser = localStorage.getItem('user');
      if (savedUser) {
        const parsedUser = JSON.parse(savedUser);
        userData.value = { ...userData.value, ...parsedUser };
      }
    } catch (e) {
      console.error('Error al cargar datos del usuario:', e);
    }
  }
  
  // Proporcionar el estado y la función de actualizar
  nuxtApp.provide('userData', userData);
  nuxtApp.provide('updateUserData', updateUserData);
}); 