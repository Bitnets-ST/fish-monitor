<template>
  <div class="pond-card relative rounded-xl overflow-hidden transition-all bg-cyan-900/60 shadow-md text-white p-4 flex flex-col h-full">
    <!-- Título y estado -->
    <div class="flex justify-between items-start mb-4">
      <h3 class="text-xl font-semibold truncate mr-3">{{ pond.name }}</h3>
      <div :class="`status-badge ${pond.status}`">
        <div class="status-dot" />
        <span class="text-xs capitalize">{{ pond.status }}</span>
      </div>
    </div>
    
    <!-- Contador de peces -->
    <div class="fish-count flex items-center mb-4">
      <div class="count-number text-2xl font-bold mr-2">{{ pond.count }}</div>
      <div class="indicator-dots flex">
        <div 
          v-for="(dot, index) in 5" 
          :key="index" 
          class="dot" 
          :class="index < Math.min(5, Math.floor(pond.count / 50)) ? 'active' : 'empty'"
        />
      </div>
    </div>
    
    <!-- Parámetros principales -->
    <div class="parameters-grid grid grid-cols-2 gap-4 mb-4">
      <div class="parameter flex flex-col">
        <span class="label text-gray-400 text-xs">Temperatura</span>
        <div class="value text-xl">{{ pond.temperature }}°C</div>
      </div>
      
      <div class="parameter flex flex-col">
        <span class="label text-gray-400 text-xs">Oxígeno</span>
        <div class="value text-xl" :class="getOxygenClass(pond.oxygen)">{{ pond.oxygenLabel }}</div>
      </div>
      
      <div class="parameter flex flex-col">
        <span class="label text-gray-400 text-xs">Corriente</span>
        <div class="value text-xl" :class="getCurrentClass(pond.current)">{{ pond.currentLabel }}</div>
      </div>
      
      <div class="parameter flex flex-col">
        <span class="label text-gray-400 text-xs">Desperdicio</span>
        <div class="value text-xl flex items-baseline" :class="getPelletClass(pond.pelletWaste)">
          {{ pond.pelletWaste }}<span class="text-xs ml-1">%</span>
        </div>
      </div>
    </div>
    
    <!-- Parámetros adicionales (solo si showDetails es true) -->
    <div v-if="normalizedShowDetails" class="additional-parameters mt-2 mb-4 space-y-4">
      <div class="parameter flex items-center">
        <div class="indicator-icon mr-3 text-lg">
          <div :class="getBiomassClass(pond.biomass)">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M16.2 3.8a2.7 2.7 0 0 0-3.81 0l-.4.38-.4-.4a2.7 2.7 0 0 0-3.82 0C6.73 4.85 6.67 6.64 8 8l4 4 4-4c1.33-1.36 1.27-3.15.2-4.2z" />
              <path d="M8 8c-1.36 1.33-3.15 1.27-4.2.2-1.05-1.07-1.1-2.86.24-4.2 1.1-1.05 2.86-1.1 4.2.24" />
              <path d="M16 8c1.36 1.33 3.15 1.27 4.2.2 1.05-1.07 1.1-2.86-.24-4.2-1.08-1.05-2.86-1.1-4.2.24" />
              <path d="M19 11v5a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-5" />
              <path d="M12 16v4" />
              <path d="M8 16v4" />
              <path d="M16 16v4" />
            </svg>
          </div>
        </div>
        <span class="text-base">Biomasa: {{ pond.biomass }} kg</span>
      </div>
      
      <div class="parameter flex items-center">
        <div class="indicator-icon mr-3 text-lg">
          <div class="animate-water-level" :class="getWaterClass(pond.waterLevel)">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M6.8 21H17.2" />
              <path d="M18 8h.3c1.8 0 3.7.2 5.7.9" />
              <path d="M18 11h.3c1.8 0 3.7.2 5.7.6" />
              <path d="M18 14h.3c1.8 0 3.7.2 5.7.4" />
              <rect x="3" y="5" width="18" height="16" rx="2" />
              <path :d="`M3 ${ getWaterLevelY(pond.waterLevel) } h18`" class="water-line" />
            </svg>
          </div>
        </div>
        <span class="text-base">Nivel de Agua: {{ pond.waterLevel }}%</span>
      </div>
      
      <div class="parameter flex items-center">
        <div class="indicator-icon mr-3 text-lg">
          <div class="animate-pulse" :class="getLightClass(pond.lightLevel)">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="4" />
              <path d="M12 2v2" />
              <path d="M12 20v2" />
              <path d="M4.93 4.93l1.41 1.41" />
              <path d="M17.66 17.66l1.41 1.41" />
              <path d="M2 12h2" />
              <path d="M20 12h2" />
              <path d="M6.34 17.66l-1.41 1.41" />
              <path d="M19.07 4.93l-1.41 1.41" />
            </svg>
          </div>
        </div>
        <span class="text-base">Nivel de Luz: {{ pond.lightLevel }}%</span>
      </div>
    </div>
    
    <div class="mt-auto pt-4 flex flex-wrap gap-2" :class="{'justify-between': showExcelAndStats, 'justify-center': !showExcelAndStats && !normalizedShowCamera}">
      <button 
        v-if="normalizedShowCamera" 
        class="btn bg-blue-600/80 hover:bg-blue-500 text-cyan-50 py-1.5 px-4 rounded text-sm transition flex items-center"
        @click.stop="viewCamera"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1.5" viewBox="0 0 20 20" fill="currentColor">
          <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
        </svg>
        Cámara
      </button>
      <button class="btn bg-cyan-700/80 hover:bg-cyan-600 text-cyan-50 py-1.5 px-4 rounded text-sm transition">
        Excel
      </button>
      <button v-if="showExcelAndStats" class="btn bg-cyan-700/80 hover:bg-cyan-600 text-cyan-50 py-1.5 px-4 rounded text-sm transition">
        Estadísticas
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PondCard',
  props: {
    pond: {
      type: Object,
      required: true
    },
    showDetails: {
      type: Boolean,
      default: false
    },
    showCamera: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    normalizedShowDetails() {
      return this.showDetails || false;
    },
    normalizedShowCamera() {
      return this.showCamera || false;
    },
    showExcelAndStats() {
      // Solo mostrar el botón de estadísticas para algunos estanques
      return this.pond.showStats || false;
    }
  },
  methods: {
    viewCamera(event) {
      // Prevenir que se propague el evento al padre para evitar la navegación
      event.stopPropagation();
      // Lógica para mostrar la cámara del estanque
      console.log('Ver cámara del estanque:', this.pond.name);
      // Aquí podrías abrir un modal con la cámara o redirigir a otra página
    },
    getWaterLevelY(level) {
      // Calcular la posición Y de la línea de agua basado en el nivel (5 es arriba, 21 es abajo)
      const minY = 5; // Nivel máximo (100%)
      const maxY = 17; // Nivel mínimo (0%)
      const range = maxY - minY;
      const yPosition = maxY - (range * level / 100);
      return Math.round(yPosition);
    },
    getOxygenClass(level) {
      if (level === 'Alto') return 'text-green-400';
      if (level === 'Normal') return 'text-cyan-300';
      if (level === 'Bajo') return 'text-red-400';
      return 'text-gray-400';
    },
    getCurrentClass(level) {
      if (level === 'Fuerte') return 'text-yellow-400';
      if (level === 'Media') return 'text-yellow-300';
      if (level === 'Suave') return 'text-cyan-300';
      return 'text-gray-400';
    },
    getPelletClass(value) {
      if (value < 30) return 'text-green-400';
      if (value < 60) return 'text-yellow-400';
      return 'text-red-400';
    },
    getBiomassClass(value) {
      if (value > 300) return 'text-green-400';
      if (value > 150) return 'text-yellow-300';
      return 'text-red-400';
    },
    getWaterClass(value) {
      if (value > 70) return 'text-green-400';
      if (value > 40) return 'text-yellow-300';
      return 'text-red-400';
    },
    getLightClass(value) {
      if (value > 70) return 'text-green-400';
      if (value > 40) return 'text-yellow-300';
      return 'text-red-400';
    }
  }
}
</script>

<style scoped>
.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

.animate-water-level {
  position: relative;
}

.water-line {
  stroke-dasharray: 4;
  animation: flow 10s linear infinite;
}

@keyframes flow {
  to {
    stroke-dashoffset: -100;
  }
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.6;
  }
}

.parameter {
  position: relative;
}

.parameter:after {
  content: '';
  position: absolute;
  bottom: -8px;
  left: 0;
  width: 100%;
  height: 1px;
  background: rgba(103, 232, 249, 0.1);
}

.additional-parameters .parameter:last-child:after {
  display: none;
}

.indicator-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
}
</style> 