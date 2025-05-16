// Plugin para configurar la persistencia de Pinia
export default defineNuxtPlugin(nuxtApp => {
  // Pinia ya está configurado por Nuxt, solo necesitamos asegurarnos de que
  // la persistencia funcione correctamente en el cliente
  if (process.client) {
    // La persistencia se configura en cada store con la opción 'persist: true'
    console.log('Pinia plugin inicializado en el cliente');
  }
});
