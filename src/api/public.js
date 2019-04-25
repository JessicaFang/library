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
    url: '/courser/addCourseStudent',
    method: 'get',
    params
  });
}
//为课程添加老师
export function addCourseTeacher(params) {
  return request({
    url: '/courser/addCourseTeacher',
    method: 'get',
    params
  });
}
//删除课程下的学生
export function delCourseStudent(params) {
  return request({
    url: '/courser/delCourseStudent',
    method: 'get',
    params
  });
}
//删除课程下的老师
export function delCourseTeacher(params) {
  return request({
    url: '/courser/delCourseTeacher',
    method: 'get',
    params
  });
}

