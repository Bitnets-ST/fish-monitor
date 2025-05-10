<template>
  <div class="stats-container">
    <!-- Destacadas -->
    <div class="stats-section">
      <h2 class="section-title">Destacadas</h2>
      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-icon">
            <svg xmlns="http://www.w3.org/2000/svg" class="icon" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
            </svg>
          </div>
          <div class="stat-content">
            <h3 class="stat-title">Mejor Zona</h3>
            <p class="stat-value">{{ bestZone.name }}</p>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon">
            <svg xmlns="http://www.w3.org/2000/svg" class="icon" viewBox="0 0 20 20" fill="currentColor">
              <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
              <path fill-rule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clip-rule="evenodd" />
            </svg>
          </div>
          <div class="stat-content">
            <h3 class="stat-title">Estanques</h3>
            <p class="stat-value">{{ ponds.length }}</p>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon">
            <svg xmlns="http://www.w3.org/2000/svg" class="icon" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 2a1 1 0 011 1v1.323l3.954 1.582 1.599-.8a1 1 0 01.894 1.79l-1.233.616 1.738 5.42a1 1 0 01-.285 1.05A3.989 3.989 0 0115 15a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05l1.715-5.349L11 4.477V16h2a1 1 0 110 2H7a1 1 0 110-2h2V4.477L6.237 7.582l1.715 5.349a1 1 0 01-.285 1.05A3.989 3.989 0 015 15a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05l1.738-5.42-1.233-.616a1 1 0 01.894-1.79l1.599.8L9 4.323V3a1 1 0 011-1zm-5 8.274l-.818 2.552c.25.112.526.174.818.174.292 0 .569-.062.818-.174L5 10.274zm10 0l-.818 2.552c.25.112.526.174.818.174.292 0 .569-.062.818-.174L15 10.274z" clip-rule="evenodd" />
            </svg>
          </div>
          <div class="stat-content">
            <h3 class="stat-title">Peces</h3>
            <p class="stat-value">{{ ponds.reduce((total, pond) => total + pond.fishCount, 0) }}</p>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon">
            <svg xmlns="http://www.w3.org/2000/svg" class="icon" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z" clip-rule="evenodd" />
            </svg>
          </div>
          <div class="stat-content">
            <h3 class="stat-title">Salud Promedio</h3>
            <p class="stat-value">{{ (ponds.reduce((total, pond) => total + pond.health, 0) / ponds.length).toFixed(1) }}%</p>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon">
            <svg xmlns="http://www.w3.org/2000/svg" class="icon" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z" clip-rule="evenodd" />
            </svg>
          </div>
          <div class="stat-content">
            <h3 class="stat-title">Temperatura</h3>
            <p class="stat-value">{{ (ponds.reduce((total, pond) => total + pond.temperature, 0) / ponds.length).toFixed(1) }}°C</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Advertencias -->
    <div class="warnings-section">
      <h2 class="section-title">Advertencias</h2>
      <div v-if="warnings.length === 0" class="no-warnings">
        No hay advertencias activas
      </div>
      <div v-else class="warnings-list">
        <div v-for="warning in warnings" :key="warning.id" class="warning-item" :class="warning.status">
          <div class="warning-icon">
            <svg v-if="warning.status === 'danger'" xmlns="http://www.w3.org/2000/svg" class="icon" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" class="icon" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
            </svg>
          </div>
          <div class="warning-content">
            <h3 class="warning-title">{{ warning.title }}</h3>
            <p class="warning-message">{{ warning.message }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DashboardStats',
  props: {
    ponds: {
      type: Array,
      required: true
    },
    bestZone: {
      type: Object,
      required: true
    },
    warnings: {
      type: Array,
      required: true
    }
  }
}
</script>

<style scoped>
.stats-container {
  @apply grid grid-cols-1 lg:grid-cols-2 gap-6;
}

.stats-section {
  @apply bg-white dark:bg-gray-800 rounded-lg shadow p-6;
}

.section-title {
  @apply text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4;
}

.stats-grid {
  @apply grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4;
}

.stat-card {
  @apply flex items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg;
}

.stat-icon {
  @apply flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400;
}

.icon {
  @apply w-6 h-6;
}

.stat-content {
  @apply ml-4;
}

.stat-title {
  @apply text-sm font-medium text-gray-500 dark:text-gray-400;
}

.stat-value {
  @apply text-lg font-semibold text-gray-900 dark:text-gray-100;
}

.warnings-section {
  @apply bg-white dark:bg-gray-800 rounded-lg shadow p-6;
}

.no-warnings {
  @apply text-center text-gray-500 dark:text-gray-400 py-4;
}

.warnings-list {
  @apply space-y-4;
}

.warning-item {
  @apply flex items-start p-4 rounded-lg;
}

.warning-item.danger {
  @apply bg-red-50 dark:bg-red-900/20;
}

.warning-item.warning {
  @apply bg-yellow-50 dark:bg-yellow-900/20;
}

.warning-icon {
  @apply flex-shrink-0 w-6 h-6;
}

.warning-item.danger .warning-icon {
  @apply text-red-600 dark:text-red-400;
}

.warning-item.warning .warning-icon {
  @apply text-yellow-600 dark:text-yellow-400;
}

.warning-content {
  @apply ml-3;
}

.warning-title {
  @apply text-sm font-medium;
}

.warning-item.danger .warning-title {
  @apply text-red-800 dark:text-red-200;
}

.warning-item.warning .warning-title {
  @apply text-yellow-800 dark:text-yellow-200;
}

.warning-message {
  @apply text-sm mt-1;
}

.warning-item.danger .warning-message {
  @apply text-red-700 dark:text-red-300;
}

.warning-item.warning .warning-message {
  @apply text-yellow-700 dark:text-yellow-300;
}
</style> 