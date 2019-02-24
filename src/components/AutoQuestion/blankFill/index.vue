<template>
  <div>
    <el-card v-for="(item,index1) in list" :key="index1">
    <div class="title">题目</div>
      {{item.question}}
    <div class="blank">答案</div>
       {{item.answer}}
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
      }
    },
    watch:{
      obj:function (obj) {
        this.list=_.cloneDeep(obj);
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
