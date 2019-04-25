import request from '@/util/request';


//应该审核失败之后就进行删除，审核成功之后数据就不再展示
export function examine(params) {
  return request({
    url: '/user/examineUser',
    method: 'get',
    params
  });
}
export function updateManager(params) {
  return request({
    url: '/user/updateUserInfo',
    method: 'get',
    params
  });
}
export function importData(data) {
  return request({
    url: '/user/updateUserInfo',
    method: 'post',
    data
  });
}
export function updateData(data) {
  return request({
    url: '/user/updateUserInfo',
    method: 'post',
    data
  });
}
export function deleteData(data) {
  return request({
    url: '/user/updateUserInfo',
    method: 'post',
    data
  });
}
export function addCourse(data) {
  return request({
    url: '/user/updateUserInfo',
    method: 'post',
    data
  });
}
export function deleteCourse(data) {
  return request({
    url: '/user/updateUserInfo',
    method: 'post',
    data
  });
}export function alterCourse(data) {
  return request({
    url: '/user/updateUserInfo',
    method: 'post',
    data
  });
}

export function addKnowledge(data) {
  return request({
    url: '/user/updateUserInfo',
    method: 'post',
    data
  });
}
export function deleteKnowledge(data) {
  return request({
    url: '/user/updateUserInfo',
    method: 'post',
    data
  });
}

export function alterKnowledge(data) {
  return request({
    url: '/user/updateUserInfo',
    method: 'post',
    data
  });
}

export function saveLib(data) {
  return request({
    url: '/lib/saveLib',
    method: 'post',
    data
  });
}
export function delLib(data) {
  return request({
    url: '/lib/delLib',
    method: 'post',
    data
  });
}
//导出题目信息
export function exportData(data) {
  return request({
    url: '/lib/batAddSAMLib',
    method: 'post',
    data
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
//todo
//查看单道题目
export function selectLibById(data) {
  return request({
    url: '/lib/selectLibById',
    method: 'post',
    data
  });
}
