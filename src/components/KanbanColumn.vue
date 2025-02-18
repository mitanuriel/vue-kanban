<template>
 
    <v-card class="pa-3 column-card" elevation="2" style="min-height: 500px;">
      <v-card-title class="text-center"> {{ title }}</v-card-title>
      <v-divider></v-divider>

      <v-list dense>
        <KanbanCard
        v-for="card in cards"
        :key="card.id"
        :card="card"
        @move-card="onMoveCard"
        @delete-card="onDeleteCard"
        @edit-card="onEditCard"
/>

      </v-list>
    </v-card>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';
import KanbanCard from '@/components/KanbanCard.vue';

//props from KanbanBoard
defineProps<{
  title: string;
  status: string;
  cards: { id: number; title: string; description: string; status: string }[];
}>();

//emits
const emit = defineEmits<{
  (event: 'move-card', cardId: number, newStatus: string):void;
  (event: 'delete-card', cardId: number): void;
  (event: 'edit-card', cardId: number): void;
}>();

//function to pass move event to KanbanBoard
const onMoveCard = (cardId: number, newStatus: string) => {
  emit('move-card', cardId, newStatus);
};

const onDeleteCard = (cardId: number) => {
  emit('delete-card',cardId);
};

const onEditCard = (cardId: number) => {
  emit('edit-card', cardId);
};

</script>

<style scoped>
.kanban-column-card {
  min-height: 600px;
  background-color: #f8f9fa;
  padding: 15px;
  border-radius: 8px;
  border: 2px solid #ccc;
}

.column-header {
  background-color: #3f51b5; /* Darker blue */
  color: white;
  padding: 12px;
  text-align: center;
  font-weight: bold;
  border-radius: 6px 6px 0 0;
}

.card-list {
  min-height: 400px;
}
</style>
