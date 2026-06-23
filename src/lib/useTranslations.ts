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
    const baseTranslations = namespace ? getNestedValue(en, namespace) : en;
    
    function t(key: string): string {
        if (Array.isArray(baseTranslations)) {
            const index = parseInt(key, 10);
            return baseTranslations[index] ?? key;
        }
        const value = getNestedValue(baseTranslations, key);
        if (typeof value === 'string') return value;
        if (Array.isArray(value)) return key;
        if (typeof value === 'object' && value !== null) return key;
        return value ?? key;
    }
    
    t.raw = function(key: string): any {
        if (Array.isArray(baseTranslations)) {
            const index = parseInt(key, 10);
            return baseTranslations[index] ?? key;
        }
        const value = getNestedValue(baseTranslations, key);
        return value ?? key;
    };
    
    return t;
}

export function useLocale() {
    return 'en';
}
