/** @type {import('next').NextConfig} */
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const nextConfig = {
    turbopack: {
        // Force Turbopack to treat THIS folder as the root
        root: __dirname
    },
    webpack: (config) => {
        // Extra safety for Webpack watcher: ignore big / irrelevant dirs
        config.watchOptions = {
            ignored: [
                '**/node_modules/**',
                '**/.git/**',
                '/home/**' // you can keep or remove this line, depending on taste
            ]
        };
        return config;
    }
};

export default nextConfig;
