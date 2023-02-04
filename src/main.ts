import { createApp } from 'vue';

import { createPinia } from 'pinia';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import * as feather from 'feather-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';


import router from './routes';
import './style.css';
import App from './App.vue';

library.add(fas);

const app = createApp(App);
app.use(createPinia());
app.use(router);
app.component('fa', FontAwesomeIcon)
app.mount('#app');


feather.replace();
