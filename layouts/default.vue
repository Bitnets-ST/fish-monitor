<template>
  <div :class="{ 'dark': isDarkMode }">
    <div class="page-content bg-skin-base dark:bg-gray-900 dark:text-white min-h-screen">
      <AppHeader v-if="!isLoginPage" />
      <NotificationSystem ref="notificationSystem" />
      <div :class="{ 'pt-16': !isLoginPage }">
        <NuxtPage />
      </div>
    </div>
  </div>
</template>

<script>
import AppHeader from '~/components/AppHeader.vue'
import NotificationSystem from '~/components/NotificationSystem.vue'
import { useNuxtApp } from '#app'

export default {
  name: 'DefaultLayout',
  components: {
    AppHeader,
    NotificationSystem
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
  }
}
</script>

<style scoped>
.page-content {
  opacity: 1;
}
</style> 