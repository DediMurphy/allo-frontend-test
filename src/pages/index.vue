<template>
  <v-container class="py-8">
    <header class="mb-6">
      <h1 class="text-h5 font-weight-bold">
        SpaceX Rockets
      </h1>
      <p class="text-body-2 text-medium-emphasis">
        Launcher configurations from the Launch Library 2 API.
      </p>
    </header>

    <v-text-field
      class="mb-6"
      clearable
      density="comfortable"
      hide-details
      label="Filter by name"
      :model-value="store.filterQuery"
      prepend-inner-icon="mdi-magnify"
      variant="outlined"
      @update:model-value="store.setFilter($event ?? '')"
    />

    <StateLoading v-if="isLoading" />

    <StateError
      v-else-if="store.status === 'error'"
      :message="store.errorMessage"
      @retry="store.loadRockets(true)"
    />

    <StateEmpty
      v-else-if="store.isEmpty"
      message="No rocket matches that name."
    />

    <v-row v-else>
      <v-col
        v-for="rocket in store.filteredRockets"
        :key="rocket.id"
        cols="12"
        md="4"
        sm="6"
      >
        <RocketCard :rocket="rocket" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
  import { computed, onMounted } from 'vue'

  import { useRocketsStore } from '@/stores/rockets'

  const store = useRocketsStore()
  const isLoading = computed(() => store.status === 'idle' || store.status === 'loading')

  onMounted(() => {
    store.loadRockets()
  })
</script>