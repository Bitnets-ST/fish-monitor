<template>
  <div>
    <BitnetsSplashScreen v-if="isLoading" />
    <div v-else class="page-content" :class="{ 'fade-in': !isLoading }">
      <AppHeader v-if="!isLoginPage" />
      <slot />
    </div>
  </div>
</template>

<script>
import BitnetsSplashScreen from '~/components/BitnetsSplashScreen.vue'
import AppHeader from '~/components/AppHeader.vue'

export default {
  name: 'DefaultLayout',
  components: {
    BitnetsSplashScreen,
    AppHeader
  },
  data() {
    return {
      isLoading: true,
      loadTimer: null
    }
  },
  computed: {
    isLoginPage() {
      if (import.meta.client) {
        return this.$route && (this.$route.path === '/login' || this.$route.path === '/register');
      }
      return false;
    }
  },
  mounted() {
    // Preload assets before hiding splash screen
    window.addEventListener('load', this.startAppTransition);
    
    // Fallback timer in case load event doesn't fire
    this.loadTimer = setTimeout(() => {
      this.startAppTransition();
    }, 2000);
  },
  beforeUnmount() {
    if (import.meta.client) {
      window.removeEventListener('load', this.startAppTransition);
      if (this.loadTimer) {
        clearTimeout(this.loadTimer);
      }
    }
  },
  methods: {
    startAppTransition() {
      // Usar un tiempo fijo para mejor UX
      setTimeout(() => {
        this.isLoading = false;
      }, 500);
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