import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  plugins: [react()],
  // GitHub Pages serves from a subpath for project sites, so use a relative base for builds.
  // This keeps assets working whether the site is hosted at / or /<repo>/.
  base: command === 'build' ? './' : '/',
}))
