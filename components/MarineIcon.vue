<template>
  <div class="marine-icon-container">
    <div class="marine-icon" :class="[iconType, animationClass]">
      <!-- Concha marina -->
      <svg v-if="iconType === 'shell'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-8 h-8">
        <path d="M12 2c.5 0 2 2 2 3 0 1.5-1 2-2 2s-2-.5-2-2c0-1 1.5-3 2-3z"/>
        <path d="M12 7c3 0 5 2 5 5 0 3-2 5-5 5s-5-2-5-5c0-3 2-5 5-5z"/>
        <path d="M18 14c1 0 2 1 2 2 0 1-1 2-2 2s-2-1-2-2c0-1 1-2 2-2z"/>
        <path d="M6 14c1 0 2 1 2 2 0 1-1 2-2 2s-2-1-2-2c0-1 1-2 2-2z"/>
        <path d="M12 17c.5 0 1 .5 1 1v4l-1-2-1 2v-4c0-.5.5-1 1-1z"/>
      </svg>
      
      <!-- Medusa -->
      <svg v-else-if="iconType === 'jellyfish'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-8 h-8">
        <path d="M8 8C4 8 3 12 3 16c0 0 3 1 5-2"/>
        <path d="M16 8c4 0 5 4 5 8 0 0-3 1-5-2"/>
        <path d="M8 8c0-2 2-4 4-4s4 2 4 4"/>
        <path d="M9 12c-.7 2.7-1.3 5.3-2 8"/>
        <path d="M15 12c.7 2.7 1.3 5.3 2 8"/>
        <path d="M12 12v8"/>
      </svg>
      
      <!-- Pez -->
      <svg v-else-if="iconType === 'fish'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-8 h-8">
        <path d="M16 7c-.8.8-1.3 1.4-1.6 2-.1.3-.3.6-.4.9-.9 2.1-.9 4.1 0 6.1.1.3.3.6.4.9.3.6.8 1.2 1.6 2 2.4-1.8 3-3.9 3-6-5.9-4.2-10-6-16-6 5.9 1 10.1 2.7 16 6 0-2.1-.6-4.2-3-6z"/>
        <circle cx="7" cy="12" r="1"/>
      </svg>
      
      <!-- Icono genérico para otros tipos -->
      <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-8 h-8">
        <path d="M12 2 2 7l10 5 10-5-10-5z"/>
        <path d="M2 17l10 5 10-5"/>
        <path d="M2 12l10 5 10-5"/>
      </svg>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MarineIcon',
  props: {
    iconType: {
      type: String,
      default: 'shell',
      validator: (value) => ['shell', 'jellyfish', 'fish', 'coral', 'generic'].includes(value)
    },
    status: {
      type: String,
      default: 'normal',
      validator: (value) => ['low', 'medium', 'high', 'normal'].includes(value)
    }
  },
  computed: {
    animationClass() {
      const statusClasses = {
        low: 'text-red-400 animate-pulse-slow',
        medium: 'text-yellow-300 animate-pulse-medium',
        high: 'text-green-400 animate-pulse-fast',
        normal: 'text-cyan-300 animate-pulse-medium'
      };
      
      return statusClasses[this.status] || 'text-cyan-300';
    }
  }
}
</script>

<style scoped>
.marine-icon-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 45px;
  height: 45px;
}

.marine-icon {
  transition: transform 0.3s ease;
}

.marine-icon:hover {
  transform: scale(1.2);
}

.animate-pulse-slow {
  animation: pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

.animate-pulse-medium {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

.animate-pulse-fast {
  animation: pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.6;
  }
}
</style> 