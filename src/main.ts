import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import { createVuetify } from 'vuetify';
import 'vuetify/styles'

//import './assets/main.css';
//import './assets/base.css';

const vuetify = createVuetify;
const app = createApp(App)



app.use(vuetify);
app.mount('#app');
