import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
// main.js (or a separate axios file)
import axios from 'axios';


axios.defaults.baseURL = 'http://localhost:5000'; // Base URL for all requests
axios.defaults.withCredentials = true; // CRUCIAL to send session cookie
createApp(App).use(router).mount('#app');
