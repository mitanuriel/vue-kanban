import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import { createVuetify } from 'vuetify';
import 'vuetify/styles'
import router from './router'

//import './assets/main.css';
//import './assets/base.css';

const app = createApp(App)
const vuetify = createVuetify;


app.use(router);

app.use(vuetify);
app.mount('#app');
