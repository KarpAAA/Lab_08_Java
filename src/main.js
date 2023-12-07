import {createApp} from 'vue'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import store from "@/store";
import router from "@/router/router";
import {connect} from "@/ws";

connect();

createApp(App)
    .use(router)
    .use(store)
    .mount('#app')
