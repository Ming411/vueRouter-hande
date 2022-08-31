export default {
  name: 'RouterView',
  render(h) {
    // 就是找到对应路由的组件，并将其渲染出来
    const route = this.$route;
    let depth = 0;
    this.routerView = true;
    let parent = this.$parent;
    while (parent) {
      if (parent.routerView) {
        depth++;
      }
      parent = parent.$parent;
    }
    const record = route.matched[depth];
    if (record) {
      return h(record.component);
    }
    return h();
  }
};
