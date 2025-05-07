<template>
  <div class="pond-detail-table rounded overflow-hidden shadow-md">
    <div class="bg-gray-800 text-white px-4 py-2 flex justify-between items-center border-b border-gray-700">
      <div class="flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-cyan-400" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd" />
        </svg>
        <span class="text-sm font-medium">Conteo en tiempo real</span>
      </div>
      
      <div class="flex gap-4">
        <div class="flex items-center gap-2 text-xs text-gray-300">
          <span class="w-2 h-2 rounded-full bg-green-500"></span>
          Sin alertas
        </div>
        <div class="flex items-center gap-2 text-xs text-gray-300">
          <span class="w-2 h-2 rounded-full bg-yellow-500"></span>
          Alerta de revisión
        </div>
        <div class="flex items-center gap-2 text-xs text-gray-300">
          <span class="w-2 h-2 rounded-full bg-red-500"></span>
          Alerta de densidad
        </div>
      </div>
    </div>
    
    <div class="bg-gray-900 text-white">
      <div class="flex border-b border-gray-800">
        <button class="py-2 px-4 bg-cyan-700 border-b-2 border-cyan-400 text-sm">Zona Norte</button>
        <button class="py-2 px-4 bg-gray-800 text-sm">Zona Central</button>
        <button class="py-2 px-4 bg-gray-800 text-sm">Zona Sur</button>
      </div>
      
      <table class="min-w-full">
        <thead>
          <tr class="bg-gray-800 text-gray-400 text-xs">
            <th class="py-3 px-4 text-left">Ubicación</th>
            <th class="py-3 px-4 text-center">Conteo</th>
            <th class="py-3 px-4 text-center">Flujo</th>
            <th class="py-3 px-4 text-center">Temperatura</th>
            <th class="py-3 px-4 text-center">Estado</th>
            <th class="py-3 px-4 text-center">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(pond, index) in ponds" :key="index" 
              class="border-b border-gray-800 text-sm hover:bg-gray-800/50 transition">
            <td class="py-3 px-4">{{ pond.name }}</td>
            <td class="py-3 px-4 text-center">{{ pond.count }}</td>
            <td class="py-3 px-4 text-center">
              <div class="flex justify-center">
                <span class="inline-block w-3 h-3 rounded-full" 
                      :class="getStatusColor(pond.flowStatus)"></span>
              </div>
            </td>
            <td class="py-3 px-4 text-center text-cyan-100">{{ pond.temperature }}°C</td>
            <td class="py-3 px-4 text-center">
              <div class="flex justify-center">
                <span class="inline-block w-3 h-3 rounded-full" 
                      :class="getStatusColor(pond.status)"></span>
              </div>
            </td>
            <td class="py-3 px-4">
              <div class="flex gap-2 justify-center">
                <button class="bg-cyan-700 hover:bg-cyan-600 text-white py-1 px-2 rounded text-xs transition">
                  Excel
                </button>
                <button class="bg-cyan-800 hover:bg-cyan-700 text-white py-1 px-2 rounded text-xs transition">
                  Estadísticas
                </button>
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
  name: 'PondDetailTable',
  props: {
    ponds: {
      type: Array,
      required: true
    }
  },
  methods: {
    getStatusColor(status) {
      if (status === 'green' || status === 'normal') return 'bg-green-500';
      if (status === 'yellow' || status === 'warning') return 'bg-yellow-500';
      if (status === 'red' || status === 'danger') return 'bg-red-500';
      return 'bg-gray-500';
    }
  }
}
</script>

<style scoped>
.pond-detail-table {
  width: 100%;
  background-color: rgb(17, 24, 39);
  color: white;
}
</style> 