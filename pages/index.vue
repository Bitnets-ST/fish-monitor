<template>
  <div class="fish-monitoring-system h-screen flex flex-col">
    <header class="header bg-gradient-to-r from-cyan-900 to-blue-900 text-white p-4 shadow-md z-10">
        <div class="container mx-auto flex justify-between items-center">
          <div class="logo-container">
            <h1 class="logo text-2xl font-bold">BITNETS</h1>
          </div>
          <div class="user-info flex items-center gap-4">
            <p>Bienvenido, {{ username }}</p>
            <button 
              class="bg-red-600 hover:bg-red-700 text-white py-1 px-3 rounded text-sm transition"
              @click="logout"
            >
              Cerrar sesión
            </button>
          </div>
        </div>
      </header>
  
    <div class="dashboard-container flex flex-1 overflow-hidden">
      <aside class="sidebar w-16 lg:w-20 bg-cyan-900 text-cyan-100 p-2 flex flex-col items-center space-y-8 z-10">
        <MarineIcon 
          iconType="shell" 
          :status="getSidebarStatus('oxygen')" 
          @click="setActiveMetric('oxygen')"
          class="cursor-pointer mt-8"
        />
        
        <MarineIcon 
          iconType="jellyfish" 
          :status="getSidebarStatus('water')" 
          @click="setActiveMetric('water')"
          class="cursor-pointer"
        />
        
        <MarineIcon 
          iconType="fish" 
          :status="getSidebarStatus('biomass')" 
          @click="setActiveMetric('biomass')"
          class="cursor-pointer"
        />
      </aside>

      <main class="main-content flex-1 flex flex-col h-full overflow-auto">
        <OceanBackground class="flex-1 p-8">
          <!-- Encabezado de bienvenida -->
          <div class="welcome-section mb-8">
            <h2 class="text-4xl font-bold text-cyan-300 mb-2">Bienvenido</h2>
          </div>
          
          <!-- Selección de zonas -->
          <div v-if="!selectedZone && !selectedPond" class="zone-selection">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div v-for="(zone, index) in zones" :key="index" @click="selectZone(zone)" class="cursor-pointer">
                <div class="zone-card bg-cyan-900/70 rounded-lg p-5 shadow-lg backdrop-blur-sm text-cyan-100 flex flex-col h-48">
                  <h3 class="text-2xl font-medium mb-3">{{ zone.name }}</h3>
                  <div class="zone-info mb-3">
                    <div class="flex items-center mb-2">
                      <div class="w-3 h-3 rounded-full mr-2" :class="getZoneStatusColor(zone.status)"></div>
                      <span>{{ getZoneStatusText(zone.status) }}</span>
                    </div>
                    <p class="text-sm opacity-75">{{ zone.estanques }} estanques</p>
                  </div>
                  <div class="mt-auto pt-3 flex justify-center">
                    <button class="btn bg-cyan-700/80 hover:bg-cyan-600 text-cyan-50 py-2 px-4 rounded text-sm transition">
                      Ver estanques
                    </button>
            </div>
            </div>
            </div>
            </div>
            </div>
          
          <!-- Estanques de la zona seleccionada -->
          <div v-else-if="selectedZone && !selectedPond" class="zone-ponds">
            <div class="flex justify-between items-center mb-6">
              <button 
                class="text-cyan-400 hover:text-cyan-300 flex items-center"
                @click="selectedZone = null"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clip-rule="evenodd" />
                </svg>
                Volver a zonas
              </button>
              <h2 class="text-3xl font-bold text-cyan-300">{{ selectedZone.name }}</h2>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div v-for="(pond, index) in zonePonds" :key="index" @click="selectPond(pond)" class="cursor-pointer">
                <PondCard :pond="pond" :showCamera="true" />
            </div>
            </div>
          </div>
  
          <!-- Detalle del estanque -->
          <div v-else class="pond-detail">
            <div class="flex justify-between items-center mb-4">
              <button 
                class="text-cyan-400 hover:text-cyan-300 flex items-center"
                @click="backToPonds"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clip-rule="evenodd" />
                </svg>
                Volver a estanques
              </button>
              <h2 class="text-3xl font-bold text-cyan-300">{{ selectedPond.name }}</h2>
          </div>
  
            <!-- Información detallada del estanque -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <PondCard :pond="selectedPond" :showDetails="true" :showCamera="true" />
              
              <PondDetailStats :pond="selectedPond" />
          </div>
          
            <!-- Tabla de datos detallados -->
            <PondDetailTable :ponds="[selectedPond, ...relatedPonds]" />
          </div>
        </OceanBackground>
        </main>
      </div>
    </div>
  </template>
  
  <script>
