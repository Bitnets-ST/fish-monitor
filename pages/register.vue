<template>
  <div class="bg-[#01374a] min-h-screen">
    <MouseEffectBackground />
    <div class="min-h-screen flex items-center justify-center relative px-4 py-6">
      <div class="flex flex-col md:flex-row w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden">
        <!-- Columna izquierda: formulario -->
        <div class="w-full md:w-1/2 bg-white p-6 md:p-10 flex flex-col justify-center">
          <div class="flex flex-col items-center mb-6">
            <div class="w-20 h-20 md:w-24 md:h-24 rounded-full bg-white shadow-lg flex items-center justify-center p-1 mb-3">
              <img src="/images/Logo1.png" alt="FishCount Logo" class="w-16 h-16 md:w-20 md:h-20 object-contain rounded-full">
            </div>
            <h2 class="text-xl md:text-3xl font-bold text-gray-800 mb-2">Registro de usuario</h2>
          </div>
          <form class="space-y-4" @submit.prevent="handleRegister">
            <TextField v-model="name" placeholder="Nombre completo" />
            <TextField v-model="email" type="email" placeholder="Correo electrónico" />
            <TextField v-model="username" placeholder="Usuario" />
            <PasswordField v-model="password" placeholder="Contraseña" />
            <PasswordField v-model="confirmPassword" placeholder="Confirmar contraseña" />
            <div v-if="errorMessage" class="p-3 bg-red-100 text-red-700 border border-red-200 rounded-md text-sm">
              {{ errorMessage }}
            </div>
            <button
              type="submit"
              class="w-full py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition-colors tracking-wide uppercase"
              :disabled="isLoading"
            >
              <span v-if="isLoading">CARGANDO...</span>
              <span v-else>REGISTRARSE</span>
            </button>
          </form>
          <div class="text-center mt-4">
            <p class="text-gray-600 text-sm">
              ¿Ya tienes una cuenta?
              <NuxtLink to="/login" class="text-pink-500 font-semibold hover:underline ml-1">
                Iniciar sesión
              </NuxtLink>
            </p>
          </div>
        </div>
        <!-- Columna derecha: solo visible en tablet/desktop -->
        <div class="hidden md:block md:w-1/2 relative overflow-hidden">
          <div class="absolute inset-0 bg-cover bg-center transform scale-110 rotate-3" style="background-image: url('/Fondo.jpg')" />
          <div class="absolute inset-0 bg-blue-500 bg-opacity-20" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PasswordField from '~/components/PasswordField.vue'
import TextField from '~/components/TextField.vue'
import MouseEffectBackground from '~/components/MouseEffectBackground.vue'
import { User } from '~/models/User'

export default {
  name: 'RegisterPage',
  components: {
    PasswordField,
    TextField,
    MouseEffectBackground
  },
  data() {
    return {
      name: '',
      email: '',
      username: '',
      password: '',
      confirmPassword: '',
      errorMessage: '',
      isLoading: false
    };
  },
  mounted() {
    // Si el usuario ya está autenticado, redirigir al dashboard
    if (User.isAuthenticated()) {
      this.$router.push('/');
    }
  },
  methods: {
    async handleRegister() {
      try {
        // Validación de datos
        if (!this.name || !this.email || !this.username || !this.password || !this.confirmPassword) {
          this.errorMessage = 'Por favor, completa todos los campos';
          return;
        }
        
        if (this.password !== this.confirmPassword) {
          this.errorMessage = 'Las contraseñas no coinciden';
          return;
        }
        
        if (this.password.length < 6) {
          this.errorMessage = 'La contraseña debe tener al menos 6 caracteres';
          return;
        }
        
        // Validar formato de email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(this.email)) {
          this.errorMessage = 'Por favor, ingresa un correo electrónico válido';
          return;
        }
        
        this.isLoading = true;
        this.errorMessage = '';
        
        // Llamar a la API de registro
        const response = await fetch('/api/auth/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: this.name,
            email: this.email,
            username: this.username,
            password: this.password
          })
        });
        
        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.body?.error || 'Error al registrar usuario');
        }
        
        // Guardar token y datos del usuario
        User.login(data.body.user, data.body.token);
        
        // Redirigir al dashboard
        this.$router.push('/');
      } catch (error) {
        console.error('Error al registrar usuario:', error);
        this.errorMessage = error.message || 'Error al registrar usuario';
      } finally {
        this.isLoading = false;
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