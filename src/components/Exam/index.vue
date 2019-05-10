<template>
  <div class="examBackground">
    <div class="exam">
      <div class="head">
        <div class="headTitle">
          <h2>{{exam.paperTitle}}</h2>
          <p>{{exam.paperHead}}</p>
        </div>
        <div class="headMessage">
          <span>学号：<span style="color: #020281">{{exam.sno}}</span></span>&nbsp;&nbsp;
          <span v-show="exam.totalPoints">总分：<span style="color: #020281">{{exam.totalPoints}}分</span></span>&nbsp;&nbsp;
          <span v-show="exam.allTotalScore">成绩：<span style="color: #020281">{{exam.allTotalScore}}分</span></span>&nbsp;&nbsp;
          <span v-show="paperState=='1'&&chargeName!=false&&chargeName">批改老师：{{chargeName}}</span>
        </div>
      </div>
      <div class="content">
        <div class="module"  v-if="exam.resultSingleVos&&exam.resultSingleVos.length!=0">
          <h3>单选题</h3>
          <div v-for="(item,index) in exam.resultSingleVos" :key="index" class="question">
            <h6 class="title">{{index+1}}、<span class="questionTitle" v-html="item.testSingleVo.singleQuestion"></span>
              （<span style="color: #020281">{{item.testSingleVo.singlePoints}}分</span>）
            </h6>
            <div v-for="(opt,index2) in item.testSingleVo.singleTestChoice" :key="index2" class="answers">
              <el-radio v-model="item.singleAnswer" disabled  :label="index2+''"></el-radio>
              <span v-text="translate(index2)"></span>、<span class="questionContent" v-html="opt"></span>
            </div>
            <div>
              <div>正确答案：<span>{{translate(item.testSingleVo.singleTestAnswer)}}</span></div>
              <div>学生答案：<span>{{translate(item.singleAnswer)}}</span></div>
              <div>考试结果：<span>{{item.singleScore}}</span>分</div>
            </div>
          </div>
        </div>
        <div  class="module" v-if="exam.resultMultipleVos&&exam.resultMultipleVos.length!=0">
          <h3>多选题</h3>
          <div v-for="(item,index) in exam.resultMultipleVos" :key="index" class="question">
            <h6  class="title">
              {{index+1}}、
              <span class="questionTitle" v-html="item.testMultipleVo.multipleQuestion"></span>
              （<span style="color: #020281">{{item.testMultipleVo.multiplePoints}}分</span>）
            </h6>
            <div v-for="(opt,index2) in item.testMultipleVo.multipleTestChoice" :key="index2" class="answers">
              <input disabled v-model="item.multipleAnswer" type="checkbox" :value="index2" />
              <span v-text="translate(index2)"></span>、<span class="questionContent" v-html="opt"></span>
            </div>
            <div>
              <div>正确答案：<span>{{translateArr(item.testMultipleVo.multipleTestAnswer)}}</span></div>
              <div>学生答案：<span>{{translateArr1(item.multipleAnswer)}}</span></div>
              <div>考试结果：<span >{{item.multipleScore}}</span>分</div>
            </div>
          </div>
        </div>
        <div  class="module" v-if="exam.resultJudgeVos&&exam.resultJudgeVos.length!=0">
          <h3>判断题</h3>
          <div v-for="(item,index) in exam.resultJudgeVos" :key="index" class="question">
            <h6  class="title">
              {{index+1}}、
              <span class="questionTitle" v-html="item.testJudgeVo.judgeQuestion"></span>
              （<span style="color: #020281">{{item.testJudgeVo.judgePoints}}分</span>）
            </h6>
            <div  class="answers">
              <el-radio v-model="item.judgeAnswer" disabled  :label="judge[0]"></el-radio><i class="el-icon-check"></i>&nbsp;&nbsp;&nbsp;&nbsp;
              <el-radio v-model="item.judgeAnswer" disabled  :label="judge[1]"></el-radio><i class="el-icon-close"></i>
            </div>
            <div>
              <div>正确答案：<span ><i v-if="item.testJudgeVo.judgeAnswer" class="el-icon-check"></i><i v-else class="el-icon-close"></i></span></div>
              <div>学生答案：<span ><i v-if="item.judgeAnswer" class="el-icon-check"></i><i v-else class="el-icon-close"></i></span></div>
              <div>考试结果：<span>{{item.judgeScore}}</span>分</div>
            </div>
          </div>
        </div>
        <div  class="module" v-if="exam.resultBlankVos&&exam.resultBlankVos.length!=0">
          <h3>填空题</h3>
          <div v-for="(item,index) in exam.resultBlankVos" :key="index" class="question">
            <h6  class="title">
              {{index+1}}、
              <span class="questionTitle" v-html="item.testBlankVo.blankQuestion"></span>
              （<span style="color: #020281">{{item.testBlankVo.blankPoints}}分</span>）
            </h6>
            <div v-for='(opt,index2) in item.blankAnswer' :key="index2" class="answers">
              第{{index2+1}}个空、<span v-html="opt"></span>
            </div>
            <div>
              <div>
                正确答案：
                <div v-for="(answer,a1) in item.testBlankVo.blankAnswer" :key="a1">
                  {{a1+1}}、<span v-for="(i,a2) in answer" :key="a2"><span  v-html="i"></span>&nbsp;</span>
                </div>
              </div>
              <div>考试结果：
                <div class="result" v-if="isManual"><el-input class="input" v-model="blank[item.testBlankVo.testBlankId]"></el-input>分</div>
                <div class="result" v-else>{{blank[item.testBlankVo.testBlankId]}}分</div>
              </div>
            </div>
          </div>
        </div>
        <div  class="module" v-if="exam.resultQuestionVos&&exam.resultQuestionVos.length!=0">
          <h3>问答题</h3>
          <div v-for="(item,index) in exam.resultQuestionVos" :key="index" class="question">
            <h6  class="title">
              {{index+1}}、
              <span class="questionTitle" v-html="item.testQuestionVo.myQuestion"></span>
              （<span style="color: #020281">{{item.testQuestionVo.myPoints}}分</span>）
            </h6>
            <div v-html="item.myAnswer" class="answers"></div>
            <div>
              <div>正确答案：<span  v-html="item.testQuestionVo.myAnswer"></span></div>
              <div>考试结果：
                <div class="result" v-if="isManual"><el-input class="input" v-model="my[item.testQuestionVo.testQuestionId]"></el-input>分</div>
                <div class="result" v-else>{{my[item.testQuestionVo.testQuestionId]}}分</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="submit">
        <el-button type="primary" class="submitButton" @click="submit"><span v-if="isManual">提交</span><span v-else>返回上一页</span></el-button>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapGetters,mapActions} from 'vuex';
  import { correctStuPaper } from '@/api/teacher'
  export default {
    name: "index",
    data(){
      return{
        exam:{},
        judge:[true,false],
        blank:{},
        my:{},
        isManual:false,
        chargeName:false,
        paperState:'',
      }
    },
    computed:{
      ...mapGetters(['getExam','getIsManual','getPaperState','getPaperId','getParams']),
    },
    methods:{
      translate(index){
        const list=['A','B','C','D'];
        return list[index];
      },
      translateArr(index){
        const list=['A','B','C','D'];
        var temp=index.split('');
        var result="";
        temp.forEach(item=>{
          result+=list[parseInt(item)]
        })
        return result
      },
      translateArr1(index){
        const list=['A','B','C','D'];
        var temp=index;
        var result="";
        temp.forEach(item=>{
          result+=list[parseInt(item)]
        })
        return result
      },
      submit(){
        this.isManual=this.getIsManual;
        console.log(this.isManual)
        //其中学生查看试卷，没有设置isManual ，所以直接go -1 ,在教师查看试卷时，查看设置了false，修改设置了true，
        if(this.isManual==true){
            var message=this.check();
            if(message){
               if(message=='没有需要批改的题目'){
                 this.$message({
                   type:'success',
                   message:message
                 })
                 this.$router.go(-1);
               }else{
                 this.$message({
                   type:'warning',
                   message:message
                 })
               }
            }else{
              var resultBlankVos=[];
               for(var key in this.blank){
                  var obj={testBlankVo:{}};
                  obj.testBlankVo.testBlankId=key;
                  obj.myScore=this.blank[key];
                  resultBlankVos.push(obj);
               }
              var resultQuestionVos=[];
              for(var key in this.my){
                var obj={testQuestionVo:{}};
                obj.testQuestionVo.testQuestionId=key;
                obj.myScore=this.my[key];
                resultQuestionVos.push(obj);
              }
              var params=Object.assign({},{myReviewerTno:this.getParams.username,paperId:this.getPaperId,sno:this.exam.sno,resultBlankVos:resultBlankVos,resultQuestionVos:resultQuestionVos})
             console.log(params);
              correctStuPaper(params).then(res=>{
                if(res.success==true){
                  this.$message({
                    type:'success',
                    message:'批改成功'
                  });
                  this.$router.go(-1);
                }else{
                  this.$message({
                    type:'warning',
                    message:res.msg,
                  })
                }
              })
            }
        }else{
          this.$router.go(-1);
        }
      },
      check(){
        if((this.exam.resultBlankVos==undefined||this.exam.resultBlankVos.length==0)&&(this.exam.resultQuestionVos==undefined||this.exam.resultQuestionVos.length==0)){
          return '没有需要批改的题目';
        }else{
          for(var key in this.blank){
            var rex=/^[0-9]+\.?[0-9]*$/
            if(this.blank[key]===undefined){
              return '请输入成绩'
            }else if(!rex.test(this.blank[key])){
              return '请输入正确的成绩'
            }else{
              this.blank[key]=parseFloat(this.blank[key])
            }
          }
          for(var key in this.my){
            var rex=/^[0-9]+\.?[0-9]*$/
            if(this.my[key]===undefined){
              return '请输入成绩'
            }else if(!rex.test(this.my[key])){
              return '请输入正确的成绩'
            }else{
              this.my[key]=parseFloat(this.my[key])
            }
          }
        }
      }
    },
    beforeMount(){
      this.isManual=this.getIsManual;
      this.paperState=this.getPaperState
      this.exam=_.cloneDeep(this.getExam);
      if(this.exam.resultMultipleVos!=undefined&&this.exam.resultMultipleVos.length!=0){
        for (var i = 0; i < this.exam.resultMultipleVos.length; i++) {
          var trueIndex=[];
          const temp=this.exam.resultMultipleVos[i].multipleAnswer.split("");
          temp.forEach((item,index)=>{
            trueIndex[index]=parseInt(item);
          })
          this.exam.resultMultipleVos[i].multipleAnswer=trueIndex;
        }
      }
      if(this.exam.resultBlankVos!=undefined&&this.exam.resultBlankVos.length!=0){
        for (var i = 0; i < this.exam.resultBlankVos.length; i++) {
          var id=this.exam.resultBlankVos[i].testBlankVo.testBlankId;
          if(this.paperState=='0'&&!this.exam.resultBlankVos[i].myScore){//如果试卷还没有被批改并且成绩为null undefined
            this.blank[id]='';
          }else {
            this.blank[id] = this.exam.resultBlankVos[i].myScore;
          }
        }
        this.chargeName=this.exam.resultBlankVos[0].myReviewerName;
      }
      if(this.exam.resultQuestionVos!=undefined&&this.exam.resultQuestionVos.length!=0){
        for (var i = 0; i < this.exam.resultQuestionVos.length; i++) {
          var id=this.exam.resultQuestionVos[i].testQuestionVo.testQuestionId;
          if(this.paperState=='0'&&!this.exam.resultQuestionVos[i].myScore){//如果试卷还没有被批改并且成绩为null undefined
            this.blank[id]='';
          }else {
            this.my[id] = this.exam.resultQuestionVos[i].myScore;
          }
        }
        this.chargeName=this.exam.resultQuestionVos[0].myReviewerName;
      }
    }
  }
</script>

<style scoped lang="scss">
  /deep/ .el-radio__label{
    display: none;
  }
  /deep/ .el-radio__input.is-disabled.is-checked .el-radio__inner::after{
    background:#409EFF;
  }
  .examBackground{
    padding:0 150px 0 50px;
    background: #ffffff;
  }
  .exam{
    width: 100%;
    padding: 50px 50px 14px 50px;
    background: #f2f2f2;
  }
  .head{
    border-bottom: 1px solid silver;
    text-align: center;
  }
  .headTitle{
    div,p{
      margin-top: 24px;
    }
  }
  .headMessage{
    margin:10px 0 4px 0 ;
  }
  .question{
    margin: 6px 12px 24px;
    div{
      padding: 2px 0;
    }
  }
  .title{
    font-size: 17px;
    padding-bottom: 2px;
  }
  .input{
    width: 100px;
  }
  .module {
    padding-top: 24px;
    border-bottom: 1px solid silver;
  }
  .module:nth-last-child(1){
    border: 0px;
  }
  .submit{
    width: 100%;
    .submitButton{
      width: 100%;
      margin-bottom:20px ;
    }
  }
  .result{
    display: inline-block;
  }
  .questionTitle,.questionContent{
    display: inline-block;
  }
</style>