import PondCard from '../components/PondCard.vue';
import PondDetailTable from '../components/PondDetailTable.vue';
import MarineIcon from '../components/MarineIcon.vue';
import OceanBackground from '../components/OceanBackground.vue';
import PondDetailStats from '../components/PondDetailStats.vue';
  
  export default {
    name: 'IndexPage',
    components: {
    PondCard,
    PondDetailTable,
    MarineIcon,
    OceanBackground,
    PondDetailStats
    },
    data() {
      return {
        username: 'Admin',
      activeMetric: 'oxygen',
      selectedZone: null,
      selectedPond: null,
      zones: [
        {
          id: 1,
          name: 'Zona Norte',
          status: 'normal',
          estanques: 3
        },
        {
          id: 2,
          name: 'Zona Central',
          status: 'warning',
          estanques: 3
        },
        {
          id: 3,
          name: 'Zona Sur',
          status: 'danger',
          estanques: 3
        }
      ],
      ponds: [
        {
          id: 1,
          zoneId: 1,
          name: 'Alao Oeste',
            count: 145,
          oxygen: 'Normal',
          oxygenLabel: 'Normal',
          current: 'Suave',
          currentLabel: 'Suave',
            temperature: 18.5,
            status: 'normal',
          waterLevel: 85,
          lightLevel: 75,
          biomass: 230,
          pelletWaste: 15,
          flowStatus: 'green',
          showStats: false
        },
        {
          id: 2,
          zoneId: 1,
          name: 'Playa Fría',
          count: 165,
          oxygen: 'Normal',
          oxygenLabel: 'Normal',
          current: 'Suave',
          currentLabel: 'Suave',
          temperature: 17.8,
          status: 'normal',
          waterLevel: 80,
          lightLevel: 70,
          biomass: 210,
          pelletWaste: 18,
          flowStatus: 'green',
          showStats: false
        },
        {
          id: 3,
          zoneId: 1,
          name: 'Costa Norte',
          count: 130,
          oxygen: 'Alto',
          oxygenLabel: 'Alto',
          current: 'Media',
          currentLabel: 'Media',
          temperature: 19.0,
          status: 'normal',
          waterLevel: 88,
          lightLevel: 65,
          biomass: 195,
          pelletWaste: 20,
          flowStatus: 'green',
          showStats: true
        },
        {
          id: 4,
          zoneId: 2,
          name: 'Bahía 2',
            count: 230,
          oxygen: 'Alto',
          oxygenLabel: 'Alto',
          current: 'Media',
          currentLabel: 'Media',
            temperature: 19.2,
            status: 'normal',
          waterLevel: 92,
            lightLevel: 68,
          biomass: 410,
          pelletWaste: 28,
          flowStatus: 'green',
          showStats: true
        },
        {
          id: 5,
          zoneId: 2,
          name: 'Arrecife Central',
          count: 205,
          oxygen: 'Normal',
          oxygenLabel: 'Normal',
          current: 'Media',
          currentLabel: 'Media',
          temperature: 20.0,
          status: 'warning',
          waterLevel: 65,
          lightLevel: 60,
          biomass: 375,
          pelletWaste: 35,
          flowStatus: 'yellow',
          showStats: true
        },
        {
          id: 6,
          zoneId: 2,
          name: 'Marina Centro',
          count: 190,
          oxygen: 'Normal',
          oxygenLabel: 'Normal',
          current: 'Suave',
          currentLabel: 'Suave',
          temperature: 19.5,
          status: 'normal',
          waterLevel: 75,
          lightLevel: 70,
          biomass: 350,
          pelletWaste: 25,
          flowStatus: 'green',
          showStats: false
        },
        {
          id: 7,
          zoneId: 3,
          name: 'Talofa Sur',
            count: 78,
          oxygen: 'Bajo',
          oxygenLabel: 'Bajo',
          current: 'Fuerte',
          currentLabel: 'Fuertes',
            temperature: 20.1,
            status: 'warning',
          waterLevel: 60,
            lightLevel: 45,
          biomass: 130,
          pelletWaste: 45,
          flowStatus: 'yellow',
          showStats: true
        },
        {
          id: 8,
          zoneId: 3,
          name: 'Butan 7',
          count: 185,
          oxygen: 'Normal',
          oxygenLabel: 'Normal',
          current: 'Suave',
          currentLabel: 'Suave',
          temperature: 17.8,
          status: 'normal',
          waterLevel: 78,
          lightLevel: 82,
          biomass: 320,
          pelletWaste: 22,
          flowStatus: 'green',
          showStats: false
        },
        {
          id: 9,
          zoneId: 3,
          name: 'Punta Austral',
          count: 45,
          oxygen: 'Bajo',
          oxygenLabel: 'Bajo',
          current: 'Fuerte',
          currentLabel: 'Fuertes',
          temperature: 21.0,
          status: 'danger',
          waterLevel: 45,
          lightLevel: 30,
          biomass: 85,
          pelletWaste: 60,
          flowStatus: 'red',
          showStats: true
        }
      ]
    }
  },
  computed: {
    zonePonds() {
      if (!this.selectedZone) return [];
      return this.ponds.filter(pond => pond.zoneId === this.selectedZone.id);
    },
    relatedPonds() {
      if (!this.selectedPond) return [];
      // Retorna otros estanques relacionados en la misma zona
      return this.ponds.filter(pond => 
        pond.zoneId === this.selectedPond.zoneId && 
        pond.id !== this.selectedPond.id
      );
      }
    },
    methods: {
    logout() {
      // Implementación de cerrar sesión
      console.log('Cerrar sesión');
    },
    selectZone(zone) {
      this.selectedZone = zone;
      this.selectedPond = null;
    },
    selectPond(pond) {
      this.selectedPond = pond;
    },
    backToPonds() {
      this.selectedPond = null;
    },
    setActiveMetric(metric) {
      this.activeMetric = metric;
    },
    getZoneStatusColor(status) {
      if (status === 'normal') return 'bg-green-500';
      if (status === 'warning') return 'bg-yellow-500';
      if (status === 'danger') return 'bg-red-500';
      return 'bg-gray-500';
    },
    getZoneStatusText(status) {
      if (status === 'normal') return 'Estado normal';
      if (status === 'warning') return 'Precaución';
      if (status === 'danger') return 'Alerta';
      return 'Desconocido';
    },
    getSidebarStatus(metric) {
      // Calcula el estado del indicador de la barra lateral en función de los datos
      if (metric === 'oxygen') {
        const lowOxygen = this.ponds.some(pond => pond.oxygen === 'Bajo');
        if (lowOxygen) return 'low';
        
        const highOxygen = this.ponds.some(pond => pond.oxygen === 'Alto');
        if (highOxygen) return 'high';
        
        return 'normal';
      }
      
      if (metric === 'water') {
        const lowWater = this.ponds.some(pond => pond.waterLevel < 50);
        if (lowWater) return 'low';
        
        const mediumWater = this.ponds.some(pond => pond.waterLevel >= 50 && pond.waterLevel < 70);
        if (mediumWater) return 'medium';
        
        return 'high';
      }
      
      if (metric === 'biomass') {
        const lowBiomass = this.ponds.some(pond => pond.biomass < 150);
        if (lowBiomass) return 'low';
        
        const mediumBiomass = this.ponds.some(pond => pond.biomass >= 150 && pond.biomass < 300);
        if (mediumBiomass) return 'medium';
        
        return 'high';
      }
      
      return 'normal';
    },
    getOxygenPercentage(level) {
      if (level === 'Alto') return '90%';
      if (level === 'Normal') return '70%';
      if (level === 'Bajo') return '30%';
      return '50%';
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
      if (value > 150) return 'bg-yellow-500';
      return 'bg-red-500';
    }
  }
}
</script>

<style scoped>
.fish-monitoring-system {
  background-color: #051525;
}

/* Estilos adicionales */
.zone-selection, .zone-ponds, .pond-detail {
  animation: fadeIn 0.5s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
  }
  </style>