<template>
  <div>
    <el-form :inline="true" :model="form" class="form">
      <el-form-item label="题目类型">
        <el-select v-model="form.type" >
          <el-option label="单选题" value="1"></el-option>
          <el-option label="多选题" value="2"></el-option>
          <el-option label="判断题" value="3"></el-option>
          <el-option label="填空题" value="4"></el-option>
          <el-option label="简答题" value="5"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="题目难度" v-show="formShow">
        <el-select clearable v-model="form.difficultLevel" >
          <el-option label="容易" value="0"></el-option>
          <el-option label="一般" value="0.3"></el-option>
          <el-option label="困难" value="0.6"></el-option>
          <el-option label="很困难" value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="知识点"  v-show="formShow">
        <el-select clearable v-model="form.knowledgeTitle" @focus="knowledgeEvent">
          <el-option
            v-for="item in knowledgeTitleList"
            :key="item.knowledgeTitle"
            :label="item.knowledgeTitle"
            :value="item.knowledgeTitle">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="check">校验</el-button>
      </el-form-item>
    </el-form>
    <div class="question">
       <div class="left">
        <div class="leftHead">
          <div>输入区</div>
          <div><a @click='displayRules'  href="#">范例展示</a>&nbsp;&nbsp;<a @click="displayExample" href="#">规则展示</a></div>
        </div>
        <textarea v-model="inputContent" class="input"></textarea>
      </div>
       <div class="center"></div>
       <div class="right"  v-loading="loading">
         <div class="rightHead">展示区</div>
         <div class="rightContent">
           <component
             :obj="obj"
             :is="template"
           ></component>
         </div>
       </div>
    </div>
    <div class="bottom">
      <el-button :disabled="disable" @click="onSubmit" class="button" type="primary">提交</el-button>
    </div>
    <el-dialog
        :title="dialogTitle"
        :visible="dialogVisible"
        class="autoDialog"
        :before-close="handleClose">
      <div class="dialogDiv" v-html="dialogContent"></div>
      <span slot="footer" class="dialog-footer">
       <el-button  type="primary" @click="()=>{dialogVisible=false}">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import { libFormat,batAddSAMLib,batAddSAMSuggest}  from '@/api/public'
  import {rulesContent,exampleContent} from './dialogContent'
  import Single from  '@/components/AutoQuestion/Single'
  import Double from  '@/components/AutoQuestion/Double'
  import blankFill from  '@/components/AutoQuestion/blankFill'
  import Blank from  '@/components/AutoQuestion/Blank'
  import { mapGetters } from 'vuex'
  import {queryKnowledge}from '@/api/manager'
  export default {
    name: "AutoExport",
    data(){
      return {
        submitFunc:'',
        form:{
          difficultLevel:'0',
          type:'1',
          knowledgeTitle:'',
          courseId:"",
        },
        knowledgeTitleList:[],
        type:'1',
        inputContent:'',
        loading:false,
        disable:true,
        dialogVisible:false,
        dialogTitle:'',
        dialogContent:'',
        template:'Single',
        obj:[],
        formShow:true,

      }
    },
    computed:{
      ...mapGetters(['getParams','getId'])
    },
    components:{
      Single,
      Double,
      blankFill,
      Blank
    },
    methods:{
      knowledgeEvent() {
        queryKnowledge({courseId: this.courseId}).then(res => {
          if (res.success) {
            this.knowledgeTitleList = res.obj
          } else {
            this.$message.info(res.msg)
          }
        })
      },
      typeChange(){
        switch (this.type){
          case '1':
            this.template="Single";
            break;
          case '2':
            this.template='Double';
            break;
          case  '3':
            this.template='blankFill';
            break;
          case  '4':
            this.template='Blank';
            break;
          case  '5':
            this.template='blankFill';
            break;
        }
      },
      displayRules(){
        this.dialogTitle='规则展示';
        this.dialogContent=rulesContent;
        this.dialogVisible=true;
      },
      displayExample(){
        this.dialogTitle='实例展示';
        this.dialogContent=exampleContent;
        this.dialogVisible=true;
      },
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            this.dialogVisible=false;
          })
          .catch(_ => {});
      },
      check(){
        if(this.inputContent.length==0){
          this.$message({
            type:'warning',
            message:'请输入内容',
          })
        }else{
          this.loading=true;
          const params=Object.assign({},{type:this.form.type,txt:this.inputContent});
           libFormat(params).then(res=>{
             this.type=this.form.type;
             this.typeChange();
             this.obj=res.obj;
             if(res.success==true){
              this.loading=false;
              if(res.msg.length!=0){
                this.disable=false;
              }
            }else {
              this.$message({
                type:'warning',
                message:res.msg
              })
              this.loading=false;
            }
          })
        }
      },
      onSubmit(){
        var form=_.cloneDeep(this.form);
        for(var key in form){
          if(key=='type') form[key]=this.type
        }
        var params=Object.assign({},form,{obj:this.obj})
        if(this.getParams.roleLevel=='3'){
          delete params.difficultLevel;
          delete params.knowledgeTitle;
          params.sno=this.getParams.username
          this.submitFunc = batAddSAMSuggest
        }else this.submitFunc = batAddSAMLib
        this.submitFunc(params).then(res=>{
          if(res.success==true){
            this.disable=true;
            this.inputContent='';
            this.obj=[];
            this.$message({
              type:'success',
              message:'上传题目成功',
            })
          }else{
            this.$message({
              type:'warning',
              message:res.msg
            })
          }
        })
      }
    },
    mounted(){
      this.form.courseId=this.getId;
      this.formShow=this.getParams.roleLevel=='3'?false:true;
      this.typeChange();
    }
  }
</script>

<style scoped  lang="scss">
  .editorBar{
    padding: 0 10px;
  }
  .question{
    background: #F3F3F5;
    display: flex;
    justify-content: space-between;
    height: 450px;
  }
  .left{
    width: 44%;
    padding: 0 19px 0px 20px;
  }
  .center{
    height: 446px;
    margin: 2px 0;
    border: 1px solid gray;
  }
  .leftHead{
    padding: 10px 0px;
    width: 100%;
    div:nth-child(1){
      display: inline-block;
    }
    div:last-child{
      float: right;
    }
  }
  .input{
    width: 100%;
    height: 403px;
    font-size: 17px;
    line-height: 20px;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;

  }

  .right{
    padding: 0 20px 0px 19px;
    width: 44%;
  }
  .rightHead{
    padding: 10px 0px;
  }
  .rightContent{
    width: 100%;
    max-height: 403px;
    min-height: 403px;
    overflow-y: auto;
    border: 1px solid #A9A9A9;
  }
  .rightButton{
    margin-top: 10px;
    width: 100%;
  }
  .bottom{
    width: 100%;
    margin-top: 10px;
  }
  .button{
    width: 100%;
  }
  .autoDialog{
    /deep/ .el-dialog__body{
      border: 1px dashed lightgreen;
      margin: 10px 20px;
      padding: 10px 20px;
    }
    .dialogDiv{
      height: 200px;
      overflow-y: scroll;
    }
  }
</style>
