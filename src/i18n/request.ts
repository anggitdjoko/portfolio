import { getRequestConfig } from 'next-intl/server';
import { defaultLocale } from './settings';

export default getRequestConfig(async () => {
    return {
        locale: defaultLocale,
        messages: {},
        timeZone: 'Asia/Jakarta'
    };
});
