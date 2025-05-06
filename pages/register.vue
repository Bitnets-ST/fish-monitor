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
        <form class="space-y-5" @submit.prevent="handleRegister">
          <!-- Nombre -->
          <div class="relative">
            <span class="absolute inset-y-0 left-0 flex items-center pl-3 text-cyan-400">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </span>
            <input
              v-model="name"
              type="text"
              required
              class="w-full pl-10 pr-3 py-3 bg-gray-800 border border-cyan-400 rounded-md text-white placeholder-gray-400 focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition-colors"
              placeholder="Nombre completo"
            />
          </div>
          
          <!-- Email -->
          <div class="relative">
            <span class="absolute inset-y-0 left-0 flex items-center pl-3 text-cyan-400">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
              </svg>
            </span>
            <input
              v-model="email"
              type="email"
              required
              class="w-full pl-10 pr-3 py-3 bg-gray-800 border border-cyan-400 rounded-md text-white placeholder-gray-400 focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition-colors"
              placeholder="Correo electrónico"
            />
          </div>
          
          <!-- Usuario -->
          <div class="relative">
            <span class="absolute inset-y-0 left-0 flex items-center pl-3 text-cyan-400">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.121 17.804A13.937 13.937 0 0112 15c2.5 0 4.847.655 6.879 1.804M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </span>
            <input
              v-model="username"
              type="text"
              required
              class="w-full pl-10 pr-3 py-3 bg-gray-800 border border-cyan-400 rounded-md text-white placeholder-gray-400 focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition-colors"
              placeholder="Usuario"
            />
          </div>
          
          <!-- Contraseña -->
          <div class="relative">
            <span class="absolute inset-y-0 left-0 flex items-center pl-3 text-cyan-400">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </span>
            <input
              v-model="password"
              type="password"
              required
              class="w-full pl-10 pr-3 py-3 bg-gray-800 border border-cyan-400 rounded-md text-white placeholder-gray-400 focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition-colors"
              placeholder="Contraseña"
            />
          </div>
          
          <!-- Confirmar Contraseña -->
          <div class="relative">
            <span class="absolute inset-y-0 left-0 flex items-center pl-3 text-cyan-400">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </span>
            <input
              v-model="confirmPassword"
              type="password"
              required
              class="w-full pl-10 pr-3 py-3 bg-gray-800 border border-cyan-400 rounded-md text-white placeholder-gray-400 focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition-colors"
              placeholder="Confirmar contraseña"
            />
          </div>
          
          <!-- Mensaje de error -->
          <div v-if="errorMessage" class="p-3 bg-red-900/50 text-red-300 border border-red-800 rounded-md text-sm">
            {{ errorMessage }}
          </div>
          
          <button
            type="submit"
            class="w-full py-3 bg-cyan-400 text-gray-900 font-semibold rounded-md hover:bg-cyan-300 transition-colors"
          >
            Registrarse
          </button>
        </form>
        
        <!-- Enlace a login -->
        <div class="text-center mt-4">
          <p class="text-gray-400 text-sm">
            ¿Ya tienes una cuenta? 
            <NuxtLink to="/login" class="text-cyan-400 hover:text-cyan-300 transition-colors">
              Iniciar sesión
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
  name: 'RegisterPage',
  data() {
    return {
      name: '',
      email: '',
      username: '',
      password: '',
      confirmPassword: '',
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
    handleRegister() {
      // Validación de datos
      if (this.password !== this.confirmPassword) {
        this.errorMessage = 'Las contraseñas no coinciden';
        return;
      }
      
      if (this.password.length < 6) {
        this.errorMessage = 'La contraseña debe tener al menos 6 caracteres';
        return;
      }
      
      // Guardar datos en localStorage (solo para demostración)
      localStorage.setItem('registeredUser', this.username);
      localStorage.setItem('registeredEmail', this.email);
      localStorage.setItem('registeredName', this.name);
      
      // Autenticar al usuario
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('username', this.username);
      
      // Redirigir al dashboard
      this.$router.push('/');
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