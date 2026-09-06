export const FALLBACK_TEXT = 'Not available'

export function isBlank (value: string | null | undefined): boolean {
    return value === null || value === undefined || value.trim() === ''
}

export function formatText (value: string | null | undefined): string {
  return isBlank(value) ? FALLBACK_TEXT : (value as string).trim()
}

export function formatCurrency (value: string | null | undefined): string {
    if (isBlank(value)) {
        return FALLBACK_TEXT
    }

    const amount = Number(value)
    if (!Number.isFinite(amount)) {
        return FALLBACK_TEXT
    }

    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0,
    }).format(amount)
}   
    
export function formatDate (value: string | null | undefined): string {
  if (isBlank(value)) {
    return FALLBACK_TEXT
  }

  const match = /^(\d{4})-(\d{2})-(\d{2})/.exec(value as string)
  if (!match) {
    return FALLBACK_TEXT
  }

  const [, year, month, day] = match
  const date = new Date(Number(year), Number(month) - 1, Number(day))

  return new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date)
}