import History from './base';
export default class HashHistory extends History {
  constructor(router) {
    super(router);
    // 保证首次访问 有 #
    ensureSlash();
  }
  // 获取当前路径
  getCurrentLocation() {
    return window.location.hash.slice(1); //截取 /# 之后的部分
  }
  setUpListener() {
    window.addEventListener('hashchange', () => {
      // 传入当前路由并跳转
      this.transitionTo(this.getCurrentLocation());
    });
  }
}
function ensureSlash() {
  if (window.location.hash) {
    return;
  }
  window.location.hash = '/';
}
