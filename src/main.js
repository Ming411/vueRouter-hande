import Vue from 'vue';
import App from './App.vue';
import router from './router';
Vue.config.productionTip = false;
/* Vue.directive('focus', {
  inserted(el, bindings) {
    el.focus();
    console.log('inserted', el, bindings);
  },
  update(el, bindings) {
    console.log('update', el, bindings);
  }
}); */
// console.log(App);
new Vue({
  // let instance = new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
// console.log('----', Vue);
// console.log('++++', instance);
