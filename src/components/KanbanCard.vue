<template>
  <v-card class="mb-2 pa-2 ">
    <v-card-title> {{ card.title }}</v-card-title>
    <v-card-subtitle> {{ card.description }}</v-card-subtitle>

    <v-btn-group class="mt-2" dense>
      <v-btn
      v-for="option in moveOptions"
      :key="option.status"
      @click="moveCard(option.status)"
      small
      >
      Move to {{ option.title }}
    </v-btn>
    </v-btn-group>

    <v-btn class="mt-2" color="warning" small @click = 'editCard'> Edit</v-btn>
    <v-btn class="mt-2" color="error" small @click = 'deleteCard'> Delete</v-btn>
  </v-card>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, computed } from 'vue';

defineProps<{
  card: { id: number; title: string; description: string; status: string };
}>();

const emit = defineEmits<{
(event: 'move-card', cardId: number, newStatus: string): void;
(event: 'delete-card', cardId: number): void;
(event: 'edit-card', cardId: number): void;
}>();

const moveOptions = computed(() => {
   const statuses = [ 'todo', 'in-progress', 'done'];
   return statuses
   .filter (status => status !== card.status)
   .map(status =>({ status, title: status.replace('-', '')}));
});


//function to move the card

const moveCard = (newStatus: string) => {
  emit('move-card', card.id, newStatus);
};

const editCard = () => {
  emit('edit-card', card.id);
};

const deleteCard = () => {
  emit('delete-card', card.id);
};
</script>
