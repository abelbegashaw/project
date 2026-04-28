'use client'

import { useState, useCallback } from 'react'

interface FilterConfig<T> {
  initialValues: T
  onFilterChange?: (filters: T) => void
}

export function useFilters<T extends Record<string, any>>({ 
  initialValues, 
  onFilterChange 
}: FilterConfig<T>) {
  const [filters, setFilters] = useState<T>(initialValues)

  const updateFilter = useCallback(<K extends keyof T>(key: K, value: T[K]) => {
    setFilters(prev => {
      const newFilters = { ...prev, [key]: value }
      onFilterChange?.(newFilters)
      return newFilters
    })
  }, [onFilterChange])

  const resetFilters = useCallback(() => {
    setFilters(initialValues)
    onFilterChange?.(initialValues)
  }, [initialValues, onFilterChange])

  return {
    filters,
    updateFilter,
    resetFilters,
  }
}