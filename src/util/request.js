import axios from 'axios';

const service = axios.create({
  baseURL: 'http://jwuyou.ngrok.xiaomiqiu.cn',
  timeout: 60 * 1000,
  withCredentials: true,
})

//axios拦截器
service.interceptors.request.use(config=>{
/*     console.log(config.data);*/
    config.headers['X-Requested-With'] = 'XMLHttpRequest';
    config.headers['Content-Type'] = 'application/json; charset=UTF-8';
    return config;
  }, err=>{
    return Promise.reject(err);
  }
);
service.interceptors.response.use(response=>{
    return response.data;
  },err=>{
    return Promise.reject(err);
  }
)
export default service


