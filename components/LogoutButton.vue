<template>
  <button @click="logout" class="text-gray-600 hover:text-red-500 transition-colors">
    <slot>Cerrar sesión</slot>
  </button>
</template>

<script>
import { User } from '~/models/User';

export default {
  name: 'LogoutButton',
  methods: {
    logout() {
      // Cerrar sesión
      User.logout();
      
      // Redirigir al login
      this.$router.push('/login');
    }
  }
}
</script> 