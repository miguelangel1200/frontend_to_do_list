<template>
  <VContainer>
    <VRow>
      <VCol>
        <VBtn icon="mdi-plus" @click="navigateTo('/formActivity')" class="mb-4">
          Add Activity
        </VBtn>
      </VCol>
    </VRow>
    <VRow>
      <VCol>
        <VTable>
          <thead>
            <tr>
              <th>Título</th>
              <th>Descripción</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <!-- Mostrar actividades -->
            <tr v-for="activity in activities" :key="activity.idactivities">
              <td>{{ activity.title }}</td>
              <td>{{ activity.description }}</td>
              <td>
                <span :class="getStatusClass(activity.state)" class="status-pill">
                  {{ activity.state }}
                </span>
              </td>
              <td>
                <VBtn icon="mdi-pencil" @click="editActivity(activity.idactivities)" />
                <VBtn icon="mdi-delete" @click="deleteActivity(activity.idactivities)" />
              </td>
            </tr>
          </tbody>
        </VTable>
      </VCol>
    </VRow>

    <!-- Modal para crear/editar actividad -->
    <VDialog v-model="modalVisible">
      <VCard>
        <VCardTitle>{{ isEditing ? 'Editar Actividad' : 'Nueva Actividad' }}</VCardTitle>
        <VCardText>
          <VForm ref="form">
            <VTextField v-model="formData.title" label="Título" />
            <VTextarea v-model="formData.description" label="Descripción" />
            <VSelect
              v-if="isEditing"
              v-model="formData.status"
              :items="statusOptions"
              label="Estado"
            />
          </VForm>
        </VCardText>
        <VCardActions>
          <VBtn @click="modalVisible = false">Cancelar</VBtn>
          <VBtn @click="submitForm">{{ isEditing ? 'Actualizar' : 'Guardar' }}</VBtn>
        </VCardActions>
      </VCard>
    </VDialog>
  </VContainer>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { useMyActivitiesStore } from '@/stores/activities'; // Asegúrate de que la ruta sea correcta
  import { storeToRefs } from 'pinia';

  const activitiesStore = useMyActivitiesStore(); // Cambia a 'useMyActivitiesStore'
  const { getActivities } = activitiesStore;

  const {activities} = storeToRefs(activitiesStore)



  const getStatusClass = (status: string) => {
  switch (status) {
    case 'PENDIENTE':
      return 'status-pending';
    case 'EN PROCESO':
      return 'status-in-progress';
    case 'CULMINADO':
      return 'status-completed';
    default:
      return '';
  }
}


  await getActivities(); 

  // Control de modal
  const modalVisible = ref(false);
  const isEditing = ref(false);
  const formData = ref({
    idactivities: null,
    title: '',
    description: '',
    status: 'Pendiente', // Default
  });

  const statusOptions = ['PENDIENTE', 'EN PROCESO', 'CULMINADO'];

  // Abrir el modal
  const openModal = (activity = null) => {
    modalVisible.value = true;
    if (activity) {
      isEditing.value = true;
      formData.value = { ...activity }; // Cargar datos en el formulario
    } else {
      isEditing.value = false;
      formData.value = { idactivities: null, title: '', description: '', status: 'Pendiente' };
    }
  };

  // Submit del formulario
  const submitForm = async () => {
    if (isEditing.value) {
      await activitiesStore.updateActivity(formData.value);
    } else {
      await activitiesStore.createActivity(formData.value);
    }
    modalVisible.value = false;
    await activitiesStore.getActivities();
  };

  // Eliminar actividad (cambia `activate` a 0)
  const deleteActivity = async (id: number) => {
    await activitiesStore.deleteActivity(id);
    await activitiesStore.getActivities();
  };
</script>

<style scoped>
.status-pill {
  padding: 0.5em 1em;
  border-radius: 20px;
  font-size: 0.9em;
  font-weight: bold;
  text-align: center;
  color: white;
}

.status-pending {
  background-color: yellow;
  color: black;
}

.status-in-progress {
  background-color: green;
  color: white;
}

.status-completed {
  background-color: gray;
  color: white;
}
</style>
