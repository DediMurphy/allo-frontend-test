const BASE_URL = 'https://lldev.thespacedevs.com/2.2.0'

export class ApiError extends Error {
    readonly status: number

    constructor(message: string, status = 0) {
        super(message)
        this.name = "ApiError"
        this.status = status
    }
}

function messageForStatus (status: number): string {
    if (status === 404) {
        return 'Rocket not found'
    }
    if (status === 429) {
        return 'Too many requests, please try again later'
    }
    if (status >= 500) {
        return 'The space data server is having trouble. Please try again.'
    }
    return `Request failed with status ${status}.`
}

export async function get<T> (path: string, params: Record<string, string> = {}): Promise<T> {
    const url = new URL(`${BASE_URL}${path}`)
    for (const[key, value] of Object.entries(params)) {
        url.searchParams.set(key, value)
    }

    let response: Response
    try {
        response = await fetch(url)
    } catch {
        throw new ApiError('Network error, please check your connection and try again.')
    }

    if (!response.ok) {
        throw new ApiError(messageForStatus(response.status), response.status)
    }

    return await response.json() as T
}