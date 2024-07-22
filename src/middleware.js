import createMiddleware from 'next-intl/middleware';
import { lang } from './locales';

export default createMiddleware({
    // A list of all locales that are supported
    locales: lang.locales,

    // Used when no locale matches
    defaultLocale: lang.defaultLocale,
});


export const config = {
    // Match only internationalized pathnames
    matcher: [
        // Match all pathnames except for
        // - … if they start with `/api`, `/_next` or `/_vercel`
        // - … the ones containing a dot (e.g. `favicon.ico`)
        '/((?!api|_next|_vercel|.*\\..*).*)'
    ]
};