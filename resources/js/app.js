// import './bootstra p';

import { createApp } from 'vue/dist/vue.esm-bundler';
import router from './Router/routes.js';
import store from './Store/index.js';

const app = createApp();
app.use(store);
app.use(router);
app.mount('#app');

