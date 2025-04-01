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
  webpackFinal: async (config) => {
    //WHY THIS?
    //Algunos ficheros son de node y storybook no los soporta. Aunque no los llame este no carga, con lo que es mejor tenerlos identifidados y excluirlos de la compilación de storybook.
    //Es fundamental pasar los mocks correspondientes en los services a los componentes que lo usan en storybook.
    const patterns = ['richtext-lexical-renderer', 'getPayload', 'plugins'];
    patterns.forEach(pattern => {
      config.module?.rules?.push({
        test: new RegExp(pattern),
        use: 'null-loader',
      });
    });
    return config;
  },  
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
