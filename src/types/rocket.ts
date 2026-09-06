export interface PaginatedResponse<T> {
    count: number;
    next: string | null;
    previous: string | null;
    results: T[];
}

export interface LauncherManufacturer {
    id: number;
    name: string;
    country_code: string;
}

export interface LauncherConfig {
    id: number;
    name: string;
    full_name: string;
    description: string;
    variant: string;
    family: string;
    manufacturer: LauncherManufacturer;
    image_url: string;
    launch_cost: number;
    maiden_flight: string;
}

export interface Rocket {
    id: string
    name: string
    description: string
    imageUrl: string | null
    launchCost: string | null
    countryCode: string | null
    maidenFlight: string | null
    isCustom: boolean
}

export type NewRocketInput = Pick<Rocket, 'name' | 'description' | 'imageUrl'>