<template>
  <div>
    <div class="title">题目</div>
    <editor-bar v-model="questionForm.judgeQuestion" @htmlChange="val=>change(val,'judgeQuestion')"></editor-bar>
    <div class="choice">选择判断结果</div>
    <div>
      <el-button  :type="choice[0]"  ref="1" @click="judge('1')">正确</el-button>
      <el-button  :type="choice[1]" @click="judge('0')">错误</el-button>
    </div>
    <div class="bottom">
      <el-button class="button" type="primary" @click="onSubmit">提交</el-button>
    </div>
  </div>
</template>

<script>
  import { validate } from '@/util/validate'
  import editorBar from '@/components/editor/editorBar'
  import { mapGetters } from 'vuex';
  export default {
    name: "index",
    data(){
      return{
        questionForm:{
          judgeQuestion:'',
          judgeAnswer:''
        },
        choice:['',''],
      }
    },
    props:{
      questionMes:{
        type:Object,
        default:function () {
          return {};
        },
      }
    },
    components:{
      editorBar
    },
    computed:{
      ...mapGetters(['getQuestMes'])
    },
    methods:{
      change(val,type,index){
         this.questionForm[type]=val;
      },
      check(){
        var message='';
        if(validate(this.questionForm.judgeQuestion)){
          if(this.questionForm.judgeAnswer.length==0){
            message="请选择正确与否";
            return message
          }
        }else {
          message="请进行题目的填写";
          return message;
        }
        return message
      },
      judge(num){
        this.choice=parseInt(num)?['success','']:['','success'];
        this.questionForm.judgeAnswer=num;
      },
      validate(message){
        if(message.trim()!=''){
          return true;
        }else{
          return false;
        }
      },
      onSubmit(){
        var message=this.check();
        console.log(this.questionForm)
        if (message.length!=0){
          this.$message({
            message:message,
            type:'warning',
          })
        }else{
          const form=_.cloneDeep(this.questionForm);
          this.$emit('submit',form)
        }
      }
    },
    beforeMount(){
      const data=this.questionMes
      if(data!=undefined&&Object.keys(data).length!=0){
        this.questionForm.judgeQuestion=data.judgeQuestion;
        const num=data.judgeAnswer==true?'1':'0';
        this.judge(num);
      }else{
        this.validate=validate;
      }
    }
  }


</script>

<style scoped lang="scss">
  .aContent{
    margin-bottom: 10px;
    padding-left: 2px;
    width: calc(100% - 82px);
  }
  .title,.choice {
    width: 60px;
    background: #409EFF;
    margin: 15px 2px 10px 2px;
    text-align: center;
    color: white;
    border-radius: 2px;
    height: 20px;
    padding: 5px 0px;
  }
  .choice{
    margin-top: 30px;
    width: 150px;
  }
  .button{
    width: 100%;
  }
  .bottom{
    text-align: center;
    width: 100%;
    margin: 10px 0px;
  }

</style>
