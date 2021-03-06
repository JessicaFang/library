export const btnConfig=[
  {colLength:8,event:'ALTERQ',icon:'fa fa-check-square',label:'修改'},
  {colLength:8,event:'EXPORTQ',icon:'fa fa-times-rectangle',label:'导出'},
  {colLength:8,event:'DELETEQ',icon:'fa fa-times-rectangle',label:'删除'},
  {colLength:8,event:'GOBACK',icon:'fa fa-times-rectangle',label:'返回上一页'},
];
export const tableConfig={
  selection:true,
  list:[
    {prop:'id',label:'题号'},
    {prop:'courseId',label:'课程号'},
    {prop:'questionContent',label:'题目'},
    {prop:'difficultLevel',label:'难度'},
    {prop:'knowledgeTitle',label:'知识点'},
  ],
};
