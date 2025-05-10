// Plugin para manejar los datos de usuario a través de componentes
export default defineNuxtPlugin((nuxtApp) => {
  // Crear un objeto reactivo para los datos del usuario
  const userData = ref({
    name: 'Admin',
    email: '',
    role: 'Supervisor',
    phone: ''
  });
  
  // Variable reactiva para la foto de perfil
  const profileImage = ref(null);
  
  // Función para actualizar los datos del usuario
  const updateUserData = (newUserData) => {
    userData.value = { ...userData.value, ...newUserData };
    
    // Guardar en localStorage
    if (process.client) {
      localStorage.setItem('user', JSON.stringify(userData.value));
    }
  };
  
  // Función para actualizar la foto de perfil
  const updateProfileImage = (imageData) => {
    profileImage.value = imageData;
    
    // Guardar en localStorage
    if (process.client) {
      localStorage.setItem('profileImage', imageData);
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
      
      // Cargar foto de perfil
      const savedProfileImage = localStorage.getItem('profileImage');
      if (savedProfileImage) {
        profileImage.value = savedProfileImage;
      }
    } catch (e) {
      console.error('Error al cargar datos del usuario:', e);
    }
  }
  
  // Proporcionar el estado y las funciones de actualización
  nuxtApp.provide('userData', userData);
  nuxtApp.provide('updateUserData', updateUserData);
  nuxtApp.provide('profileImage', profileImage);
  nuxtApp.provide('updateProfileImage', updateProfileImage);
}); 