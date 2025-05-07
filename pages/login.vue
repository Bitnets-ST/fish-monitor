<template>
  <div>
    <MouseEffectBackground />
    <div class="min-h-screen flex items-center justify-center relative px-4 py-6">
      <div class="flex flex-col md:flex-row w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden">
        <!-- Columna izquierda: formulario -->
        <div class="w-full md:w-1/2 bg-white p-6 md:p-10 flex flex-col justify-center">
          <div class="flex flex-col items-center mb-6">
            <div class="w-20 h-20 md:w-24 md:h-24 rounded-full bg-white shadow-lg flex items-center justify-center p-1 mb-3">
              <img src="/images/Logo1.png" alt="FishCount Logo" class="w-16 h-16 md:w-20 md:h-20 object-contain rounded-full">
            </div>
            <h2 class="text-2xl md:text-3xl font-bold text-gray-800 mb-2">Bienvenido</h2>
          </div>
          <form class="space-y-4" @submit.prevent="handleLogin">
            <TextField v-model="username" placeholder="Usuario" />
            <PasswordField v-model="password" placeholder="Contraseña" />
            <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <div class="flex items-center">
                <input id="remember" type="checkbox" class="mr-2 w-4 h-4 accent-blue-500">
                <label for="remember" class="text-gray-600 text-sm select-none">Recuérdame</label>
              </div>
              <a href="#" class="text-blue-500 text-sm hover:underline">¿Olvidaste tu contraseña?</a>
            </div>
            <div v-if="errorMessage" class="p-3 bg-red-100 text-red-700 border border-red-200 rounded-md text-sm">
              {{ errorMessage }}
            </div>
            <button
              type="submit"
              class="w-full py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition-colors tracking-wide uppercase"
            >
              INGRESAR
            </button>
          </form>
          <div class="text-center mt-4">
            <p class="text-gray-600 text-sm">
              ¿No tienes una cuenta?
              <NuxtLink to="/register" class="text-pink-500 font-semibold hover:underline ml-1">
                Regístrate
              </NuxtLink>
            </p>
          </div>
        </div>
        <!-- Columna derecha: solo imagen de fondo sin logo encima - oculta en móviles -->
        <div class="hidden md:block md:w-1/2 relative">
          <div class="absolute inset-0 bg-cover bg-center" style="background-image: url('/Fondo_inicio.png')" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MouseEffectBackground from '~/components/MouseEffectBackground.vue'
import PasswordField from '~/components/PasswordField.vue'
import TextField from '~/components/TextField.vue'
import { User } from '~/models/User'

export default {
  name: 'LoginPage',
  components: {
    MouseEffectBackground,
    PasswordField,
    TextField
  },
  data() {
    return {
      username: '',
      password: '',
      errorMessage: ''
    };
  },
  mounted() {
    // Si el usuario ya está autenticado, redirigir al dashboard
    if (User.isAuthenticated()) {
      this.$router.push('/');
    }
  },
  methods: {
    handleLogin() {
      // Simplemente para demostración, usuario: admin, contraseña: admin
      if (this.username === 'bitnets' && this.password === '123') {
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('username', this.username);
        this.$router.push('/');
      } else {
        this.errorMessage = 'Usuario o contraseña incorrectos';
      }
    }
  }
};
</script>

<style scoped>
body {
  font-family: 'Roboto', Arial, sans-serif;
}
</style>