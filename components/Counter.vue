<template>
  <div class="fish-counter bg-cyan-900 rounded-lg shadow-lg p-6 text-white">
    <div class="header flex justify-between items-center mb-6">
      <h2 class="text-xl font-bold">Contador de Peces</h2>
      <div class="api-status flex items-center">
        <div class="bg-green-500 rounded-full w-2 h-2 mr-2"></div>
        <span class="text-sm text-green-300">API Activa</span>
      </div>
    </div>

    <!-- Métricas principales -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      <div class="metric-card bg-cyan-800 rounded-lg p-4">
        <div class="flex items-center mb-2">
          <div class="text-cyan-300 mr-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
            </svg>
          </div>
          <div class="font-medium">Total Peces</div>
        </div>
        <div class="flex items-end">
          <div class="text-3xl font-bold">{{ totalFishCount }}</div>
          <div class="text-sm text-green-400 ml-2 mb-1" v-if="countIncreasePercent > 0">+{{ countIncreasePercent }}%</div>
          <div class="text-sm text-red-400 ml-2 mb-1" v-else>{{ countIncreasePercent }}%</div>
        </div>
      </div>

      <div class="metric-card bg-cyan-800 rounded-lg p-4">
        <div class="flex items-center mb-2">
          <div class="text-cyan-300 mr-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <div class="font-medium">Tasa de Crecimiento</div>
        </div>
        <div class="flex items-end">
          <div class="text-3xl font-bold">{{ growthRate }}%</div>
          <div class="text-xs text-gray-400 ml-2 mb-1">Mensual</div>
        </div>
      </div>

      <div class="metric-card bg-cyan-800 rounded-lg p-4">
        <div class="flex items-center mb-2">
          <div class="text-cyan-300 mr-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <div class="font-medium">Estanques Activos</div>
        </div>
        <div class="flex items-end">
          <div class="text-3xl font-bold">{{ activePonds }}/{{ totalPonds }}</div>
        </div>
      </div>
    </div>

    <!-- Gráfico de líneas (simulado) -->
    <div class="chart-container bg-cyan-800 rounded-lg p-4 mb-6">
      <div class="flex justify-between items-center mb-4">
        <h3 class="font-medium">Evolución de población</h3>
        <div class="chart-controls flex items-center space-x-2 text-sm">
          <button @click="changeTimeRange('day')" :class="{'text-cyan-300': timeRange === 'day', 'text-gray-400': timeRange !== 'day'}">Día</button>
          <button @click="changeTimeRange('week')" :class="{'text-cyan-300': timeRange === 'week', 'text-gray-400': timeRange !== 'week'}">Semana</button>
          <button @click="changeTimeRange('month')" :class="{'text-cyan-300': timeRange === 'month', 'text-gray-400': timeRange !== 'month'}">Mes</button>
        </div>
      </div>
      <div class="chart h-40 flex items-end space-x-1">
        <div v-for="(value, index) in chartData" :key="index" 
             class="chart-bar bg-cyan-600 hover:bg-cyan-500 transition-all rounded-t"
             :style="{height: value + '%', width: 'calc(100% / ' + chartData.length + ' - 4px)'}"></div>
      </div>
      <div class="chart-labels flex justify-between mt-2 text-xs text-gray-400">
        <div v-for="(label, index) in chartLabels" :key="'label-'+index">{{ label }}</div>
      </div>
    </div>

    <!-- Tabla de últimos conteos -->
    <div class="recent-counts">
      <div class="flex justify-between items-center mb-4">
        <h3 class="font-medium">Últimos conteos</h3>
        <button class="text-cyan-300 text-sm hover:underline" @click="loadMore">Ver todos</button>
      </div>
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr class="text-gray-400 border-b border-cyan-700">
              <th class="pb-2 text-left font-normal">Estanque</th>
              <th class="pb-2 text-left font-normal">Hora</th>
              <th class="pb-2 text-right font-normal">Conteo</th>
              <th class="pb-2 text-right font-normal">Cambio</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in recentCounts" :key="item.id" class="border-b border-cyan-700 hover:bg-cyan-800">
              <td class="py-2">{{ item.pondName }}</td>
              <td class="py-2">{{ item.time }}</td>
              <td class="py-2 text-right">{{ item.count }}</td>
              <td class="py-2 text-right" :class="item.change > 0 ? 'text-green-400' : 'text-red-400'">
                {{ item.change > 0 ? '+' + item.change : item.change }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Control de conteo manual y sincronización -->
    <div class="manual-controls mt-6 flex justify-between items-center">
      <button @click="syncWithApi" class="bg-cyan-700 hover:bg-cyan-600 transition py-2 px-4 rounded flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
        Sincronizar con API
      </button>
      <button @click="openManualCountModal" class="bg-blue-600 hover:bg-blue-500 transition py-2 px-4 rounded flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
        </svg>
        Ingreso Manual
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FishCounter',
  data() {
    return {
      totalFishCount: 1373,
      countIncreasePercent: 2.4,
      growthRate: 8.7,
      activePonds: 7,
      totalPonds: 9,
      timeRange: 'week',
      chartData: [35, 42, 58, 50, 64, 45, 55],
      chartLabels: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'],
      recentCounts: [
        { id: 1, pondName: 'Estanque Alao Oeste', time: '10:45', count: 145, change: +3 },
        { id: 2, pondName: 'Bahía 2', time: '09:30', count: 230, change: 0 },
        { id: 3, pondName: 'Costa Norte', time: '09:15', count: 130, change: -2 },
        { id: 4, pondName: 'Talofa Sur', time: '08:00', count: 78, change: +5 },
      ],
      lastSyncTime: new Date().toISOString()
    }
  },
  mounted() {
    // Aquí se podrían cargar los datos iniciales desde una API
    this.loadInitialData();
  },
  methods: {
    loadInitialData() {
      // Simulación de carga de datos desde API
      console.log('Cargando datos iniciales desde API...');
      // En un caso real, aquí harías una llamada fetch o axios
    },
    changeTimeRange(range) {
      this.timeRange = range;
      
      // Simulación de actualización de datos del gráfico
      if (range === 'day') {
        this.chartData = [20, 25, 30, 35, 38, 42, 46, 52, 58, 65, 70, 75];
        this.chartLabels = ['7h', '8h', '9h', '10h', '11h', '12h', '13h', '14h', '15h', '16h', '17h', '18h'];
      } else if (range === 'week') {
        this.chartData = [35, 42, 58, 50, 64, 45, 55];
        this.chartLabels = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
      } else if (range === 'month') {
        this.chartData = [30, 35, 45, 50, 48, 52, 60, 58, 65, 70, 72, 78];
        this.chartLabels = ['1', '3', '6', '9', '12', '15', '18', '21', '24', '27', '29', '31'];
      }
    },
    loadMore() {
      // Simulación de carga de más datos de conteo
      console.log('Cargando más datos de conteo...');
      // Aquí irías a una página de historial completo o cargarías más datos
    },
    syncWithApi() {
      // Simulación de sincronización con API
      console.log('Sincronizando con API...');
      // En un caso real, aquí harías una llamada fetch o axios
      
      this.lastSyncTime = new Date().toISOString();
      // Mostrar notificación de éxito
      alert('Datos sincronizados correctamente');
    },
    openManualCountModal() {
      // Simulación de apertura de modal para ingreso manual
      console.log('Abriendo modal para ingreso manual...');
      // En una implementación real, abrirías un modal con un formulario
      
      const pondName = prompt('Nombre del estanque:');
      const count = prompt('Cantidad de peces:');
      
      if (pondName && count) {
        const newCount = {
          id: Date.now(),
          pondName,
          time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
          count: parseInt(count),
          change: 0 // En un caso real calcularías la diferencia
        };
        
        this.recentCounts.unshift(newCount);
        if (this.recentCounts.length > 4) {
          this.recentCounts.pop();
        }
        
        // Actualizar el conteo total
        this.totalFishCount += newCount.count;
      }
    }
  }
}
</script>

<style scoped>
.chart-bar {
  min-height: 1px;
  transition: height 0.3s ease-in-out;
}
</style> 