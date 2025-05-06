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
            <button class="tab-button px-4 py-2 font-medium border-b-2 border-cyan-500 text-cyan-600">Todos</button>
            <button class="tab-button px-4 py-2 font-medium text-gray-500 hover:text-gray-700">Zona Norte</button>
            <button class="tab-button px-4 py-2 font-medium text-gray-500 hover:text-gray-700">Zona Central</button>
            <button class="tab-button px-4 py-2 font-medium text-gray-500 hover:text-gray-700">Zona Sur</button>
          </div>
  
          <div class="data-table bg-white shadow-md rounded-lg overflow-hidden mb-6">
            <table class="w-full">
              <thead class="bg-gray-50">
                <tr>
                  <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ubicación</th>
                  <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Conteo</th>
                  <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Flujo</th>
                  <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Temperatura</th>
                  <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nivel de Luz</th>
                  <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nivel de Agua</th>
                  <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Biomasa</th>
                  <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                  <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200">
                <tr v-for="(location, index) in locations" :key="index" class="hover:bg-gray-50">
                  <td class="px-4 py-4 whitespace-nowrap font-medium text-gray-900">{{ location.name }}</td>
                  <td class="px-4 py-4 whitespace-nowrap">
                    <div class="fish-count flex items-center">
                      <div class="indicator-dots flex space-x-1 mr-2">
                        <span 
                          v-for="n in 4" 
                          :key="n" 
                          class="dot w-2 h-2 rounded-full" 
                          :class="{
                            'bg-green-500': getDotClass(location.count, n) === 'green',
                            'bg-yellow-500': getDotClass(location.count, n) === 'yellow',
                            'bg-red-500': getDotClass(location.count, n) === 'red',
                            'bg-gray-300': getDotClass(location.count, n) === 'empty'
                          }"
                        />
                      </div>
                      <span class="count-number">{{ location.count }}</span>
                    </div>
                  </td>
                  <td class="px-4 py-4 whitespace-nowrap">
                    <div class="status-indicator flex items-center">
                      <span 
                        class="status-dot w-3 h-3 rounded-full mr-2"
                        :class="{
                          'bg-green-500': location.flowStatus === 'green',
                          'bg-yellow-500': location.flowStatus === 'yellow',
                          'bg-red-500': location.flowStatus === 'red',
                        }"
                      />
                      {{ location.flowStatus === 'green' ? 'Normal' : 
                         location.flowStatus === 'yellow' ? 'Precaución' : 'Bajo' }}
                    </div>
                  </td>
                  <td class="px-4 py-4 whitespace-nowrap">{{ location.temperature }}°C</td>
                  <td class="px-4 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                      <div class="w-16 bg-gray-200 rounded-full h-2.5 mr-2">
                        <div 
                          class="h-2.5 rounded-full" 
                          :class="{
                            'bg-green-500': location.lightLevel >= 60,
                            'bg-yellow-500': location.lightLevel >= 30 && location.lightLevel < 60,
                            'bg-red-500': location.lightLevel < 30
                          }"
                          :style="{ width: `${location.lightLevel}%` }" 
                        />
                      </div>
                      <span class="text-sm px-2 py-0.5 rounded" :class="getLightLevelClass(location.lightLevel)">
                        {{ location.lightLevel }}%
                      </span>
                    </div>
                  </td>
                  <td class="px-4 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                      <div class="w-16 bg-gray-200 rounded-full h-2.5 mr-2">
                        <div 
                          class="h-2.5 rounded-full" 
                          :class="{
                            'bg-green-500': location.waterLevel >= 70,
                            'bg-yellow-500': location.waterLevel >= 40 && location.waterLevel < 70,
                            'bg-red-500': location.waterLevel < 40
                          }"
                          :style="{ width: `${location.waterLevel}%` }" 
                        />
                      </div>
                      <span class="text-sm px-2 py-0.5 rounded" :class="getWaterLevelClass(location.waterLevel)">
                        {{ location.waterLevel }}%
                      </span>
                    </div>
                  </td>
                  <td class="px-4 py-4 whitespace-nowrap font-medium">
                    {{ location.biomass }} kg
                  </td>
                  <td class="px-4 py-4 whitespace-nowrap">
                    <div class="status-icon">
                      <span 
                        class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                        :class="{
                          'bg-green-100 text-green-800': location.status === 'normal',
                          'bg-yellow-100 text-yellow-800': location.status === 'warning',
                          'bg-red-100 text-red-800': location.status === 'danger'
                        }"
                      >
                        {{ location.status === 'normal' ? 'Normal' : 
                           location.status === 'warning' ? 'Advertencia' : 'Peligro' }}
                      </span>
                    </div>
                  </td>
                  <td class="px-4 py-4 whitespace-nowrap">
                    <div class="action-buttons flex space-x-2">
                      <button class="btn bg-cyan-600 hover:bg-cyan-700 text-white py-1 px-2 rounded text-xs">Excel</button>
                      <button class="btn bg-purple-600 hover:bg-purple-700 text-white py-1 px-2 rounded text-xs">Estadísticas</button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
  
          <div class="counter-component bg-white p-6 rounded-lg shadow-md">
            <Counter @update-count="updateCount" />
          </div>
          
          <!-- Componente de prueba de Tailwind -->
          <div class="mt-6">
            <h3 class="text-lg font-medium text-gray-800 mb-3">Prueba de tema personalizado de Tailwind CSS</h3>
            <TailwindTest />
          </div>
        </main>
      </div>
    </div>
  </template>
  
  <script>
  import Counter from '../components/Counter.vue';
  import TailwindTest from '../components/TailwindTest.vue';
  
  export default {
    name: 'IndexPage',
    components: {
      Counter,
      TailwindTest,
    },
    data() {
      return {
        username: 'Admin',
        locations: [
          {
            name: 'Estanque 1',
            count: 145,
            flowStatus: 'green',
            temperature: 18.5,
            status: 'normal',
            lightLevel: 75, // Nivel de luz (0-100%)
            waterLevel: 85, // Nivel de agua (0-100%)
            biomass: 230    // Biomasa en kg
          },
          {
            name: 'Estanque 2',
            count: 230,
            flowStatus: 'green',
            temperature: 19.2,
            status: 'normal',
            lightLevel: 68,
            waterLevel: 92,
            biomass: 410
          },
          {
            name: 'Estanque 3',
            count: 78,
            flowStatus: 'yellow',
            temperature: 20.1,
            status: 'warning',
            lightLevel: 45,
            waterLevel: 60,
            biomass: 130
          },
          {
            name: 'Estanque 4',
            count: 0,
            flowStatus: 'red',
            temperature: 22.3,
            status: 'danger',
            lightLevel: 10,
            waterLevel: 30,
            biomass: 0
          },
          {
            name: 'Estanque 5',
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
    mounted() {
      // Verificar si el usuario está autenticado
      const isAuthenticated = localStorage.getItem('isAuthenticated');
      const username = localStorage.getItem('username');
      
      if (isAuthenticated !== 'true') {
        this.$router.push('/login');
      } else if (username) {
        this.username = username;
      }
    },
    methods: {
      getDotClass(count, position) {
        if (count === 0) return 'empty';
        if (count < 50 && position > 1) return 'empty';
        if (count < 100 && position > 2) return 'empty';
        if (count < 200 && position > 3) return 'empty';
        
        // Asignar colores basados en la cantidad
        if (count > 300) return 'red';
        if (count > 200) return 'yellow';
        return 'green';
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
      },
      getLightLevelClass(level) {
        if (level < 30) return 'bg-red-200 text-red-800';
        if (level < 60) return 'bg-yellow-200 text-yellow-800';
        return 'bg-green-200 text-green-800';
      },
      getWaterLevelClass(level) {
        if (level < 40) return 'bg-red-200 text-red-800';
        if (level < 70) return 'bg-yellow-200 text-yellow-800';
        return 'bg-green-200 text-green-800';
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
  
  @media (max-width: 768px) {
    .header {
      padding: 0.8rem 1rem;
    }
    
    .logo {
      font-size: 1.4rem;
    }
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
  
  @media (max-width: 768px) {
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
    flex-wrap:  wrap;
  }
  
  @media (max-width: 768px) {
    .main-content {
      padding: 1rem;
      order: 1;
    }
    
    .status-bar {
      gap: 0.8rem;
    }
    
    .status-indicator {
      font-size: 0.8rem;
      margin-right: 0;
      margin-bottom: 0.5rem;
    }
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
  
  @media (max-width: 768px) {
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
  </style>