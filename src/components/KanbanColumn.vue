<template>
 
 <div class="kanban-column">
+    <v-card class="column-wrapper" elevation="2">
+      <v-card-title class="column-title">{{ title }}</v-card-title>

      <v-card-text class="column-content">
       
        <KanbanCard
         v-for="card in cards"
         :key="card.id"
         :card="card"
         @move-card="onMoveCard"
         @delete-card="onDeleteCard"
         @edit-card="onEditCard"
       />

       <div class="add-card-placeholder" @click="$emit('add-card')">
         Add a card...
       </div>
     </v-card-text>
    </v-card>
  </div>
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
  (event: 'add-card'): void;
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
.kanban-column {
  width: 300px;
  min-height: 600px;
  background-color: #f8f9fa;
  padding: 15px;
  border-radius: 8px;
  border: 2px solid #ccc;
}

.column-title {
  font-weight: bold;
  font-size: 1.2rem;
  margin-bottom: 8px;
  text-align: center;
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
