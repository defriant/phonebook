import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { VitePWA, VitePWAOptions } from 'vite-plugin-pwa'

const manifestForPlugIn: Partial<VitePWAOptions> = {
    registerType: 'prompt',
    includeAssets: [
        'icon-48x48.png',
        'icon-72x72.png',
        'icon-96x96.png',
        'icon-128x128.png',
        'icon-144x144.png',
        'icon-152x152.png',
        'icon-192x192.png',
        'icon-384x384.png',
        'icon-512x512.png',
    ],
    manifest: {
        name: 'Phonebook App',
        short_name: 'Phonebook',
        description: 'A Phonebook app created by Afif Defriant',
        icons: [
            {
                src: '/icon-48x48.png',
                sizes: '48x48',
                type: 'image/png',
                purpose: 'maskable any',
            },
            {
                src: '/icon-72x72.png',
                sizes: '72x72',
                type: 'image/png',
                purpose: 'maskable any',
            },
            {
                src: '/icon-96x96.png',
                sizes: '96x96',
                type: 'image/png',
                purpose: 'maskable any',
            },
            {
                src: '/icon-128x128.png',
                sizes: '128x128',
                type: 'image/png',
                purpose: 'maskable any',
            },
            {
                src: '/icon-144x144.png',
                sizes: '144x144',
                type: 'image/png',
                purpose: 'maskable any',
            },
            {
                src: '/icon-152x152.png',
                sizes: '152x152',
                type: 'image/png',
                purpose: 'maskable any',
            },
            {
                src: '/icon-192x192.png',
                sizes: '192x192',
                type: 'image/png',
                purpose: 'maskable any',
            },
            {
                src: '/icon-384x384.png',
                sizes: '384x384',
                type: 'image/png',
                purpose: 'maskable any',
            },
            {
                src: '/icon-512x512.png',
                sizes: '512x512',
                type: 'image/png',
                purpose: 'maskable any',
            },
        ],
        theme_color: '#FFFFFF',
        background_color: '#FFFFFF',
        display: 'standalone',
        scope: '/',
        start_url: '/',
        orientation: 'portrait',
    },
}

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(), VitePWA(manifestForPlugIn)],
    server: {
        port: 3001,
        host: true,
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
