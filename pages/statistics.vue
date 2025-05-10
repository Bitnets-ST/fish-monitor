<template>
  <div class="min-h-screen bg-gray-100 dark:bg-gray-900 py-6 px-4 sm:px-6 lg:px-8">
    <div class="max-w-7xl mx-auto">
      <div class="flex justify-between items-center mb-6">
        <div>
          <h1 class="text-2xl font-bold text-gray-800 dark:text-white">Estadísticas de Estanques</h1>
          <p class="text-sm text-gray-600 dark:text-gray-400">Análisis detallado del rendimiento y métricas clave</p>
        </div>
        <button 
          @click="goBack" 
          class="flex items-center text-sm bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors shadow-md"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clip-rule="evenodd" />
          </svg>
          Volver al Dashboard
        </button>
      </div>
      
      <!-- Filtros -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-6">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Zona</label>
            <select v-model="filters.zone" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white">
              <option value="all">Todas las zonas</option>
              <option value="1">Zona Norte</option>
              <option value="2">Zona Central</option>
              <option value="3">Zona Sur</option>
            </select>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Periodo</label>
            <select v-model="filters.period" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white">
              <option value="day">Último día</option>
              <option value="week">Última semana</option>
              <option value="month">Último mes</option>
              <option value="year">Último año</option>
            </select>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Métrica</label>
            <select v-model="filters.metric" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white">
              <option value="temperature">Temperatura</option>
              <option value="oxygen">Oxígeno</option>
              <option value="biomass">Biomasa</option>
              <option value="pellet">Desperdicio de pellet</option>
              <option value="water">Nivel de agua</option>
            </select>
          </div>
          
          <div class="flex items-end">
            <button @click="applyFilters" class="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
              Aplicar filtros
            </button>
          </div>
        </div>
      </div>
      
      <!-- Resumen de métricas -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div v-for="(metric, index) in summaryMetrics" :key="index" class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
          <div class="flex items-start justify-between">
            <div>
              <p class="text-sm text-gray-500 dark:text-gray-400">{{ metric.name }}</p>
              <p class="text-2xl font-semibold text-gray-800 dark:text-white">{{ metric.value }}</p>
            </div>
            <div :class="getMetricIconClass(metric.type)">
              <component :is="getMetricIcon(metric.type)" class="h-8 w-8" />
            </div>
          </div>
          <div class="mt-2">
            <div class="flex items-center">
              <span :class="metric.trend > 0 ? 'text-green-500' : 'text-red-500'" class="text-sm font-medium">
                {{ metric.trend > 0 ? '+' : '' }}{{ metric.trend }}% 
              </span>
              <span class="ml-1 text-xs text-gray-500 dark:text-gray-400">vs. periodo anterior</span>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Gráfico principal -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-6">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-lg font-medium text-gray-800 dark:text-white">{{ chartTitle }}</h2>
          <div class="flex space-x-2">
            <button 
              v-for="(view, index) in chartViews" 
              :key="index" 
              @click="currentChartView = view.value"
              class="px-3 py-1 text-sm rounded-md"
              :class="currentChartView === view.value ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300' : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'"
            >
              {{ view.label }}
            </button>
          </div>
        </div>
        
        <div class="h-64 bg-gray-50 dark:bg-gray-700 rounded-lg flex items-center justify-center">
          <!-- Aquí iría el componente de gráfico real -->
          <div class="text-center text-gray-500 dark:text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
            </svg>
            <p>Gráfico de {{ getMetricLabel(filters.metric) }} por {{ currentChartView === 'time' ? 'tiempo' : 'estanque' }}</p>
          </div>
        </div>
      </div>
      
      <!-- Tabla de detalles -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        <div class="p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 class="text-lg font-medium text-gray-800 dark:text-white">Detalles por estanque</h2>
        </div>
        
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead class="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Estanque</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Zona</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Temperatura</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Oxígeno</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Biomasa</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Estado</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              <tr v-for="pond in filteredPonds" :key="pond.id" @click="selectPond(pond)" class="hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm font-medium text-gray-900 dark:text-white">{{ pond.name }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-500 dark:text-gray-400">{{ getZoneName(pond.zoneId) }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900 dark:text-white">{{ pond.temperature }}°C</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm" :class="getOxygenTextClass(pond.oxygen)">{{ pond.oxygenLabel }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900 dark:text-white">{{ pond.biomass }} kg</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full" :class="getStatusClass(pond.status)">
                    {{ getStatusLabel(pond.status) }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  <button @click.stop="viewPondDetails(pond)" class="text-blue-600 hover:text-blue-900 dark:hover:text-blue-400">Ver detalles</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      
      <!-- Modal de detalles del estanque -->
      <div v-if="selectedPond" class="fixed inset-0 bg-gray-600 bg-opacity-50 dark:bg-gray-900 dark:bg-opacity-80 flex items-center justify-center z-50">
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full mx-4">
          <div class="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
            <h3 class="text-lg font-medium text-gray-800 dark:text-white">{{ selectedPond.name }}</h3>
            <button @click="selectedPond = null" class="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div class="p-4">
            <div class="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p class="text-sm text-gray-500 dark:text-gray-400">Zona</p>
                <p class="font-medium text-gray-900 dark:text-white">{{ getZoneName(selectedPond.zoneId) }}</p>
              </div>
              <div>
                <p class="text-sm text-gray-500 dark:text-gray-400">Estado</p>
                <span class="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full" :class="getStatusClass(selectedPond.status)">
                  {{ getStatusLabel(selectedPond.status) }}
                </span>
              </div>
            </div>
            
            <div class="space-y-4">
              <!-- Temperatura -->
              <div>
                <div class="flex justify-between mb-1">
                  <div class="text-sm font-medium text-gray-700 dark:text-gray-300">Temperatura</div>
                  <div class="text-sm font-medium text-blue-600">{{ selectedPond.temperature }}°C</div>
                </div>
                <div class="w-full bg-gray-200 rounded-full h-2">
                  <div class="bg-blue-600 h-2 rounded-full" 
                      :style="`width: ${getTempPercentage(selectedPond.temperature)}%`"></div>
                </div>
              </div>
              
              <!-- Nivel de oxígeno -->
              <div>
                <div class="flex justify-between mb-1">
                  <div class="text-sm font-medium text-gray-700 dark:text-gray-300">Oxígeno</div>
                  <div class="text-sm font-medium" :class="getOxygenTextClass(selectedPond.oxygen)">
                    {{ selectedPond.oxygenLabel }}
                  </div>
                </div>
                <div class="w-full bg-gray-200 rounded-full h-2">
                  <div class="h-2 rounded-full" 
                      :class="getOxygenBarClass(selectedPond.oxygen)"
                      :style="`width: ${getOxygenPercentage(selectedPond.oxygen)}`"></div>
                </div>
              </div>
              
              <!-- Nivel de agua -->
              <div>
                <div class="flex justify-between mb-1">
                  <div class="text-sm font-medium text-gray-700 dark:text-gray-300">Nivel de agua</div>
                  <div class="text-sm font-medium text-blue-600">{{ selectedPond.waterLevel }}%</div>
                </div>
                <div class="w-full bg-gray-200 rounded-full h-2">
                  <div class="bg-blue-600 h-2 rounded-full" 
                      :style="`width: ${selectedPond.waterLevel}%`"></div>
                </div>
              </div>
              
              <!-- Desperdicio de pellet -->
              <div>
                <div class="flex justify-between mb-1">
                  <div class="text-sm font-medium text-gray-700 dark:text-gray-300">Desperdicio pellet</div>
                  <div class="text-sm font-medium" 
                      :class="selectedPond.pelletWaste > 40 ? 'text-red-600' : 'text-green-600'">
                    {{ selectedPond.pelletWaste }}%
                  </div>
                </div>
                <div class="w-full bg-gray-200 rounded-full h-2">
                  <div class="h-2 rounded-full" 
                      :class="selectedPond.pelletWaste > 40 ? 'bg-red-500' : 'bg-green-500'"
                      :style="`width: ${selectedPond.pelletWaste}%`"></div>
                </div>
              </div>
            </div>
            
            <div class="mt-6 flex justify-end">
              <button @click="selectedPond = null" class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                Cerrar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useNuxtApp } from '#app'

export default {
  name: 'StatisticsPage',
  data() {
    return {
      filters: {
        zone: 'all',
        period: 'month',
        metric: 'temperature'
      },
      currentChartView: 'time',
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
          flowStatus: "green",
        },
        {
          id: 2,
          zoneId: 1,
          name: "Estanque Puerto Varas",
          count: 165,
          oxygen: "Normal",
          oxygenLabel: "Normal",
          current: "Suave",
          currentLabel: "Suave",
          temperature: 17.8,
          status: "normal",
          waterLevel: 80,
          lightLevel: 70,
          biomass: 210,
          pelletWaste: 18,
          flowStatus: "green",
        },
        {
          id: 3,
          zoneId: 1,
          name: "Estanque Ensenada",
          count: 130,
          oxygen: "Alto",
          oxygenLabel: "Alto",
          current: "Media",
          currentLabel: "Media",
          temperature: 19.0,
          status: "normal",
          waterLevel: 88,
          lightLevel: 65,
          biomass: 195,
          pelletWaste: 20,
          flowStatus: "green",
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
          flowStatus: "green",
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
        },
        {
          id: 7,
          zoneId: 3,
          name: 'Talofa Sur',
          count: 78,
          oxygen: 'Bajo',
          oxygenLabel: 'Bajo',
          current: 'Fuerte',
          currentLabel: 'Fuerte',
          temperature: 20.1,
          status: 'warning',
          waterLevel: 60,
          lightLevel: 45,
          biomass: 130,
          pelletWaste: 45,
          flowStatus: 'yellow',
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
        },
        {
          id: 9,
          zoneId: 3,
          name: 'Punta Austral',
          count: 45,
          oxygen: 'Bajo',
          oxygenLabel: 'Bajo',
          current: 'Fuerte',
          currentLabel: 'Fuerte',
          temperature: 21.0,
          status: 'danger',
          waterLevel: 45,
          lightLevel: 30,
          biomass: 85,
          pelletWaste: 60,
          flowStatus: 'red',
        }
      ],
      chartViews: [
        { label: 'Por tiempo', value: 'time' },
        { label: 'Por estanque', value: 'pond' }
      ]
    }
  },
  computed: {
    filteredPonds() {
      let result = [...this.ponds];
      
      // Filtrar por zona
      if (this.filters.zone !== 'all') {
        result = result.filter(pond => pond.zoneId === parseInt(this.filters.zone));
      }
      
      return result;
    },
    summaryMetrics() {
      // Calcular métricas de resumen
      const totalPonds = this.filteredPonds.length;
      const avgTemp = this.getAvgValue('temperature');
      const avgBiomass = this.getAvgValue('biomass');
      const healthyPonds = this.filteredPonds.filter(p => p.status === 'normal').length;
      
      return [
        {
          name: 'Estanques',
          value: totalPonds,
          trend: 0,
          type: 'ponds'
        },
        {
          name: 'Temperatura promedio',
          value: `${avgTemp.toFixed(1)}°C`,
          trend: 2.5,
          type: 'temperature'
        },
        {
          name: 'Biomasa total',
          value: `${this.getTotalValue('biomass')} kg`,
          trend: 5.2,
          type: 'biomass'
        },
        {
          name: 'Salud general',
          value: `${Math.round((healthyPonds / totalPonds) * 100)}%`,
          trend: -1.8,
          type: 'health'
        }
      ];
    },
    chartTitle() {
      return `Evolución de ${this.getMetricLabel(this.filters.metric)} - ${this.getPeriodLabel(this.filters.period)}`;
    }
  },
  mounted() {
    // Verificar si hay un parámetro de estanque en la URL
    this.checkPondParam();
  },
  methods: {
    applyFilters() {
      // Aquí iría la lógica para aplicar los filtros
      const nuxtApp = useNuxtApp();
      nuxtApp.$notifications?.showSuccess('Filtros aplicados correctamente');
    },
    selectPond(pond) {
      this.selectedPond = pond;
    },
    viewPondDetails(pond) {
      this.selectedPond = pond;
    },
    getZoneName(zoneId) {
      return zoneId === 1 ? 'Zona Norte' : zoneId === 2 ? 'Zona Central' : 'Zona Sur';
    },
    getStatusLabel(status) {
      if (status === 'danger') {
        return 'Crítico';
      } else if (status === 'warning') {
        return 'Alerta';
      } else {
        return 'Normal';
      }
    },
    getStatusClass(status) {
      if (status === 'danger') {
        return 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300';
      } else if (status === 'warning') {
        return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300';
      } else {
        return 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300';
      }
    },
    getOxygenTextClass(oxygen) {
      if (oxygen === 'Alto') return 'text-green-600 dark:text-green-400';
      if (oxygen === 'Normal') return 'text-blue-600 dark:text-blue-400';
      if (oxygen === 'Bajo') return 'text-red-600 dark:text-red-400';
      return 'text-gray-600 dark:text-gray-400';
    },
    getOxygenBarClass(oxygen) {
      if (oxygen === 'Alto') return 'bg-green-500';
      if (oxygen === 'Normal') return 'bg-blue-500';
      if (oxygen === 'Bajo') return 'bg-red-500';
      return 'bg-gray-500';
    },
    getOxygenPercentage(oxygen) {
      if (oxygen === 'Alto') return '90%';
      if (oxygen === 'Normal') return '70%';
      if (oxygen === 'Bajo') return '30%';
      return '50%';
    },
    getTempPercentage(temperature) {
      return Math.min(100, Math.max(0, (temperature - 15) / (30 - 15) * 100));
    },
    getMetricLabel(metric) {
      const labels = {
        temperature: 'Temperatura',
        oxygen: 'Nivel de oxígeno',
        biomass: 'Biomasa',
        pellet: 'Desperdicio de pellet',
        water: 'Nivel de agua'
      };
      return labels[metric] || metric;
    },
    getPeriodLabel(period) {
      const labels = {
        day: 'Último día',
        week: 'Última semana',
        month: 'Último mes',
        year: 'Último año'
      };
      return labels[period] || period;
    },
    getMetricIcon(type) {
      // Aquí se retornaría el componente de icono correspondiente
      return 'div';
    },
    getMetricIconClass(type) {
      const classes = {
        ponds: 'text-blue-500',
        temperature: 'text-yellow-500',
        biomass: 'text-purple-500',
        health: 'text-green-500'
      };
      return `${classes[type] || 'text-gray-500'}`;
    },
    getAvgValue(property) {
      if (this.filteredPonds.length === 0) return 0;
      const sum = this.filteredPonds.reduce((acc, pond) => acc + pond[property], 0);
      return sum / this.filteredPonds.length;
    },
    getTotalValue(property) {
      return this.filteredPonds.reduce((acc, pond) => acc + pond[property], 0);
    },
    // Verificar si hay un parámetro de estanque en la URL
    checkPondParam() {
      const pondId = this.$route.query.pond;
      if (pondId) {
        // Buscar el estanque por ID
        const pondIdNum = parseInt(pondId, 10);
        const pond = this.ponds.find(p => p.id === pondIdNum);
        
        // Si se encuentra, mostrar sus detalles
        if (pond) {
          this.selectedPond = pond;
        }
      }
    },
    goBack() {
      this.$router.push('/');
    }
  }
}
</script> 