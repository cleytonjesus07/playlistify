/** @type {import('next').NextConfig} */


const nextConfig = {
    env: {
        SUPABASE_URL: "https://atlmqrmxvbjwuynpckpz.supabase.co",
        SUPABASE_KEY: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF0bG1xcm14dmJqd3V5bnBja3B6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTYyNzkxNzksImV4cCI6MjAxMTg1NTE3OX0.O46CNkNZJ-S1iCXtnJj1t6ZiA8WngXQtxfWkf6thyZs"
    },
    images: {
        domains: ["atlmqrmxvbjwuynpckpz.supabase.co"]
    }
}

module.exports = nextConfig;
