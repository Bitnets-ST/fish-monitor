<template>
  <div :class="{ 'dark': isDarkMode }">
    <BitnetsSplashScreen v-if="isLoading" />
    <div v-else class="page-content dark:bg-gray-900 dark:text-white min-h-screen transition-colors duration-300" :class="{ 'fade-in': !isLoading }">
      <AppHeader v-if="!isLoginPage" />
      <NotificationSystem ref="notificationSystem" />
      <div :class="{ 'pt-16': !isLoginPage }">
        <NuxtPage />
      </div>
    </div>
  </div>
</template>

<script>
import BitnetsSplashScreen from '~/components/BitnetsSplashScreen.vue'
import AppHeader from '~/components/AppHeader.vue'
import NotificationSystem from '~/components/NotificationSystem.vue'
import { useNuxtApp } from '#app'

export default {
  name: 'DefaultLayout',
  components: {
    BitnetsSplashScreen,
    AppHeader,
    NotificationSystem
  },
  data() {
    return {
      isLoading: true
    }
  },
  computed: {
    isLoginPage() {
      return this.$route.path === '/login' || this.$route.path === '/register';
    },
    isDarkMode() {
      const nuxtApp = useNuxtApp();
      return nuxtApp.$darkMode?.value || false;
    }
  },
  mounted() {
    // Registrar el sistema de notificaciones
    const nuxtApp = useNuxtApp();
    if (nuxtApp.$notifications) {
      nuxtApp.$notifications.setNotificationSystem(this.$refs.notificationSystem);
    }
    
    // Preload assets before hiding splash screen
    window.addEventListener('load', this.startAppTransition);
    
    // Fallback timer in case load event doesn't fire
    this.loadTimer = setTimeout(() => {
      this.startAppTransition();
    }, 4000);
  },
  beforeUnmount() {
    window.removeEventListener('load', this.startAppTransition);
    clearTimeout(this.loadTimer);
  },
  methods: {
    startAppTransition() {
      // Ensure the splash screen shows for at least 2 seconds for better UX
      const minimumLoadingTime = 2000;
      const startTime = performance.now();
      const elapsedTime = startTime - (this.$nuxt?.$loadingStart || 0);
      
      const remainingTime = Math.max(0, minimumLoadingTime - elapsedTime);
      
      setTimeout(() => {
        this.isLoading = false;
      }, remainingTime);
    }
  }
}
</script>

<style scoped>
.page-content {
  opacity: 0;
}

.fade-in {
  animation: fadeInContent 0.5s ease-out forwards;
}

@keyframes fadeInContent {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style> 