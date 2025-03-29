import type { StorybookConfig } from '@storybook/nextjs'

import { join, dirname } from 'path'

/**
 * This function is used to resolve the absolute path of a package.
 * It is needed in projects that use Yarn PnP or are set up within a monorepo.
 */
function getAbsolutePath(value: string): any {
  return dirname(require.resolve(join(value, 'package.json')))
}
const config: StorybookConfig = {
  stories: [
    '../src/components/**/*.stories.@(js|jsx|mjs|ts|tsx)',
    '../src/modules/**/*.stories.@(js|jsx|mjs|ts|tsx)',
    '../src/components/**/*.mdx',
    '../src/modules/**/*.mdx',
  ],
  staticDirs: ['../public'],
  addons: [
    getAbsolutePath('@storybook/addon-links'),
    getAbsolutePath('@storybook/addon-designs'),
    getAbsolutePath('@storybook/addon-essentials'),
    getAbsolutePath('@storybook/addon-interactions'),
  ],
  docs: {
    defaultName: 'Docs',
  },
  features: {
    experimentalRSC: true
  },
  framework: {
    name: getAbsolutePath('@storybook/nextjs'),
    options: {},
  },
}
export default config
