import { createApp } from 'vue'

import App from '@/app/App.vue'
import router from '@/app/router'
import store from '@/app/store'
import primevue from '@/app/primevue'

import './registerServiceWorker'

createApp(App).use(store).use(router).use(primevue).mount('#app')
