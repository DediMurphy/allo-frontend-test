<template>
  <v-container class="py-8">
    <v-btn
      class="mb-6"
      prepend-icon="mdi-arrow-left"
      to="/"
      variant="text"
    >
      Back to rockets
    </v-btn>

    <StateLoading
      v-if="isLoading"
      message="Loading rocket…"
    />

    <StateError
      v-else-if="status === 'error'"
      :message="errorMessage"
      :show-retry="isRetryable"
      title="Could not load this rocket"
      @retry="load"
    />

    <v-row v-else-if="rocket">
      <v-col
        cols="12"
        md="5"
      >
        <v-img
          v-if="imageSrc"
          class="rounded-lg"
          cover
          :src="imageSrc"
          @error="hasImageFailed = true"
        />
        <div
          v-else
          class="d-flex align-center justify-center bg-surface-light rounded-lg rocket-detail__fallback"
        >
          <v-icon
            color="medium-emphasis"
            icon="mdi-rocket-launch-outline"
            size="72"
          />
        </div>
      </v-col>

      <v-col
        cols="12"
        md="7"
      >
        <div class="d-flex align-center ga-3 mb-2">
          <h1 class="text-h5 font-weight-bold">
            {{ rocket.name }}
          </h1>
          <v-chip
            v-if="rocket.isCustom"
            color="primary"
            size="small"
            variant="tonal"
          >
            Added by you
          </v-chip>
        </div>

        <p class="text-body-1 text-medium-emphasis mb-6">
          {{ formatText(rocket.description) }}
        </p>

        <v-divider class="mb-4" />

        <v-row dense>
          <v-col
            v-for="fact in facts"
            :key="fact.label"
            cols="12"
            sm="4"
          >
            <p class="text-caption text-medium-emphasis">
              {{ fact.label }}
            </p>
            <p class="text-body-1 font-weight-medium">
              {{ fact.value }}
            </p>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
  import { computed, onMounted, ref } from 'vue'
  import { useRoute } from 'vue-router'

  import { useRocketsStore } from '@/stores/rockets'

  import { ApiError } from '@/services/http'
  import { fetchRocketById } from '@/services/rockets'
  import { formatCurrency, formatDate, formatText } from '@/utils/format'

  import type { RequestStatus } from '@/stores/rockets'
  import type { Rocket } from '@/types/rocket'

  const route = useRoute()
  const store = useRocketsStore()

  const rocketId = computed(() => String(route.params.id))

  const rocket = ref<Rocket | null>(null)
  const status = ref<RequestStatus>('idle')
  const errorMessage = ref<string | null>(null)
  const isRetryable = ref(true)
  const hasImageFailed = ref(false)

  const isLoading = computed(() => status.value === 'idle' || status.value === 'loading')

  const imageSrc = computed(() => {
    if (hasImageFailed.value || !rocket.value?.imageUrl) {
      return null
    }
    return rocket.value.imageUrl
  })

  const facts = computed(() => [
    { label: 'Cost per launch', value: formatCurrency(rocket.value?.launchCost) },
    { label: 'Country', value: formatText(rocket.value?.countryCode) },
    { label: 'First flight', value: formatDate(rocket.value?.maidenFlight) },
  ])

  async function load (): Promise<void> {
    hasImageFailed.value = false

    const fromStore = store.getRocketById(rocketId.value)
    if (fromStore) {
      rocket.value = fromStore
      status.value = 'success'
      return
    }
    if (rocketId.value.startsWith('custom-')) {
      errorMessage.value = 'This rocket was added in a previous session and is no longer available.'
      isRetryable.value = false
      status.value = 'error'
      return
    }

    status.value = 'loading'
    errorMessage.value = null

    try {
      rocket.value = await fetchRocketById(rocketId.value)
      status.value = 'success'
    } catch (error) {
      const isApiError = error instanceof ApiError
      errorMessage.value = isApiError
        ? error.message
        : 'Something went wrong while loading this rocket.'
      isRetryable.value = !isApiError || error.status !== 404
      status.value = 'error'
    }
  }

  onMounted(load)
</script>

<style scoped>
  .rocket-detail__fallback {
    aspect-ratio: 4 / 3;
  }
</style>