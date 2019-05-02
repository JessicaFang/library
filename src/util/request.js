import axios from 'axios';

const service = axios.create({
  baseURL: 'http://vixncp.natappfree.cc',
  timeout: 60 * 1000,
  withCredentials: true,
})

//axios拦截器
service.interceptors.request.use(config=>{
/*     console.log(config.data);*/
    config.headers['X-Requested-With'] = 'XMLHttpRequest';
    config.headers['Content-Type'] = 'application/json; charset=UTF-8';
    config.headers['Access-Control-Allow-Origin'] = '*';
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


