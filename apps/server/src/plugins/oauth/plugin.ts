import type { EndpointOptions, OAuthProviderConfig, PluginOptions } from './types'
import { generateEndpoints } from './core'
import { generateAccountsCollection } from './core/collections'
import { Config } from 'payload'

export const adminAuthPlugin =
  (pluginOptions: PluginOptions) =>
  (incomingConfig: Config): Config => {
    const config = { ...incomingConfig }

    // Default is true
    if (pluginOptions.enabled === false) {
      return config
    }

    const { accountsCollection, usersCollectionSlug, providers, successRedirect, errorRedirect } =
      pluginOptions
    const providersRecord = providers.reduce(
      (record: Record<string, OAuthProviderConfig>, provider: OAuthProviderConfig) => {
        const newRecord = {
          ...record,
          [provider.id]: provider,
        }
        return newRecord
      },
      {},
    )
    const accountsSlug = accountsCollection?.slug ?? 'accounts'

    config.admin = {
      ...(config.admin ?? {}),
    }

    // Create accounts collection if doesn't exists
    config.collections = [
      generateAccountsCollection(accountsSlug),
      ...(config.collections ?? []),
    ]

    // Add custom endpoints
    const endpointOptions: EndpointOptions = {
      providers: providersRecord,
      accountsCollection,
      usersCollectionSlug,
      successRedirect,
      errorRedirect,
    }
    config.endpoints = [...(config.endpoints ?? []), ...generateEndpoints(endpointOptions)]

    return config
  }