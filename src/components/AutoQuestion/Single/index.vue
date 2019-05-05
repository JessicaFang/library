<template>
  <div>
   <el-card v-for="(item,index1) in list" :key="index1">
     <div class="title">题目</div>
      <div v-html="item.question"></div>
     <div class="single">答案</div>
     <div v-for="(opt,index2) in item.options" :key="index2" class="answers">
        <el-radio v-model="item.answer" disabled  :label="index2"></el-radio>
        <div  v-html="opt"></div>
     </div>
     <div v-show="item.errorMsg">
        <div class="error">输入错误 ：</div>
        {{item.errorMsg}}
     </div>
    </el-card>
  </div>
</template>

<script>
    export default {
      name: "index",
      data(){
        return{
          list:[]
        }
      },
      props:{
        obj:{
          type:Array,
          default:[],
        } ,
        flag:{
          type:Boolean,
          default:false,
        }
      },
      watch:{
        obj: {
          handler(obj) {
            this.init(obj);
          },
          immediate: true
        },
      },
      methods:{
        init(obj) {
          this.list = _.cloneDeep(obj);
          for (var i = 0; i < this.list.length; i++) {
            var answer = this.list[i].answer;
            if (answer) {
              this.list[i].answer = answer.charCodeAt(0) - 65;
            }
          }
        }
      },
      beforeMount(){
        if(this.flag) {
          this.init(this.obj)
        }
      }
    }


</script>

<style scoped>
/deep/ .el-radio__label{
  display: none;
}
/deep/ .el-radio__input.is-disabled.is-checked .el-radio__inner::after{
  background:#409EFF;
}
  .title, .single,.error{
    width: 60px;
    background: #409EFF;
    margin: 0px 0px 10px 0px;
    text-align: center;
    color: white;
    border-radius: 2px;
    height: 20px;
    padding:5px 0px;
  }
  .error{
    width: 100px;
    background: #F56C6C;
    margin-top: 10px;
  }
 .single{
   margin-top: 10px;
 }
  .answers{
    display: flex;
    align-items: center;
    margin: 8px 0;
  }
</style>
