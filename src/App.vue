<template>
  <v-app style="background: transparent;">
    <v-main style="background: transparent;">
    <v-container fluid class="kanban-container">
      <h1 class="kanban-title">Kanban Board</h1>
      <KanbanBoard />
    </v-container>
  </v-main>
  </v-app>
</template>

<script setup lang="ts">
import KanbanBoard from './components/KanbanBoard.vue'
</script>

<style scoped>
.kanban-container {
  max-width: 1600px;
  margin: 0 auto;
  padding: 20px;
  background: transparent;
}

.kanban-title {
  font-family: 'Inter', 'Segoe UI', sans-serif;
  font-size: 2.8rem;
  font-weight: 800;
  margin-bottom: 40px;
  color: #ffffff;
  text-align: center;
  text-shadow: 0 4px 20px rgba(0, 0, 0, 0.4), 0 2px 8px rgba(0, 0, 0, 0.3);
  letter-spacing: 0.5px;
}
</style>
