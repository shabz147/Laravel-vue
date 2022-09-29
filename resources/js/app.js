import './bootstrap';

import { createApp } from 'vue/dist/vue.esm-bundler';
import BootstrapVue3 from 'bootstrap-vue-3'
import router from './Router/routes.js';
import store from './Store/index.js';

const app = createApp();
app.use(store);
app.use(router);
app.use(BootstrapVue3);
app.mount('#app');

