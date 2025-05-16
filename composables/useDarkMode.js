// Composable para manejar el modo oscuro de forma consistente
export const useDarkMode = () => {
  // Estado compartido para el modo oscuro
  const isDark = useState('dark-mode', () => false);
  
  // Función para aplicar el modo oscuro en el DOM
  const applyDarkMode = () => {
    if (process.client) {
      if (isDark.value) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  };
  
  // Función para alternar el modo oscuro
  const toggleDarkMode = () => {
    isDark.value = !isDark.value;
    
    if (process.client) {
      localStorage.setItem('darkMode', isDark.value ? 'true' : 'false');
      applyDarkMode();
    }
  };
  
  // Inicializar desde localStorage o preferencias del sistema
  const initDarkMode = () => {
    if (process.client) {
      const savedPreference = localStorage.getItem('darkMode');
      
      if (savedPreference === 'true') {
        isDark.value = true;
      } else if (savedPreference === null && window.matchMedia) {
        // Si no hay preferencia guardada, usar la preferencia del sistema
        isDark.value = window.matchMedia('(prefers-color-scheme: dark)').matches;
      }
      
      // Aplicar inmediatamente
      applyDarkMode();
    }
  };
  
  return {
    isDark,
    toggleDarkMode,
    applyDarkMode,
    initDarkMode
  };
};
