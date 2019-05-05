<template>
  <div>
    <el-form :inline="true" :model="form" class="form" v-show="showForm">
      <el-form-item label="题目难度">
        <el-select  clearable v-model="form.difficultLevel" placeholder="请选择题目难度">
          <el-option label="较容易" value="0"></el-option>
          <el-option label="容易" value="0.3"></el-option>
          <el-option label="较困难" value="0.6"></el-option>
          <el-option label="困难" value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="知识点">
        <el-select  clearable v-model="form.knowledgeTitle" placeholder="请选择题目难度">
          <el-option label="物理" value="物理"></el-option>
          <el-option label="知识点" value="知识点"></el-option>
          <el-option label="化学" value="化学"></el-option>
          <el-option label="英语" value="英语"></el-option>
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
  import { mapGetters } from 'vuex';
  export default {
    name: "HandExport",
    data(){
      return {
        form:{},
        template:'Single',
        questionMes:{},
        roleLevel:'',
        submitFunction:'',
        showForm:true,
      }
    },
    computed: {
      ...mapGetters(['getQuestMes','getParams'])
    },
    components:{
      Single,
      Double,
      blankFill,
      Judge,
      essayTest
    },
    methods:{
      typeChange(){
        switch (this.getQuestMes.type){
          case '1':
            this.template="Single";
            break;
          case '2':
            this.template='Double';
            break;
          case  '3':
            this.template='blankFill';
            break;
          case '4':
            this.template='Judge';
            break;
          case  '5':
            this.template='essayTest';
            break;
        }
      },
      submit(data){
        const Message=this.getQuestMes.data;
        const params=Object.assign({},{id:Message.id,courseId:Message.courseId,type:this.getQuestMes.type},this.form,data);
        this.submitFunction(params).then(res=>{
           if(res.success==true){
             reset(this.getQuestMes.type,this.$refs.question);
             this.$message({
               type:'success',
               message:'修改题目成功'
             })
             this.$router.go(-1);
           }else{
             this.$message({
               type:'warning',
               message:'修改题目失败'
             })
          }
        })
      }
    },
    beforeMount(){
      console.log("hello")
      this.roleLevel=this.getParams.roleLevel;
      if(this.roleLevel=='3'){
        this.submitFunction=saveSuggest;
        this.showForm=false;
      }else{
        this.form.difficultLevel=this.getQuestMes.data.difficultLevel;
        this.form.knowledgeTitle=this.getQuestMes.data.knowledgeTitle;
        this.submitFunction=saveLib;
      }
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
