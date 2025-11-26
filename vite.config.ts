import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    allowedHosts: ["8080-iqvye8mg91j620jd081by-0df838b2.manusvm.computer", "8080-ijx93v50uvlf7zs3fo7vs-15c7f8b4.manusvm.computer", "8083-i62m92pic7vhyq70q9mio-e294d2ac.manusvm.computer", "8082-i62m92pic7vhyq70q9mio-e294d2ac.manusvm.computer", "8085-i62m92pic7vhyq70q9mio-e294d2ac.manusvm.computer", "8084-i62m92pic7vhyq70q9mio-e294d2ac.manusvm.computer", "8080-i67pdfxwrqoqfbiiwc5p1-b1ac69fa.manusvm.computer", "8081-i67pdfxwrqoqfbiiwc5p1-b1ac69fa.manusvm.computer"],
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Code splitting optimization
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor chunks
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'ui-vendor': ['@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu', '@radix-ui/react-tabs', '@radix-ui/react-select'],
          'supabase': ['@supabase/supabase-js'],
          'query': ['@tanstack/react-query'],
          'date': ['date-fns'],
          'form': ['react-hook-form', '@hookform/resolvers', 'zod'],
        }
      }
    },
    // Reduce chunk size warning limit
    chunkSizeWarningLimit: 800,
    // Enable sourcemaps for debugging
    sourcemap: mode === 'development'
  }
}));
