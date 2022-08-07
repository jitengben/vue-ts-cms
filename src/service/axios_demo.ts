import axios from 'axios'

// axios.get('http://123.207.32.32:8000/home/multidata').then((res) => {
//   console.log(res.data)
// })

// axios
//   .get('http://httpbin.org/get', {
//     params: {
//       name: 'jitengben',
//       age: 18
//     }
//   })
//   .then((res) => {
//     console.log(res.data)
//   })

//axios的配置选项
//配置baseUrl
axios.defaults.baseURL = 'http://httpbin.org'
//超时时间
// axios.defaults.timeout = 10000
//配置header
// axios.defaults.headers = {}
// axios
//   .get('/get', {
//     params: {
//       name: 'jitengben',
//       age: 18
//     },
//     //也可以单独配某一个请求
//     timeout: 10000
//   })
//   .then((res) => {
//     console.log(res.data)
//   })

// axios.all方法
// axios
//   .all([
//     axios.get('/get', { params: { name: 'jitengben', age: 18 } }),
//     axios.post('/post', { data: { name: 'jitengben', age: 18 } })
//   ])
//   .then((res) => {
//     console.log(res[0].data)
//   })

//axios的拦截器
axios.interceptors.request.use(
  (config) => {
    //请求成功的拦截 给请求添加token，添加isloading动画
    return config
  },
  (err) => {
    console.log('请求失败~')
    return err
  }
)
axios.interceptors.response.use(
  (res) => {
    //相应成功的拦截
    // console.log('响应成功的拦截~')
    return res
  },
  (err) => {
    // console.log('服务器相应失败~')
    return err
  }
)
