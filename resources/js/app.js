import './bootstrap';

import { createApp } from 'vue/dist/vue.esm-bundler';
import BootstrapVue3 from 'bootstrap-vue-3'
import router from './router/index.js';
import store from './store/index.js';

const app = createApp();
app.use(store);
app.use(router);
app.use(BootstrapVue3);
app.mount('#app');

