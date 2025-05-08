import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import monkey, { cdn } from 'vite-plugin-monkey';
import vuetify from 'vite-plugin-vuetify';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		vue(),
		vuetify(),
		monkey({
			entry: 'src/main.ts',
			userscript: {
				icon: 'https://vitejs.dev/logo.svg',
				namespace: 'f4team-cn/f4pan',
				match: ['*://pan.baidu.com/disk/home*', '*://pan.baidu.com/disk/main*']
			},
			build: {
				externalGlobals: {
					vue: cdn.zhimg('Vue', 'dist/vue.global.prod.js')
				}
			}
		})
	]
});
