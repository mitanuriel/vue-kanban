

<template>
  <v-app>
    <v-main>
    <v-container>
      <h1 class="text-center kanban-title">Kanban Board</h1>
      <KanbanBoard />
    </v-container>
  </v-main>
  </v-app>
</template>

<script setup lang="ts">
import KanbanBoard from './components/KanbanBoard.vue'

</script>

<style scoped>

.kanban-title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
}
</style>
