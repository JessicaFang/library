<template>
  <div>
    <el-card v-for="(item,index1) in list" :key="index1">
    <div class="title">题目</div>
      <div v-html="item.question"></div>
    <div class="blank">答案</div>
       <div class="answer" v-html="item.answer"></div>
    <div class="blank" v-show="rules">评分规则</div>
       <div class="answer" v-html="item.rules"></div>
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
      return {
        list:[],
      }
    },
    props:{
      obj:{
        type:Array,
        default:[],
      },
      flag:{
        type:Boolean,
        default:false,
      }
    },
    watch:{
      obj:function (obj) {
        this.list=_.cloneDeep(obj);
      }
    },
    beforeMount(){
      if(this.flag){
        this.list=_.cloneDeep(this.obj);
      }
    }
  }


</script>

<style scoped>
  .title,.blank,.error{
    width: 60px;
    background: #409EFF;
    margin: 0px 0px 10px 0px;
    text-align: center;
    color: white;
    border-radius: 2px;
    height: 20px;
    padding:5px 0px;
  }
  .blank{
    margin-top: 10px;
  }
  .error{
    margin-top: 10px;
    width: 100px;
    background: #F56C6C;
  }

</style>
