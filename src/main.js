import { createApp } from 'vue'
import App from './App.vue'
import router from "@/router/index";
import store from "@/store";
import axios from 'axios'

import 'bootstrap/dist/css/bootstrap.css'

axios.defaults.baseURL = process.env.VUE_APP_BASE_API_URL;
if(store.getters.authToken){
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + store.getters.authToken;
}


createApp(App)
    .use(router)
    .use(store)
    .mount('#app');