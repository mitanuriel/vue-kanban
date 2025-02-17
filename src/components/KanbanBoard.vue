<template>
  <v-container>
    <v-row>
      <KanbanColumn
      v-for="column in columns"
      :key="column.id"
      :title="column.title"
      :status="column.status"
      :cards="cards.filter(card => card.status === column.status)"
      @move-card="moveCard"
      />

    </v-row>
  </v-container>
</template>


<script setup lang="ts">
import { ref } from 'vue';
import KanbanColumn from './KanbanColumn.vue';

const columns = ref ( [
  {id: 1, title: 'To do', status:'todo'},
  {id: 2, title:'In Progress', status: 'in-progress' },
  {id: 3, title: "In Review", status: 'in-review'},
  {id: 4, title: 'Done', status: "done"},

]);

//sample cards

const cards = ref ( [
  {id: 1, title: 'First task', description:'This is a test stask',status: 'todo'},
  {id:2, title: 'Second task', description: 'Another task in progress', status: 'in-progress'},

]);

//function to move cards between columns

const moveCard = (cardId: number, newStatus: string) => {
  const card = cards.value.find(c => c.id === cardId);
  if(card) card.status = newStatus;

};

</script>

