/* THIS FILE WAS GENERATED AUTOMATICALLY BY PAYLOAD. */
import type { Metadata } from 'next'

import config from '@payload-config'
/* DO NOT MODIFY IT BECAUSE IT COULD BE REWRITTEN AT ANY TIME. */
import { NotFoundPage, generatePageMetadata } from '@payloadcms/next/views'
import { importMap } from '../importMap'

type Args = {
  params: {
    segments: string[]
  }
  searchParams: {
    [key: string]: string | string[]
  }
}

export const generateMetadata = ({ params, searchParams }: Args): Promise<Metadata> =>
  
  generatePageMetadata({ config, params: params as any, searchParams: searchParams as any })

const NotFound = ({ params, searchParams }: Args) =>
  NotFoundPage({ config, params: params as any, searchParams: searchParams as any, importMap })

export default NotFound
