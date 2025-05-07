<template>
  <div class="pond-stats bg-cyan-900/80 rounded-lg p-5 shadow-lg backdrop-blur-sm text-cyan-100">
    <h3 class="text-xl font-medium mb-5">Estadísticas</h3>
    
    <div class="stats-content space-y-4">
      <div class="stat-row flex items-center justify-between mb-1">
        <span class="stat-label text-cyan-200">Conteo actual:</span>
        <span class="stat-value text-xl font-medium">{{ pond.count }}</span>
      </div>
      
      <div class="stat-row flex items-center justify-between mb-1">
        <span class="stat-label text-cyan-200">Temperatura:</span>
        <span class="stat-value text-lg">{{ pond.temperature }}°C</span>
      </div>
      
      <div class="stat-bar mb-4">
        <div class="flex justify-between mb-1">
          <span class="stat-label text-cyan-200">Oxigenación:</span>
          <span class="stat-value-sm" :class="getOxygenTextColor(pond.oxygen)">{{ pond.oxygenLabel }}</span>
        </div>
        <div class="w-full bg-cyan-950/70 rounded-full h-3">
          <div 
               class="h-3 rounded-full" 
               :style="{ width: getOxygenPercentage(pond.oxygen) }" 
               :class="getOxygenBarColor(pond.oxygen)">
            <div class="h-full w-full bg-gradient-to-r from-transparent via-white/20 to-transparent background-shimmer" />
          </div>
        </div>
      </div>
      
      <div class="stat-bar mb-4">
        <div class="flex justify-between mb-1">
          <span class="stat-label text-cyan-200">Biomasa:</span>
          <span class="stat-value-sm">{{ pond.biomass }} kg</span>
        </div>
        <div class="w-full bg-cyan-950/70 rounded-full h-3">
          <div 
               class="h-3 rounded-full" 
               :style="{ width: getBiomassPercentage(pond.biomass) }" 
               :class="getBiomassBarColor(pond.biomass)">
            <div class="h-full w-full bg-gradient-to-r from-transparent via-white/20 to-transparent background-shimmer" />
          </div>
        </div>
      </div>
      
      <div class="stat-bar mb-4">
        <div class="flex justify-between mb-1">
          <span class="stat-label text-cyan-200">Nivel de agua:</span>
          <span class="stat-value-sm">{{ pond.waterLevel }}%</span>
        </div>
        <div class="w-full bg-cyan-950/70 rounded-full h-3">
          <div 
               class="h-3 rounded-full" 
               :style="{ width: `${pond.waterLevel}%` }" 
               :class="getWaterBarColor(pond.waterLevel)">
            <div class="h-full w-full bg-gradient-to-r from-transparent via-white/20 to-transparent background-shimmer" />
          </div>
        </div>
      </div>
      
      <div class="stat-bar mb-4">
        <div class="flex justify-between mb-1">
          <span class="stat-label text-cyan-200">Nivel de luz:</span>
          <span class="stat-value-sm">{{ pond.lightLevel }}%</span>
        </div>
        <div class="w-full bg-cyan-950/70 rounded-full h-3">
          <div 
               class="h-3 rounded-full" 
               :style="{ width: `${pond.lightLevel}%` }" 
               :class="getLightBarColor(pond.lightLevel)">
            <div class="h-full w-full bg-gradient-to-r from-transparent via-white/20 to-transparent background-shimmer" />
          </div>
        </div>
      </div>
      
      <div class="stat-bar mb-4">
        <div class="flex justify-between mb-1">
          <span class="stat-label text-cyan-200">Desecho pellet:</span>
          <span class="stat-value-sm">{{ pond.pelletWaste }}%</span>
        </div>
        <div class="w-full bg-cyan-950/70 rounded-full h-3">
          <div 
               class="h-3 rounded-full" 
               :style="{ width: `${pond.pelletWaste}%` }" 
               :class="getPelletBarColor(pond.pelletWaste)">
            <div class="h-full w-full bg-gradient-to-r from-transparent via-white/20 to-transparent background-shimmer" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PondDetailStats',
  props: {
    pond: {
      type: Object,
      required: true
    }
  },
  methods: {
    getOxygenPercentage(level) {
      if (level === 'Alto') return '90%';
      if (level === 'Normal') return '70%';
      if (level === 'Bajo') return '30%';
      return '50%';
    },
    getOxygenTextColor(level) {
      if (level === 'Alto') return 'text-green-400';
      if (level === 'Normal') return 'text-cyan-300';
      if (level === 'Bajo') return 'text-red-400';
      return 'text-gray-400';
    },
    getOxygenBarColor(level) {
      if (level === 'Alto') return 'bg-green-500';
      if (level === 'Normal') return 'bg-cyan-500';
      if (level === 'Bajo') return 'bg-red-500';
      return 'bg-gray-500';
    },
    getBiomassPercentage(value) {
      return Math.min(100, (value / 5)) + '%';
    },
    getBiomassBarColor(value) {
      if (value > 300) return 'bg-green-500';
      if (value > 150) return 'bg-yellow-400';
      return 'bg-red-500';
    },
    getWaterBarColor(value) {
      if (value > 70) return 'bg-green-500';
      if (value > 40) return 'bg-yellow-400';
      return 'bg-red-500';
    },
    getLightBarColor(value) {
      if (value > 70) return 'bg-green-500';
      if (value > 40) return 'bg-yellow-400';
      return 'bg-red-500';
    },
    getPelletBarColor(value) {
      // Para el desecho de pellet, bajo es bueno y alto es malo (inverso)
      if (value < 30) return 'bg-green-500';
      if (value < 60) return 'bg-yellow-400';
      return 'bg-red-500';
    }
  }
}
</script>

<style scoped>
.background-shimmer {
  animation: shimmer 3s infinite linear;
  background-size: 1000px 100%;
}

@keyframes shimmer {
  0% {
    background-position: -1000px 0;
  }
  100% {
    background-position: 1000px 0;
  }
}

.stat-value-sm {
  font-size: 0.9rem;
  font-weight: 500;
}

.pond-stats {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.stats-content {
  flex: 1;
}
</style> 