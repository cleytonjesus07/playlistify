/** @type {import('next').NextConfig} */


const nextConfig = {
    env: {
        SUPABASE_URL: process.env.SUPABASE_URL,
        SUPABASE_KEY: process.env.SUPABASE_KEY
    },
    images: {
        domains: ["atlmqrmxvbjwuynpckpz.supabase.co"]
    }
}

module.exports = nextConfig;
