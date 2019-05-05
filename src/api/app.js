import request from '@/util/request';
/*axios({
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'Content-Type': 'application/json; charset=UTF-8',
    'Access-Control-Allow-Origin': '*'
  },//设置跨域请求头
  method: "POST",//请求方式
  url: "https://solelynet.com/public/index.php/api/v1/UserMenu/GetTree",//请求地址
  data: {
    "menu_id":1,
    "thirdapp_id":1//请求参数

  }
})*/
export function Login(params) {
  return request({
    url: '/login/userLoginBack',
    method: 'get',
    params
  });
}

 export function Register(data) {
    return request({
      url:'regist/userRegist',
      method:'post',
      data
    })
  };

