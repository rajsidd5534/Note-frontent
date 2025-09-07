import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'https://note-backend-production-bfdb.up.railway.app', // your backend
    },
    historyApiFallback: true, // ✅ ensures SPA routing works on refresh
  },
});
