

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { Uploader,Toast } from 'vant';


const app = createApp(App)

app.use(router).use(Uploader).use(Toast)

app.mount('#app')
