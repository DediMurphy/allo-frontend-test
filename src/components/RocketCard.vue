<template>
  <v-card
    class="d-flex flex-column h-100"
    :to="`/rockets/${rocket.id}`"
  >
    <v-img
      v-if="imageSrc"
      cover
      height="200"
      :src="imageSrc"
      @error="hasImageFailed = true"
    >
      <template #placeholder>
        <div class="d-flex align-center justify-center fill-height">
          <v-progress-circular
            color="grey-lighten-1"
            indeterminate
          />
        </div>
      </template>
    </v-img>

    <div
      v-else
      class="d-flex align-center justify-center bg-surface-light rocket-card__fallback"
    >
      <v-icon
        color="medium-emphasis"
        icon="mdi-rocket-launch-outline"
        size="56"
      />
    </div>

    <v-card-item>
      <v-card-title class="text-wrap text-body-1 font-weight-bold">
        {{ rocket.name }}
      </v-card-title>
      <template
        v-if="rocket.isCustom"
        #append
      >
        <v-chip
          color="primary"
          size="small"
          variant="tonal"
        >
          Added by you
        </v-chip>
      </template>
    </v-card-item>

    <v-card-text class="flex-grow-1">
      <p class="rocket-card__description text-medium-emphasis">
        {{ formatText(rocket.description) }}
      </p>
    </v-card-text>
  </v-card>
</template>

<script lang="ts" setup>

  import { computed, ref } from 'vue'

  import { formatText } from '@/utils/format'

  import type { Rocket } from '@/types/rocket'

  const props = defineProps<{ rocket: Rocket }>()

  const hasImageFailed = ref(false)

  const imageSrc = computed(() => {
    if (hasImageFailed.value || !props.rocket.imageUrl) {
      return null
    }
    return props.rocket.imageUrl
  })
</script>

<style scoped>
  .rocket-card__fallback {
    height: 200px;
  }

  .rocket-card__description {
    display: -webkit-box;
    overflow: hidden;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    line-clamp: 3;
  }
</style>