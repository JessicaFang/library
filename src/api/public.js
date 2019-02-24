import request from '@/util/request';

//获取学生个人信息
export function getMessage(params) {
  return request({
    url: '/user/queryUserList',
    method: 'get',
    params
  });
}
export function updateMessage(data) {
   return request({
     url:'/user/updateUserInfo',
     method:'post',
     data
   })
}
export function libFormat(data) {
  return request({
    url:'/lib/libFormat',
    method:'post',
    data
  })
}
export function batAddSAMLib(data) {
  return request({
    url: '/lib/batAddSAMLib',
    method: 'post',
    data
  });
}
export function exportData(data) {
  return request({
    url: '/lib/batAddSAMLib',
    method: 'post',
    data
  });
}
