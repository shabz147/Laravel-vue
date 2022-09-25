import './bootstrap';

import { createApp } from 'vue';
import router from './Router/routes';
import store from './Store/index';

const app = createApp();
app.mount('#app');
app.use(store);
app.use(router);

