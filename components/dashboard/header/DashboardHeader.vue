<template>
  <header class="header">
    <!-- Barra de búsqueda -->
    <div class="search-container">
      <div class="search-input-wrapper">
        <input
          type="text"
          class="search-input"
          placeholder="Buscar estanque..."
          :value="searchQuery"
          @input="$emit('update:searchQuery', $event.target.value)"
          @keyup.enter="$emit('search')"
        />
        <button class="search-button" @click="$emit('search')">
          <svg xmlns="http://www.w3.org/2000/svg" class="search-icon" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
          </svg>
        </button>
      </div>
    </div>

    <!-- Notificaciones -->
    <div class="notifications-container">
      <button class="notifications-button" @click="$emit('toggle-notifications')">
        <svg xmlns="http://www.w3.org/2000/svg" class="notifications-icon" viewBox="0 0 20 20" fill="currentColor">
          <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
        </svg>
        <span v-if="$notifications?.length" class="notifications-badge">
          {{ $notifications.length }}
        </span>
      </button>

      <!-- Menú de notificaciones -->
      <div v-if="showNotifications" class="notifications-dropdown">
        <div class="notifications-header">
          <h3 class="notifications-title">Notificaciones</h3>
          <div class="notifications-actions">
            <button class="notifications-action" @click="$emit('mark-all-read')">
              Marcar todas como leídas
            </button>
            <button class="notifications-close" @click="$emit('toggle-notifications')">
              <svg xmlns="http://www.w3.org/2000/svg" class="close-icon" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
            </button>
          </div>
        </div>

        <div class="notifications-list">
          <div v-for="notification in $notifications" :key="notification.id" class="notification-item">
            <div class="notification-content">
              <p class="notification-text">{{ notification.message }}</p>
              <span class="notification-time">{{ formatTimestamp(notification.timestamp) }}</span>
            </div>
            <div class="notification-actions">
              <button 
                v-if="!notification.read" 
                class="notification-action"
                @click="$emit('mark-read', notification.id)"
              >
                Marcar como leída
              </button>
              <button 
                class="notification-delete"
                @click="$emit('delete-notification', notification.id)"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="delete-icon" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'DashboardHeader',
  props: {
    searchQuery: {
      type: String,
      required: true
    },
    showNotifications: {
      type: Boolean,
      required: true
    }
  },
  methods: {
    formatTimestamp(timestamp) {
      const date = new Date(timestamp)
      return date.toLocaleString()
    }
  }
}
</script>

<style scoped>
.header {
  @apply bg-white dark:bg-gray-800 shadow-sm px-4 py-3 flex items-center justify-between;
}

.search-container {
  @apply flex-1 max-w-2xl;
}

.search-input-wrapper {
  @apply relative;
}

.search-input {
  @apply w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400;
}

.search-button {
  @apply absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400;
}

.search-icon {
  @apply h-5 w-5;
}

.notifications-container {
  @apply relative ml-4;
}

.notifications-button {
  @apply relative p-2 text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400 focus:outline-none;
}

.notifications-icon {
  @apply h-6 w-6;
}

.notifications-badge {
  @apply absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-500 rounded-full;
}

.notifications-dropdown {
  @apply absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700;
}

.notifications-header {
  @apply px-4 py-3 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between;
}

.notifications-title {
  @apply text-lg font-semibold text-gray-900 dark:text-gray-100;
}

.notifications-actions {
  @apply flex items-center space-x-2;
}

.notifications-action {
  @apply text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300;
}

.notifications-close {
  @apply text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400;
}

.close-icon {
  @apply h-5 w-5;
}

.notifications-list {
  @apply max-h-96 overflow-y-auto;
}

.notification-item {
  @apply px-4 py-3 border-b border-gray-200 dark:border-gray-700 last:border-b-0;
}

.notification-content {
  @apply flex flex-col;
}

.notification-text {
  @apply text-sm text-gray-900 dark:text-gray-100;
}

.notification-time {
  @apply text-xs text-gray-500 dark:text-gray-400 mt-1;
}

.notification-actions {
  @apply mt-2 flex items-center justify-between;
}

.notification-action {
  @apply text-xs text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300;
}

.notification-delete {
  @apply text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400;
}

.delete-icon {
  @apply h-4 w-4;
}
</style> 