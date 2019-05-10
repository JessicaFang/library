import request from '@/util/request';

//获取学生个人信息
export function getStudent(params) {
  return request({
    url: '/user/queryUserList',
    method: 'get',
    params
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
    url: '/iEExl/exportLib',
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


//查阅试卷基础信息

export function queryTestPaper(params) {
  return request({
    url: '/test/queryTestPaper',
    method: 'get',
    async:false,
    params
  });
}

//获取试卷详细信息进行考试

export function studentQueryTestPaper(params) {
  return request({
    url: '/test/studentQueryTestPaper',
    method: 'get',
    params
  });
}

//提交试题答案

export function submitAnswer(data) {
  return request({
    url: '/stuPaper/submitAnswer',
    method: 'post',
    data
  });
}

//学生查看学生试卷
export function stuQueryBaseStuPaper(params) {
  return request({
    url: '/stuPaper/stuQueryBaseStuPaper',
    method: 'get',
    params
  });
}

//查看详细学生试卷
export function queryStuPaper(params) {
  return request({
    url: '/stuPaper/queryStuPaper',
    method: 'get',
    params
  });
}
