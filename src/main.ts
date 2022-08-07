import { createApp } from 'vue'
import App from './App.vue'
//全局引用elementplus
// import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'

// import 'element-plus/lib/theme-chalk/base.css'
//按需引用
// import { ElButton } from 'element-plus'

import { globalRegister } from './global'
import 'normalize.css'
import './assets/css/index.less'

// import './service/axios_demo'

import router from './router'
import store from './store'

const app = createApp(App)

// console.log(process.env.VUE_APP_BASE_URL)

// import tbRequest from './service'
// tbRequest.request({
//   url: '/home/multidata',
//   method: 'GET',
//   interceptor: {
//     requestInterceptor: (config) => {
//       console.log('单独请求的拦截~')
//       return config
//     },
//     responseInterceptor: (res) => {
//       console.log('单独响应的拦截~')
//       return res
//     }
//   }
// })
// interface DataType {
//   data: any
//   returnCode: string
//   success: boolean
// }
// tbRequest
//   .get<DataType>({
//     url: '/home/multidata',
//     showLoading: false
//   })
//   .then((res) => {
//     console.log(res.data)
//   })
// console.log(tbRequest)
// app.component(ElButton.name, ElButton)

import { setupStore } from './store'

app.use(globalRegister)
setupStore()
app.use(router)
app.use(store)

// app.use(ElementPlus)
app.mount('#app')
