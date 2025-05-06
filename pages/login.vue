<template>
  <div class="min-h-screen bg-[#0a2222] flex items-center justify-center relative overflow-hidden">
    <!-- Fondo decorativo SVG de peces -->
    <svg class="absolute inset-0 w-full h-full opacity-10 pointer-events-none" viewBox="0 0 800 600" fill="none">
      <g>
        <ellipse v-for="i in 18" :key="i" :cx="(i*40)%800" :cy="(i*33)%600" rx="32" ry="12" fill="#00b8d4" :opacity="0.2 + (i%3)*0.1" />
      </g>
    </svg>
    <div class="relative w-full max-w-md">
      <div class="bg-[#0d232b] border border-cyan-400/60 rounded-xl shadow-2xl p-10">
        <!-- Logo -->
        <div class="text-center mb-8">
          <h1 class="text-3xl font-bold text-yellow-400 tracking-widest mb-1">BITNETS</h1>
          <div class="text-cyan-400 text-xl font-semibold">SYSTEMS<sup class="text-xs align-top">®</sup></div>
          <p class="text-xs text-gray-400 mt-1">SOLUCIONES TECNOLÓGICAS</p>
        </div>
        <!-- Formulario -->
        <form class="space-y-5" @submit.prevent="handleLogin">
          <div class="relative">
            <span class="absolute inset-y-0 left-0 flex items-center pl-3 text-cyan-400">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.121 17.804A13.937 13.937 0 0112 15c2.5 0 4.847.655 6.879 1.804M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
            </span>
            <input
              v-model="username"
              type="text"
              required
              class="w-full pl-10 pr-3 py-3 bg-gray-800 border border-cyan-400 rounded-md text-white placeholder-gray-400 focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition-colors"
              placeholder="Usuario"
            >
          </div>
          <div class="relative">
            <span class="absolute inset-y-0 left-0 flex items-center pl-3 text-cyan-400">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 11c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm0 2c-2.21 0-4 1.79-4 4v1h8v-1c0-2.21-1.79-4-4-4z" /></svg>
            </span>
            <input
              v-model="password"
              type="password"
              required
              class="w-full pl-10 pr-3 py-3 bg-gray-800 border border-cyan-400 rounded-md text-white placeholder-gray-400 focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition-colors"
              placeholder="Contraseña"
            >
          </div>
          <div v-if="errorMessage" class="p-3 bg-red-900/50 text-red-300 border border-red-800 rounded-md text-sm">
            {{ errorMessage }}
          </div>
          <button
            type="submit"
            class="w-full py-3 bg-cyan-400 text-gray-900 font-semibold rounded-md hover:bg-cyan-300 transition-colors"
          >
            Ingresar
          </button>
        </form>
        
        <!-- Enlace a registro -->
        <div class="text-center mt-4">
          <p class="text-gray-400 text-sm">
            ¿No tienes una cuenta? 
            <NuxtLink to="/register" class="text-cyan-400 hover:text-cyan-300 transition-colors">
              Registrarse
            </NuxtLink>
          </p>
        </div>
        
        <div class="mt-6 text-center">
          <p class="text-xs text-gray-500">© 2023 BITNETS. Todos los derechos reservados.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginPage',
  data() {
    return {
      username: '',
      password: '',
      errorMessage: ''
    };
  },
  mounted() {
    // Si el usuario ya está autenticado, redirigir al dashboard
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (isAuthenticated === 'true') {
      this.$router.push('/');
    }
  },
  methods: {
    handleLogin() {
      // Simplemente para demostración, usuario: admin, contraseña: admin
      if (this.username === 'admin' && this.password === 'admin') {
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
/* Animación sutil para el fondo */
svg {
  animation: wave 25s linear infinite;
}
@keyframes wave {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
</style> 