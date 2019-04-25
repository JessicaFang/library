export  function calPoint(point){
  var pointArr=_.cloneDeep(point);
  var result=0;
  var rex=/^[0-9]+\.?[0-9]*$/
  for(var i=0;i<pointArr.length;i++){
    if(pointArr[i]===undefined){
      pointArr[i]=0;
    }else if(typeof pointArr[i] == "string"){
      pointArr[i]=pointArr[i].trim();
      if(pointArr[i]==''){
        pointArr[i]=0;
      }
    }
    if(rex.test(pointArr[i])){
      result=result + parseFloat(pointArr[i]);
    }else{
      result=NaN;
      return result;
    }
  }
  return result;
}
