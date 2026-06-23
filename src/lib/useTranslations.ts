'use client';

import en from '../../messages/en.json';

function getNestedValue(obj: any, path: string): any {
    return path.split('.').reduce((acc, part) => {
        if (acc && typeof acc === 'object') {
            return acc[part];
        }
        return undefined;
    }, obj);
}

export function useTranslations(namespace?: string) {
    const translations = namespace ? getNestedValue(en, namespace) : en;
    
    return function t(key: string): string {
        if (Array.isArray(translations)) {
            const index = parseInt(key, 10);
            return translations[index] ?? key;
        }
        const value = translations?.[key];
        if (typeof value === 'string') return value;
        if (typeof value === 'object' && value !== null) return key;
        return value ?? key;
    };
}

export function useLocale() {
    return 'en';
}
