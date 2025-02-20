<template>
 
 <div class="kanban-column">
    <v-card class="column-wrapper" elevation="2">
      <v-card-title class="column-title">{{ title }}</v-card-title>

      <v-card-text class="column-content">
       
        <KanbanCard
         v-for="card in cards"
         :key="card.id"
         :card="card"
         @move-card="onMoveCard"
         @delete-card="onDeleteCard"
         @edit-card="onEditCard"
         @view-description="onViewDescription"
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
  (event: 'view-description', cardId: number): void;
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

function onViewDescription(cardId: number) {
  emit('view-description', cardId);
}

</script>

<style scoped>
.kanban-column {
  width: 300px;
  min-height: 600px;
  background-color: #f8f9fa;
  padding: 15px;
  border-radius: 8px;
  border: 2px solid #ccc;
  min-height: 600px;

}

.column-wrapper {
  background-color: #f2f2f2;;
  border-radius: 8px;
  padding-bottom: 10px;
  text-align: center;
}

.column-title {
  font-weight: 700;
  font-size: 1.1rem;
  background-color: #2e3d2b;
  color: white;
  padding: 12px;
  text-align: center;
  border-radius: 6px;
}

.column-content {
  display: flex;
  flex-direction: column;
  gap: 10px;
  min-height: 400px;
}
.add-card-placeholder {
 color: #555;
 cursor: pointer;
  padding: 8px;
  margin-top: 8px;
  border-radius: 4px;
  transition: background-color 0.2s;
}
.add-card-placeholder:hover {
  background-color: #e0e0e0;
 }

</style>
