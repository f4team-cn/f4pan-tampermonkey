import { createApp } from 'vue';
import App from './App.vue';
import 'vuetify/lib/styles/main.sass';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

(() => {
	const app = document.createElement('div');
	app.style.all = 'initial';
	app.style.width = '100%';
	app.style.height = '100%';
	document.body.append(app);

	const vuetify = createVuetify({
		components,
		directives,
	});

	createApp(App).use(vuetify).mount(app);
})();
