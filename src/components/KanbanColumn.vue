<template>
  <v-col cols="4">
    <v-card class="pa-3" elevation="2">
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
  </v-col>
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

<style>
.column-card {
  min-height: 500px; /* Ensure columns are large enough */
  width: 100%; /* Make columns fill their grid space */
  background-color: #f5f5f5;
}

.card-list {
  margin-top: 10px;
}
</style>
