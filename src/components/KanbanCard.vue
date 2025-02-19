<template>
  <v-card class="kanban-card" elevation="2">
  

    <div class="button-group">
      <v-btn
      v-for="option in moveOptions"
      :key="option.status"
      @click="moveCard(option.status)"
      small
      color="secondary"
      >
      Move to {{ option.title }}
    </v-btn>
  </div>

    <v-btn class="mt-2" color="warning" small @click = 'editCard'> Edit</v-btn>
    <v-btn class="mt-2" color="error" small @click = 'deleteCard'> Delete</v-btn>
  </v-card>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, computed } from 'vue';

const props = defineProps<{
  card: { id: number; title: string; description: string; status: string };
}>();

const emit = defineEmits<{
(event: 'move-card', cardId: number, newStatus: string): void;
(event: 'delete-card', cardId: number): void;
(event: 'edit-card', cardId: number): void;
}>();

const moveOptions = computed(() => {
  return ['todo', 'in-progress', 'done']
    .filter(status => status !== props.card.status)
    .map(status => ({ status, title: status.replace('-', ' ') }));
});


//function to move the card

const moveCard = (newStatus: string) => {
  emit('move-card', props.card.id, newStatus);
};

const editCard = () => {
  emit('edit-card', props.card.id);
};

const deleteCard = () => {
  emit('delete-card', props.card.id);
};
</script>

<style scoped>
.kanban-card {
  background-color: white;
  padding: 15px;
  border-radius: 8px;
  border: 1px solid #ddd;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 10px;
}

.button-group {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
}

.v-btn {
  margin-right: 5px;
}
</style>
