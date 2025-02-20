

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
  font-family: 'Montserrat', sans-serif;
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 20px;
  color: #fff;  /* white text */
 text-align: center;
 margin-top: 20px;
}
</style>
