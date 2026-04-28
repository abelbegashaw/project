import { type ClassValue, clsx } from 'clsx'

/**
 * Merge className strings with Tailwind CSS classes properly
 * Handles conditional classes and resolves Tailwind conflicts
 */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs)
}