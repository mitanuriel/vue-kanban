<template>
 
 <div class="kanban-column">
    <v-card class="column-wrapper" elevation="0">
      <v-card-title class="column-title">{{ title }}</v-card-title>

      <v-card-text class="column-content">
        <VueDraggable 
          v-model="localCards"
          group="kanban"
          :animation="200"
          class="draggable-area"
        >
          <KanbanCard
            v-for="element in localCards"
            :card="element"
            :key="element.id"
            @move-card="onMoveCard"
            @delete-card="onDeleteCard"
            @edit-card="onEditCard"
            @view-description="onViewDescription"
          />
        </VueDraggable>

       <div class="add-card-placeholder" @click="$emit('add-card')">
         <span class="add-icon">+</span> Add a card
       </div>
     </v-card-text>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, nextTick } from 'vue';
import KanbanCard from '@/components/KanbanCard.vue';
import { VueDraggable } from 'vue-draggable-plus';

//props from KanbanBoard
const props = defineProps<{
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

// Create a local reactive copy for dragging
const localCards = ref([...props.cards]);
let isUpdatingFromParent = false;

// Watch for changes from parent and update local copy
watch(() => props.cards, (newCards) => {
  isUpdatingFromParent = true;
  localCards.value = [...newCards];
  nextTick(() => {
    isUpdatingFromParent = false;
  });
}, { deep: true });

// Watch for local changes and emit to parent
watch(localCards, (newLocalCards, oldLocalCards) => {
  // Skip if update came from parent
  if (isUpdatingFromParent) {
    return;
  }
  
  // Check if a card was added (moved from another column)
  const addedCard = newLocalCards.find(newCard => 
    !oldLocalCards.some(oldCard => oldCard.id === newCard.id)
  );
  
  if (addedCard) {
    emit('move-card', addedCard.id, props.status);
  }
}, { deep: true });

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
  width: 100%;
  min-height: 500px;
  transition: transform 0.2s ease;
}

.column-wrapper {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 0;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.18);
  transition: all 0.3s ease;
  overflow: hidden;
}

.column-wrapper:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 48px rgba(0, 0, 0, 0.15);
}

.column-title {
  font-weight: 700;
  font-size: 1.1rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 20px;
  text-align: center;
  border-radius: 0;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  font-size: 0.95rem;
}

.column-content {
  padding: 16px;
  min-height: 400px;
  background: transparent;
}

.draggable-area {
  min-height: 350px;
}

.add-card-placeholder {
  color: #718096;
  cursor: pointer;
  padding: 16px;
  margin-top: 12px;
  border-radius: 12px;
  transition: all 0.2s ease;
  text-align: center;
  border: 2px dashed #cbd5e0;
  background: rgba(255, 255, 255, 0.5);
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.add-card-placeholder:hover {
  background: rgba(102, 126, 234, 0.1);
  border-color: #667eea;
  color: #667eea;
  transform: translateY(-2px);
}

.add-icon {
  font-size: 1.5rem;
  font-weight: 600;
}
</style>
