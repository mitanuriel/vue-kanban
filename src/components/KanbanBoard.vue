<template>
  <v-container fluid>
    <v-row class="kanban-board">
      <v-col 
      v-for="column in columns" 
      :key="column.id" 
      cols="auto" 
      class="kanban-column"
      >
        <KanbanColumn
          :title="column.title"
          :status="column.status"
          :cards="cards.filter(card => card.status === column.status)"
          @move-card="moveCard"
          @delete-card="deleteCard"
          @edit-card="editCard"
          @add-card="() => addCard(column.status)"
        />
      </v-col>
    </v-row>

    <v-dialog v-model="isEditDialogOpen" >
     <v-card>
       <v-card-title>Edit Card</v-card-title>
         <v-card-text>
           <v-text-field
               v-model="editForm.title"
                label="Title"
           ></v-text-field>
           <v-textarea
              v-model="editForm.description"
               label="Description"
         ></v-textarea>
         </v-card-text>
         <v-card-actions>
            <v-btn color="primary" @click="saveEdit">Save</v-btn>
             <v-btn variant="text" @click="isEditDialogOpen = false">Cancel</v-btn>
         </v-card-actions>
      </v-card>
    </v-dialog>
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
{ id: 1, title: "My first task", description: " Some details...", status: "todo" },
{ id: 2, title: "Another task", description: " Some other details...", status: "in-progress" },
]);

//edit button form state
const isEditDialogOpen = ref(false);
const selectedCardId = ref<number | null>(null);
const editForm = ref({title: "", description: ""});



function moveCard(cardId: number, newStatus: string) {
 const card = cards.value.find((c) => c.id === cardId);
 if (card) {
    card.status = newStatus;
  }
}

function addCard(status: string) {
  // In a real app, you'd show a dialog or form to set title/description
 cards.value.push({
   id: Date.now(),
   title: "New Task",
   description: "Task details...",
   status
 });
}

const deleteCard = (cardId: number) => {
  cards.value = cards.value.filter((card) => card.id !== cardId);
};

//const editCard = (cardId: number) => {}

function editCard(cardId:number) {
  const card = cards.value.find (c => c.id === cardId);
  if(card) {
    selectedCardId.value = cardId;
    editForm.value.title = card.title;
    editForm.value.description = card.description;
    isEditDialogOpen.value = true;
  }
}

function saveEdit(){
  if(selectedCardId.value != null) {
    const card = cards.value.find(c => c.id === selectedCardId.value);
    if(card) {
      card.title = editForm.value.title;
      card.description = editForm.value.description;
    }
  }
  isEditDialogOpen.value = false;
}
  
;
</script>

<style scoped>
.kanban-board {
  display: flex;
  gap: 20px;
  justify-content: start;
  padding: 20px;
}

.kanban-column {
  flex: 1;
  min-width: 250px;
  margin: 0 10px;
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
