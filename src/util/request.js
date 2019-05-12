import axios from 'axios';

const service = axios.create({
  // baseURL: 'http://kfr7rp.natappfree.cc',
  // baseURL: 'http://734i7u.natappfree.cc',
  baseURL: 'http://localhost:8091',
  timeout: 60 * 1000,
  withCredentials: true,
})

//axios拦截器
service.interceptors.request.use(config=>{
/*     console.log(config.data);*/
    config.headers['X-Requested-With'] = 'XMLHttpRequest';
    config.headers['Content-Type'] = 'application/json; charset=UTF-8';
    config.headers['Access-Control-Allow-Origin'] = '*';

    config.headers['Authorization'] = 'e5b97100-1d21-4f48-a8ca-97b58f24c026dd'
    return config;
  }, err=>{
    return Promise.reject(err);
  }
);
service.interceptors.response.use(config=>{
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
})
service.interceptors.response.use(response=>{

    return response.data;
  },err=>{
    return Promise.reject(err);
  }
)
export default service


