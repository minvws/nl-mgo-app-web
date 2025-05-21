import { fileURLToPath, URL } from 'url';

const resolvePath = (path) => fileURLToPath(new URL(path, import.meta.url));

export default {
    plugins: {
        tailwindcss: { config: resolvePath('./tailwind.config.js') },
        autoprefixer: {},
    },
};
