import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
    compress: true,
    optimizeFonts: true,
    images: {
        remotePatterns: [
            {
                hostname: "*"
            }
        ],
    },
    env: {
        supabaseUrl: process.env.supabase_url,
        supabaseKey: process.env.supabase_key
    }
};

export default withNextIntl(nextConfig);