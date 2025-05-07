<template>
  <div class="fish-monitoring-system">
    <header class="header bg-gradient-to-r from-cyan-700 to-blue-800 text-white p-4 shadow-md">
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

    <div class="dashboard-container flex flex-1">
      <aside class="sidebar w-56 bg-gray-800 text-white p-4">
        <nav class="nav-menu space-y-2">
          <div class="nav-item flex items-center p-3 rounded bg-cyan-600 cursor-pointer">
            <i class="nav-icon mr-3">📊</i>
            <span>Monitoreo</span>
          </div>
          <div class="nav-item flex items-center p-3 rounded hover:bg-gray-700 cursor-pointer">
            <i class="nav-icon mr-3">📜</i>
            <span>Reportes</span>
          </div>
          <div class="nav-item flex items-center p-3 rounded hover:bg-gray-700 cursor-pointer">
            <i class="nav-icon mr-3">🗺️</i>
            <span>Mapa</span>
          </div>
          <div class="nav-item flex items-center p-3 rounded hover:bg-gray-700 cursor-pointer">
            <i class="nav-icon mr-3">⚡</i>
            <span>Estadísticas</span>
          </div>
          <div class="nav-item flex items-center p-3 rounded hover:bg-gray-700 cursor-pointer">
            <i class="nav-icon mr-3">⚙️</i>
            <span>Configuración</span>
          </div>
        </nav>
      </aside>

      <main class="main-content flex-1 p-6 bg-gray-100">
        <div class="status-bar flex flex-wrap gap-2 mb-6">
          <div class="status-indicator flex items-center bg-white rounded-full px-4 py-2 shadow-sm">
            <span class="status-dot w-3 h-3 rounded-full bg-green-500 mr-2" />
            Conteo en tiempo real
          </div>
          <div class="status-indicator flex items-center bg-white rounded-full px-4 py-2 shadow-sm">
            <span class="status-dot w-3 h-3 rounded-full bg-yellow-500 mr-2" />
            Sin registros recientes
          </div>
          <div class="status-indicator flex items-center bg-white rounded-full px-4 py-2 shadow-sm">
            <span class="status-dot w-3 h-3 rounded-full bg-red-500 mr-2" />
            Alerta de densidad
          </div>
          <div class="status-indicator flex items-center bg-white rounded-full px-4 py-2 shadow-sm">
            <span class="status-dot w-3 h-3 rounded-full bg-green-500 mr-2" />
            Flujo normal
          </div>
        </div>

        <div class="location-tabs flex mb-6 border-b border-gray-200">
          <button 
            v-for="(zone, index) in zones" 
            :key="index"
            class="tab-button px-4 py-2 font-medium" 
            :class="activeZone === zone ? 'border-b-2 border-cyan-500 text-cyan-600' : 'text-gray-500 hover:text-gray-700'"
            @click="activeZone = zone"
          >
            {{ zone }}
          </button>
        </div>

        <!-- Sistema de pestañas para estanques -->
        <PondTabs 
          :ponds="formattedPonds" 
          :initialActive="formattedPonds.length > 0 ? formattedPonds[0].id : null"
          @pond-selected="handlePondSelected"
        >
          <!-- Contenido de la pestaña activa (tabla de monitoreo) -->
          <FishMonitoringTable 
            :locations="filteredLocations" 
            :activeZone="activeZone"
          />
        </PondTabs>

        <div class="counter-component bg-white p-6 rounded-lg shadow-md mt-6">
          <Counter @update-count="updateCount" />
        </div>
        
       
      </main>
    </div>
  </div>
</template>

<script>
import Counter from '../components/Counter.vue';
import PondTabs from '../components/tabs/PondTabs.vue';
import FishMonitoringTable from '../components/tables/FishMonitoringTable.vue';

export default {
  name: 'IndexPage',
  components: {
    Counter,
  
    FishMonitoringTable,
    PondTabs
  },
  data() {
    return {
      username: 'Admin',
      activeZone: 'Todos',
      zones: ['Todos', 'Zona Norte', 'Zona Central', 'Zona Sur'],
      activePond: null,
      locations: [
        {
          id: 1,
          name: 'Estanque 1',
          zone: 'Zona Norte',
          count: 145,
          flowStatus: 'green',
          temperature: 18.5,
          status: 'normal',
          lightLevel: 75,
          waterLevel: 85,
          biomass: 230
        },
        {
          id: 2,
          name: 'Estanque 2',
          zone: 'Zona Norte',
          count: 230,
          flowStatus: 'green',
          temperature: 19.2,
          status: 'normal',
          lightLevel: 68,
          waterLevel: 92,
          biomass: 410
        },
        {
          id: 3,
          name: 'Estanque 3',
          zone: 'Zona Central',
          count: 78,
          flowStatus: 'yellow',
          temperature: 20.1,
          status: 'warning',
          lightLevel: 45,
          waterLevel: 60,
          biomass: 130
        },
        {
          id: 4,
          name: 'Estanque 4',
          zone: 'Zona Sur',
          count: 0,
          flowStatus: 'red',
          temperature: 22.3,
          status: 'danger',
          lightLevel: 10,
          waterLevel: 30,
          biomass: 0
        },
        {
          id: 5,
          name: 'Estanque 5',
          zone: 'Zona Central',
          count: 320,
          flowStatus: 'green',
          temperature: 17.8,
          status: 'normal',
          lightLevel: 80,
          waterLevel: 88,
          biomass: 520
        }
      ]
    };
  },
  computed: {
    formattedPonds() {
      return this.locations.map(location => ({
        id: location.id,
        name: location.name,
        count: location.count,
        temperature: location.temperature,
        status: location.status,
        waterLevel: location.waterLevel,
        biomass: location.biomass
      }));
    },
    filteredLocations() {
      if (this.activeZone === 'Todos') {
        return this.locations;
      } else {
        return this.locations.filter(location => location.zone === this.activeZone);
      }
    }
  },
  mounted() {
    // Verificar si el usuario está autenticado
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    const username = localStorage.getItem('username');
    
    if (isAuthenticated !== 'true') {
      this.$router.push('/login');
    } else if (username) {
      this.username = username;
    }
    
    // Establecer el primer estanque como activo por defecto
    if (this.locations.length > 0) {
      this.activePond = this.locations[0].id;
    }
  },
  methods: {
    handlePondSelected(pondId) {
      this.activePond = pondId;
      // Aquí puedes cargar datos específicos del estanque seleccionado si es necesario
    },
    updateCount(locationIndex, newCount) {
      if (locationIndex >= 0 && locationIndex < this.locations.length) {
        this.locations[locationIndex].count = newCount;
      }
    },
    logout() {
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('username');
      this.$router.push('/login');
    }
  }
};
</script>

<style scoped>
.fish-monitoring-system {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  font-family: 'Arial', sans-serif;
  background-color: #0a2b30;
  color: white;
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