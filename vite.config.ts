import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, loadEnv} from 'vite';

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, '.', '');
  const isProduction = mode === 'production';
  
  return {
    plugins: [react(), tailwindcss()],
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
    },
    build: {
      // Production optimizations
      minify: isProduction ? 'terser' : false,
      terserOptions: isProduction ? {
        compress: {
          drop_console: true, // Remove console.log
          drop_debugger: true, // Remove debugger
          pure_funcs: ['console.log', 'console.info', 'console.debug'], // Remove specific console methods
        },
        mangle: {
          toplevel: true, // Mangle top-level variable names
          safari10: true,
        },
        format: {
          comments: false, // Remove all comments
        },
      } : undefined,
      rollupOptions: {
        output: {
          // Obfuscate file names
          entryFileNames: isProduction ? 'assets/[name]-[hash].js' : 'assets/[name].js',
          chunkFileNames: isProduction ? 'assets/[name]-[hash].js' : 'assets/[name].js',
          assetFileNames: isProduction ? 'assets/[name]-[hash].[ext]' : 'assets/[name].[ext]',
          // Split code into chunks
          manualChunks: isProduction ? {
            'react-vendor': ['react', 'react-dom', 'react-router-dom'],
            'ui-vendor': ['motion', 'lucide-react'],
          } : undefined,
        },
      },
      // Source maps - disable in production for security
      sourcemap: !isProduction,
      // Chunk size warnings
      chunkSizeWarningLimit: 1000,
    },
  };
});
