<template>
  <v-card class="kanban-card" elevation="2">
    <v-card-title class="card-title">
      {{ props.card.title }}
    </v-card-title>

    <v-card-subtitle>
      {{ props.card.description }}
    </v-card-subtitle>

    <v-card-actions class="card-actions">
      <div class="move-options">
        <v-btn
          v-for="option in moveOptions"
          :key="option.status"
          variant="text" 
          size="small"
          class="link-button"
          @click="moveCard(option.status)"
          
        
        >
          Move to {{ option.title }}
        </v-btn>
      </div>
      <v-spacer></v-spacer>
      
      <div class="edit-delete"> 
      <v-btn variant="text"
        size="small"
        class="link-button"
        @click="onEditCard">
        Edit
      </v-btn>
      <v-btn  variant="text"
        size="small"
        class="link-button"
        @click="onDeleteCard">
        Delete
      </v-btn>
    </div>
    </v-card-actions>
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
function moveCard(newStatus: string) {
  emit('move-card', props.card.id, newStatus);
}

// Emit edit event
function onEditCard() {
  emit('edit-card', props.card.id);
  console.log("KanbanCard: Edit button clicked");
}

// Emit delete event
function onDeleteCard() {
  emit('delete-card', props.card.id);
}

</script>

<style scoped>
.kanban-card {
  background-color: #fff;
  padding: 15px;
  border-radius: 6px;
  border: 1px solid #ddd;
  margin-bottom: 16px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
}

.card-title {
  font-size: 1rem; /* smaller than the column title */
  font-weight: 600; /* still distinct */
  margin-bottom: 4px;
}

.card-header {
  font-size: 0.95rem;
  font-weight: 600;
  padding-bottom: 0;
}
.card-subtitle {
  font-size: 0.85rem;
  color: #666;
}

.card-actions {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content:space-between; 
  align-items: center;
  padding: 2px; 
 }
 .move-options {
  
  display: flex;
  flex-direction: column; 
  gap: 2px;
 }

 .link-button {
  font-size: 0.75rem; 
  min-width: 0;      
  padding: 0;         
  margin: 0;
  text-transform: none;
  color: #666;        
}
.link-button:hover {
  text-decoration: underline;
  color: #333;
}

 .move-button {
  font-size: xx-small;
  padding: 1px 2px;
  background-color: rgba(0,0,0,0.05);
  color: #555;
  text-transform: none;
  border-radius: 4px;
}

.move-button:hover {
  background-color: rgba(0, 0, 0, 0.1);
}

.edit-delete {
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.move-button,
.edit-button,
.delete-button {

  font-size: xx-small;
  padding: 1px 2px;
  background-color: rgba(0,0,0,0.05);
  text-transform: none;
  border-radius: 4px;
}

.edit-button:hover,
.delete-button:hover {
  background-color: rgba(0, 0, 0, 0.1);
}
.card-content {
  margin-bottom: 10px;
}

</style>
