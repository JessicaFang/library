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

//统计
export function scoreSection(params) {
  return request({
    url: '/statics/scoreSection',
    method: 'get',
    params
  });
}

//统计
export function avgHighLowScore(params){
  return request({
    url:'/statics/avgHighLowScore',
    method:'get',
    params
  })
}

//统计
export function refDifficulty(params) {
  return request({
    url:"/statics/refDifficulty",
    method:'get',
    params
  })
}

//统计
export function testRate(params){
  return request({
    url:"/statics/testRate",
    method:'get',
    params
  })
}

export function getTeacherCourse(params){
  return request({
    url:"/course/queryCourseTeacher",
    method:'get',
    params
  })
}

//查询课程下的知识点
export function queryKnowLedge(params){
  return request({
    url:"/knowledge/queryKnowledge",
    method:'get',
    params
  })
}
//查询课程下的题目列表
export function selectLib(data={}){
  return request({
    url:"/lib/selectLib",
    method:'post',
    data
  })
}
//查询课程下的题目列表的题目
export function selectLibByIds(data={}){
  return request({
    url:"/lib/selectLibByIds",
    method:'post',
    data
  })
}
//添加试卷
export function addTestPaper(data={}){
  return request({
    url:"/test/addTestPaper",
    method:'post',
    data
  })
}
//修改试卷
export function updateTestPaper(data={}){
  return request({
    url:"/test/updateTestPaper",
    method:'post',
    data
  })
}
//添加和修改发布信息
export function publishTestPaper(data={}){
  return request({
    url:"/test/publishTestPaper",
    method:'post',
    data
  })
}

//查看试卷列表
export function queryTestPaper(params){
  return request({
    url:"/test/queryTestPaper",
    method:'get',
    params
  })
}

//查看试卷详细信息
export function getPaperDetail(params){
  return request({
    url:"/test/teacherQueryTestPaper",
    method:'get',
    params
  })
}

//试卷删除
export function delTestPaper(data){
  return request({
    url:"/test/delTestPaper",
    method:'post',
    data
  })
}

//教师查看学生试卷
export function teaQueryBaseStuPaper(params){
  return request({
    url:"/stuPaper/teaQueryBaseStuPaper",
    method:'get',
    params
  })
}

//教师查看学生详细试卷
export function queryStuPaper(params){
  return request({
    url:"/stuPaper/queryStuPaper",
    method:'get',
    params
  })
}

export function correctStuPaper(data={}){
  return request({
    url:"/stuPaper/correctStuPaper",
    method:'post',
    data
  })
}
export function autoAddTestPaper(params){
  return request({
    url:"/auto/addTestPaper",
    method:'get',
    params
  })
}
