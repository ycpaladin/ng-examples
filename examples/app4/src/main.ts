import { createApp } from 'vue'
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import App from './App.vue'
// import Home from './pages/Home.vue';
// import About from './pages/About.vue';
import Empty from './pages/Empty.vue';
import { defineApplication } from './platform/defineApplication';

const routes: RouteRecordRaw[] = [
  { path: '/', component: () => import('./pages/Home.vue') },
  { path: '/about', component: () => import('./pages/About.vue') },
  { path: '/**', component: Empty }
];
const router = createRouter({
  history: createWebHistory('/app4'), // <======= base url is '/app4'
  routes
})


defineApplication('app4', {
  selector: 'app4',
  bootstrap: (app: any, element) => {
    createApp(App).use(router).mount(element)
  }
})

// createApp(App).use(router).mount('#app')
