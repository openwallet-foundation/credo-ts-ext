import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,
    watch: false,
    passWithNoTests: true,
    hookTimeout: 40000,
    testTimeout: 120000,
    setupFiles: ['./tests/setup.ts'],
    coverage: {
      reporter: ['text', 'lcov'],
      include: ['packages/**/*.{js,jsx,ts,tsx}'],
      exclude: ['**/build/**', '**/node_modules/**', '**/__tests__/**', '**/tests/**', '**/*.test.ts', '**/*.d.ts'],
    },
    projects: [
      {
        extends: true,
        test: {
          name: 'unit',
          include: ['{packages,tests}/**/*.{test,spec}.?(c|m)[jt]s?(x)'],
          exclude: ['**/node_modules/**', '**/build/**', '**/*.e2e.{test,spec}.?(c|m)[jt]s?(x)'],
        },
      },
      {
        extends: true,
        test: {
          name: 'e2e',
          include: ['{packages,tests}/**/*.e2e.{test,spec}.?(c|m)[jt]s?(x)'],
          exclude: ['**/node_modules/**', '**/build/**'],
        },
      },
    ],
  },
})
