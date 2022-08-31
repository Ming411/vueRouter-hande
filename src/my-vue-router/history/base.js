import createRoute from '../utils/route';
export default class History {
  constructor(router) {
    this.router = router;
    // 当前对应的路由
    this.current = createRoute(null, '/');
    this.cb = null;
  }
  listen(cb) {
    this.cb = cb;
  }
  transitionTo(path, onComplete) {
    this.current = this.router.matcher.match(path);
    this.cb && this.cb(this.current);
    onComplete && onComplete();
  }
}
