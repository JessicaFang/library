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

//自动组卷前查题目的最大数量
export function beforeAddTestPaper(params) {
  return request({
    url: '/auto/beforeAddTestPaper',
    method: 'get',
    params
  });
}
export function scoreSection(params) {
  return request({
    url: '/statics/scoreSection',
    method: 'get',
    params
  });
}

export function avgHighLowScore(params){
  return request({
    url:'/statics/avgHighLowScore',
    method:'get',
    params
  })
}

export function refDifficulty(params) {
  return request({
    url:"/statics/refDifficulty",
    method:'get',
    params
  })
}

export function testRate(params){
  return request({
    url:"/statics/testRate",
    methods:'get',
    params
  })
}


