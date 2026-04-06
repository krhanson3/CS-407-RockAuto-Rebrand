import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: "/CS-407-RockAuto-Rebrand/",
  build: {
    outDir: "docs"
  },
  plugins: [react()],
});
