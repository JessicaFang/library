<template>
  <div class="paperContent">
    <div class="right">
      <div class="head">{{paperTitle}}</div>
      <div class="content">
        <div class="question">
          <div class="totalQuestion">
            <h3 class="title" >单选题</h3>
            <el-button class="title" type="primary" @click="questionSelect('singleCount')">题目数量选择</el-button>
            题目数量：{{single.length}},每道题分数：{{single.count}}
          </div>
          <div class="totalQuestion">
            <h3 class="title">多选题</h3>
            <el-button class="title" type="primary" @click="questionSelect('multipleCount')">题目数量选择</el-button>
            题目数量：{{double.length}},每道题分数：{{double.count}}
          </div>
          <div class="totalQuestion">
            <h3 class="title">判断题</h3>
            <el-button class="title" type="primary" @click="questionSelect('judgeCount')">题目数量选择</el-button>
            题目数量：{{judge.length}},每道题分数：{{judge.count}}
          </div>
          <div class="totalQuestion">
            <h3 class="title">填空题</h3>
            <el-button class="title" type="primary" @click="questionSelect('blankCount')">题目数量选择</el-button>
            题目数量：{{blank.length}},每道题分数：{{blank.count}}
          </div>
          <div class="totalQuestion">
            <h3 class="title">问答题</h3>
            <el-button class="title" type="primary" @click="questionSelect('questionCount')">题目数量选择</el-button>
            题目数量：{{my.length}},每道题分数：{{my.count}}
          </div>
        </div>
      </div>
      <div>
        <el-button class="submitButton" type="primary" @click="submit">提交试卷</el-button>
      </div>
    </div>
    <div v-if="dialogVisible">
      <el-dialog
        title="题目列表"
        :visible="visible"
        :before-close="handleClose">
        <el-form  :rules="rules" ref="form"  :model="form"  label-width="80px" class="form">
          <el-form-item label="题目数量" prop="paperLength">
            <el-input placeholder="请输入题目数量" v-model="form.paperLength" ></el-input>题目最多有{{maxNumber}}道，请不要输入超过
          </el-form-item>
          <el-form-item label="题目分数" prop="paperCount">
            <el-input placeholder="请输入每道题目分数" v-model="form.paperCount" ></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
             <el-button @click="dialogVisible = false">取消</el-button>
             <el-button @click="getQuestion" type="primary">确定</el-button>
           </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  import { mapGetters,mapActions } from 'vuex';
  import {calPoint} from '@/util/calPoint'
  import {beforeAddTestPaper}from '@/api/teacher'
  export default {
    name: "paperContent",
    data(){
      return {
        dialogVisible:false,
        visible:true,
        questionType:'',
        type:'',
        paperTitle:'',
        single:{ length:'0',count:'0'},
        double:{ length:'0',count:'0'},
        judge:{ length:'0',count:'0'},
        blank:{length:'0',count:'0'},
        my:{length:'0',count:'0'},
        form:{
          paperLength:'0',
          paperCount:'0',
        },
        rules:{
          paperLength:[
            {
              validator: (rule, value, callback) => {
                var reg = /^[1-9][0-9]+$|^[0-9]$/
                if (value === '') {
                  callback(new Error('请输入题目数量'));
                }else if(value>this.maxNumber){
                  callback('请不要输入超过最大数量');
                }else if (!reg.test(value)) {
                  callback(new Error('请输入正确的题目数量'));
                }else{
                  callback();
                }
              },trigger:'change'
            }
          ],
          paperCount: [
            {
              validator: (rule, value, callback) => {
                var reg =/^[0-9]+\.?[0-9]*$/
                if (value === '') {
                  callback(new Error('请输入每道题的分数'));
                } else if (!reg.test(value)) {
                  callback(new Error('请输入正确的分数'));
                } else {
                  callback();
                }
              },trigger:'change'
            }
          ],
        },
        maxNumber:0,
      }
    },
    computed:{
      ...mapGetters(['getPaper','getPoint','getActive','getId']),
    },
    watch:{

    },
    beforeMount(){
      this.paperTitle=this.getPaper['testPaper']['paperTitle']
    },
    methods:{
      ...mapActions( // 语法糖
        ['setPaperActions','setPointActions','setActiveActions']
      ),
      questionSelect(type){
        this.type=type;
        var obj={'questionCount':10,'singleCount':14,'judgeCount':34,'blankCount':32,'multipleCount':9};
        this.maxNumber=obj[this.type];
        this.changeForm();
        this.$nextTick(()=>{
          this.dialogVisible=true;
        })
        /* beforeAddTestPaper().then(res=>{
            if(res.success===true){
              this.maxNumber=res.obj[this.type];
              this.$nextTick(()=>{
                this.dialogVisible=true;
              })
            }
         })*/
      },
      changeForm() {
        switch (this.type) {
          case 'singleCount':
            this.form.paperLength=this.single.length;
            this.form.paperCount=this.single.count;
            break;
          case 'multipleCount':
            this.form.paperLength=this.double.length;
            this.form.paperCount=this.double.count;
            break;
          case 'judgeCount':
            this.form.paperLength=this.judge.length;
            this.form.paperCount=this.judge.count;
            break;
          case 'blankCount':
            this.form.paperLength=this.blank.length;
            this.form.paperCount=this.blank.count;
            break;
          case 'questionCount':
            this.form.paperLength=this.my.length;
            this.form.paperCount=this.my.count;
            break;
        }
      },
      changeFormVerse(){
        switch (this.type) {
          case 'singleCount':
            this.single.length=this.form.paperLength;
            this.single.count=this.form.paperCount;
            break;
          case 'multipleCount':
            this.double.length=this.form.paperLength;
            this.double.count=this.form.paperCount;
            break;
          case 'judgeCount':
            this.judge.length=this.form.paperLength;
            this.judge.count=this.form.paperCount;
            break;
          case 'blankCount':
            this.blank.length=this.form.paperLength;
            this.blank.count=this.form.paperCount;
            break;
          case 'questionCount':
            this.my.length=this.form.paperLength;
            this.my.count=this.form.paperCount;
            break;
        }
      },
      getQuestion(){
        this.$refs.form.validate((valid) => {
          if (valid) {
            this.changeFormVerse();
            this.$nextTick(res=> {
              this.dialogVisible = false;
            })
          }else {
            console.log('error submit!!');
          }
        })
      },
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            this.dialogVisible=false;
          })
          .catch(_ => {});
      },
      submit(){
        var message=this.check();
        if(message){
          this.$message({
            type:'warning',
            message:message,
          })
        }else {
          var obj={
            paperTitle:this.paperTitle,
            courseId:this.getId,
            singleCount:this.single.length,
            singlePoints:this.single.count,
            multipleCount:this.double.length,
            multiplePoints:this.double.count,
            judgeCount:this.judge.length,
            judgePoints:this.judge.count,
            blankCount:this.blank.length,
            blankPoints:this.blank.count,
            questionCount:this.my.length,
            questionPoints:this.my.count,
          }
            this.setActiveActions({active: 3, source: 'paperContentAuto'});
          }
        },
      check(){
        if(this.single.length=='0'&&this.double.length=='0'&&this.judge.length=='0'&&this.blank.length=='0'&&this.my.length=='0'){
          return '请进行题目的输入';
        }else{
          if((this.single.length.trim()=='0'&&this.single.count.trim()!='0')||(this.single.length.trim()!='0'&&this.single.count.trim()=='0')){
              return '请进行正确的单选成绩输入'
          }
          if((this.double.length.trim()=='0'&&this.double.count.trim()!='0')||(this.double.length.trim()!='0'&&this.double.count.trim()=='0')){
            return '请进行正确的多选成绩输入'
          }
          if((this.judge.length.trim()=='0'&&this.judge.count.trim()!='0')||(this.judge.length.trim()!='0'&&this.judge.count.trim()=='0')){
            return '请进行正确的判断成绩输入'
          }
          if((this.my.length.trim()=='0'&&this.my.count.trim()!='0')||(this.my.length.trim()!='0'&&this.my.count.trim()=='0')){
            return '请进行正确的填空成绩输入'
          }
        }
        return;
      }
    }
  }
</script>

<style scoped lang="scss">
  .right{
    margin-top: 10px;
    width: 90%;
    padding: 0 5%;
    vertical-align: top;
    .head{
      text-align: center;
      font-size: 20px;
      font-weight:bold;
      padding: 20px;
      border-bottom: 1px solid silver;
    }
  }
  .select{
    margin-top: 10px;
  }

  .totalQuestion{
    margin-bottom:10px ;
    border-bottom: 1px solid silver;
  }
  .title{
    margin:10px 0;
  }
  .submitButton{
    margin: 20px 0 10px 0;
    width: 100%;
  }
</style>
