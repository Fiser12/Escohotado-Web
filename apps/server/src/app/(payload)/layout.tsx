/* THIS FILE WAS GENERATED AUTOMATICALLY BY PAYLOAD. */
import configPromise from '@payload-config'
import type { ServerFunctionClient } from 'payload'

import '@payloadcms/next/css'
import { handleServerFunctions, RootLayout } from '@payloadcms/next/layouts'
/* DO NOT MODIFY IT BECAUSE IT COULD BE REWRITTEN AT ANY TIME. */
import React from 'react'
import './custom.scss'
import { importMap } from './admin/importMap'
import config from '@payload-config'

type Args = {
  children: React.ReactNode
}

const serverFunctions: ServerFunctionClient = async function (args) {
  'use server'
  return handleServerFunctions({
    ...args,
    config,
    importMap,
  })
}
import { loadPayloadSingleton } from 'payload-base-singleton'
import { getPayload } from "@/payload/utils/getPayload";

const Layout = ({ children }: Args) => {
  loadPayloadSingleton(getPayload)
  return (

  <>
    <RootLayout importMap={importMap} config={configPromise} serverFunction={serverFunctions}>
      {children}
    </RootLayout>
  </>
)
}

export default Layout
