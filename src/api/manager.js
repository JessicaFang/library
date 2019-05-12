import request from '@/util/request';


//应该审核失败之后就进行删除，审核成功之后数据就不再展示
export function examine(params) {
  return request({
    url: '/user/examineUser',
    method: 'get',
    params
  });
}
export function updateManager(data) {
  return request({
    url: '/user/updateUserInfo',
    method: 'post',
    data
  });
}
export function importData(data) {
  return request({
    url: '/iEExl/uploadUser',
    method: 'post',
    data,
  });
}
export function updateData(data) {
  return request({
    url: '/user/updateUserInfo',
    method: 'post',
    data
  });
}
export function deleteData(params) {
  return request({
    url: '/user/delUser',
    method: 'get',
    params
  });
}
export function addCourse(params) {
  return request({
    url: '/course/saveCourse',
    method: 'get',
    params
  });
}
export function queryCourse(params) {
  return request({
    url: '/course/queryCourse',
    method: 'get',
    params
  });
}
export function deleteCourse(params) {
  return request({
    url: '/course/delCourse',
    method: 'get',
    params
  });
}export function alterCourse(params) {
  return request({
    url: '/course/saveCourse',
    method: 'get',
    params
  });
}
export function queryKnowledge(params) {
  return request({
    url: '/knowledge/queryKnowledge',
    method: 'get',
    params
  });
}

export function addKnowledge(params) {
  return request({
    url: '/knowledge/addKnowledge',
    method: 'get',
    params
  });
}
export function deleteKnowledge(params) {
  return request({
    url: '/knowledge/delKnowledge',
    method: 'get',
    params
  });
}


export function saveLib(data) {
  return request({
    url: '/lib/saveLib',
    method: 'post',
    data
  });
}
export function delLib(params) {
  return request({
    url: '/lib/delLib',
    method: 'get',
    params
  });
}
//导出题目信息
export function exportLib(params) {
  return request({
    url: '/iEExl/exportLib',
    method: 'post',
    params
  });
}

export function exportData(params) {
  return request({
    url: '/iEExl/exportUser',
    method: 'post',
    params
  });
}

//查看所有题目
export function selectLib(data) {
  return request({
    url: '/lib/selectLib',
    method: 'post',
    data
  });
}

export function selectLibById(data) {
  return request({
    url: '/lib/selectLibById',
    method: 'post',
    data
  });
}
