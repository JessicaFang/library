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
    url: '/suggest/saveSuggest',
    method: 'post',
    data
  });
}
export function selectSuggest(data={}) {
  return request({
    url: '/suggest/selectSuggest',
    method: 'post',
    data
  });
}
export function selectSuggestById(data={}) {
  return request({
    url: '/suggest/selectSuggestById',
    method: 'post',
    data
  });
}
export function delSuggest(params) {
  return request({
    url: '/suggest/delSuggest',
    method: 'post',
    params
  });
}

//exportSuggest还没有搞定的数据导出接口
export function exportSuggest(params={}) {
  return request({
    url: '/iEExl/exportSuggest',
    method: 'post',
    params
  });
}

export function submitSuggest(params) {
  return request({
    url: '/suggest/submitSuggest',
    method: 'post',
    params
  });
}



