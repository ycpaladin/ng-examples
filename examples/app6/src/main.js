import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { defineApplication } from './platform/defineApplication'

Vue.config.productionTip = false

defineApplication('app6', {
  selector: 'app6',
  bootstrap: (app, element) => {
    new Vue({
      router,
      render: h => h(App)
    }).$mount(element)
  }
});

// new Vue({
//   router,
//   render: h => h(App)
// }).$mount('#app')
