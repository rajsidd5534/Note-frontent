import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Forward API requests to backend
      '/api': 'https://note-backend-production-bfdb.up.railway.app',
    },
    // Enable SPA routing: refresh works on all routes
    historyApiFallback: true,
  },
});
