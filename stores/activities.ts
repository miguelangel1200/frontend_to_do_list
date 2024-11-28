import { defineStore } from "pinia";

interface IState {
  activities: IActivity[];
  showForm: boolean;
}

export const useMyActivitiesStore = defineStore({
  id: "activities",
  state: (): IState => ({
    activities: [],
    showForm: false,
  }),
  actions: {
    // Obtener todas las actividades
    async getActivities() {
      try {
        const config = useRuntimeConfig();
        const apiUrl = `${config.public.URL}/activities`;

        const { data, error } = await useFetch(apiUrl);

        if (data.value) {
          this.activities = (data.value as any).activities;
        }
        if (error.value) {
          throw error.value;
        }
      } catch (error) {
        console.error("Error fetching activities: ", error);
      }
    },

    // Crear una nueva actividad
    async createActivity(activity: IActivity) {
      try {
        const config = useRuntimeConfig();
        const apiUrl = `${config.public.URL}/activities`;

        const { error } = await useFetch(apiUrl, {
          method: "POST",
          body: activity,
        });

        if (error.value) {
          throw error.value;
        }

        // Actualizar la lista de actividades después de crear
        await this.getActivities();
      } catch (error) {
        console.error("Error creating activity: ", error);
      }
    },

    // Actualizar una actividad existente
    async updateActivity(activity: IActivity) {
      try {
        const config = useRuntimeConfig();
        const apiUrl = `${config.public.URL}/activities/${activity.idactivities}`;

        const { error } = await useFetch(apiUrl, {
          method: "PUT",
          body: activity,
        });

        if (error.value) {
          throw error.value;
        }

        // Actualizar la lista de actividades después de actualizar
        await this.getActivities();
      } catch (error) {
        console.error("Error updating activity: ", error);
      }
    },

    // Eliminar una actividad (cambiar campo activate a 0)
    async deleteActivity(id: number) {
      try {
        const config = useRuntimeConfig();
        const apiUrl = `${config.public.URL}/activities/${id}`;

        const { error } = await useFetch(apiUrl, {
          method: "PUT",
          body: { activate: 0 },
        });

        if (error.value) {
          throw error.value;
        }

        // Actualizar la lista de actividades después de eliminar
        await this.getActivities();
      } catch (error) {
        console.error("Error deleting activity: ", error);
      }
    },
  },
});
