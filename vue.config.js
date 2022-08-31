const {defineConfig} = require('@vue/cli-service');
const path = require('path');
module.exports = defineConfig({
  // runtimeCompiler: true, // 加载完整版vue带编译器
  transpileDependencies: true,
  chainWebpack: config => {
    config.resolve.alias.set('@', path.resolve(__dirname, 'src')).set('assets', '@/assets');
  }
});
