'use client';

import en from '../../messages/en.json';

type Messages = typeof en;

function getNestedValue(obj: any, path: string): string {
    return path.split('.').reduce((acc, part) => {
        if (acc && typeof acc === 'object') {
            return acc[part];
        }
        return undefined;
    }, obj) as string;
}

export function useTranslations(namespace?: string) {
    return function t(key: string): string {
        const fullKey = namespace ? `${namespace}.${key}` : key;
        const value = getNestedValue(en, fullKey);
        return value ?? fullKey;
    };
}

export function useLocale() {
    return 'en';
}
