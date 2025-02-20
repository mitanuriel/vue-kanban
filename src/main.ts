import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import { createVuetify } from 'vuetify';
import 'vuetify/styles'
import draggable from 'vuedraggable';
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'



import './assets/main.css';
import './assets/base.css';

const vuetify = createVuetify({
    components,
    directives,
   });
const app = createApp(App)

app.use(vuetify);
app.mount('#app');
app.component('draggable', draggable);
