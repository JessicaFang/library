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

export function upload(data) {
  return request({
    url: '/editor/upload',
    method: 'post',
    data
  });
}

//为课程添加学生
export function addCourseStudent(params) {
  return request({
    url: '/course/addCourseStudent',
    method: 'get',
    params
  });
}
//为课程添加老师
export function addCourseTeacher(params) {
  return request({
    url: '/course/addCourseTeacher',
    method: 'get',
    params
  });
}
//删除课程下的学生
export function delCourseStudent(params) {
  return request({
    url: '/course/delCourseStudent',
    method: 'get',
    params
  });
}
//删除课程下的老师
export function delCourseTeacher(params) {
  return request({
    url: '/course/delCourseTeacher',
    method: 'get',
    params
  });
}

export function queryUnCourseTeacher(params) {
  return request({
    url: '/course/queryUnCourseTeacher',
    method: 'get',
    params
  });
}
export function queryCourseTeacher(params) {
  return request({
    url: '/course/queryCourseTeacher',
    method: 'get',
    params
  });
}
export function queryCourseStudent(params) {
  return request({
    url: '/course/queryCourseStudent',
    method: 'get',
    params
  });
}
export function queryUnCourseStudent(params) {
  return request({
    url: '/course/queryUnCourseStudent',
    method: 'get',
    params
  });
}
