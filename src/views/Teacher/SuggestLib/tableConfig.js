export const btnConfig=[
  {colLength:8,event:'VIEW',icon:'fa fa-check-square',label:'查看'},
  {colLength:8,event:'ACCEPT',icon:'fa fa-times-rectangle',label:'通过'},
  {colLength:8,event:'REJECT',icon:'fa fa-times-rectangle',label:'驳回'},
];
export const tableConfig={
  selection:true,
  list:[
    {prop:'id',label:'题号'},
    {prop:'courseId',label:'课程号'},
    {prop:'questionContent',label:'题目'},
    {prop:'suggestState',label:'审核状态'},
  ],
};
