<template>
  <div class="d-flex flex-column align-center justify-center py-16 text-center">
    <v-icon
      color="medium-emphasis"
      icon="mdi-rocket-launch-outline"
      size="48"
    />
    <h2 class="text-h6 mt-4">
      {{ title }}
    </h2>
    <p class="text-body-2 text-medium-emphasis mt-2">
      {{ message }}
    </p>
  </div>
</template>

<script lang="ts" setup>
  withDefaults(defineProps<{
    title?: string
    message?: string
  }>(), {
    title: 'No rockets found',
    message: 'Try a different search term.',
  })
</script>