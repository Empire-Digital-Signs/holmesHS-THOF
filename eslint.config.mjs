import { defineConfig, globalIgnores } from 'eslint/config'
import nextVitals from 'eslint-config-next/core-web-vitals'
import nextTs from 'eslint-config-next/typescript'
import stylistic from '@stylistic/eslint-plugin'

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  stylistic.configs.customize({
    indent: 2,
    quotes: 'single',
    semi: false,
  }),
  {
    rules: {
      '@stylistic/jsx-quotes': ['error', 'prefer-single'],
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    '.next/**',
    'out/**',
    'build/**',
    'dist/**',
    'next-env.d.ts',
  ]),
])

export default eslintConfig
