import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.jsx'],
            refresh: true,
        }),
        tailwindcss(),
        react(),
    ],
    server: {
        host: 'messenger.local',
        port: 5173,
        cors: {
            origin: 'http://messenger.local',
            methods: ['GET', 'POST'],
            credentials: true,
        },
        hmr: {
            host: 'messenger.local',
        },
    },

});
