<template>
  <div>
    <div class="title">题目</div>
    <editor-bar v-model="questionForm.myQuestion" @htmlChange="val=>change(val,'myQuestion')"></editor-bar>
    <div class="answerTitle">答案</div>
    <div class="answer">
        <editor-bar v-model="questionForm.myAnswer" :showToolBar="showToolBar" @htmlChange="val=>change(val,'myAnswer')"></editor-bar>
    </div>
    <div class="answerTitle">关键词</div>
    <div class="answer">
        <el-input v-model="questionForm.detailReviewRules"></el-input>
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
          myQuestion:'',
          myAnswer:'',
          detailReviewRules:''
        },
        showToolBar:false,
      }
    },
    computed:{
      ...mapGetters(['getQuestMes'])
    },
    components:{
      editorBar
    },
    props:{
      questionMes:{
        type:Object,
        default:function () {
          return {};
        },
      }
    },
    methods:{
      change(val,type){
        this.questionForm[type]=val;
      },
      check(){
        var message='';
        if(this.validate(this.questionForm.myQuestion)){
          if(this.questionForm.myAnswer.trim().length==0){
            message="请进行答案的填写";
            return message
          }
        }else {
          message="请进行题目的填写";
          return message;
        }
        return message
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
      const data=this.questionMes;
      if(data!=undefined&&Object.keys(data).length!=0){
        this.questionForm.myQuestion=data.myQuestion;
        this.questionForm.myAnswer=data.myAnswer;
        this.questionForm.detailReviewRules=data.detailReviewRules;
      }else{
        this.validate=validate;
      }
    }
  }


</script>

<style scoped lang="scss">
  .answer{
    /deep/ .editor{
      height: 400px;
    }
    /deep/ .status{
    height: 360px;
   }
  }
  .title,.answerTitle {
    width: 60px;
    background: #409EFF;
    margin: 15px 2px 10px 2px;
    text-align: center;
    color: white;
    border-radius: 2px;
    height: 20px;
    padding: 5px 0px;
  }
  .answerTitle{
    margin-top: 30px;
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
