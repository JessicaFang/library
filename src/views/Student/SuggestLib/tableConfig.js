export const btnConfig=[
  {colLength:8,event:'ALTERQ',icon:'fa fa-check-square',label:'修改'},
  {colLength:8,event:'EXPORTQ',icon:'fa fa-times-rectangle',label:'导出'},
  {colLength:8,event:'DELETEQ',icon:'fa fa-times-rectangle',label:'删除'},
  {colLength:8,event:'REVIEW',icon:'fa fa-times-rectangle',label:'提交审核'},
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
