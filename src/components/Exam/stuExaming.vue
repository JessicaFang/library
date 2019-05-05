<template>
  <div id="test" class="examBackground">
    <div class="exam">
      <div class="head">
        <div class="headTitle">
          <h2>{{exam.testPaper.paperTitle}}</h2>
          <h3>{{exam.testPaper.paperHead}}</h3>
        </div>
        <div class="headMessage">
          <span>学号：{{sno}}</span>&nbsp;&nbsp;
          <span>总分：{{exam.testPaper.totalPoints}}</span>&nbsp;&nbsp;
        </div>
        <div class="headMessage">
          <span>知识点：<span v-for="(k,i) in exam.testPaper.knowledgeCover" :key="i">{{k}}&nbsp;&nbsp;</span></span>
        </div>
      </div>
      <div class="content">
        <div class="module" v-show="exam.testSingleVos&&exam.testSingleVos.length!=0">
          <h3>单选题</h3>
          <div v-for="(item,index) in exam.testSingleVos" :key="index" class="question">
            <h6 class="title">
              {{index+1}}、<span class="questionTitle" v-html="item.singleQuestion"></span>（{{item.singlePoints}}分）
            </h6>
            <div v-for="(opt,index2) in item.singleTestChoice" :key="index2" class="answers">
              <el-radio v-model="single[item.testSingleId]"   :label="index2+''"></el-radio>
              <span v-text="translate(index2)"></span>、<span class="questionContent" v-html="opt"></span>
            </div>
          </div>
        </div>
        <div  class="module" v-show="exam.testMultipleVos&&exam.testMultipleVos.length!=0">
          <h3>多选题</h3>
          <div v-for="(item,index) in exam.testMultipleVos" :key="index" class="question">
            <h6  class="title">
              {{index+1}}、<span class="questionTitle" v-html="item.multipleQuestion"></span>（{{item.multiplePoints}}分）
            </h6>
            <div v-for="(opt,index2) in item.multipleTestChoice" :key="index2" class="answers">
              <input  v-model="multiple[item.testMultipleId]" type="checkbox" :value="index2" />
              <span v-text="translate(index2)"></span>、<span class="questionContent" v-html="opt"></span>
            </div>
          </div>
        </div>
        <div  class="module" v-show="exam.testJudgeVos&&exam.testJudgeVos.length!=0">
          <h3>判断题</h3>
          <div v-for="(item,index) in exam.testJudgeVos" :key="index" class="question">
            <h6  class="title">
              {{index+1}}、<span class="questionTitle" v-html="item.judgeQuestion"></span>（{{item.judgePoints}}分）
            </h6>
            <div  class="answers">
              <el-radio v-model="judge[item.testJudgeId]"   :label="1"></el-radio><i class="el-icon-check"></i>&nbsp;&nbsp;&nbsp;&nbsp;
              <el-radio v-model="judge[item.testJudgeId]"  :label="0"></el-radio><i class="el-icon-close"></i>
            </div>
          </div>
        </div>
        <div  class="module" v-show="exam.testBlankVos&&exam.testBlankVos.length!=0">
          <h3>填空题</h3>
          <div v-for="(item,index) in exam.testBlankVos" :key="index" class="question">
            <h6  class="title">
              {{index+1}}、<span class="questionTitle" v-html="item.blankQuestion"></span>（{{item.blankPoints}}分）
            </h6>
            <div v-for='(opt,index2) in item.blankCounter' :key="index2" class="answers">
              第{{index2+1}}个空:<el-input class="input" v-model="blank[item.testBlankId][index2]"></el-input>
            </div>
          </div>
        </div>
        <div  class="module" v-show="exam.testQuestionVos&&exam.testQuestionVos.length!=0">
          <h3>问答题</h3>
          <div v-for="(item,index) in exam.testQuestionVos" :key="index" class="question">
            <h6  class="title">
              {{index+1}}、<span class="questionTitle" v-html="item.myQuestion"></span>（{{item.myPoints}}分）
            </h6>
            <textarea  v-html="my[item.testQuestionId]" class="answers myAnswer"></textarea>
          </div>
        </div>
      </div>
      <div class="submit">
        <el-button type="primary" class="submitButton" @click="submit">提交</el-button>
      </div>
    </div>
    <el-card class="time">
      <h3 class="timeText">还剩</h3>
      <div style="color: red">{{testTime}}</div>
      <h3 class="timeText">分钟</h3>
    </el-card>
  </div>
</template>

