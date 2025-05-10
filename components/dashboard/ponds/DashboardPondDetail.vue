<template>
  <div class="pond-detail-container">
    <div class="pond-header">
      <div class="pond-title">
        <div class="pond-avatar">{{ pond.name.charAt(0) }}</div>
        <div>
          <h2 class="title">{{ pond.name }}</h2>
          <p class="subtitle">ID: {{ pond.id }}</p>
        </div>
      </div>
      <div class="pond-actions">
        <button class="action-button edit" @click="$emit('edit-pond', pond)">
          <svg xmlns="http://www.w3.org/2000/svg" class="action-icon" viewBox="0 0 20 20" fill="currentColor">
            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
          </svg>
          Editar
        </button>
        <button class="action-button delete" @click="$emit('delete-pond', pond)">
          <svg xmlns="http://www.w3.org/2000/svg" class="action-icon" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
          </svg>
          Eliminar
        </button>
      </div>
    </div>

    <div class="pond-content">
      <!-- Información General -->
      <div class="info-section">
        <h3 class="section-title">Información General</h3>
        <div class="info-grid">
          <div class="info-item">
            <span class="info-label">Zona</span>
            <span class="info-value">{{ getZoneName(pond.zoneId) }}</span>
          </div>
          <div class="info-item">
            <span class="info-label">Estado</span>
            <span class="info-value status-badge" :class="pond.status">{{ getStatusText(pond.status) }}</span>
          </div>
          <div class="info-item">
            <span class="info-label">Última actualización</span>
            <span class="info-value">{{ formatDate(pond.lastUpdate) }}</span>
          </div>
        </div>
      </div>

      <!-- Estadísticas -->
      <div class="stats-section">
        <h3 class="section-title">Estadísticas</h3>
        <div class="stats-grid">
          <div class="stat-card">
            <div class="stat-icon">
              <svg xmlns="http://www.w3.org/2000/svg" class="icon" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 2a1 1 0 011 1v1.323l3.954 1.582 1.599-.8a1 1 0 01.894 1.79l-1.233.616 1.738 5.42a1 1 0 01-.285 1.05A3.989 3.989 0 0115 15a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05l1.715-5.349L11 4.477V16h2a1 1 0 110 2H7a1 1 0 110-2h2V4.477L6.237 7.582l1.715 5.349a1 1 0 01-.285 1.05A3.989 3.989 0 015 15a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05l1.738-5.42-1.233-.616a1 1 0 01.894-1.79l1.599.8L9 4.323V3a1 1 0 011-1zm-5 8.274l-.818 2.552c.25.112.526.174.818.174.292 0 .569-.062.818-.174L5 10.274zm10 0l-.818 2.552c.25.112.526.174.818.174.292 0 .569-.062.818-.174L15 10.274z" clip-rule="evenodd" />
              </svg>
            </div>
            <div class="stat-content">
              <h4 class="stat-title">Total de Peces</h4>
              <p class="stat-value">{{ pond.fishCount }}</p>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon">
              <svg xmlns="http://www.w3.org/2000/svg" class="icon" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z" clip-rule="evenodd" />
              </svg>
            </div>
            <div class="stat-content">
              <h4 class="stat-title">Temperatura</h4>
              <p class="stat-value">{{ pond.temperature }}°C</p>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon">
              <svg xmlns="http://www.w3.org/2000/svg" class="icon" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd" />
              </svg>
            </div>
            <div class="stat-content">
              <h4 class="stat-title">Salud Promedio</h4>
              <p class="stat-value">{{ pond.health }}%</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Alertas Activas -->
      <div class="alerts-section">
        <h3 class="section-title">Alertas Activas</h3>
        <div v-if="pond.alerts && pond.alerts.length > 0" class="alerts-list">
          <div v-for="alert in pond.alerts" :key="alert.id" class="alert-item" :class="alert.type">
            <div class="alert-icon">
              <svg xmlns="http://www.w3.org/2000/svg" class="icon" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
              </svg>
            </div>
            <div class="alert-content">
              <h4 class="alert-title">{{ alert.title }}</h4>
              <p class="alert-message">{{ alert.message }}</p>
              <span class="alert-time">{{ formatDate(alert.timestamp) }}</span>
            </div>
          </div>
        </div>
        <div v-else class="no-alerts">
          No hay alertas activas
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DashboardPondDetail',
  props: {
    pond: {
      type: Object,
      required: true
    }
  },
  methods: {
    getZoneName(zoneId) {
      const zones = {
        1: 'Zona Norte',
        2: 'Zona Central',
        3: 'Zona Sur'
      }
      return zones[zoneId] || `Zona ${zoneId}`
    },
    getStatusText(status) {
      const statusMap = {
        active: 'Activo',
        inactive: 'Inactivo',
        maintenance: 'Mantenimiento',
        danger: 'Peligro'
      }
      return statusMap[status] || status
    },
    formatDate(date) {
      return new Date(date).toLocaleString()
    }
  }
}
</script>

