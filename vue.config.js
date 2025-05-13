const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: [],
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:5001',
        changeOrigin: true
      }
    }
  },
  // Disable cache-loader to fix dependency issues
  chainWebpack: config => {
    // Remove cache-loader from the loaders
    const jsRule = config.module.rule('js');
    jsRule.uses.clear();
    jsRule
      .use('babel-loader')
      .loader('babel-loader');

    // Same for Vue files
    const vueRule = config.module.rule('vue');
    vueRule.uses.clear();
    vueRule
      .use('vue-loader')
      .loader(require.resolve('vue-loader'));
  }
})
