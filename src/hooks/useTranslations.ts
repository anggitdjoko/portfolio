'use client';

// Simple translation hook for static export
export function useTranslations(namespace?: string) {
    return function t(key: string): string {
        // Return a human-readable version of the key
        const parts = key.split('.');
        return parts[parts.length - 1] || key;
    };
}
