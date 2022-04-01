import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import { defineApplication } from './platform/defineApplication'
defineApplication('app5', {
  selector: 'app5',
  bootstrap: (app, element) => {
    console.log('=====>', element)
    createApp(App).use(router).mount(element)
  }
})



// createApp(App).use(router).mount('#app')
