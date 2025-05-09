// Plugin para manejar el modo oscuro
export default defineNuxtPlugin((nuxtApp) => {
  // Crear un objeto reactivo para el estado del modo oscuro
  const darkMode = ref(false);
  
  // Función para alternar el modo oscuro
  const toggleDarkMode = () => {
    darkMode.value = !darkMode.value;
    
    // Guardar preferencia en localStorage
    if (process.client) {
      localStorage.setItem('darkMode', darkMode.value ? 'true' : 'false');
    }
    
    // Aplicar clase al elemento html
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
      document.documentElement.classList.add('dark');
    } else if (savedPreference === null) {
      // Si no hay preferencia guardada, usar la preferencia del sistema
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      darkMode.value = prefersDark;
      
      if (prefersDark) {
        document.documentElement.classList.add('dark');
      }
    }
    
    // Escuchar cambios en la preferencia del sistema
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (localStorage.getItem('darkMode') === null) {
        darkMode.value = e.matches;
        if (e.matches) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      }
    });
  }
  
  // Proporcionar el estado y la función de alternar
  nuxtApp.provide('darkMode', darkMode);
  nuxtApp.provide('toggleDarkMode', toggleDarkMode);
}); 