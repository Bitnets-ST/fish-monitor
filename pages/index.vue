<template>
  <div class="fish-monitoring-system h-screen flex flex-col">
    <div class="dashboard-container flex flex-1 overflow-hidden">
      <aside
        class="sidebar fixed top-16 left-0 h-[calc(100vh-4rem)] bg-cyan-900 text-cyan-100 p-2 flex flex-col items-center space-y-8 z-10 transition-all duration-300"
        :class="{ 'w-16': isSidebarCollapsed, 'w-60': !isSidebarCollapsed }"
      >
        <button 
          @click="toggleSidebar" 
          class="absolute right-2 top-2 text-cyan-300 hover:text-white"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor" 
            class="w-6 h-6"
          >
            <path 
              stroke-linecap="round" 
              stroke-linejoin="round" 
              stroke-width="2" 
              :d="isSidebarCollapsed 
                ? 'M13 5l7 7-7 7M5 5l7 7-7 7' 
                : 'M11 19l-7-7 7-7M19 19l-7-7 7-7'" 
            />
          </svg>
        </button>

        <div class="flex items-center mt-8" :class="{ 'justify-center': isSidebarCollapsed, 'justify-start w-full px-4': !isSidebarCollapsed }">
          <MarineIcon
            icon-type="shell"
            :status="getSidebarStatus('oxygen')"
            class="cursor-pointer"
            @click="setActiveMetric('oxygen')"
          />
          <span v-if="!isSidebarCollapsed" class="ml-3 whitespace-nowrap">Nivel de Oxígeno</span>
        </div>

        <div class="flex items-center" :class="{ 'justify-center': isSidebarCollapsed, 'justify-start w-full px-4': !isSidebarCollapsed }">
          <MarineIcon
            icon-type="jellyfish"
            :status="getSidebarStatus('water')"
            class="cursor-pointer"
            @click="setActiveMetric('water')"
          />
          <span v-if="!isSidebarCollapsed" class="ml-3 whitespace-nowrap">Nivel de Agua</span>
        </div>

        <div class="flex items-center" :class="{ 'justify-center': isSidebarCollapsed, 'justify-start w-full px-4': !isSidebarCollapsed }">
          <MarineIcon
            icon-type="fish"
            :status="getSidebarStatus('biomass')"
            class="cursor-pointer"
            @click="setActiveMetric('biomass')"
          />
          <span v-if="!isSidebarCollapsed" class="ml-3 whitespace-nowrap">Biomasa</span>
        </div>
      </aside>

      <main 
        class="main-content flex-1 flex flex-col h-full overflow-auto transition-all duration-300" 
        :class="{ 'ml-16': isSidebarCollapsed, 'ml-60': !isSidebarCollapsed }"
      >
        <OceanBackground class="flex-1 p-6">
          <!-- Vista principal: Tabla de estanques por zona -->
          <div v-if="!selectedPond" class="main-table-view">
            <PondDetailTable :ponds="ponds" @select-pond="selectPond" />
          </div>

          <!-- Detalle del estanque -->
          <div v-else class="pond-detail">
            <div class="flex justify-between items-center mb-4">
              <button
                class="text-cyan-400 hover:text-cyan-300 flex items-center"
                @click="selectedPond = null"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 mr-1"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                    clip-rule="evenodd"
                  />
                </svg>
                Volver a estanques
              </button>
              <h2 class="text-3xl font-bold text-cyan-300">
                {{ selectedPond.name }}
              </h2>
            </div>

            <!-- Información detallada del estanque -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <PondCard
                :pond="selectedPond"
                :show-details="true"
                :show-camera="true"
              />
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
import PondCard from "../components/PondCard.vue";
import PondDetailTable from "../components/PondDetailTable.vue";
import MarineIcon from "../components/MarineIcon.vue";
import OceanBackground from "../components/OceanBackground.vue";
import PondDetailStats from "../components/PondDetailStats.vue";

export default {
  name: "IndexPage",
  components: {
    PondCard,
    PondDetailTable,
    MarineIcon,
    OceanBackground,
    PondDetailStats,
  },
  data() {
    return {
      username: "Admin",
      activeMetric: "oxygen",
      selectedPond: null,
      isSidebarCollapsed: true,
      ponds: [
        {
          id: 1,
          zoneId: 1,
          name: "Estanque Puerto Montt",
          count: 145,
          oxygen: "Normal",
          oxygenLabel: "Normal",
          current: "Suave",
          currentLabel: "Suave",
          temperature: 18.5,
          status: "normal",
          waterLevel: 85,
          lightLevel: 75,
          biomass: 230,
          pelletWaste: 15,
          flowStatus: "green",
          showStats: false,
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
          showStats: false,
        },
        {
          id: 3,
          zoneId: 1,
          name: " Estanque Ensenada",
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
          showStats: true,
        },
        {
          id: 4,
          zoneId: 2,
          name: "Estanque Puerto Varas 2",
          count: 230,
          oxygen: "Alto",
          oxygenLabel: "Alto",
          current: "Media",
          currentLabel: "Media",
          temperature: 19.2,
          status: "normal",
          waterLevel: 92,
          lightLevel: 68,
          biomass: 410,
          pelletWaste: 28,
          flowStatus: "green",
          showStats: true,
        },
      ],
    };
  },
  computed: {
    relatedPonds() {
      if (!this.selectedPond) return [];
      // Retorna otros estanques relacionados en la misma zona
      return this.ponds.filter(
        (pond) =>
          pond.zoneId === this.selectedPond.zoneId &&
          pond.id !== this.selectedPond.id
      );
    },
  },
  methods: {
    toggleSidebar() {
      this.isSidebarCollapsed = !this.isSidebarCollapsed;
    },
    selectPond(pond) {
      this.selectedPond = pond;
    },
    setActiveMetric(metric) {
      this.activeMetric = metric;
    },
    getSidebarStatus(metric) {
      // Calcula el estado del indicador de la barra lateral en función de los datos
      if (metric === "oxygen") {
        const lowOxygen = this.ponds.some((pond) => pond.oxygen === "Bajo");
        if (lowOxygen) return "low";

        const highOxygen = this.ponds.some((pond) => pond.oxygen === "Alto");
        if (highOxygen) return "high";

        return "normal";
      }

      if (metric === "water") {
        const lowWater = this.ponds.some((pond) => pond.waterLevel < 50);
        if (lowWater) return "low";

        const mediumWater = this.ponds.some(
          (pond) => pond.waterLevel >= 50 && pond.waterLevel < 70
        );
        if (mediumWater) return "medium";

        return "high";
      }

      if (metric === "biomass") {
        const lowBiomass = this.ponds.some((pond) => pond.biomass < 150);
        if (lowBiomass) return "low";

        const mediumBiomass = this.ponds.some(
          (pond) => pond.biomass >= 150 && pond.biomass < 300
        );
        if (mediumBiomass) return "medium";

        return "high";
      }

      return "normal";
    },
  },
};
</script>

<style scoped>
/* No se necesitan estilos adicionales ya que estamos usando Tailwind */
</style>

