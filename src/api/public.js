import request from '@/util/request';


export function upload(data) {
  return request({
    url: '/editor/upload',
    method: 'post',
    data
  });
}

//登录
export function login(data) {
  return request({
    url: '/login/userLoginFront',
    method: 'post',
    data
  });
}
//注册
export function register(data) {
  return request({
    url: '/regist/userRegist',
    method: 'post',
    data
  });
}

//发送验证码
export function sendCode(params) {
  return request({
    url: '/user/sendCode',
    method: 'get',
    params
  });
}

//发送验证码后重置密码
export function resetPwd(params) {
  return request({
    url: '/user/resetPwd',
    method: 'get',
    params
  });
}

//获取个人信息（包括学生和老师）
export function getMessage(params) {
  return request({
    url:'/user/queryUserList',
    method:'get',
    params
  })
}

//更新个人信息（包括学生和老师）
export function updateMessage(data) {
  return request({
    url:'/user/updateUserInfo',
    method:'post',
    data
  })
}

//上传图片

export function uploadFaceUrl(data) {
  return request({
    url:'/user/uploadFaceUrl',
    method:'post',
    data
  })
}
