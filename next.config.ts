import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Lets the dev server answer when opened from a phone at m4-pro.local:3000
  allowedDevOrigins: ['m4-pro.local'],
  images: {
    // Object form, not `new URL()`: that sets `search: ''`, which rejects Gravatar's query string
    remotePatterns: [{ protocol: 'https', hostname: 'gravatar.com', pathname: '/avatar/**' }],
  },
}

export default nextConfig
