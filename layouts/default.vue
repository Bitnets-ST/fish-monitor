<template>
  <div>
    <BitnetsSplashScreen v-if="isLoading" />
    <div v-else class="page-content" :class="{ 'fade-in': !isLoading }">
      <slot />
    </div>
  </div>
</template>

<script>
import BitnetsSplashScreen from '~/components/BitnetsSplashScreen.vue'

export default {
  name: 'DefaultLayout',
  components: {
    BitnetsSplashScreen
  },
  data() {
    return {
      isLoading: true
    }
  },
  mounted() {
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