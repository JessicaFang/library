import axios from 'axios';
import {url } from '@/util/gobalVar'
const service = axios.create({
  // baseURL: 'http://jwuyou.ngrok.xiaomiqiu.cn',
  baseURL:url(),
  timeout: 60 * 1000,
  withCredentials: true,
})

//axios拦截器
service.interceptors.request.use(config=>{
/*     console.log(config.data);*/
    config.headers['X-Requested-With'] = 'XMLHttpRequest';
    config.headers['Content-Type'] = 'application/json; charset=UTF-8';
    config.headers['Access-Control-Allow-Origin'] = '*';
    if (localStorage.getItem('token')) {
      config.headers['Authorization']= localStorage.getItem('token');
    }
    return config;
  }, err=>{
    return Promise.reject(err);
  }
);
service.interceptors.response.use(response=>{
  // if(response.status=='401'){
  //   localStorage.removeItem('token');
  //   this.$router.push({name:'Login'});
  // }else {
    return response.data;
  // }
  },err=>{
    return Promise.reject(err);
  }
)
export default service


