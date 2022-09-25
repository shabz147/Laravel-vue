// import './bootstra p';

import { createApp } from 'vue/dist/vue.esm-bundler';
import router from './Router/routes';
import store from './Store/index';
import home from './Home.vue'

const app = createApp(home);
app.mount('#app');
app.use(store);
app.use(router);

