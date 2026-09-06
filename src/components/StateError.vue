<template>
  <div class="d-flex flex-column align-center justify-center py-16 text-center">
    <v-icon
      color="error"
      icon="mdi-alert-circle-outline"
      size="48"
    />
    <h2 class="text-h6 mt-4">
      {{ title }}
    </h2>
    <p class="text-body-2 text-medium-emphasis mt-2">
      {{ message }}
    </p>
    <v-btn
      v-if="showRetry"
      class="mt-6"
      color="primary"
      prepend-icon="mdi-refresh"
      variant="flat"
      @click="emit('retry')"
    >
      Retry
    </v-btn>
  </div>
</template>

<script lang="ts" setup>
  withDefaults(defineProps<{
    title?: string
    message?: string | null
    showRetry?: boolean
  }>(), {
    title: 'Something went wrong',
    message: 'We could not load the data. Please try again.',
    showRetry: true,
  })

  const emit = defineEmits<{ retry: [] }>()
</script>