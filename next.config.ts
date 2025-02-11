import { NextConfig } from 'next'

const nextConfig: NextConfig = {
  env: {
    SANITY_API_TOKEN: process.env.SANITY_API_TOKEN,
  },
}

export default nextConfig
