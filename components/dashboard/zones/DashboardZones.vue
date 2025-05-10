<template>
  <div class="zones-container">
    <h2 class="section-title">Zonas</h2>
    <div class="zones-grid">
      <div v-for="zone in zones" :key="zone.id" class="zone-card">
        <div class="zone-header">
          <div class="zone-avatar">
            {{ zone.name.charAt(0) }}
          </div>
          <div class="zone-info">
            <h3 class="zone-name">{{ zone.name }}</h3>
            <p class="zone-status" :class="zone.status">{{ getStatusText(zone.status) }}</p>
          </div>
        </div>
        <div class="zone-stats">
          <div class="stat">
            <span class="stat-label">Estanques</span>
            <span class="stat-value">{{ getPondCount(zone.id) }}</span>
          </div>
          <div class="stat">
            <span class="stat-label">Peces</span>
            <span class="stat-value">{{ getTotalFish(zone.id) }}</span>
          </div>
          <div class="stat">
            <span class="stat-label">Temperatura</span>
            <span class="stat-value">{{ getAverageTemperature(zone.id) }}°C</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DashboardZones',
  props: {
    zones: {
      type: Array,
      required: true
    },
    ponds: {
      type: Array,
      required: true
    }
  },
  methods: {
    getStatusText(status) {
      const statusMap = {
        active: 'Activa',
        inactive: 'Inactiva',
        maintenance: 'En mantenimiento'
      }
      return statusMap[status] || status
    },
    getPondCount(zoneId) {
      return this.ponds.filter(pond => pond.zoneId === zoneId).length
    },
    getTotalFish(zoneId) {
      return this.ponds
        .filter(pond => pond.zoneId === zoneId)
        .reduce((total, pond) => total + pond.fishCount, 0)
    },
    getAverageTemperature(zoneId) {
      const zonePonds = this.ponds.filter(pond => pond.zoneId === zoneId)
      if (zonePonds.length === 0) return 0
      const totalTemp = zonePonds.reduce((total, pond) => total + pond.temperature, 0)
      return (totalTemp / zonePonds.length).toFixed(1)
    }
  }
}
</script>

<style scoped>
.zones-container {
  @apply bg-white dark:bg-gray-800 rounded-lg shadow p-6;
}

.section-title {
  @apply text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4;
}

.zones-grid {
  @apply grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4;
}

.zone-card {
  @apply bg-gray-50 dark:bg-gray-700 rounded-lg p-4;
}

.zone-header {
  @apply flex items-center mb-4;
}

.zone-avatar {
  @apply w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-lg;
}

.zone-info {
  @apply ml-3;
}

.zone-name {
  @apply text-sm font-medium text-gray-900 dark:text-gray-100;
}

.zone-status {
  @apply text-xs mt-1;
}

.zone-status.active {
  @apply text-green-600 dark:text-green-400;
}

.zone-status.inactive {
  @apply text-gray-600 dark:text-gray-400;
}

.zone-status.maintenance {
  @apply text-yellow-600 dark:text-yellow-400;
}

.zone-stats {
  @apply grid grid-cols-3 gap-2;
}

.stat {
  @apply flex flex-col items-center;
}

.stat-label {
  @apply text-xs text-gray-500 dark:text-gray-400;
}

.stat-value {
  @apply text-sm font-medium text-gray-900 dark:text-gray-100;
}
</style> 