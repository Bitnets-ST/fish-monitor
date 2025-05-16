<template>
  <aside class="sidebar">
    <!-- Logo -->
    <div class="sidebar-header">
      <!-- Información del Usuario -->
      <div class="user-profile text-center py-6">
        <div class="username text-blue-600 dark:text-blue-400 font-medium mb-2">
          {{ username }}
        </div>
        
        <div class="avatar-container flex justify-center">
          <div class="w-20 h-20 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 p-1">
            <ClientOnly>
              <div v-if="userImage" class="w-full h-full rounded-full overflow-hidden">
                <img :src="userImage" alt="Foto de perfil" class="w-full h-full object-cover">
              </div>
              <div v-else class="w-full h-full rounded-full bg-white dark:bg-gray-900 flex items-center justify-center text-3xl font-bold text-blue-600">
                {{ getUserInitials() }}
              </div>
            </ClientOnly>
          </div>
        </div>
        
        <div class="role text-gray-500 dark:text-gray-400 text-sm mt-2">
          {{ userRole }}
        </div>
        
        <!-- Botón para cambiar de rol (solo para demostración) -->
        <button 
          @click="toggleRole" 
          class="mt-2 px-3 py-1 text-xs bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
        >
          Cambiar a {{ userRole === 'ADMIN' ? 'USER' : 'ADMIN' }}
        </button>
      </div>
    </div>
    
    <!-- Menú principal -->
    <nav class="menu border-t border-gray-200 dark:border-gray-700">
      <ul class="menu-list pt-4">
        <li>
          <a href="#" @click.prevent="$emit('reset-dashboard')" :class="['menu-item', { 'active': activeSection === 'dashboard' }]">
            <div class="icon-wrapper">
              <svg xmlns="http://www.w3.org/2000/svg" class="menu-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12l8.954-8.955a1.126 1.126 0 011.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
              </svg>
            </div>
            <span class="menu-text">Dashboard</span>
          </a>
        </li>
        <li>
          <a href="#" @click.prevent="$emit('show-cameras')" :class="['menu-item', { 'active': activeSection === 'cameras' }]">
            <div class="icon-wrapper">
              <svg xmlns="http://www.w3.org/2000/svg" class="menu-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z" />
              </svg>
            </div>
            <span class="menu-text">Cámaras</span>
          </a>
        </li>
        <li>
          <a href="#" @click.prevent="$emit('show-statistics')" :class="['menu-item', { 'active': activeSection === 'statistics' }]">
            <div class="icon-wrapper">
              <svg xmlns="http://www.w3.org/2000/svg" class="menu-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75z" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625z" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
              </svg>
            </div>
            <span class="menu-text">Estadísticas</span>
          </a>
        </li>
        <!-- Nuevo botón de Maestros (solo visible para ADMIN) -->
        <li v-if="userRole === 'ADMIN'">
          <a href="#" @click.prevent="$emit('show-masters')" :class="['menu-item', { 'active': activeSection === 'masters' }]">
            <div class="icon-wrapper">
              <svg xmlns="http://www.w3.org/2000/svg" class="menu-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
              </svg>
            </div>
            <span class="menu-text">Maestros</span>
          </a>
        </li>
        <li>
          <a href="#" @click.prevent="$emit('show-user-profile')" :class="['menu-item', { 'active': activeSection === 'profile' }]">
            <div class="icon-wrapper">
              <svg xmlns="http://www.w3.org/2000/svg" class="menu-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <span class="menu-text">Configuración</span>
          </a>
        </li>
      </ul>
    </nav>
  </aside>
</template>

<script>
export default {
  name: 'DashboardSidebar',
  components: {
    ClientOnly: {
      inheritAttrs: false,
      setup(_, { slots }) {
        const show = ref(false);
        onMounted(() => {
          show.value = true;
        });
        return () => (show.value && slots.default ? slots.default() : null);
      },
    },
  },
  data() {
    return {
      isMounted: false,
      userRole: this.role
    }
  },
  mounted() {
    this.isMounted = true;
  },
  props: {
    username: {
      type: String,
      required: true
    },
    userImage: {
      type: String,
      default: null
    },
    activeSection: {
      type: String,
      default: 'dashboard'
    },
    role: {
      type: String,
      default: 'USER'
    }
  },
  data() {
    return {
      userRole: this.role
    }
  },
  methods: {
    getUserInitials() {
      if (!this.username) return 'A';
      return this.username.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
    },
    toggleRole() {
      this.userRole = this.userRole === 'ADMIN' ? 'USER' : 'ADMIN';
      this.$emit('role-changed', this.userRole);
    }
  },
  watch: {
    role(newRole) {
      this.userRole = newRole;
    }
  },
  emits: ['reset-dashboard', 'show-cameras', 'show-statistics', 'show-masters', 'show-user-profile', 'role-changed']
}
</script>

<style scoped>
.sidebar {
  @apply w-16 md:w-64 bg-white dark:bg-gray-800 shadow-lg flex flex-col;
}

.sidebar-header {
  @apply border-b border-gray-200 dark:border-gray-700;
}

.user-profile {
  @apply px-4 py-5;
}

.avatar-container .w-20 {
  @apply mx-auto shadow-lg;
}

.menu {
  @apply flex-1 py-2;
}

.menu-list {
  @apply space-y-2;
}

.menu-item {
  @apply flex items-center px-4 py-3 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/30 rounded-md mx-2 transition-all duration-200;
}

.menu-item.active {
  @apply text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-600 dark:border-blue-400 font-medium;
}

.icon-wrapper {
  @apply flex items-center justify-center w-8 h-8 rounded-md mr-3 transition-all duration-200;
}

.menu-item:hover .icon-wrapper {
  @apply bg-blue-50 dark:bg-blue-900/20;
}

.menu-item.active .icon-wrapper {
  @apply bg-blue-100 dark:bg-blue-800/30;
}

.menu-icon {
  @apply h-6 w-6 transition-all duration-300;
}

.menu-text {
  @apply hidden md:inline;
}
</style>