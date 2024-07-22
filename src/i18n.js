import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';
import { lang } from './locales';

export default getRequestConfig(async ({ locale }) => {
    // Validate that the incoming `locale` parameter is valid
    if (!lang.locales.includes(locale)) notFound();

    return {
        messages: (await import(`../messages/${locale}.json`)).default
    };
});