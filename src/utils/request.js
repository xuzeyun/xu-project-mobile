import axios from 'axios'
import { showNotify, showConfirmDialog } from 'vant'

// import store from '@/store'
import { getToken } from '@/utils/auth'
import errorCode from '@/utils/errorCode'
import cache from '@/utils/cache'

// let downloadLoadingInstance;
// 是否显示重新登录
export let isRelogin = { show: false }

axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'
// 创建axios实例
const service = axios.create({
  // axios中请求配置有baseURL选项，表示请求URL公共部分
  baseURL: process.env.VUE_APP_BASE_API,
  // 超时
  timeout: 10000
})

// request拦截器
service.interceptors.request.use(
  config => {
    // 是否需要设置 token
    const isToken = (config.headers || {}).isToken === false
    // 是否需要防止数据重复提交
    const isRepeatSubmit = (config.headers || {}).repeatSubmit === false
    if (getToken() && !isToken) {
      // config.headers['Authorization'] = 'X-Access-Token ' + getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
      config.headers['X-Access-Token'] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
    }
    if (!isRepeatSubmit && (config.method === 'post' || config.method === 'put')) {
      const requestObj = {
        url: config.url,
        data: typeof config.data === 'object' ? JSON.stringify(config.data) : config.data,
        time: new Date().getTime()
      }
      const requestSize = Object.keys(JSON.stringify(requestObj)).length // 请求数据大小
      const limitSize = 5 * 1024 * 1024 // 限制存放数据5M
      if (requestSize >= limitSize) {
        console.warn(`[${config.url}]: ` + '请求数据大小超出允许的5M限制，无法进行防重复提交验证。')
        return config
      }
      const sessionObj = cache.session.getJSON('sessionObj')
      if (sessionObj === undefined || sessionObj === null || sessionObj === '') {
        cache.session.setJSON('sessionObj', requestObj)
      } else {
        const s_url = sessionObj.url // 请求地址
        const s_data = sessionObj.data // 请求数据
        const s_time = sessionObj.time // 请求时间
        const interval = 1000 // 间隔时间(ms)，小于此时间视为重复提交
        if (s_data === requestObj.data && requestObj.time - s_time < interval && s_url === requestObj.url) {
          const message = '数据正在处理，请勿重复提交'
          console.warn(`[${s_url}]: ` + message)
          return Promise.reject(new Error(message))
        } else {
          cache.session.setJSON('sessionObj', requestObj)
        }
      }
    }
    return config
  },
  error => {
    console.log(error)
    Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  res => {
    // 未设置状态码则默认成功状态
    const code = res.data.code || 200
    // 获取错误信息
    // const msg = errorCode[code] || res.data.msg || res.data.message || errorCode['default']
    // 二进制数据则直接返回
    if (res.request.responseType === 'blob' || res.request.responseType === 'arraybuffer') {
      return res.data
    }
    if (code === 401) {
      // 未登录
      if (!isRelogin.show) {
        isRelogin.show = true
        showConfirmDialog({
          title: '系统提示',
          message: '未登录或登录状态过期，请重新登录'
        })
          .then(() => {
            // on confirm
            isRelogin.show = false
            location.href = '/login'
          })
          .catch(() => {
            // on cancel
            isRelogin.show = false
          })
      }
      return Promise.reject('无效的会话，或者会话已过期，请重新登录。')
    } else {
      return res.data
    }
  },
  async error => {
    let { message } = error
    if (error.response.data.code === 401) {
      if (!isRelogin.show) {
        isRelogin.show = true
        showConfirmDialog({
          title: '系统提示',
          message: '未登录或登录状态过期，请重新登录'
        })
          .then(() => {
            // on confirm
            isRelogin.show = false
            location.href = '/login'
          })
          .catch(() => {
            // on cancel
            isRelogin.show = false
          })
      }
      return Promise.reject('无效的会话，或者会话已过期，请重新登录。')
    } else {
      showNotify({ message: message, type: 'danger', duration: 5 * 1000 })
      return Promise.reject(error)
    }
  }
)
export default service
