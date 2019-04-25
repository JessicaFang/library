<template>
  <div>
    <el-form :inline="true" :model="form" class="form">
      <el-form-item label="题目难度">
        <el-select v-model="form.difficultLevel" placeholder="请选择题目难度">
          <el-option label="较容易" value="0"></el-option>
          <el-option label="容易" value="0.3"></el-option>
          <el-option label="较困难" value="0.6"></el-option>
          <el-option label="困难" value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="知识点">
        <el-select v-model="form.knowledgeTitle" placeholder="请选择题目难度" multiple>
          <el-option label="知识点" value="知识点"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <component
      @submit="submit"
      :config="form"
      :is="template"
      :questionMes="questionMes"
      ref="question"
    ></component>
  </div>
</template>

<script>
  import { saveLib } from '@/api/manager'
  import { saveSuggest } from "@/api/student";
  import { reset }  from '@/util/reset'
  import Single from  '@/components/Question/Single'
  import Double from  '@/components/Question/Double'
  import blankFill from  '@/components/Question/blankFill'
  import Judge from  '@/components/Question/Judge'
  import essayTest from  '@/components/Question/essayTest'
  import { mapGetters,mapActions } from 'vuex';
  export default {
    name: "HandExport",
    data(){
      return {
        form:{
          difficultLevel:'',
          knowledgeTitle:'',
        },
        template:'Single',
        questionMes:{},
        roleLevel:'',
        submitFunction:'',
      }
    },
    computed: {
      ...mapGetters(['getQuestMes','getPaper'])
    },
    components:{
      Single,
      Double,
      blankFill,
      Judge,
      essayTest
    },
    methods:{
      ...mapActions( // 语法糖
        ['setActiveActions','setPaperActions'] // 相当于this.$store.dispatch('modifyName'),提交这个方法
      ),
      typeChange(){
        switch (this.getQuestMes.type){
          case '1':
            this.template="Single";
            break;
          case '2':
            this.template='Double';
            break;
          case  '3':
            this.template='Judge';
            break;
          case '4':
            this.template='blankFill';
            break;
          case  '5':
            this.template='essayTest';
            break;
        }
      },
      submit(data){
        this.dealData(data);
        this.setActiveActions({active:2,source:'AlterQuestion',alterFlag:true});
        this.$router.go(-1);
        /*const Message=this.getQuestMes.data;
        const params=Object.assign({},{id:Message.id,courseId:Message.courseId,type:this.getQuestMes.type},this.form,data);
        this.submitFunction(params).then(res=>{
           if(res.success==true){
             reset(this.getQuestMes.type,this.$refs.question);
             this.$message({
               type:'success',
               message:'修改题目成功'
             })
           }else{
             this.$message({
               type:'warning',
               message:'修改题目失败'
             })
          }
        })*/
      },
      dealData(data){
        const tempData=_.cloneDeep(data);
        const index=this.getQuestMes.index;
        const type=this.getQuestMes.type;
        switch (type){
          case '1':
            var questionIndex=this.getPaper['testSingleVos'][index];
            var obj={
              singleQuestion:tempData.singleQuestion,
              singleTestChoice:tempData.options,
              singleTestAnswer:tempData.trueIndex,
              knowledgeTest:this.form.knowledgeTitle,
              difficultLevel:this.form.difficultLevel,
              singlePoints:questionIndex.singlePoints,
              testSingleId:questionIndex.testSingleId,
            };
            this.setPaperActions({name:'testSingleVos',subName:index,value:obj,flag:true});
            break;
          case '2':
            var questionIndex=this.getPaper['testMultipleVos'][index];
            var obj={
              multipleQuestion:tempData.multipleQuestion,
              multipleTestChoice:tempData.options,
              multipleTestAnswer:tempData.trueIndex,
              knowledgeTest:this.form.knowledgeTitle,
              difficultLevel:this.form.difficultLevel,
              multiplePoints:questionIndex.multiplePoints,
              testMultipleId:questionIndex.testMultipleId,
            };
            this.setPaperActions({name:'testMultipleVos',subName:index,value:obj,flag:true});
            break;
          case '3':
            var questionIndex=this.getPaper['testJudgeVos'][index];
            tempData.judgeAnswer=tempData.judgeAnswer=='1'?true:false;
            var obj={
              judgeQuestion:tempData.judgeQuestion,
              judgeAnswer:tempData.judgeAnswer,
              knowledgeTest:this.form.knowledgeTitle,
              difficultLevel:this.form.difficultLevel,
              judgePoints:questionIndex.judgePoints,
              testJudgeId:questionIndex.testJudgeId,
            };
            this.setPaperActions({name:'testJudgeVos',subName:index,value:obj,flag:true});
            break;
          case '4':
            var questionIndex=this.getPaper['testBlankVos'][index];
            var obj={
              blankQuestion:tempData.blankQuestion,
              blankAnswer:tempData.blankAnswer,
              knowledgeTest:this.form.knowledgeTitle,
              difficultLevel:this.form.difficultLevel,
              blankPoints:questionIndex.blankPoints,
              testBlankId:questionIndex.testBlankId
            };
            this.setPaperActions({name:'testBlankVos',subName:index,value:obj,flag:true});
            break;
          case '5':
            var questionIndex=this.getPaper['testQuestionVos'][index];
            var obj={
              myQuestion:tempData.myQuestion,
              myAnswer:tempData.myAnswer,
              detailReviewRules:tempData.detailReviewRules,
              knowledgeTest:this.form.knowledgeTitle,
              difficultLevel:this.form.difficultLevel,
              myPoints:questionIndex.myPoints,
              testQuestionId:questionIndex.testQuestionId,
            };
            this.setPaperActions({name:'testQuestionVos',subName:index,value:obj,flag:true});
        };
      }
    },
    beforeMount(){
      this.form.difficultLevel=this.getQuestMes.data.difficultLevel;
      this.form.knowledgeTitle=this.getQuestMes.data.knowledgeTitle;
      this.submitFunction=saveLib;
      this.questionMes=this.getQuestMes.data;
      this.typeChange();
    }
  }
</script>

<style scoped>
  .editorBar{
    padding: 0 10px;
  }
</style>
