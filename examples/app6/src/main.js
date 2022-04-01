import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { defineApplication } from './platform/defineApplication'

Vue.config.productionTip = false

defineApplication('app6', {
  selector: 'app6',
  /**
   *
   * @param {*} app
   * @param {HTMLElement} element
   */
  bootstrap: (app, element) => {
    new Vue({
      router,
      render: h => h(App)
    }).$mount(element.childNodes[0])
  }
});

// new Vue({
//   router,
//   render: h => h(App)
// }).$mount('#app')
