<template>
  <v-container fluid>

    <v-row class="kanban-board" justify="space-around">
      <v-col 
      v-for="column in columns" 
      :key="column.id" 
      cols="3"
      class="kanban-column"
      >
      
        <KanbanColumn
      :title="column.title"
      :status="column.status"
      :cards="cards.filter(card => card.status === column.status)"
      @move-card="moveCard"
      @delete-card="deleteCard"
      @edit-card="editCard"
    /> 
     
  </v-col>
</v-row>


<v-row justify="center" class="mt-4">
  <v-col cols="12" class="text-center">
  <v-btn class="add-card-btn" color="primary" @click="showAddDialog= true">
    Add New Card
  </v-btn>
</v-col>
</v-row>

    <v-dialog v-model="showAddDialog" max-width="500px">
      <v-container> 
      <v-card>
        <v-card-title class="text-center"> 
          {{ editingCard ? 'Edit Card' : 'Add New Card' }}
        </v-card-title>
        <v-card-text>
          <v-text-field v-model="cardTitle" label="Title"></v-text-field>
          <v-textarea v-model="cardDescription" label="Description"></v-textarea>
          <v-select v-model="cardStatus" :items="columns.map(c => c.status)" label="Status"></v-select>
        </v-card-text>
        <v-card-actions class="justify-end">
          <v-btn variant="text" @click="showAddDialog = false">Cancel</v-btn>
          <v-btn color="primary" @click="saveCard">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-container>
    </v-dialog>
  </v-container>
</template>


<script setup lang="ts">
import { ref } from 'vue';
import KanbanColumn from '@/components/KanbanColumn.vue';

const columns = ref ( [
  {id: 1, title: 'To do', status:'todo'},
  {id: 2, title:'In Progress', status: 'in-progress' },
  {id: 3, title: 'Done', status: "done"},

]);

//sample cards

const cards = ref ( [
  {id: 1, title: 'First task', description:'This is a test stask',status: 'todo'},
  {id:2, title: 'Second task', description: 'Another task in progress', status: 'in-progress'},

]);
const showAddDialog = ref(false);
const cardTitle = ref('');
const cardDescription = ref('');
const cardStatus = ref('todo');
const editingCard = ref<number | null>(null);

//function to move cards between columns

const moveCard = (cardId: number, newStatus: string) => {
  const card = cards.value.find(c => c.id === cardId);
  if(card) card.status = newStatus;

};
//function to delete cards

const deleteCard = (cardId: number) => {
  cards.value = cards.value.filter(card => card.id !== cardId);
};

//fuction to edit cards
const editCard = (cardId: number) => {
  const card = cards.value.find(c => c.id === cardId);
  if (card) {
    cardTitle.value = card.title;
    cardDescription.value = card.description;
    cardStatus.value = card.status;
    editingCard.value = cardId;
    showAddDialog.value = true;
  }
};

const saveCard = () => {
  if (editingCard.value !== null) {
    // Editing an existing card
    const card = cards.value.find(c => c.id === editingCard.value);
    if (card) {
      card.title = cardTitle.value;
      card.description = cardDescription.value;
      card.status = cardStatus.value;
    }
  } else {
    // Adding a new card
    cards.value.push({
      id: Date.now(),
      title: cardTitle.value,
      description: cardDescription.value,
      status: cardStatus.value,
    });
  }

  cardTitle.value = '';
  cardDescription.value = '';
  cardStatus.value = 'todo';
  editingCard.value = null;
  showAddDialog.value = false;
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
  background-color: #4CAF50 !important;
  color: white !important;
  border-radius: 6px;
  transition: 0.3s ease-in-out;
}

.add-card-btn:hover {
  background-color: #388E3C !important;
}
</style>

