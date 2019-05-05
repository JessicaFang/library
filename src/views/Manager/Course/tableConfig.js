export const btnConfig=[
  {colLength:8,event:'ADD',icon:'fa fa-check-square',label:'添加'},
  {colLength:8,event:'DELETE',icon:'fa fa-times-rectangle',label:'删除'},
  {colLength:8,event:'ALTER',icon:'fa fa-times-rectangle',label:'修改'},
  {colLength:8,event:'CHARGEK',icon:'fa fa-times-rectangle',label:'知识点管理'},
  {colLength:8,event:'CHOICEM',icon:'fa fa-times-rectangle',label:'选择负责人'},
  {colLength:8,event:'DELETEM',icon:'fa fa-times-rectangle',label:'删除负责人'},
  {colLength:8,event:'CHOICES',icon:'fa fa-times-rectangle',label:'选择学生'},
  {colLength:8,event:'DELETES',icon:'fa fa-times-rectangle',label:'删除学生'},
  {colLength:8,event:'IMPORT',icon:'fa fa-times-rectangle',label:'题库导入'},
];
export const tableConfig={
  selection:true,
  list:[
    {prop:'courseId',label:'课程号'},
    {prop:'courseName',label:'课程名'},
    {prop:'courseIntroduction',label:'课程介绍'},
  ],
};
