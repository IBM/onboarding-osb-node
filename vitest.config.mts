import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    environment: 'node',
    include: ['src/**/__tests__/unit/**/*.test.ts'],
    setupFiles: ['tests/vitest.setup.ts'],
    globals: false,
    coverage: {
      provider: 'v8',
      include: ['src/**/*.ts'],
      exclude: ['src/**/__tests__/**', 'src/db/migrations/**'],
    },
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
})
