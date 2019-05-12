export const btnConfig=[
  {colLength:8,event:'ALTERQTEST',icon:'fa fa-check-square',label:'修改试卷'},
  {colLength:8,event:'ALTERQPUBLIC',icon:'fa fa-check-square',label:'修改发布信息'},
  {colLength:8,event:'DELETEQ',icon:'fa fa-times-rectangle',label:'删除'},
  {colLength:8,event:'GOBACK',icon:'fa fa-times-rectangle',label:'返回上一页'},
];
export const tableConfig={
  selection:true,
  list:[
    {prop:'paperId',label:'试卷号'},
    {prop:'paperTitle',label:'试题名称'},
    {prop:'testTime',label:'考试时间',width:300},
    {prop:'minutesLength',label:'考试时长'},
    {prop:'passingScore',label:'及格分数'},
    {prop:'totalPoints',label:'总分'},
    {prop:'paperState',label:'试卷状态'}
  ],
};
