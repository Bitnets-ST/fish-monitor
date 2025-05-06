<template>
    <div class="fish-monitoring-system">
      <header class="header">
        <div class="logo-container">
          <h1 class="logo">FISHMONITOR</h1>
        </div>
        <div class="user-info">
          <p>Bienvenido, {{ username }}</p>
        </div>
      </header>
  
      <div class="dashboard-container">
        <aside class="sidebar">
          <nav class="nav-menu">
            <div class="nav-item active">
              <i class="nav-icon">📊</i>
              <span>Monitoreo</span>
            </div>
            <div class="nav-item">
              <i class="nav-icon">📜</i>
              <span>Reportes</span>
            </div>
            <div class="nav-item">
              <i class="nav-icon">🗺️</i>
              <span>Mapa</span>
            </div>
            <div class="nav-item">
              <i class="nav-icon">⚡</i>
              <span>Estadísticas</span>
            </div>
            <div class="nav-item">
              <i class="nav-icon">⚙️</i>
              <span>Configuración</span>
            </div>
          </nav>
        </aside>
  
        <main class="main-content">
          <div class="status-bar">
            <div class="status-indicator active">
              <span class="status-dot"></span>
              Conteo en tiempo real
            </div>
            <div class="status-indicator">
              <span class="status-dot yellow"></span>
              Sin registros recientes
            </div>
            <div class="status-indicator">
              <span class="status-dot red"></span>
              Alerta de densidad
            </div>
            <div class="status-indicator">
              <span class="status-dot green"></span>
              Flujo normal
            </div>
          </div>
  
          <div class="location-tabs">
            <button class="tab-button active">Todos</button>
            <button class="tab-button">Zona Norte</button>
            <button class="tab-button">Zona Central</button>
            <button class="tab-button">Zona Sur</button>
          </div>
  
          <div class="data-table">
            <table>
              <thead>
                <tr>
                  <th>Ubicación</th>
                  <th>Conteo</th>
                  <th>Flujo</th>
                  <th>Temperatura</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(location, index) in locations" :key="index">
                  <td>{{ location.name }}</td>
                  <td>
                    <div class="fish-count">
                      <div class="indicator-dots">
                        <span 
                          v-for="n in 4" 
                          :key="n" 
                          class="dot" 
                          :class="getDotClass(location.count, n)"
                        ></span>
                      </div>
                      <span class="count-number">{{ location.count }}</span>
                    </div>
                  </td>
                  <td>
                    <div class="status-indicator">
                      <span class="status-dot" :class="location.flowStatus"></span>
                    </div>
                  </td>
                  <td>{{ location.temperature }}°C</td>
                  <td>
                    <div class="status-icon" :class="location.status">
                      <i v-if="location.status === 'normal'">🟢</i>
                      <i v-else-if="location.status === 'warning'">🟡</i>
                      <i v-else>🔴</i>
                    </div>
                  </td>
                  <td>
                    <div class="action-buttons">
                      <button class="btn btn-excel">Excel</button>
                      <button class="btn btn-stats">Estadísticas</button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
  
          <div class="counter-component">
            <Counter @update-count="updateCount" />
          </div>
        </main>
      </div>
    </div>
  </template>
  
  <script>
  import Counter from '../components/Counter.vue';
  
  export default {
    name: 'IndexPage',
    components: {
      Counter,
    },
    data() {
      return {
        username: 'usuario',
        locations: [
          {
            name: 'Estanque 1',
            count: 145,
            flowStatus: 'green',
            temperature: 18.5,
            status: 'normal'
          },
          {
            name: 'Estanque 2',
            count: 230,
            flowStatus: 'green',
            temperature: 19.2,
            status: 'normal'
          },
          {
            name: 'Estanque 3',
            count: 78,
            flowStatus: 'yellow',
            temperature: 20.1,
            status: 'warning'
          },
          {
            name: 'Estanque 4',
            count: 0,
            flowStatus: 'red',
            temperature: 22.3,
            status: 'danger'
          },
          {
            name: 'Estanque 5',
            count: 320,
            flowStatus: 'green',
            temperature: 17.8,
            status: 'normal'
          }
        ]
      };
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
    flex-wrap: wrap;
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