<style scoped>
.pond-detail-container {
  @apply bg-white dark:bg-gray-800 rounded-lg shadow p-6;
}

.pond-header {
  @apply flex justify-between items-start mb-6;
}

.pond-title {
  @apply flex items-center;
}

.pond-avatar {
  @apply w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-xl mr-4;
}

.title {
  @apply text-xl font-semibold text-gray-900 dark:text-gray-100;
}

.subtitle {
  @apply text-sm text-gray-500 dark:text-gray-400;
}

.pond-actions {
  @apply flex space-x-2;
}

.action-button {
  @apply flex items-center px-3 py-2 rounded-lg text-sm font-medium focus:outline-none;
}

.action-button.edit {
  @apply bg-blue-500 text-white hover:bg-blue-600;
}

.action-button.delete {
  @apply bg-red-500 text-white hover:bg-red-600;
}

.action-icon {
  @apply h-4 w-4 mr-2;
}

.pond-content {
  @apply space-y-6;
}

.section-title {
  @apply text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4;
}

.info-section {
  @apply bg-gray-50 dark:bg-gray-700 rounded-lg p-4;
}

.info-grid {
  @apply grid grid-cols-1 sm:grid-cols-3 gap-4;
}

.info-item {
  @apply flex flex-col;
}

.info-label {
  @apply text-sm text-gray-500 dark:text-gray-400;
}

.info-value {
  @apply text-sm font-medium text-gray-900 dark:text-gray-100 mt-1;
}

.status-badge {
  @apply inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium;
}

.status-badge.active {
  @apply bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400;
}

.status-badge.inactive {
  @apply bg-gray-100 dark:bg-gray-900/20 text-gray-800 dark:text-gray-400;
}

.status-badge.maintenance {
  @apply bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-400;
}

.status-badge.danger {
  @apply bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-400;
}

.stats-section {
  @apply bg-gray-50 dark:bg-gray-700 rounded-lg p-4;
}

.stats-grid {
  @apply grid grid-cols-1 sm:grid-cols-3 gap-4;
}

.stat-card {
  @apply flex items-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm;
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

.alerts-section {
  @apply bg-gray-50 dark:bg-gray-700 rounded-lg p-4;
}

.alerts-list {
  @apply space-y-4;
}

.alert-item {
  @apply flex items-start p-4 rounded-lg;
}

.alert-item.danger {
  @apply bg-red-50 dark:bg-red-900/20;
}

.alert-item.warning {
  @apply bg-yellow-50 dark:bg-yellow-900/20;
}

.alert-icon {
  @apply flex-shrink-0 w-6 h-6;
}

.alert-item.danger .alert-icon {
  @apply text-red-600 dark:text-red-400;
}

.alert-item.warning .alert-icon {
  @apply text-yellow-600 dark:text-yellow-400;
}

.alert-content {
  @apply ml-3;
}

.alert-title {
  @apply text-sm font-medium;
}

.alert-item.danger .alert-title {
  @apply text-red-800 dark:text-red-200;
}

.alert-item.warning .alert-title {
  @apply text-yellow-800 dark:text-yellow-200;
}

.alert-message {
  @apply text-sm mt-1;
}

.alert-item.danger .alert-message {
  @apply text-red-700 dark:text-red-300;
}

.alert-item.warning .alert-message {
  @apply text-yellow-700 dark:text-yellow-300;
}

.alert-time {
  @apply text-xs text-gray-500 dark:text-gray-400 mt-1;
}

.no-alerts {
  @apply text-center text-gray-500 dark:text-gray-400 py-4;
}
</style> 