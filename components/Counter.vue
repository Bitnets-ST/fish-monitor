<template>
    <div class="fish-counter">
      <div class="counter-header">
        <h2>Contador de Peces</h2>
        <div class="counter-status" :class="{ active: isActive }">
          <span class="status-dot"></span>
          {{ isActive ? 'Conteo activo' : 'Conteo inactivo' }}
        </div>
      </div>
  
      <div class="counter-display">
        <div class="counter-value">
          <span class="count-number">{{ count }}</span>
          <span class="count-label">peces</span>
        </div>
  
        <div class="counter-details">
          <div class="detail-item">
            <span class="detail-label">Promedio/hora:</span>
            <span class="detail-value">{{ hourlyAverage }}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">Hoy:</span>
            <span class="detail-value">{{ todayTotal }}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">Esta semana:</span>
            <span class="detail-value">{{ weeklyTotal }}</span>
          </div>
        </div>
      </div>
  
      <div class="counter-controls">
        <div class="location-select">
          <label for="location">Ubicación:</label>
          <select id="location" v-model="selectedLocation">
            <option value="0">Estanque 1</option>
            <option value="1">Estanque 2</option>
            <option value="2">Estanque 3</option>
            <option value="3">Estanque 4</option>
            <option value="4">Estanque 5</option>
          </select>
        </div>
  
        <div class="counter-buttons">
          <button @click="resetCount" class="btn btn-reset">
            <span class="btn-icon">🔄</span>
            Reiniciar
          </button>
          <button @click="toggleActive" class="btn" :class="isActive ? 'btn-stop' : 'btn-start'">
            <span class="btn-icon">{{ isActive ? '⏹️' : '▶️' }}</span>
            {{ isActive ? 'Detener' : 'Iniciar' }}
          </button>
          <button @click="incrementCount" class="btn btn-count" :disabled="!isActive">
            <span class="btn-icon">🐟</span>
            Contar pez
          </button>
        </div>
      </div>
  
      <div class="counter-graph">
        <div class="graph-header">
          <h3>Actividad de conteo</h3>
          <div class="graph-legend">
            <div class="legend-item">
              <span class="legend-color" style="background-color: #4caf50;"></span>
              <span>Conteo actual</span>
            </div>
            <div class="legend-item">
              <span class="legend-color" style="background-color: #2196f3;"></span>
              <span>Promedio</span>
            </div>
          </div>
        </div>
        <div class="graph-container">
          <div class="graph-bars">
            <div 
              v-for="(value, index) in hourlyData" 
              :key="index" 
              class="graph-bar" 
              :style="{ height: `${(value / maxHourlyCount) * 100}%` }"
            ></div>
          </div>
          <div class="graph-average-line" :style="{ bottom: `${(averageCount / maxHourlyCount) * 100}%` }"></div>
          <div class="graph-labels">
            <span v-for="hour in 8" :key="hour">{{ getCurrentHour(hour) }}h</span>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        count: 0,
        isActive: false,
        selectedLocation: '0',
        hourlyAverage: 45,
        todayTotal: 247,
        weeklyTotal: 1358,
        hourlyData: [12, 28, 45, 32, 56, 42, 38, 25],
        maxHourlyCount: 60,
        averageCount: 35,
        timer: null
      };
    },
    methods: {
      incrementCount() {
        if (this.isActive) {
          this.count++;
          // Actualizar el último valor en hourlyData (último período de hora)
          const lastIndex = this.hourlyData.length - 1;
          this.hourlyData[lastIndex]++;
          
          // Si superamos el máximo, actualizamos para el gráfico
          if (this.hourlyData[lastIndex] > this.maxHourlyCount) {
            this.maxHourlyCount = this.hourlyData[lastIndex];
          }
          
          // Emitir actualización al componente padre
          this.$emit('update-count', parseInt(this.selectedLocation), this.count);
          
          // Actualizar totales
          this.todayTotal++;
          this.weeklyTotal++;
        }
      },
      resetCount() {
        this.count = 0;
        this.$emit('update-count', parseInt(this.selectedLocation), this.count);
      },
      toggleActive() {
        this.isActive = !this.isActive;
        
        // Simulamos actividad de conteo cuando está activo
        if (this.isActive) {
          this.timer = setInterval(() => {
            if (Math.random() > 0.7) { // 30% de probabilidad de incrementar
              this.incrementCount();
            }
          }, 2000);
        } else {
          clearInterval(this.timer);
        }
      },
      getCurrentHour(offset) {
        const now = new Date();
        const hour = (now.getHours() - (8 - offset)) % 24;
        return hour < 0 ? hour + 24 : hour;
      }
    },
    watch: {
      selectedLocation(newVal) {
        // Reiniciar contador al cambiar de ubicación
        this.count = 0;
        
        // Simular datos diferentes por ubicación
        const locationIndex = parseInt(newVal);
        const baseValues = [
          [12, 28, 45, 32, 56, 42, 38, 25], // Estanque 1
          [18, 32, 47, 35, 42, 38, 29, 21], // Estanque 2
          [8, 15, 22, 18, 26, 30, 25, 17],  // Estanque 3
          [0, 0, 0, 0, 0, 0, 0, 0],         // Estanque 4 (sin actividad)
          [30, 45, 62, 58, 70, 65, 55, 48]  // Estanque 5
        ];
        
        this.hourlyData = [...baseValues[locationIndex]];
        this.maxHourlyCount = Math.max(...this.hourlyData) + 10;
        this.hourlyAverage = Math.round(this.hourlyData.reduce((a, b) => a + b, 0) / this.hourlyData.length);
        
        // Valores simulados basados en la ubicación
        const multipliers = [1, 1.5, 0.5, 0, 2];
        this.todayTotal = Math.round(247 * multipliers[locationIndex]);
        this.weeklyTotal = Math.round(1358 * multipliers[locationIndex]);
      }
    },
    beforeUnmount() {
      if (this.timer) {
        clearInterval(this.timer);
      }
    }
  };
  </script>
  
  <style scoped>
  .fish-counter {
    color: white;
    background-color: #063c44;
    padding: 1.5rem;
    border-radius: 8px;
  }
  
  .counter-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
  }
  
  .counter-header h2 {
    margin: 0;
    font-size: 1.5rem;
    color: #4caf50;
  }
  
  .counter-status {
    display: flex;
    align-items: center;
    font-size: 0.9rem;
    padding: 0.4rem 0.8rem;
    background-color: #052126;
    border-radius: 20px;
  }
  
  .counter-status.active .status-dot {
    background-color: #4caf50;
  }
  
  .counter-status .status-dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: #888;
    margin-right: 8px;
    display: inline-block;
  }
  
  .counter-display {
    display: flex;
    justify-content: space-between;
    margin-bottom: 2rem;
    padding: 1.5rem;
    background-color: #0a2b30;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
  
  .counter-value {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  @media (max-width: 768px) {
    .counter-display {
      flex-direction: column;
      align-items: center;
      padding: 1rem;
      gap: 1.5rem;
    }
    
    .counter-value {
      margin-bottom: 1rem;
    }
    
    .counter-details {
      align-items: center;
      text-align: center;
    }
  }
  
  .count-number {
    font-size: 3.5rem;
    font-weight: bold;
    color: #4caf50;
    line-height: 1;
  }
  
  .count-label {
    font-size: 1rem;
    color: #aaa;
    margin-top: 0.5rem;
  }
  
  .counter-details {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }
  
  .detail-item {
    margin-bottom: 0.8rem;
  }
  
  .detail-label {
    color: #aaa;
    margin-right: 0.5rem;
  }
  
  .detail-value {
    font-weight: bold;
    color: #2196f3;
  }
  
  .counter-controls {
    display: flex;
    justify-content: space-between;
    margin-bottom: 2rem;
    align-items: center;
  }
  
  .location-select {
    display: flex;
    align-items: center;
  }
  
  .location-select label {
    margin-right: 0.5rem;
    color: #aaa;
  }
  
  .location-select select {
    padding: 0.5rem;
    background-color: #052126;
    color: white;
    border: 1px solid #0f4c5c;
    border-radius: 4px;
  }
  
  .counter-buttons {
    display: flex;
    gap: 0.8rem;
  }
  
  @media (max-width: 768px) {
    .counter-controls {
      flex-direction: column;
      gap: 1rem;
    }
    
    .location-select {
      width: 100%;
    }
    
    .location-select select {
      flex-grow: 1;
    }
    
    .counter-buttons {
      width: 100%;
      justify-content: space-between;
      flex-wrap: wrap;
    }
    
    .btn {
      flex: 1 0 auto;
      padding: 0.8rem 0.5rem;
      text-align: center;
      min-width: 90px;
    }
  }
  
  .btn {
    display: flex;
    align-items: center;
    padding: 0.6rem 1.2rem;
    border: none;
    border-radius: 4px;
    color: white;
    cursor: pointer;
    font-size: 0.9rem;
    transition: all 0.2s;
  }
  
  .btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  .btn-icon {
    margin-right: 6px;
    font-size: 1.1rem;
  }
  
  .btn-reset {
    background-color: #607d8b;
  }
  
  .btn-reset:hover {
    background-color: #546e7a;
  }
  
  .btn-start {
    background-color: #4caf50;
  }
  
  .btn-start:hover {
    background-color: #43a047;
  }
  
  .btn-stop {
    background-color: #f44336;
  }
  
  .btn-stop:hover {
    background-color: #e53935;
  }
  
  .btn-count {
    background-color: #2196f3;
  }
  
  .btn-count:hover {
    background-color: #1e88e5;
  }
  
  .counter-graph {
    padding: 1.5rem;
    background-color: #0a2b30;
    border-radius: 8px;
  }
  
  .graph-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
  }
  
  .graph-header h3 {
    margin: 0;
    font-size: 1.2rem;
    font-weight: normal;
  }
  
  .graph-legend {
    display: flex;
    gap: 1rem;
  }
  
  .legend-item {
    display: flex;
    align-items: center;
    font-size: 0.8rem;
  }
  
  .legend-color {
    width: 12px;
    height: 12px;
    display: inline-block;
    margin-right: 5px;
  }
  
  .graph-container {
    height: 200px;
    position: relative;
    padding-bottom: 20px;
  }
  
  .graph-bars {
    display: flex;
    align-items: flex-end;
    height: 100%;
    gap: 15px;
    position: relative;
    z-index: 2;
  }
  
  .graph-bar {
    flex: 1;
    background-color: #4caf50;
    border-radius: 4px 4px 0 0;
    min-height: 1px;
    transition: height 0.5s;
  }
  
  .graph-average-line {
    position: absolute;
    left: 0;
    right: 0;
    height: 2px;
    background-color: #2196f3;
    z-index: 1;
  }
  
  .graph-labels {
    display: flex;
    justify-content: space-between;
    font-size: 0.8rem;
    color: #aaa;
    margin-top: 0.5rem;
  }
  
  @media (max-width: 768px) {
    .graph-container {
      height: 160px;
    }
    
    .graph-header {
      flex-direction: column;
      align-items: flex-start;
      gap: 0.5rem;
    }
    
    .graph-legend {
      width: 100%;
      justify-content: flex-start;
    }
    
    .graph-bars {
      gap: 8px;
    }
    
    .graph-labels {
      font-size: 0.7rem;
    }
  }
  </style>