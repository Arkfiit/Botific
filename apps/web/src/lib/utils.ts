import { type ClassValue, clsx } from 'clsx'

/**
 * Merge class names with clsx
 */
export function cn(...inputs: ClassValue[]) {
    return clsx(inputs)
}

/**
 * Format a number for display
 */
export function formatNumber(num: number): string {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M'
    }
    if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K'
    }
    return num.toString()
}

/**
 * Format duration from seconds to human readable
 */
export function formatDuration(seconds: number): string {
    if (seconds < 60) {
        return `${seconds}s`
    }
    if (seconds < 3600) {
        const mins = Math.floor(seconds / 60)
        const secs = seconds % 60
        return `${mins}m ${secs}s`
    }
    const hours = Math.floor(seconds / 3600)
    const mins = Math.floor((seconds % 3600) / 60)
    return `${hours}h ${mins}m`
}

/**
 * Format percentage
 */
export function formatPercent(value: number): string {
    return `${value.toFixed(1)}%`
}

/**
 * Format date relative to now
 */
export function formatRelativeTime(dateString: string): string {
    const date = new Date(dateString)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMs / 3600000)
    const diffDays = Math.floor(diffMs / 86400000)

    if (diffMins < 1) return 'Just now'
    if (diffMins < 60) return `${diffMins} min ago`
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`
    if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`

    return date.toLocaleDateString()
}

/**
 * Calculate change percentage
 */
export function calculateChange(current: number, previous: number): number {
    if (previous === 0) return 0
    return Math.round(((current - previous) / previous) * 100)
}

/**
 * Debounce function
 */
export function debounce<T extends (...args: any[]) => any>(
    func: T,
    wait: number
): (...args: Parameters<T>) => void {
    let timeout: NodeJS.Timeout | null = null

    return function executedFunction(...args: Parameters<T>) {
        if (timeout) {
            clearTimeout(timeout)
        }
        timeout = setTimeout(() => func(...args), wait)
    }
}

/**
 * Generate a random ID
 */
export function generateId(): string {
    return Math.random().toString(36).substring(2) + Date.now().toString(36)
}

/**
 * Sleep/delay utility
 */
export function sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms))
}
