// Plugin para manejar el modo oscuro en la aplicación
export default defineNuxtPlugin((nuxtApp) => {
  const darkMode = useState('darkMode', () => {
    // Verificar si hay una preferencia guardada en localStorage
    if (process.client) {
      const savedMode = localStorage.getItem('darkMode');
      if (savedMode !== null) {
        return savedMode === 'true';
      }
      // Si no hay preferencia, usar la preferencia del sistema
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  // Función para cambiar entre modo claro y oscuro
  const toggleDarkMode = () => {
    darkMode.value = !darkMode.value;
    if (process.client) {
      localStorage.setItem('darkMode', darkMode.value.toString());
      applyDarkMode();
    }
  };

  // Función para aplicar el modo oscuro al DOM
  const applyDarkMode = () => {
    if (process.client) {
      if (darkMode.value) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  };

  // Aplicar el modo oscuro al cargar la página
  if (process.client) {
    nuxtApp.hook('app:mounted', () => {
      applyDarkMode();
    });
  }

  // Exponer funciones y estado globalmente
  nuxtApp.$darkMode = darkMode;
  nuxtApp.$toggleDarkMode = toggleDarkMode;

  return {
    provide: {
      darkMode,
      toggleDarkMode
    }
  };
}); 