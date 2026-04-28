import { defineConfig } from 'vite';
import { resolve } from 'path';
import vituum from 'vituum';
import pug from '@vituum/vite-plugin-pug';

/* eslint-disable no-undef */
const baseDir = resolve(__dirname);
const srcDir = resolve(baseDir, 'src');
const outDir = resolve(baseDir, 'dist');

export default defineConfig({
    base: '/', // context-path
    build: {
        outDir: outDir,
        emptyOutDir: true,
    },
    plugins: [
        vituum(),
        pug({
            options: {
                basedir: srcDir,
            },
        }),
    ],
    resolve: {
        alias: {
            '@src': srcDir,
        },
    },
});
