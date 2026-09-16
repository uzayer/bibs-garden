import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Lets the dev server answer when opened from a phone at m4-pro.local:3000
  allowedDevOrigins: ['m4-pro.local'],
}

export default nextConfig
