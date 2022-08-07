module.exports = {
  //配置按需引用组件样式，npm i babel-plugin-import
  //全局引入的话则需要注释这个
  plugins: [
    [
      'import',
      {
        libraryName: 'element-plus',
        customStyleName: (name) => {
          return `element-plus/lib/theme-chalk/${name}.css`
        }
      }
    ]
  ],
  presets: ['@vue/cli-plugin-babel/preset']
}
