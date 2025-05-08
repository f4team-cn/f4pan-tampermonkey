import { createApp } from 'vue';
import App from './App.vue';
import 'vuetify/lib/styles/main.sass';
import { createVuetify } from 'vuetify';

(() => {
	const app = document.createElement('div');
	app.style.all = 'initial';
	app.style.width = '100%';
	app.style.height = '100%';
	document.body.append(app);

	const vuetify = createVuetify({});
	createApp(App).use(vuetify).mount(app);
})();
