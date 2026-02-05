import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    // Custom domain (a1haulaway.com) is served at root, so use base /.
    // For the default GitHub Pages URL (thedunces.github.io/A1-Junk-Haulers/) set VITE_BASE=/A1-Junk-Haulers/
    base: process.env.VITE_BASE || '/',
});
