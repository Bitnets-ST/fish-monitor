<template>
  <div class="masters-page">
    <h1 class="text-2xl font-semibold text-gray-800 dark:text-white mb-6">Panel de Maestros</h1>
    
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <!-- Tarjeta para Zonas -->
      <div class="master-card">
        <div class="card-header">
          <svg xmlns="http://www.w3.org/2000/svg" class="card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z" />
          </svg>
          <h3 class="card-title">Zonas</h3>
        </div>
        <p class="card-description">Administrar zonas de la plataforma</p>
        <button @click="$emit('manage-zones')" class="card-button">
          Gestionar
        </button>
      </div>
      
      <!-- Tarjeta para Cámaras -->
      <div class="master-card">
        <div class="card-header">
          <svg xmlns="http://www.w3.org/2000/svg" class="card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z" />
          </svg>
          <h3 class="card-title">Cámaras</h3>
        </div>
        <p class="card-description">Configurar y administrar cámaras</p>
        <button @click="$emit('manage-cameras')" class="card-button">
          Gestionar
        </button>
      </div>
      
      <!-- Tarjeta para Usuarios -->
      <div class="master-card">
        <div class="card-header">
          <svg xmlns="http://www.w3.org/2000/svg" class="card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
          </svg>
          <h3 class="card-title">Usuarios</h3>
        </div>
        <p class="card-description">Gestionar usuarios y roles</p>
        <button @click="$emit('manage-users')" class="card-button">
          Gestionar
        </button>
      </div>
      
      <!-- Tarjeta para Sucursales -->
      <div class="master-card">
        <div class="card-header">
          <svg xmlns="http://www.w3.org/2000/svg" class="card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
          </svg>
          <h3 class="card-title">Sucursales</h3>
        </div>
        <p class="card-description">Administrar sucursales de la empresa</p>
        <button @click="$emit('manage-branches')" class="card-button">
          Gestionar
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MastersPage',
  emits: ['manage-zones', 'manage-cameras', 'manage-users', 'manage-branches']
}
</script>

<style scoped>
.masters-page {
  @apply p-6;
}

.master-card {
  @apply bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 flex flex-col transition-all duration-200 hover:shadow-lg border border-gray-100 dark:border-gray-700;
}

.card-header {
  @apply flex items-center mb-4;
}

.card-icon {
  @apply h-8 w-8 text-blue-600 dark:text-blue-400 mr-3;
}

.card-title {
  @apply text-lg font-semibold text-gray-800 dark:text-white;
}

.card-description {
  @apply text-gray-600 dark:text-gray-300 mb-6 flex-grow;
}

.card-button {
  @apply mt-auto py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 text-center;
}
</style>