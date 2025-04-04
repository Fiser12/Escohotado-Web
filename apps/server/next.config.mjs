import { withSentryConfig } from '@sentry/nextjs'
import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Your Next.js config here
  experimental: {
    reactCompiler: true,
    viewTransition: true
  },
  output: "standalone",
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.ytimg.com',
        port: '',
        pathname: '/vi/**',
        search: '',
      },
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'foro.laemboscadura.com',
        pathname: '/assets/**',
        search: '**'
      },
    ],
  },
  rewrites: async () => {
    return [
      {
        source: '/assets/:path*',
        destination: 'https://foro.laemboscadura.com/assets/:path*'
      }
    ]
  }
}

const sentryConfig = {
  org: 'nexo-labs',
  project: 'escohotado',
  silent: !process.env.CI,
  widenClientFileUpload: true,
  reactComponentAnnotation: {
    enabled: true,
  },
  tunnelRoute: '/monitoring',
  hideSourceMaps: true,
  disableLogger: true,
  automaticVercelMonitors: true,
}

export default withSentryConfig(withPayload(nextConfig), sentryConfig)
