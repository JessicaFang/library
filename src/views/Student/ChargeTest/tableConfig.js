export const btnConfig=[
  {colLength:8,event:'ADDPAPER',icon:'fa fa-times-rectangle',label:'查看试卷'},
];
export const tableConfig={
  selection:true,
  list:[
    {prop:'paperTitle',label:'试卷名称'},
    {prop:'courseId',label:'课程号'},
    {prop:'allTotalScore',label:'考试分数'},
    {prop:'passingScore',label:'及格分数'},
    {prop:'testTime',label:'考试时间',width:250},
    {prop:'minutesLength',label:'考试时长'},
  ],
};
