

<template>
  <v-app>
    <v-container>
      <h1 class="text-center">Kanban Board</h1>
      <KanbanBoard />
    </v-container>
  </v-app>
</template>

<script setup lang="ts">
import KanbanBoard from './components/KanbanBoard.vue'

</script>

<style>

h1 {
  margin-top: 20px;
}
</style>
