import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import monkey, { cdn } from 'vite-plugin-monkey';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    monkey({
      entry: 'src/main.ts',
      userscript: {
        icon: 'https://vitejs.dev/logo.svg',
        namespace: 'f4team-cn/f4pan',
        match: ['*://pan.baidu.com/disk/home*','*://pan.baidu.com/disk/main*'],
      },
      build: {
        externalGlobals: {
          vue: cdn.bytecdntp('Vue', 'dist/vue.global.prod.js'),
        },
      },
    }),
  ],
});
