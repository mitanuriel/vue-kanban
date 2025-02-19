<template>
  <v-container fluid>
    <v-row class="kanban-board">
      <v-col v-for="column in columns" :key="column.id" cols="4" class="kanban-column">
        <KanbanColumn
          :title="column.title"
          :status="column.status"
          :cards="cards.filter(card => card.status === column.status)"
          @move-card="moveCard"
          @delete-card="deleteCard"
          @edit-card="editCard"
          @add-card="addCard(column.status)"
        />
      </v-col>
    </v-row>

    <!-- New card button -->
    <v-btn class="mt-4 add-card-btn" color="primary" @click="addCard('todo')">
      Add New Card
    </v-btn>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from "vue";
import KanbanColumn from "@/components/KanbanColumn.vue";

const columns = ref([
  { id: 1, title: "To do", status: "todo" },
  { id: 2, title: "In Progress", status: "in-progress" },
  { id: 3, title: "Done", status: "done" },
]);

const cards = ref([
  { id: 1, status: "todo" },
  { id: 2, status: "in-progress" },
]);

const addCard = (status: string) => {
  cards.value.push({ id: Date.now(), status });
};

const moveCard = (cardId: number, newStatus: string) => {
  const card = cards.value.find((c) => c.id === cardId);
  if (card) card.status = newStatus;
};

const deleteCard = (cardId: number) => {
  cards.value = cards.value.filter((card) => card.id !== cardId);
};

const editCard = (cardId: number) => {
  // Editing functionality if needed
};
</script>

<style scoped>
.kanban-board {
  display: flex;
  gap: 20px;
  justify-content: space-around;
  padding: 20px;
}

.kanban-column {
  flex: 1;
  min-width: 250px;
}

.add-card-btn {
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 16px;
  font-weight: bold;
  background-color: #4caf50 !important;
  color: white !important;
  border-radius: 6px;
  transition: 0.3s ease-in-out;
}

.add-card-btn:hover {
  background-color: #388e3c !important;
}
</style>
