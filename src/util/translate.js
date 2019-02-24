export function translate(obj){
  var list=_.cloneDeep(obj);
  for(var index=0;index<list.length;index++){
    list[index].no=list[index].tno||list[index].sno;
    list[index].title=list[index].myClass||list[index].myTitle;
  }
  return list;
}
