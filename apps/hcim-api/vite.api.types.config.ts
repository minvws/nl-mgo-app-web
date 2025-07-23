import { renameSync } from 'fs';
import { mergeConfig } from 'vite';
import dts from 'vite-plugin-dts';
import config, { resolvePath } from './vite.api.config';

// https://vitejs.dev/config/
export default mergeConfig(config, {
    cacheDir: '../../node_modules/.vite/apps/mgo-hcim-api/types',

    plugins: [
        // https://www.npmjs.com/package/vite-plugin-dts
        dts({
            rollupTypes: true,
            tsconfigPath: resolvePath('./tsconfig.app.json'),
            clearPureImport: true,
            declarationOnly: true,
            copyDtsFiles: true,
            afterBuild: (results) => {
                // Change .d.ts to .ts, otherwise the json schema generator will not work.
                results.forEach((_content, path) => {
                    renameSync(path, path.replace(/\.d\.ts$/, '.ts'));
                });
            },
        }),
    ],
    build: {
        outDir: 'build/schema/typescript',
        lib: {
            entry: resolvePath('./src/types.ts'),
            name: 'MgoHcimApiTypes',
            fileName: 'types',
        },
    },
});
