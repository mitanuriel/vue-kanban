<template>
  <v-card class="kanban-card" elevation="0">
    <div class="card-header">
      <div class="drag-handle">⋮⋮</div>
      <h3 class="card-title">{{ props.card.title }}</h3>
    </div>

    <p class="card-description">
      {{ props.card.description }}
    </p>

    <v-card-actions class="card-actions">
      <div class="action-buttons">
        <v-btn
          v-for="option in moveOptions"
          :key="option.status"
          variant="text" 
          size="x-small"
          class="action-btn move-btn"
          @click="moveCard(option.status)"
        >
          → {{ option.title }}
        </v-btn>
      </div>
      
      <v-spacer></v-spacer>
      
      <div class="utility-buttons"> 
        <v-btn
          variant="text"
          size="x-small"
          class="action-btn"
          @click="onViewDescription"
          title="View"
        >
          View
        </v-btn>
        <v-btn
          variant="text"
          size="x-small"
          class="action-btn"
          @click="onEditCard"
          title="Edit"
        >
          Edit
        </v-btn>
        <v-btn
          variant="text"
          size="x-small"
          class="action-btn delete-btn"
          @click="onDeleteCard"
          title="Delete"
        >
          Delete
        </v-btn>
      </div>
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  card: { id: number; title: string; description: string; status: string };
}>();

const emit = defineEmits<{
(event: 'move-card', cardId: number, newStatus: string): void;
(event: 'delete-card', cardId: number): void;
(event: 'edit-card', cardId: number): void;
(event: 'view-description', cardId: number): void;
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

function onViewDescription(){
  emit('view-description', props.card.id);
}

</script>

<style scoped>
.kanban-card {
  background: white;
  padding: 16px;
  border-radius: 12px;
  border: 1px solid rgba(203, 213, 224, 0.5);
  margin-bottom: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  position: relative;
  cursor: move;
  transition: all 0.2s ease;
}

.kanban-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(102, 126, 234, 0.2);
  border-color: rgba(102, 126, 234, 0.3);
}

.card-header {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  margin-bottom: 12px;
}

.card-title {
  flex: 1;
  font-size: 1rem;
  font-weight: 600;
  color: #2d3748;
  margin: 0;
  line-height: 1.4;
  word-wrap: break-word;
}

.card-description {
  font-size: 0.875rem;
  color: #718096;
  margin: 0 0 16px 0;
  line-height: 1.5;
  word-wrap: break-word;
}

.card-actions {
  display: flex;
  align-items: center;
  padding: 8px 0 0 0;
  border-top: 1px solid rgba(203, 213, 224, 0.3);
  gap: 8px;
}

.action-buttons,
.utility-buttons {
  display: flex;
  gap: 4px;
  flex-wrap: wrap;
}

.action-btn {
  font-size: 0.75rem;
  min-width: 0;
  padding: 4px 8px;
  text-transform: none;
  color: #718096;
  border-radius: 6px;
  transition: all 0.2s ease;
}

.action-btn:hover {
  background-color: rgba(102, 126, 234, 0.1);
  color: #667eea;
}

.move-btn {
  font-weight: 500;
}

.delete-btn:hover {
  background-color: rgba(245, 101, 101, 0.1);
  color: #f56565;
}

.drag-handle {
  font-size: 1rem;
  color: #cbd5e0;
  cursor: grab;
  user-select: none;
  letter-spacing: -2px;
  transition: color 0.2s ease;
  padding: 2px;
}

.drag-handle:hover {
  color: #667eea;
}

.drag-handle:active {
  cursor: grabbing;
}
</style>
