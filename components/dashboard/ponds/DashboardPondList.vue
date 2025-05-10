<template>
  <div class="pond-list-container">
    <h2 class="section-title">Estanques</h2>
    <div class="table-container">
      <table class="table">
        <thead>
          <tr>
            <th class="header-cell">Nombre</th>
            <th class="header-cell">Zona</th>
            <th class="header-cell">Peces</th>
            <th class="header-cell">Temperatura</th>
            <th class="header-cell">Estado</th>
            <th class="header-cell">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="pond in filteredPonds" :key="pond.id" class="table-row">
            <td class="cell">
              <div class="pond-name">
                <div class="pond-avatar">{{ pond.name.charAt(0) }}</div>
                <span>{{ pond.name }}</span>
              </div>
            </td>
            <td class="cell">{{ getZoneName(pond.zoneId) }}</td>
            <td class="cell">{{ pond.fishCount }}</td>
            <td class="cell">{{ pond.temperature }}°C</td>
            <td class="cell">
              <span class="status-badge" :class="pond.status">{{ getStatusText(pond.status) }}</span>
            </td>
            <td class="cell">
              <div class="actions">
                <button class="action-button edit" @click="$emit('edit-pond', pond)">
                  <svg xmlns="http://www.w3.org/2000/svg" class="action-icon" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                  </svg>
                </button>
                <button class="action-button delete" @click="$emit('delete-pond', pond)">
                  <svg xmlns="http://www.w3.org/2000/svg" class="action-icon" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
                  </svg>
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DashboardPondList',
  props: {
    ponds: {
      type: Array,
      required: true
    },
    searchQuery: {
      type: String,
      default: ''
    },
    selectedZone: {
      type: Number,
      default: null
    }
  },
  computed: {
    filteredPonds() {
      return this.ponds.filter(pond => {
        const matchesSearch = pond.name.toLowerCase().includes(this.searchQuery.toLowerCase())
        const matchesZone = !this.selectedZone || pond.zoneId === this.selectedZone
        return matchesSearch && matchesZone
      })
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
    }
  }
}
</script>

<style scoped>
.pond-list-container {
  @apply bg-white dark:bg-gray-800 rounded-lg shadow p-6;
}

.section-title {
  @apply text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4;
}

.table-container {
  @apply overflow-x-auto;
}

.table {
  @apply min-w-full divide-y divide-gray-200 dark:divide-gray-700;
}

.header-cell {
  @apply px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider;
}

.table-row {
  @apply hover:bg-gray-50 dark:hover:bg-gray-700/50;
}

.cell {
  @apply px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100;
}

.pond-name {
  @apply flex items-center;
}

.pond-avatar {
  @apply w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-sm mr-3;
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

.actions {
  @apply flex items-center space-x-2;
}

.action-button {
  @apply p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none;
}

.action-button.edit {
  @apply text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300;
}

.action-button.delete {
  @apply text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300;
}

.action-icon {
  @apply h-5 w-5;
}
</style> 