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
        @moveCard="onMoveCard"
        />

      </v-list>
    </v-card>
  </v-col>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';
import KanbanCard from './KanbanCard.vue';

//props from KanbanBoard
defineProps<{
  title: string;
  status: string;
  cards: { id: number; title: string; description: string; status: string }[];

}>();

//emits
const emit = defineEmits<{
(event: 'move-card', cardId: number, newStatus: string):void;
}>();

//function to pass move event to KanbanBoard
const onMoveCard = (cardId: number, newStatus: string) => {
  emit('move-card', cardId, newStatus);
};
</script>
