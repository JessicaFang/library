<template>
  <div>
    <el-card  v-for="(item,index1) in list" :key="index1">
    <div class="title">题目</div>
      <div v-html="item.question"></div>
      <div class="double">答案</div>
      <div v-for="(opt,index2) in item.options" :key="index2" class="answers">
        <input disabled v-model="item.answer" type="checkbox" :value="index2" />
        <div v-html="opt"></div>
    </div>
      <div v-show="item.errorMsg">
        <div class="error">输入错误 ：</div>
        {{item.errorMsg}}
      </div>
    </el-card>
  </div>
</template>

<script>
  import { validate } from '@/util/validate'
  import editorBar from '@/components/editor/editorBar'
  export default {
    name: "index",
    data() {
      return {
        list:[],
      }
    },
    props: {
      obj: {
        type: Array,
        default: [],
      },
      flag:{
        type:Boolean,
        default:false,
      }
    },
    watch: {
      obj: {
        handler(obj) {
          this.init(obj);
        },
          immediate: true
      },
    },
    methods:{
      init(obj){
        this.list=_.cloneDeep(obj);
        for (var i = 0; i < this.list.length; i++) {
          var answer=this.list[i].answer.split("");
          answer.forEach((item,index)=>{
            answer[index]=item.charCodeAt(0)-65;
          })
          this.list[i].answer=answer
        }
      }
    },
    beforeMount(){
      if(this.flag){
        this.init(this.obj);
      }
    }
  }



</script>

<style scoped>
  .answers{
    display: flex;
    align-items: center;
    margin: 8px 0;
  }
  .title,.double,.error{
    width: 60px;
    background: #409EFF;
    margin: 0px 0px 10px 0px;
    text-align: center;
    color: white;
    border-radius: 2px;
    height: 20px;
    padding:5px 0px;
  }
  .double{
    margin-top: 10px;
  }
  .error{
    width: 100px;
    background: #F56C6C;
    margin-top: 10px;
  }
</style>
