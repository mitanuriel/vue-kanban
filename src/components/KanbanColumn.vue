<template>
 
 <div class="kanban-column">
    <v-card class="column-wrapper" elevation="2">
      <v-card-title class="column-title">{{ title }}</v-card-title>

      <v-card-text class="column-content">
        <VueDraggable 
          v-model="localCards"
          group="kanban"
          :animation="150"
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
         Add a card...
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
 .draggable-placeholder {
  background: #ccc;
  border: 1px dashed #999;
  height: 80px; 
  margin-bottom: 10px;
}

</style>
