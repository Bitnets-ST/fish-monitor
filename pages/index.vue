
```
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
          icon-type="shell" 
          :status="getSidebarStatus('oxygen')" 
          class="cursor-pointer mt-8"
          @click="setActiveMetric('oxygen')"
        />
        
        <MarineIcon 
          icon-type="jellyfish" 
          :status="getSidebarStatus('water')" 
          class="cursor-pointer"
          @click="setActiveMetric('water')"
        />
        
        <MarineIcon 
          icon-type="fish" 
          :status="getSidebarStatus('biomass')" 
          class="cursor-pointer"
          @click="setActiveMetric('biomass')"
        />
        </aside>
  
      <main class="main-content flex-1 flex flex-col h-full overflow-auto">
        <OceanBackground class="flex-1 p-6">
          <!-- Vista principal: Tabla de estanques por zona -->
          <div v-if="!selectedPond" class="main-table-view">
            <PondDetailTable 
              :ponds="ponds" 
              @select-pond="selectPond" 
            />
          </div>
  
          <!-- Detalle del estanque -->
          <div v-else class="pond-detail">
            <div class="flex justify-between items-center mb-4">
              <button 
                class="text-cyan-400 hover:text-cyan-300 flex items-center"
                @click="selectedPond = null"
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
              <PondCard :pond="selectedPond" :show-details="true" :show-camera="true" />
              <PondDetailStats :pond="selectedPond" />
          </div>
          
            <!-- Tabla de datos detallados -->
            <PondDetailTable 
              :ponds="[selectedPond, ...relatedPonds]" 
              :current-zone-id="selectedPond.zoneId"
            />
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
      selectedPond: null,
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
    selectPond(pond) {
      this.selectedPond = pond;
    },
    setActiveMetric(metric) {
      this.activeMetric = metric;
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
    }
  }
}
  </script>
  
  <style scoped>
  .fish-monitoring-system {
  background-color: #051525;
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    font-family: 'Arial', sans-serif;
    color: white;
  }

/* Estilos adicionales */
.main-table-view, .pond-detail {
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
  
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 2rem;
    background-color: #063c44;
    border-bottom: 1px solid #0f4c5c;
  }
  
  .logo {
    color: #4caf50;
    margin: 0;
    font-size: 1.8rem;
    font-weight: bold;
    letter-spacing: 2px;
  }
  
  .user-info {
    font-size: 0.9rem;
  }
  
  .dashboard-container {
    display: flex;
    flex: 1;
  }
  
  .sidebar {
    width: 200px;
    background-color: #052126;
    padding: 1rem 0;
    transition: all 0.3s ease;
  }
  
  .nav-menu {
    display: flex;
    flex-direction: column;
  }
  
  .nav-item {
    display: flex;
    align-items: center;
    padding: 0.8rem 1.5rem;
    color: #a0a0a0;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  
  .nav-item:hover {
    background-color: #0a3a42;
    color: white;
  }
  
  .nav-item.active {
    background-color: #0f4c5c;
    color: white;
    border-left: 4px solid #4caf50;
  }
  
  .nav-icon {
    margin-right: 10px;
    font-size: 1.2rem;
  }
  
  .main-content {
    flex: 1;
    padding: 1rem 2rem;
    overflow-y: auto;
  }
  
  .status-bar {
    display: flex;
    margin-bottom: 1.5rem;
    gap: 1.5rem;
  flex-wrap: wrap;
  }
  
  .status-indicator {
    display: flex;
    align-items: center;
    font-size: 0.9rem;
    margin-right: 1rem;
  }
  
  .status-dot {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background-color: #4caf50;
    margin-right: 8px;
    display: inline-block;
  }
  
  .status-dot.yellow {
    background-color: #ffc107;
  }
  
  .status-dot.red {
    background-color: #f44336;
  }
  
  .status-dot.green {
    background-color: #4caf50;
  }
  
  .status-dot.empty {
    background-color: #374a4d;
  }
  
  .location-tabs {
    display: flex;
    gap: 0.5rem;
    margin-bottom: 1.5rem;
  }
  
  .tab-button {
    padding: 0.6rem 1.2rem;
    background-color: #063c44;
    border: none;
    color: white;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  .tab-button:hover {
    background-color: #0a4f5a;
  }
  
  .tab-button.active {
    background-color: #118ab2;
  }
  
  .data-table {
    background-color: #063c44;
    border-radius: 8px;
    overflow-x: auto;
    margin-bottom: 2rem;
  }
  
  .data-table table {
    width: 100%;
    border-collapse: collapse;
    min-width: 650px;
  }
  
  .data-table th {
    text-align: left;
    padding: 1rem;
    background-color: #052126;
    font-weight: normal;
    border-bottom: 2px solid #0a2b30;
  }
  
  .data-table td {
    padding: 1rem;
    border-bottom: 1px solid #0a2b30;
  }
  
  .data-table tbody tr:hover {
    background-color: #0a4f5a;
  }
  
  .indicator-dots {
    display: flex;
    gap: 4px;
  }
  
  .dot {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    display: inline-block;
  }
  
  .fish-count {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  
  .count-number {
    font-weight: bold;
  }
  
  .action-buttons {
    display: flex;
    gap: 0.5rem;
  }
  
  .btn {
    padding: 0.4rem 0.8rem;
    border: none;
    border-radius: 4px;
    color: white;
    cursor: pointer;
    font-size: 0.8rem;
  }
  
  .btn-excel {
    background-color: #118ab2;
  }
  
  .btn-stats {
    background-color: #0f4c5c;
  }
  
  .counter-component {
    margin-top: 2rem;
    padding: 1.5rem;
    background-color: #063c44;
    border-radius: 8px;
  }

/* Media Queries */
@media (max-width: 768px) {
  .header {
    padding: 0.8rem 1rem;
  }
  
  .logo {
    font-size: 1.4rem;
  }
  
  .dashboard-container {
    flex-direction: column;
  }
  
  .sidebar {
    width: 100%;
    order: 2;
    padding: 0.5rem 0;
  }
  
  .nav-menu {
    flex-direction: row;
    overflow-x: auto;
    padding-bottom: 5px;
  }
  
  .nav-item {
    padding: 0.5rem 1rem;
    flex-shrink: 0;
  }
  
  .main-content {
    padding: 1rem;
    order: 1;
  }
  
  .status-bar {
    gap: 0.8rem;
  }
  
  .data-table th,
  .data-table td {
    padding: 0.8rem 0.5rem;
  }
  
  .action-buttons {
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .btn {
    padding: 0.4rem 0.6rem;
    font-size: 0.75rem;
    white-space: nowrap;
  }
}
  </style>
```
