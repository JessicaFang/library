import request from '@/util/request';
export function getCourseTeacher(params) {
  return request({
    url: '/course/queryCourseTeacher',
    method: 'get',
    params
  });
}
//提交建议题目入库
export function submitSuggest(params) {
  return request({
    url: '/suggest/suggest2Lib',
    method: 'get',
    params
  });
}
