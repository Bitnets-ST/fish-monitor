<!-- components/FishMonitoringTable.vue -->
<template>
    <div class="fish-monitoring-table">
      <div class="data-table bg-white shadow-md rounded-lg overflow-hidden">
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
            <tr v-for="(location, index) in filteredLocations" :key="index" class="hover:bg-gray-50">
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
    </div>
  </template>
  
  <script>
  export default {
    name: 'FishMonitoringTable',
    props: {
      locations: {
        type: Array,
        required: true
      },
      activeZone: {
        type: String,
        default: 'Todos'
      }
    },
    computed: {
      filteredLocations() {
        if (this.activeZone === 'Todos') {
          return this.locations;
        } else {
          return this.locations.filter(location => location.zone === this.activeZone);
        }
      }
    },
    methods: {
      getDotClass(count, position) {
        if (count === 0) return 'empty';
        if (count < 50 && position > 1) return 'empty';
        if (count < 100 && position > 2) return 'empty';
        if (count < 200 && position > 3) return 'empty';
        
        if (count > 300) return 'red';
        if (count > 200) return 'yellow';
        return 'green';
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
  </style>