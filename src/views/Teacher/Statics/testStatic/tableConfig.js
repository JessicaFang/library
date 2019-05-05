export const btnConfig=[
  {colLength:8,event:'VIEW',icon:'fa fa-check-square',label:'试卷统计查看'},
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
  ],
};
