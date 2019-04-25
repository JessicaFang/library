export const btnConfig=[
  {colLength:8,event:'ADDPAPER',icon:'fa fa-times-rectangle',label:'查阅试卷'},
  {colLength:8,event:'ALTER',icon:'fa fa-times-rectangle',label:'批改试卷'},
  {colLength:8,event:'GOBACK',icon:'fa fa-times-rectangle',label:'返回上一页'},
];
export const tableConfig={
  selection:true,
  list:[
    {prop:'paperTitle',label:'试卷名称'},
    {prop:'name',label:'学生姓名'},
    {prop:'allTotalScore',label:'考试分数'},
    {prop:'passingScore',label:'及格分数'},
    {prop:'testTime',label:'考试时间',width:250},
    {prop:'minutesLength',label:'考试时长'},
    {prop:'paperState',label:'试卷状态'},

  ],
};
