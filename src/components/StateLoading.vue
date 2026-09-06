<template>
  <div class="d-flex flex-column align-center justify-center py-16 text-center">
    <v-progress-circular
      color="primary"
      indeterminate
      size="48"
    />
    <p class="text-body-2 text-medium-emphasis mt-4">
      {{ message }}
    </p>
  </div>
</template>

<script lang="ts" setup>
  withDefaults(defineProps<{ message?: string }>(), {
    message: 'Loading rockets…',
  })
</script>