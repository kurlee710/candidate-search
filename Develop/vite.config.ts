import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  envDir: './env',
  plugins: [react()],
  server: {
    port: 5173, // Default port for development
    host: '0.0.0.0', // Bind to all interfaces during development
  },
  preview: {
    port: process.env.PORT || 4173, // Use Render's provided PORT in production or fallback
    host: '0.0.0.0', // Bind to all interfaces for production preview mode
  },
});
