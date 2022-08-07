const path = require('path')

// const Components = require('unplugin-vue-components/webpack')
// const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')

module.exports = {
  outputDir: './build',
  // publicPath:'./'//解决打包后资源为绝对路径找不到的问题，部署到服务器时不要改这个，前面就没/
  devServer: {
    proxy: {
      '^/api': {
        target: 'http://152.136.185.210:4000',
        pathRewrite: {
          '^/api': ''
        },
        changeOrigin: true
      }
    }
  },
  // configureWebpack: {
  //   module: {
  //     unknownContextCritical: false
  //   },
  //   plugins: [
  //     Components({
  //       resolvers: [ElementPlusResolver()]
  //     })
  //   ]
  // },
  // configureWebpack: (config) => {
  //   config.resolve.alias = {
  //     '@': path.resolve(__dirname, 'src'),
  //     views: '@/views'
  //   }
  // },
  chainWebpack: (config) => {
    // config.resolve.alias.set('@', path.resolve(__dirname, 'src')).set('views', '@/views')
    config.resolve.alias
      .set('@', path.resolve(__dirname, 'src'))
      .set('components', '@/components')
  }
}
