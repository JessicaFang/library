<template>
  <div>
    <div class="title">题目</div>
    <editor-bar v-model="questionForm.multipleQuestion" :clear="$attrs" v-on="$listeners"  @htmlChange="val=>change(val,'multipleQuestion')"></editor-bar>
    <div class="double">答案</div>
    <div v-for="(item,index) in 4" :key="index" class="answers">
       <input v-model="questionForm.trueIndex" type="checkbox" :value="index" />
       <editor-bar  class="aContent" v-model="questionForm.options[index]" :clear="$attrs" v-on="$listeners"   @htmlChange="val=>change(val,'options',index)"></editor-bar>
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
          multipleQuestion:'',
          options:[],
          trueIndex:[],
        },

      }
    },
    computed: {
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
      change(val,type,index){
        if(type=='options'){
          this.questionForm[type][index]=val;
        }else{
          this.questionForm[type]=val;
        }
     /*  */
      },
      check(){
        var message='';
        if(this.validate(this.questionForm.multipleQuestion)){
          for(var i=0;i<4;i++){
            if(!this.validate(this.questionForm.options[i])){
              message="请进行选项的填写";
              return message;
            }
          }
          if(this.questionForm.trueIndex.length==0){
            message="请进行正确答案的输入";
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
        console.log(this.questionForm)
        if (message.length!=0){
          this.$message({
            message:message,
            type:'warning',
          })
        }else{
          const form=_.cloneDeep(this.questionForm);
          var trueIndex='';
           form.trueIndex.forEach(item=>{
              trueIndex=trueIndex+item
           });
           form.trueIndex=trueIndex;
          this.$emit('submit',form)
        }
      }
    },
    beforeMount(){
       const data=this.questionMes
      if(data!=undefined&&Object.keys(data).length!=0){
        this.questionForm.multipleQuestion=data.multipleQuestion;
        this.questionForm.options=data.options;
        const tempArray=data.trueIndex.split('');
        tempArray.forEach((item,index)=>{
          this.questionForm.trueIndex[index]=item.charCodeAt(0)-48;
        })
      }else{
        this.validate=validate;
      }
    }
  }
</script>

<style scoped>
  .answers{
    margin-bottom: 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .aContent{
    padding-left: 2px;
    width: calc(100% - 20px);
  }
  .title,.double{
    width: 60px;
    background: #409EFF;
    margin: 15px 2px 10px 2px;
    text-align: center;
    color: white;
    border-radius: 2px;
    height: 20px;
    padding:5px 0px;
  }
  .double{
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
