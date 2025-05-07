<template>
  <div class="pond-card bg-cyan-900/80 rounded-lg p-5 shadow-lg backdrop-blur-sm text-cyan-100 flex flex-col">
    <h3 class="text-xl font-medium mb-4">{{ pond.name }}</h3>
    
    <div class="parameter flex items-center mb-3">
      <div class="indicator-icon mr-3 text-lg">
        <div class="animate-pulse" :class="getOxygenClass(pond.oxygen)">
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M12 4c0 6-6 10-6 10s6 4 6 10c0-6 6-10 6-10s-6-4-6-10"/>
          </svg>
        </div>
      </div>
      <span class="text-base">Oxígeno: {{ pond.oxygenLabel }}</span>
    </div>
    
    <div class="parameter flex items-center mb-3">
      <div class="indicator-icon mr-3 text-lg">
        <div class="animate-pulse" :class="getCurrentClass(pond.current)">
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M2 12h20"/>
            <path d="M7 7 2 12l5 5"/>
            <path d="M22 7v10"/>
          </svg>
        </div>
      </div>
      <span class="text-base">Corrientes: {{ pond.currentLabel }}</span>
    </div>

    <div v-if="showDetails" class="additional-parameters mt-3 space-y-3">
      <div class="parameter flex items-center">
        <div class="indicator-icon mr-3 text-lg">
          <div class="animate-pulse" :class="getPelletClass(pond.pelletWaste)">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M10.2 11.2C6.4 11.2 4 7.5 4 3.5M12 13V4"/>
              <path d="M9 18c-2 0-4-1-4-4"/>
              <path d="M18 18c2 0 4-1 4-4"/>
              <path d="M15 18c0 2.5-1.5 4-3 4s-3-1.5-3-4c0-1 0-1 1-2 1.5-1.5 3-1.5 4 0 1 1 1 1 1 2z"/>
            </svg>
          </div>
        </div>
        <span class="text-base">Nivel de desecho pellet: {{ pond.pelletWaste }}%</span>
      </div>
      
      <div class="parameter flex items-center">
        <div class="indicator-icon mr-3 text-lg">
          <div class="animate-pulse" :class="getBiomassClass(pond.biomass)">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M16.2 3.8a2.7 2.7 0 0 0-3.81 0l-.4.38-.4-.4a2.7 2.7 0 0 0-3.82 0C6.73 4.85 6.67 6.64 8 8l4 4 4-4c1.33-1.36 1.27-3.15.2-4.2z"/>
              <path d="M8 8c-1.36 1.33-3.15 1.27-4.2.2-1.05-1.07-1.1-2.86.24-4.2 1.1-1.05 2.86-1.1 4.2.24"/>
              <path d="M16 8c1.36 1.33 3.15 1.27 4.2.2 1.05-1.07 1.1-2.86-.24-4.2-1.08-1.05-2.86-1.1-4.2.24"/>
              <path d="M19 11v5a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-5"/>
              <path d="M12 16v4"/>
              <path d="M8 16v4"/>
              <path d="M16 16v4"/>
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
              <circle cx="12" cy="12" r="4"/>
              <path d="M12 2v2"/>
              <path d="M12 20v2"/>
              <path d="M4.93 4.93l1.41 1.41"/>
              <path d="M17.66 17.66l1.41 1.41"/>
              <path d="M2 12h2"/>
              <path d="M20 12h2"/>
              <path d="M6.34 17.66l-1.41 1.41"/>
              <path d="M19.07 4.93l-1.41 1.41"/>
            </svg>
          </div>
        </div>
        <span class="text-base">Nivel de Luz: {{ pond.lightLevel }}%</span>
      </div>
    </div>
    
    <div class="mt-auto pt-4 flex flex-wrap gap-2" :class="{'justify-between': showExcelAndStats, 'justify-center': !showExcelAndStats && !showCamera}">
      <button 
        v-if="showCamera" 
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