<template>
  <div class="app">
    <Sidebar />
    <div class="main-content">
      <router-view></router-view>
    </div>
    
  </div>
</template>

<script>
import Sidebar from './components/Sidebar.vue'

export default {
  name: 'AppDashboard',
  components: {
    Sidebar,
  }
}
</script>

<style>
.app {
  display: flex;
  height: 100vh;
}

.main-content {
  flex-grow: 1;
  padding: 20px;
  background-color: #f5f6fa;
}
</style>