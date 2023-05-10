import { createApp } from 'vue';
import App from './App.vue';
import { router } from './route';
import less from 'less';

createApp(App).use(router).use(less).mount('#app');
