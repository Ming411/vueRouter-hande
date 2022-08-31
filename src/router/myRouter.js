let _Vue = null;
export default class VueRotuer {
  static install(Vue) {
    // 判断插件是否已经安装
    if (VueRotuer.install.installed) {
      return;
    }
    VueRotuer.install.installed = true;
    // 记录Vue
    _Vue = Vue;
    // 把创建vue实例时候传入的router对象注入到vue实例上
    _Vue.mixin({
      beforeCreate() {
        // $router只需要挂载一次，组件的options是没有$router的
        if (this.$options.router) {
          //  只要是被传入vue实例中就能在 this.$options 中获取
          _Vue.prototype.$router = this.$options.router;
          this.$options.router.init();
        }
      }
    });
  }
  constructor(options) {
    // 立即执行
    this.options = options;
    this.routeMap = {};
    // 创建响应式对象，记录当前路由地址
    this.data = _Vue.observable({
      current: '/'
    });
  }
  init() {
    this.createRouteMap();
    this.initComponents(_Vue);
    this.initEvent();
  }
  createRouteMap() {
    // 用于遍历传递过来的route，将path和component保存为键值对
    this.options.routes.forEach(route => {
      this.routeMap[route.path] = route.component;
    });
  }
  initComponents(Vue) {
    // 注册router-link组件
    Vue.component('router-link', {
      props: {
        to: String
      },
      // tamplate编译只有完整版vue支持，运行时vue是不支持的
      // 解决方式有两种：1.在配置文件中开启编译器 2. 直接使用render函数
      // template: '<a :href="to"><slot></slot></a>'
      render(h) {
        // h(标签名，标签属性，标签子元素)
        return h(
          'a',
          {
            attrs: {
              href: this.to
            },
            on: {
              // 阻止a标签默认事件
              click: this.clickHandler
            }
          },
          [this.$slots.default]
        );
      },
      methods: {
        clickHandler(e) {
          history.pushState({}, '', this.to);
          // 由于data是响应式，所以一旦改变对应的模板将自动重新编译
          this.$router.data.current = this.to;
          e.preventDefault();
        }
      }
    });
    const self = this;
    // 注册router-view
    // 由于用到了我们定义的响应式对象，所以只要对象中数据改变就会重新render
    Vue.component('router-view', {
      render(h) {
        // 获取当前路由对应的组件
        const component = self.routeMap[self.data.current];
        return h(component);
      }
    });
  }
  initEvent() {
    // 用于处理浏览器回退操作
    window.addEventListener('popstate', () => {
      this.data.current = window.location.pathname;
    });
  }
}
