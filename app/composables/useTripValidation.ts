// composables/useTripValidation.ts
import type { FormError } from '@nuxt/ui'

export type TripState = {
  churchName: string
  location: string[]
  startDate: string   // "YYYY-MM-DD"
  endDate: string     // "YYYY-MM-DD"
  description: string
  groupSize: number
  title: string
}

export function useTripValidation() {
  const validate = (s: TripState): FormError[] => {
    const errors: FormError[] = []

    if (!s.location || s.location.length === 0) {
      errors.push({ name: 'location', message: 'Required' })
    }
    if (!s.startDate) errors.push({ name: 'startDate', message: 'Required' })
    if (!s.endDate) errors.push({ name: 'endDate', message: 'Required' })
    if (!s.description) errors.push({ name: 'description', message: 'Required' })
    if (!s.groupSize || Number(s.groupSize) < 1) {
      errors.push({ name: 'groupSize', message: 'Must be at least 1' })
    }

    // Date rules (day-level)
    if (s.startDate) {
      const start = new Date(s.startDate)
      const startDay = new Date(start.getFullYear(), start.getMonth(), start.getDate())
      const now = new Date()
      const yesterday = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1)
      if (startDay < yesterday) {
        errors.push({ name: 'startDate', message: 'Start date cannot be in the past' })
      }
    }

    if (s.startDate && s.endDate) {
      const start = new Date(s.startDate)
      const end = new Date(s.endDate)
      const startDay = new Date(start.getFullYear(), start.getMonth(), start.getDate())
      const endDay = new Date(end.getFullYear(), end.getMonth(), end.getDate())
      if (endDay < startDay) {
        errors.push({ name: 'endDate', message: 'End date cannot be before start date' })
      }
    }

    return errors
  }

  // If you want to bind :min on <input type="date">
  const todayISO = new Date().toISOString().slice(0, 10) // "YYYY-MM-DD"

  return { validate, todayISO }
}