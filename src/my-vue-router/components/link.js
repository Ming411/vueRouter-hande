export default {
  name: 'RouterLink',
  props: {
    to: {
      type: String,
      required: true
    }
  },
  // template: '<a :href="{{'#'+this.to}}"><slot name="defalult"></slot></a>'
  render(h) {
    return h('a', {attrs: {href: '#' + this.to}}, [this.$slots.default]);
  }
};
