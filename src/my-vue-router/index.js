// 入口文件，用于导出VueRouter
import install from './install';
import createMatcher from './create-matcher';
import HashHistory from './history/hash';
import HTML5History from './history/html5';
export default class VueRouter {
  constructor(options) {
    this._routes = options.routes || [];
    this.matcher = createMatcher(this._routes);

    const mode = (this.mode = options.mode || 'hash');
    switch (mode) {
      case 'hash':
        this.history = new HashHistory(this);
        break;
      case 'history':
        this.history = new HTML5History(this);
        break;
      default:
        throw new Error('mode error');
    }
  }
  init(app) {
    // app 是 Vue 实例
    const history = this.history;

    const setUpListener = () => {
      // 解决this指向
      history.setUpListener();
    };
    history.listen(current => {
      app._route = current;
    });
    history.transitionTo(history.getCurrentLocation(), setUpListener);
  }
}
// 挂在install方法 Vue.use自动调用
VueRouter.install = install;
