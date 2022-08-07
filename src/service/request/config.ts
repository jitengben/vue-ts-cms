//1. 手动配置环境变量
//就是全部定义好，通过注释修改。
//2.通过process.env.NODE_ENV来切换
//这个是通过webpack的defineplugin插件来注入的
// if(process.env.NODE_ENV === "")
let BASE_URL = ''
const TIME_OUT = 10000
if (process.env.NODE_ENV === 'development') {
  BASE_URL = '/api'
} else if (process.env.NODE_ENV === 'production') {
  BASE_URL = ''
} else {
  BASE_URL = ''
}
export { BASE_URL, TIME_OUT }
//3.通过声明.env来控制，vue-cli支持
// BASE_URL BASE_NAME支持
//如果有其他的则通过VUE_APP_随便写来注入
