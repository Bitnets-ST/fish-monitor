<template>
  <aside class="sidebar">
    <!-- Logo -->
    <div class="sidebar-header">
      <div class="header-content">
        <div class="logo">B</div>
        <!-- Usuario -->
        <div class="user-info">
          <div class="username">{{ username }}</div>
          <div class="role">Supervisor</div>
        </div>
      </div>
    </div>
    
    <!-- Menú principal -->
    <nav class="menu">
      <ul class="menu-list">
        <li>
          <a href="#" @click.prevent="$emit('reset-dashboard')" class="menu-item active">
            <svg xmlns="http://www.w3.org/2000/svg" class="menu-icon" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
            </svg>
            <span class="menu-text">Dashboard</span>
          </a>
        </li>
        <li>
          <a href="#" class="menu-item">
            <svg xmlns="http://www.w3.org/2000/svg" class="menu-icon" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd" />
            </svg>
            <span class="menu-text">Estanques</span>
          </a>
        </li>
        <li>
          <a href="#" @click.prevent="$emit('show-statistics')" class="menu-item">
            <svg xmlns="http://www.w3.org/2000/svg" class="menu-icon" viewBox="0 0 20 20" fill="currentColor">
              <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" />
              <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z" />
            </svg>
            <span class="menu-text">Estadísticas</span>
          </a>
        </li>
        <li>
          <a href="#" @click.prevent="$emit('show-user-profile')" class="menu-item">
            <svg xmlns="http://www.w3.org/2000/svg" class="menu-icon" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
            </svg>
            <span class="menu-text">Perfil</span>
          </a>
        </li>
      </ul>
    </nav>
  </aside>
</template>

<script>
export default {
  name: 'DashboardSidebar',
  props: {
    username: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped>
.sidebar {
  @apply w-16 md:w-64 bg-white dark:bg-gray-800 shadow-lg flex flex-col;
}

.sidebar-header {
  @apply p-4 border-b border-gray-200 dark:border-gray-700;
}

.header-content {
  @apply flex items-center space-x-3;
}

.logo {
  @apply w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold;
}

.user-info {
  @apply hidden md:block;
}

.username {
  @apply text-lg font-semibold text-blue-600 dark:text-blue-400;
}

.role {
  @apply text-xs text-gray-500 dark:text-gray-400;
}

.menu {
  @apply flex-1 py-4;
}

.menu-list {
  @apply space-y-1;
}

.menu-item {
  @apply flex items-center px-4 py-3 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/30;
}

.menu-item.active {
  @apply text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-600 dark:border-blue-400;
}

.menu-icon {
  @apply h-5 w-5 mr-3;
}

.menu-text {
  @apply hidden md:inline;
}
</style> 