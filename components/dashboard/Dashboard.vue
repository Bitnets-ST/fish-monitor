<template>
  <div class="dashboard-container">
    <!-- Sidebar -->
    <DashboardSidebar :username="username" />

    <!-- Contenido principal -->
    <div class="main-content">
      <!-- Header -->
      <DashboardHeader 
        :search-query="searchQuery"
        :show-notifications="showNotifications"
        @update:search-query="searchQuery = $event"
        @toggle-notifications="showNotifications = !showNotifications"
      />

      <!-- Contenido -->
      <main class="content">
        <!-- Estadísticas -->
        <DashboardStats 
          :ponds="ponds"
          :best-zone="bestZone"
          :warnings="warnings"
        />

        <!-- Zonas -->
        <DashboardZones 
          :ponds="ponds"
          @select-zone="selectedZone = $event"
        />

        <!-- Lista de Estanques -->
        <DashboardPondList 
          :ponds="ponds"
          :search-query="searchQuery"
          :selected-zone="selectedZone"
          @select-pond="selectedPond = $event"
        />

        <!-- Detalle de Estanque -->
        <DashboardPondDetail 
          v-if="selectedPond"
          :pond="selectedPond"
        />
      </main>
    </div>

    <!-- Notificaciones -->
    <DashboardNotifications 
      :show="showNotifications"
      :notifications="notifications"
      @close="showNotifications = false"
      @mark-as-read="markNotificationAsRead"
      @mark-all-as-read="markAllNotificationsAsRead"
      @delete-notification="deleteNotification"
    />
  </div>
</template>

<script>
import DashboardSidebar from './sidebar/DashboardSidebar.vue'
import DashboardHeader from './header/DashboardHeader.vue'
import DashboardStats from './stats/DashboardStats.vue'
import DashboardZones from './zones/DashboardZones.vue'
import DashboardPondList from './ponds/DashboardPondList.vue'
import DashboardPondDetail from './ponds/DashboardPondDetail.vue'
import DashboardNotifications from './notifications/DashboardNotifications.vue'

export default {
  name: 'Dashboard',
  components: {
    DashboardSidebar,
    DashboardHeader,
    DashboardStats,
    DashboardZones,
    DashboardPondList,
    DashboardPondDetail,
    DashboardNotifications
  },
  data() {
    return {
      username: '',
      selectedZone: null,
      selectedPond: null,
      searchQuery: '',
      showNotifications: false,
      ponds: [],
      warnings: [],
      notifications: []
    }
  },
  computed: {
    bestZone() {
      if (!this.ponds.length) return null;
      
      const zones = [1, 2, 3].map(zoneId => {
        const zonePonds = this.ponds.filter(pond => pond.zoneId === zoneId);
        const totalFish = zonePonds.reduce((sum, pond) => sum + pond.count, 0);
        const avgHealth = zonePonds.reduce((sum, pond) => sum + pond.health, 0) / zonePonds.length;
        const avgTemp = zonePonds.reduce((sum, pond) => sum + pond.temperature, 0) / zonePonds.length;
        
        return {
          id: zoneId,
          ponds: zonePonds.length,
          totalFish,
          avgHealth,
          avgTemp
        };
      });
      
      return zones.reduce((best, current) => {
        return current.totalFish > best.totalFish ? current : best;
      });
    }
  },
  mounted() {
    this.loadUserData();
    this.loadPonds();
    this.loadWarnings();
    this.loadNotifications();
  },
  methods: {
    async loadUserData() {
      try {
        const response = await fetch('/api/user');
        const data = await response.json();
        this.username = data.username;
      } catch (error) {
        console.error('Error loading user data:', error);
      }
    },
    async loadPonds() {
      try {
        const response = await fetch('/api/ponds');
        this.ponds = await response.json();
      } catch (error) {
        console.error('Error loading ponds:', error);
      }
    },
    async loadWarnings() {
      try {
        const response = await fetch('/api/warnings');
        this.warnings = await response.json();
      } catch (error) {
        console.error('Error loading warnings:', error);
      }
    },
    async loadNotifications() {
      try {
        const response = await fetch('/api/notifications');
        this.notifications = await response.json();
      } catch (error) {
        console.error('Error loading notifications:', error);
      }
    },
    async markNotificationAsRead(notificationId) {
      try {
        await fetch(`/api/notifications/${notificationId}/read`, { method: 'POST' });
        this.notifications = this.notifications.map(notification => 
          notification.id === notificationId 
            ? { ...notification, read: true }
            : notification
        );
      } catch (error) {
        console.error('Error marking notification as read:', error);
      }
    },
    async markAllNotificationsAsRead() {
      try {
        await fetch('/api/notifications/read-all', { method: 'POST' });
        this.notifications = this.notifications.map(notification => ({
          ...notification,
          read: true
        }));
      } catch (error) {
        console.error('Error marking all notifications as read:', error);
      }
    },
    async deleteNotification(notificationId) {
      try {
        await fetch(`/api/notifications/${notificationId}`, { method: 'DELETE' });
        this.notifications = this.notifications.filter(
          notification => notification.id !== notificationId
        );
      } catch (error) {
        console.error('Error deleting notification:', error);
      }
    }
  }
}
</script>

<style scoped>
.dashboard-container {
  @apply min-h-screen bg-gray-100 dark:bg-gray-900;
}

.main-content {
  @apply lg:pl-64;
}

.content {
  @apply py-6 px-4 sm:px-6 lg:px-8;
}
</style> 