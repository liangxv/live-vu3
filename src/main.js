

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { Uploader } from 'vant';


const app = createApp(App)

app.use(router).use(Uploader)

app.mount('#app')
