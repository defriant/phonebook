import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        port: 3000,
    },
    build: {
        rollupOptions: {
            output: {
                entryFileNames: `assets/main.[hash].js`,
                chunkFileNames: `assets/chunk.[hash].js`,
            },
        },
    },
})