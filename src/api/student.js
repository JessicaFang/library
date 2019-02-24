import request from '@/util/request';

//获取学生个人信息
export function getStudent(params) {
  return request({
    url: '/user/queryUserList',
    method: 'get',
    params
  });
}

//获取学生可以进行添加试题的课程表
export function getCourse(params) {
  return request({
    url: '/course/queryCourseStudent',
    method: 'get',
    params
  });
}

export function test(data={}) {
  return request({
    url: '/lib/selectLib',
    method: 'post',
    data
  });
}

export function saveSuggest(data={}) {
  return request({
    url: '/lib/saveSuggest',
    method: 'post',
    data
  });
}




