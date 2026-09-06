import { get } from './http'

// Types
import type { LauncherConfig, PaginatedResponse, Rocket } from '@/types/rocket'

const LIST_PARAMS = {
    manufacturer__name: 'SpaceX',
    mode: 'detailed',
    limit: '20',
}

export function toRocket (config: LauncherConfig): Rocket {
    return {
        id: String(config.id),
        name: config.full_name || config.name,
        description: config.description,
        imageUrl: config.image_url,
        launchCost: config.launch_cost,
        countryCode: config.manufacturer.country_code,
        maidenFlight: config.maiden_flight,
        isCustom: false,
    }
}

export async function fetchRockets (): Promise<Rocket[]> {
    const data = await get<PaginatedResponse<LauncherConfig>>('/config/launcher/', LIST_PARAMS)
    return data.results.map(toRocket)
}

export async function fetchRocketById (id: string): Promise<Rocket> {
  const config = await get<LauncherConfig>(`/config/launcher/${id}/`)
  return toRocket(config)
}