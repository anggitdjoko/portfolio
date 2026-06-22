'use client';

// Simple translation hook - returns the key as fallback
export function useTranslations(namespace?: string) {
    return function t(key: string): string {
        // Return a human-readable version of the key
        return key.split('.').pop() || key;
    };
}
