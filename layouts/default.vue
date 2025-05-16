<template>
  <div :class="{ 'dark': isDark }">
    <div class="page-content bg-transparent dark:bg-gray-900 dark:text-white min-h-screen">
      <AppHeader v-if="!isLoginPage" />
      <NotificationSystem ref="notificationSystem" id="notification-system" />
      <div :class="{ 'pt-16': !isLoginPage }">
        <NuxtPage />
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import AppHeader from '~/components/AppHeader.vue'
import NotificationSystem from '~/components/NotificationSystem.vue'
import { useNuxtApp } from '#app'
import { useDarkMode } from '~/composables/useDarkMode'

// Usar el composable de modo oscuro
const { isDark, initDarkMode } = useDarkMode()

// Obtener la ruta actual
const route = useRoute()

// Comprobar si estamos en la página de login
const isLoginPage = computed(() => {
  return route.path === '/login' || route.path === '/register'
})

// Al montar el componente
onMounted(() => {
  // Inicializar el modo oscuro
  initDarkMode()
  
  // Registrar el sistema de notificaciones
  const nuxtApp = useNuxtApp()
  if (nuxtApp.$notifications) {
    nuxtApp.$notifications.setNotificationSystem(document.querySelector('#notification-system'))
  }
})
</script>

<style scoped>
.page-content {
  opacity: 1;
  position: relative;
}
</style> 