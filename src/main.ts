import { createApp } from 'vue'
import App from './App.vue'
import components from '@/UI'
import english from './directives/english';
import router from './router'
import store from './store'
import { createPinia } from 'pinia';

const app = createApp(App);
components.forEach(comp => {app.component(comp.name, comp)})
app.directive('english', english);

app.use(router).use(store).use(createPinia()).mount('#app')
