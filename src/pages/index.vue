<template>
  <v-container>
    <StateLoading />
    <StateError @retry="console.log('retry diklik')" />
    <StateEmpty />
  </v-container>
</template>

<script lang="ts" setup>
  //
</script>
