<template>
  <VAppBar>
    <template v-slot:title>
      CRUD TO DO LIST
    </template>
    <!-- Usamos un VSpacer para empujar los botones a la derecha -->
    <VSpacer />
    <!-- Botones alineados a la derecha con espacio entre ellos -->
    <VBtn to="/Activity" class="mx-2">Activities</VBtn>
    <VBtn to="/Users" class="mx-2">Users</VBtn>
  </VAppBar>
</template>

<script lang="ts" setup>
  // Aquí puedes agregar lógica si es necesario
</script>

<style scoped>
/* Puedes agregar más estilos aquí si lo deseas */
</style>
