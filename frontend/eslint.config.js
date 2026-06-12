import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      globals: globals.browser,
    },
  },
  {
    // shadcn/ui primitives export cva variant helpers alongside their component,
    // which the fast-refresh rule flags. These are vendored library files.
    files: ['src/components/ui/**/*.{ts,tsx}'],
    rules: {
      'react-refresh/only-export-components': 'off',
    },
  },
  {
    // The data-fetching hooks intentionally flip loading state when their effect
    // runs (build prompt Section 15: custom hooks own loading/error, no React
    // Query/SWR). That deliberate pattern trips the newer set-state-in-effect rule.
    files: ['src/hooks/**/*.ts'],
    rules: {
      'react-hooks/set-state-in-effect': 'off',
    },
  },
])
