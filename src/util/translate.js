export function translate(obj){
  var list=_.cloneDeep(obj);
  for(var index=0;index<list.length;index++){
    list[index].no=list[index].tno||list[index].sno;
    list[index].title=list[index].myClass||list[index].myTitle;
  }
  return list;
}
export function translateDiff(obj){
  var list=_.cloneDeep(obj);
  for(var index=0;index<list.length;index++){
    const difficultLevel=list[index].difficultLevel;
    if(difficultLevel==0)  list[index].difficultLevel='容易';
    else if(difficultLevel==0.3)  list[index].difficultLevel='一般';
    else if(difficultLevel==0.6)  list[index].difficultLevel='困难';
    else if(difficultLevel==0.9)  list[index].difficultLevel='很困难';
  }
  return list;
}