<script>
  import { submitAnswer } from '@/api/student'
  import {mapGetters,mapActions} from 'vuex';
  export default {
    name: "index",
    data(){
      return{
        exam:{},
        sno:'',
        testTime:0,
        single:{},
        blank:{},
        multiple:{},
        judge:{},
        my:{},
      }
    },
    computed:{
      ...mapGetters(['getExam','getParams','getPaperId']),
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
      submit(){
        var paperId=this.getPaperId;
        var sno=this.sno;
        var resultSingleVos=[];
        for(var key in this.single){
          var obj={testSingleVo:{}};
          obj.testSingleVo.testSingleId=key;
          obj.singleAnswer=this.single[key];
          resultSingleVos.push(obj);
        }
        var resultMultipleVos=[];
        for(var key in this.multiple){
          var obj={testMultipleVo:{}};
          obj.testMultipleVo.testMultipleId=key;
          obj.multipleAnswer=this.multiple[key].join("");
          resultMultipleVos.push(obj);
        }
        var resultJudgeVos=[];
        for(var key in this.judge){
          var obj={testJudgeVo:{}};
          obj.testJudgeVo.testJudgeId=key;
          obj.testJudgeAnswer=this.judge[key];
          resultJudgeVos.push(obj);
        }
        var resultBlankVos=[];
        for(var key in this.blank){
          var obj={testBlankVo:{}};
          obj.testBlankVo.testBlankId=key;
          obj.blankAnswer=this.blank[key];
          resultBlankVos.push(obj);
        }
        var resultQuestionVos=[];
        for(var key in this.my){
          var obj={testQuestionVo:{}};
          obj.testQuestionVo.testQuestionId=key;
          obj.myAnswer=this.my[key];
          resultQuestionVos.push(obj);
        }
        var params=Object.assign({},{paperId,sno,resultSingleVos,resultMultipleVos,resultJudgeVos,resultBlankVos,resultQuestionVos})
        submitAnswer(params).then(res=>{
          if(res.success==true){
            this.exitFullScreen();
            window.open('http://127.0.0.1:8080/#/ChoiceTest','_self')
          }else {
            this.$message({
              type: 'warning',
              message: res.msg
            })
            if (res.msg == '试卷只能提交一次') {
              this.exitFullScreen();
              window.open('http://127.0.0.1:8080/#/ChoiceTest', '_self')
            }
          }
        })

      },
      exitFullScreen(){
        // 判断各种浏览器，找到正确的方法
        var exitMethod = document.exitFullscreen || //W3C
          document.mozCancelFullScreen || //Chrome等
          document.webkitExitFullscreen || //FireFox
          document.webkitExitFullscreen; //IE11
        if (exitMethod&&(document.isFullScreen || document.mozIsFullScreen || document.webkitIsFullScreen)) {
          exitMethod.call(document);
        }
      },
      fullScreen(){
        var el = document.documentElement;
        var rfs = el.requestFullScreen || el.webkitRequestFullScreen || el.mozRequestFullScreen || el.msRequestFullscreen;
        if(typeof rfs != "undefined" && rfs) {
          rfs.call(el);
        }
      },
      countTime(){
        var that=this;
        var timer=setInterval(()=>{
          if(that.testTime>0){
            that.testTime--;
          }else{
            clearInterval(timer);
            this.submit();
          }
        },60000)
      }
    },
    beforeMount() {
      this.exam = _.cloneDeep(this.getExam);
      this.sno=this.getParams.username;
      this.testTime=this.exam.testPaper.minutesLength
      if(this.exam.testBlankVos!=undefined&&this.exam.testBlankVos.length!=0){
        for (var i = 0; i < this.exam.testBlankVos.length; i++) {
          var id=this.exam.testBlankVos[i].testBlankId;
          this.blank[id]=[];
        }
      }
      if(this.exam.testMultipleVos!=undefined&&this.exam.testMultipleVos.length!=0){
        for (var i = 0; i < this.exam.testMultipleVos.length; i++) {
          var id=this.exam.testMultipleVos[i].multipleId;
          this.multiple[id]=[];
        }
      }
      //实现全屏效果
      this.fullScreen();
      this.countTime();
    },
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
    padding:0px 50px 0 150px;
    background:  #f5f5f5;
  }
  .exam{
    width: 75%;
    padding: 14px 0;
    background:white;
  }
  .head{
    border-bottom: 1px solid silver;
    text-align: center;
  }
  .headTitle{
    div,p{
      margin-top: 4px;
    }
  }
  .headMessage{
    margin:5px 0 4px 0 ;
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
    width: 100%;
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
  .myAnswer{
    width: 100%;
    height: 100px;
  }
  .time{
    position: fixed;
    width: 150px;
    right: 30px;
    top: 30px;
    text-align: center;
  }
  .timeText{
    padding: 10px 0;
  }
  .content{
    margin-left:8px;
  }
  .questionTitle, .questionContent{
    display: inline-block;
  }

</style>
