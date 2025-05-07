<!-- components/PondTabs.vue -->
<template>
  <div class="pond-tabs">
    <div class="tabs-header flex border-b border-gray-200 mb-4">
      <button 
        v-for="pond in ponds" 
        :key="pond.id"
        class="tab-button px-4 py-2 font-medium transition-colors"
        :class="activePond === pond.id ? 'border-b-2 border-cyan-500 text-cyan-600' : 'text-gray-500 hover:text-gray-700'"
        @click="selectPond(pond.id)"
      >
        {{ pond.name }}
      </button>
    </div>
    
    <div class="tab-content">
      <div v-if="selectedPond" class="pond-details bg-white p-6 rounded-lg shadow-md mb-6">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-xl font-bold text-gray-800">{{ selectedPond.name }}</h2>
          <div class="status-badge" 
            :class="{
              'bg-green-100 text-green-800': selectedPond.status === 'normal',
              'bg-yellow-100 text-yellow-800': selectedPond.status === 'warning',
              'bg-red-100 text-red-800': selectedPond.status === 'danger'
            }"
          >
            {{ selectedPond.status === 'normal' ? 'Normal' : 
               selectedPond.status === 'warning' ? 'Advertencia' : 'Peligro' }}
          </div>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div class="stat-card bg-gray-50 p-4 rounded-lg">
            <div class="text-sm text-gray-500 mb-1">Conteo actual</div>
            <div class="text-2xl font-bold text-gray-800">{{ selectedPond.count }} peces</div>
          </div>
          <div class="stat-card bg-gray-50 p-4 rounded-lg">
            <div class="text-sm text-gray-500 mb-1">Temperatura</div>
            <div class="text-2xl font-bold text-gray-800">{{ selectedPond.temperature }}°C</div>
          </div>
          <div class="stat-card bg-gray-50 p-4 rounded-lg">
            <div class="text-sm text-gray-500 mb-1">Biomasa</div>
            <div class="text-2xl font-bold text-gray-800">{{ selectedPond.biomass }} kg</div>
          </div>
          <div class="stat-card bg-gray-50 p-4 rounded-lg">
            <div class="text-sm text-gray-500 mb-1">Nivel de agua</div>
            <div class="text-2xl font-bold text-gray-800">{{ selectedPond.waterLevel }}%</div>
          </div>
        </div>
        
        <div class="flex justify-end">
          <button class="bg-cyan-600 hover:bg-cyan-700 text-white py-2 px-4 rounded transition">
            Ver historial completo
          </button>
        </div>
      </div>
      
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PondTabs',
  props: {
    ponds: {
      type: Array,
      required: true
    },
    initialActive: {
      type: [String, Number],
      default: null
    }
  },
  data() {
    return {
      activePond: this.initialActive || (this.ponds.length > 0 ? this.ponds[0].id : null)
    };
  },
  computed: {
    selectedPond() {
      return this.ponds.find(pond => pond.id === this.activePond) || null;
    }
  },
  methods: {
    selectPond(pondId) {
      this.activePond = pondId;
      this.$emit('pond-selected', pondId);
    }
  }
};
</script>

<style scoped>
.pond-tabs {
  width: 100%;
}

.tab-button {
  position: relative;
  white-space: nowrap;
}

.tab-button:after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: transparent;
  transition: background-color 0.3s;
}

.tab-button.active:after {
  background-color: #0891b2;
}

.status-badge {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 500;
}
</style>