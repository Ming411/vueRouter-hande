import Link from './components/link';
import View from './components/view';
export let _Vue = null;
export default function install(Vue) {
  _Vue = Vue;
  _Vue.mixin({
    beforeCreate() {
      // 给根实例 和 所有组件增加router属性
      //  只要在 new Vue时传入router就会被挂在 $options 上
      if (this.$options.router) {
        this._router = this.$options.router;
        this._routerRoot = this; // ????
        // 初始化router
        this._router.init(this);
        // 增加一个相应的属性
        Vue.util.defineReactive(this, '_route', this._router.history.current);
      } else {
        this._routerRoot = this.$parent && this.$parent._routerRoot;
      }
    }
  });
  _Vue.component(Link.name, Link);
  _Vue.component(View.name, View);

  Object.defineProperty(Vue.prototype, '$rotuer', {
    get() {
      return this._routerRoot._router;
    }
  });
  Object.defineProperty(Vue.prototype, '$route', {
    get() {
      return this._routerRoot._route;
    }
  });
}
