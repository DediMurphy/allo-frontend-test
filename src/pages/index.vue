<template>
  <v-container>
    <v-row>
      <v-col
        cols="12"
        md="4"
        sm="6"
      >
        <RocketCard :rocket="sample" />
      </v-col>
      <v-col
        cols="12"
        md="4"
        sm="6"
      >
        <RocketCard :rocket="noImage" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
  import type { Rocket } from '@/types/rocket'

  const sample: Rocket = {
    id: '164',
    name: 'Falcon 9 Block 5',
    description: 'Falcon 9 is a two-stage rocket designed and manufactured by SpaceX for the reliable and safe transport of satellites and the Dragon spacecraft into orbit.',
    imageUrl: 'https://thespacedevs-prod.nyc3.digitaloceanspaces.com/media/images/falcon_9_image_20230807133459.jpeg',
    launchCost: '52000000',
    countryCode: 'USA',
    maidenFlight: '2018-05-11',
    isCustom: false,
  }

  const noImage: Rocket = {
    id: 'custom-1',
    name: 'Roket Buatan Saya',
    description: '',
    imageUrl: null,
    launchCost: null,
    countryCode: null,
    maidenFlight: null,
    isCustom: true,
  }
</script>