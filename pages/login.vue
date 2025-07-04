<template>
  <div>
    <ClientOnly>
      <div v-if="!isLoading && !isAuthenticated" class="bg-[#01374a] min-h-screen flex items-center justify-center relative">
        <MouseEffectBackground class="absolute inset-0 -z-10" />
        <div class="w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row relative z-10">
        <!-- Columna izquierda: formulario -->
        <div class="w-full md:w-1/2 bg-white p-6 md:p-10 flex flex-col justify-center">
          <div class="flex flex-col items-center mb-6">
            <div class="w-20 h-20 md:w-24 md:h-24 rounded-full bg-white shadow-lg flex items-center justify-center p-1 mb-3">
              <img src="/images/Logo1.png" alt="FishCount Logo" class="w-16 h-16 md:w-20 md:h-20 object-contain rounded-full">
            </div>
            <h2 class="text-2xl md:text-3xl font-bold text-gray-800 mb-2">Bienvenido</h2>
          </div>
          <form class="space-y-4" @submit.prevent="handleLogin">
            <TextField 
              v-model="email" 
              placeholder="Correo electrónico" 
              type="email"
              required
            />
            <PasswordField 
              v-model="password" 
              placeholder="Contraseña" 
              required
            />
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
              :disabled="isLoading"
            >
              <span v-if="isLoading">CARGANDO...</span>
              <span v-else>INGRESAR</span>
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
    </ClientOnly>
  </div>
</template>

<script>
import PasswordField from '~/components/PasswordField.vue'
import TextField from '~/components/TextField.vue'
import MouseEffectBackground from '~/components/MouseEffectBackground.vue'
import { User } from '~/models/User'
import { useUserStore } from '~/stores/user'

export default {
  name: 'LoginPage',
  components: {
    PasswordField,
    TextField,
    MouseEffectBackground
  },
  data() {
    return {
      email: '',
      password: '',
      errorMessage: '',
      isLoading: false,
      isAuthenticated: false
    };
  },
  mounted() {
    // Verificar autenticación inmediatamente
    this.isLoading = true;
    
    // Verificar en el store y en el modelo User
    const userStore = useUserStore();
    
    // Intentar cargar desde cookies primero
    if (!userStore.isAuthenticated) {
      userStore.loadFromCookies();
    }
    
    // Si el usuario ya está autenticado, establecer la bandera y redirigir
    this.isAuthenticated = userStore.isAuthenticated || User.isAuthenticated();
    
    if (this.isAuthenticated) {
      // Redirigir al dashboard inmediatamente
      this.$router.replace('/');
    } else {
      this.isLoading = false;
    }
  },
  methods: {
    async handleLogin() {
      try {
        // Validar entrada
        if (!this.email || !this.password) {
          this.errorMessage = 'Por favor, completa todos los campos';
          return;
        }
        
        // Validar formato de correo electrónico
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(this.email)) {
          this.errorMessage = 'Por favor, ingresa un correo electrónico válido';
          return;
        }
        
        this.isLoading = true;
        this.errorMessage = '';
        
        // Llamar a la API de login
        let apiBaseUrl = '';
        // Detectar si está en entorno móvil (Capacitor o similar)
        if (
          typeof window !== 'undefined' &&
          (window.Capacitor || window.cordova || window.location.protocol === 'file:' || window.location.protocol === 'capacitor:')
        ) {
          apiBaseUrl = 'https://kind-moss-0ab3c7c0f.6.azurestaticapps.net';
        } else {
          // Web normal (local o producción)
          const config = useRuntimeConfig?.() || {};
          apiBaseUrl = (config.public?.API_BASE_URL || import.meta.env.NUXT_PUBLIC_API_BASE_URL || '');
        }
        const response = await fetch(`${apiBaseUrl}/api/auth/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: this.email,
            password: this.password
          })
        });
        
        const result = await response.json();
        console.log('Server response:', result);
        
        // Verificar si hay un error en la respuesta
        if (result.body?.error || result.statusCode >= 400) {
          const errorMessage = result.body?.error || 'Error al iniciar sesión';
          throw new Error(errorMessage);
        }
        
        // Verificar si la respuesta es exitosa (código 200)
        if (result.statusCode === 200 && result.body) {
          // Guardar token y datos del usuario
          await new Promise((resolve) => {
            // Guardar usando el modelo User (ahora usa cookies)
            User.login(result.body.user, result.body.token);
            
            // Guardar en el store de Pinia (también usa cookies)
            const userStore = useUserStore();
            userStore.login(result.body.user, result.body.token);
            
            // Obtener utilidades de cookies
            const { $cookieUtils } = useNuxtApp();
            if ($cookieUtils) {
              console.log('Cookies establecidas correctamente');
            }
            
            // Esperar un pequeño retraso para asegurar que todo se haya guardado
            setTimeout(() => {
              // Redirigir al dashboard
              this.$router.push('/');
              resolve();
            }, 100);
          });
          return;
        }
        
        // Si llegamos aquí, la respuesta no tiene el formato esperado
        console.error('Unexpected response format:', result);
        throw new Error('Formato de respuesta inesperado del servidor');
      } catch (error) {
        console.error('Error al iniciar sesión:', error);
        // Mostrar mensaje de error más amigable
        if (error.message.includes('401') || error.message.toLowerCase().includes('credenciales')) {
          this.errorMessage = 'Correo o contraseña incorrectos';
        } else {
          this.errorMessage = error.message || 'Error al iniciar sesión. Por favor, inténtalo de nuevo.';
        }
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

html, body, #__nuxt, #__layout {
  height: 100%;
  min-height: 100%;
}
</style>