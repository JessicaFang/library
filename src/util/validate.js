export function validate(message) {
  var pattern1=/</g,pattern2=/>/g;
  var matches1=pattern1.exec(message);
  var flag=true;
  while (flag) {
    matches1=pattern1.exec(message);
    var matches2=pattern2.exec(message);
    if(matches1!=null&&matches2!=null){
      if(matches2.index+1!=matches1.index){
        var content=message.substring(matches2.index+1,matches1.index).replace(/\&nbsp;/g,'');
        if(content.trim().length!=0&&!/<br>/.test(content)){
          flag=false;
          return true;
        }
      }
    }else {
      flag=false;
      return false;
    }
  }
}
