import path from 'path';
import { defineConfig, loadEnv } from 'vite'; // Import loadEnv
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // The third parameter '' loads all variables regardless of VITE_ prefix.
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    server: {
      // Access the variable from the 'env' object created above
      port: parseInt(env.VITE_PORT_NUMBER) || 3000,
    },
  };
});
