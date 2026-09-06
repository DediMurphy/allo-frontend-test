import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

import { ApiError } from '@/services/http'
import { fetchRockets } from '@/services/rockets'

import type { NewRocketInput, Rocket } from '@/types/rocket'

export type RequestStatus = 'idle' | 'loading' | 'success' | 'error'

export const useRocketStore = defineStore('rockets', () => {

    const apiRockets = ref<Rocket[]>([])
    const customRockets = ref<Rocket[]>([])
    const status = ref<RequestStatus>('idle')
    const errorMessage = ref<string | null>(null)
    const filterQuery = ref('')

    let customCount = 0

    const rockets = computed(() => [...customRockets.value, ...apiRockets.value])

    const filteredRockets = computed(() => {
        const query = filterQuery.value.trim().toLowerCase()

        if (!query) {
            return rockets.value
        }

        return rockets.value.filter(rocket => rocket.name.toLowerCase().includes(query))
    })

    const isEmpty = computed(() => status.value === 'success' && filteredRockets.value.length === 0)

    function getRocketById (id: string): Rocket | undefined {
        return rockets.value.find(rocket => rocket.id === id)
    }

    async function loadRockets (force= false): Promise<void> {
        if (status.value === 'loading') {
            return
        }

        if (!force && status.value === 'success') {
            return
        }

        status.value = 'loading'
        errorMessage.value = null

        try {
            apiRockets.value = await fetchRockets()
            status.value = 'success'            
        } catch (error) {
            apiRockets.value = []

            errorMessage.value = error instanceof ApiError
                ? error.message
                : 'Something went wrong while loading rockets.'

            status.value = 'error'
        }
    }

    function addRocket (input: NewRocketInput): Rocket {
        customCount += 1

        const rocket: Rocket = {
            id: `custom-${customCount}`,   
            name: input.name,
            description: input.description,
            imageUrl: input.imageUrl,           
            launchCost: null,
            countryCode: null,
            maidenFlight: null,

            isCustom: true,   
        }

        customRockets.value.unshift(rocket)
        return rocket
    }

    function setFilter (query: string): void {
        filterQuery.value = query
    }


      return {
    status,
    errorMessage,
    filterQuery,
    rockets,
    filteredRockets,
    isEmpty,
    getRocketById,
    loadRockets,
    addRocket,
    setFilter,
  }
})