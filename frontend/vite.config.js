import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,  // Permite acceso en red local
    port: 3000,  // Puedes cambiarlo si es necesario
  },
})
