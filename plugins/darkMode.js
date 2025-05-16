// Plugin para manejar el modo oscuro
export default defineNuxtPlugin((nuxtApp) => {
  // Crear un objeto reactivo para el estado del modo oscuro
  const darkMode = useState('darkMode', () => false);
  
  // Función para alternar el modo oscuro
  const toggleDarkMode = () => {
    darkMode.value = !darkMode.value;
    
    // Guardar preferencia en localStorage
    if (process.client) {
      localStorage.setItem('darkMode', darkMode.value ? 'true' : 'false');
      updateDarkModeClass();
    }
  };
  
  // Función para actualizar la clase dark en el HTML
  const updateDarkModeClass = () => {
    if (process.client) {
      if (darkMode.value) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  };
  
  // Inicializar el modo oscuro basado en la preferencia guardada
  if (process.client) {
    // Verificar si hay una preferencia guardada
    const savedPreference = localStorage.getItem('darkMode');
    
    if (savedPreference === 'true') {
      darkMode.value = true;
    } else if (savedPreference === null) {
      // Si no hay preferencia guardada, usar la preferencia del sistema
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      darkMode.value = prefersDark;
    }
    
    // Aplicar la clase después de establecer el valor
    updateDarkModeClass();
    
    // Escuchar cambios en la preferencia del sistema
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (localStorage.getItem('darkMode') === null) {
        darkMode.value = e.matches;
        updateDarkModeClass();
      }
    });
  }
  
  // Proporcionar el estado y la función de alternar
  nuxtApp.provide('darkMode', darkMode);
  nuxtApp.provide('toggleDarkMode', toggleDarkMode);
  
  // Añadir un hook para asegurar que la clase se aplica en el servidor también
  nuxtApp.hook('app:created', () => {
    // Este hook se ejecuta tanto en el servidor como en el cliente
    if (process.server) {
      // En el servidor, intentamos obtener el estado del modo oscuro de la cookie o cabecera
      // Esto es una aproximación, ya que no tenemos acceso a localStorage en el servidor
      // En producción, podrías usar una cookie para mantener consistencia
      darkMode.value = false; // Por defecto, no usar dark mode en el servidor
    }
  });
});