<template>
  <div class="p-6 bg-dark rounded-lg shadow-xl">
    <h2 class="text-2xl font-bold text-primary mb-4">Tailwind CSS está funcionando</h2>
    <p class="text-white mb-4">Este componente utiliza clases de Tailwind CSS para su estilo.</p>
    
    <div class="flex space-x-4">
      <button class="bg-primary hover:bg-primary-light text-white font-bold py-2 px-4 rounded transition-colors">
        Botón Principal
      </button>
      <button class="bg-accent hover:bg-accent-dark text-dark font-bold py-2 px-4 rounded transition-colors">
        Botón Acento
      </button>
    </div>
    
    <div class="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
      <div class="bg-dark-surface p-4 rounded-lg">
        <div class="h-4 w-full bg-gray-700 rounded">
          <div class="h-4 bg-primary rounded" style="width: 70%" />
        </div>
        <p class="text-gray-400 mt-2 text-sm">Progreso 70%</p>
      </div>
      
      <div class="bg-dark-surface p-4 rounded-lg">
        <div class="h-4 w-full bg-gray-700 rounded">
          <div class="h-4 bg-accent rounded" style="width: 45%" />
        </div>
        <p class="text-gray-400 mt-2 text-sm">Progreso 45%</p>
      </div>
      
      <div class="bg-dark-surface p-4 rounded-lg">
        <div class="h-4 w-full bg-gray-700 rounded">
          <div class="h-4 bg-red-500 rounded" style="width: 20%" />
        </div>
        <p class="text-gray-400 mt-2 text-sm">Progreso 20%</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TailwindTest'
}
</script> 