import { defineConfig } from 'vitest/config'
import tsconfigPaths from 'vite-tsconfig-paths'
export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    globals: true,
    // environmentMatchGlobs: [['src/__test__/e2e/**', 'prisma']],
    // dir: 'src', // Essa linha
  },
})
