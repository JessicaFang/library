<template>
  <div class="paperContent">
    <div class="left">
      <el-card  class="card">
        <div>单选题数：{{single.length}}题</div>
        <div>前选总分：{{single.count}}分</div>
      </el-card>
      <el-card  class="card">
        <div>多选题数：{{double.length}}题</div>
        <div>多选总分：{{double.count}}分</div>
      </el-card>
      <el-card  class="card">
        <div>判断题数：{{judge.length}}题</div>
        <div>判断总分：{{judge.count}}分</div>
      </el-card>
      <el-card  class="card">
        <div>填空题数：{{blank.length}}题</div>
        <div>填空总分：{{blank.count}}分</div>
      </el-card>
      <el-card  class="card">
        <div>问答题数：{{my.length}}题</div>
        <div>问答总分：{{my.count}}分</div>
      </el-card>
    </div>
    <div class="right">
      <div class="head">{{paperTitle}}</div>
      <div class="content">
        <div class="question">
          <div class="totalQuestion">
            <h3 class="title" >单选题</h3>
            <Single></Single>
            <el-button class="title" type="primary" @click="questionSelect('1')">题目选择</el-button>
          </div>
          <div class="totalQuestion">
            <h3 class="title">多选题</h3>
            <Double></Double>
            <el-button class="title" type="primary" @click="questionSelect('2')">题目选择</el-button>
          </div>
          <div class="totalQuestion">
            <h3 class="title">判断题</h3>
            <Judge></judge>
            <el-button class="title" type="primary" @click="questionSelect('3')">题目选择</el-button>
          </div>
          <div class="totalQuestion">
            <h3 class="title">填空题</h3>
            <blank-fill></blank-fill>
            <el-button class="title" type="primary" @click="questionSelect('4')">题目选择</el-button>
          </div>
          <div class="totalQuestion">
            <h3 class="title">问答题</h3>
            <essay-test></essay-test>
            <el-button class="title" type="primary" @click="questionSelect('5')">题目选择</el-button>
          </div>
        </div>
      </div>
      <div>
        <el-button class="submitButton" type="primary" @click="submit">提交试卷</el-button>
      </div>
    </div>
    <div v-if="dialogVisible">
      <el-dialog
        width="75%"
        title="题目列表"
        :visible="visible"
        :before-close="handleClose">
        <questionList ref="questionList" :type="type"></questionList>
        <span slot="footer" class="dialog-footer" style="margin-top: 10px">
             <el-button @click="dialogVisible = false">取消</el-button>
             <el-button @click="getQuestion" type="primary">确定</el-button>
           </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  import Single from  '@/components/AutoQuestion/Single'
  import Double from  '@/components/AutoQuestion/Double'
  import blankFill from  '@/components/AutoQuestion/blankFill'
  import Judge from  '@/components/AutoQuestion/Judge'
  import essayTest from  '@/components/AutoQuestion/essayTest'
  import { mapGetters,mapActions } from 'vuex';
  import questionList from '@/views/Teacher/Course/AddPaper/questionList'
  import {calPoint} from '@/util/calPoint'
  import {selectLibByIds,addTestPaper,updateTestPaper} from '@/api/teacher'
  export default {
    name: "paperContent",
    data(){
      return {
        dialogVisible:false,
        visible:true,
        questionType:'',
        type:'',
        paperTitle:'',
        single:{ length:0,count:0},
        double:{ length:0,count:0},
        judge:{ length:0,count:0},
        blank:{length:0,count:0},
        my:{length:0,count:0},
        count:1,
      }
    },
    computed:{
      ...mapGetters(['getPaper','getPoint','getActive','getId']),
      s(){
        var length=this.getPaper['testSingleVos'].length;
        var tempPoint=this.getPoint['singlePoints'];
        tempPoint=calPoint(tempPoint)
        return {length:length,point:tempPoint}
      },
      d(){
        var length=this.getPaper['testMultipleVos'].length
        var tempPoint=this.getPoint['multiplePoints'];
        tempPoint=calPoint(tempPoint);
        return {length:length,point:tempPoint}
      },
      j(){
        var length=this.getPaper['testJudgeVos'].length;
        var tempPoint=this.getPoint['judgePoints'];
        tempPoint=calPoint(tempPoint)
        return {length:length,point:tempPoint}
      },
      b(){
        var length=this.getPaper['testBlankVos'].length;
        var tempPoint=this.getPoint['blankPoints'];
        tempPoint=calPoint(tempPoint)
        return {length:length,point:tempPoint}
      },
      m(){
        var length=this.getPaper['testQuestionVos'].length;
        var tempPoint=this.getPoint['myPoints'];
        tempPoint=calPoint(tempPoint)
        return {length:length,point:tempPoint}
      }
    },
    watch:{
      s:{
        handler:function(newVal) {   //特别注意，不能用箭头函数，箭头函数，this指向全局
          this.single.length=newVal.length;
          this.single.count=newVal.point;
        },
        deep: true,
        immediate: true
      },
      d:{
        handler:function(newVal) {   //特别注意，不能用箭头函数，箭头函数，this指向全局
          this.double.length=newVal.length;
          this.double.count=newVal.point;
        },
        deep: true,
        immediate: true
      },
      j:{
        handler:function(newVal) {   //特别注意，不能用箭头函数，箭头函数，this指向全局
          this.judge.length=newVal.length;
          this.judge.count=newVal.point;
        },
        deep: true,
        immediate: true
      } ,
      b:{
        handler:function(newVal) {   //特别注意，不能用箭头函数，箭头函数，this指向全局
          this.blank.length=newVal.length;
          this.blank.count=newVal.point;
        },
        deep: true,
        immediate: true
      },
      m:{
        handler:function(newVal) {   //特别注意，不能用箭头函数，箭头函数，this指向全局
          this.my.length=newVal.length;
          this.my.count=newVal.point;
        },
        deep: true,
        immediate: true
      }
    },
    components:{
      questionList,
      Single,
      Double,
      blankFill,
      Judge,
      essayTest
    },
    beforeMount(){
      if(this.getActive.source=='paperTitle'){
        this.setPaperActions({name:'testSingleVos',value:[]});
        this.setPaperActions({name:'testMultipleVos',value:[]});
        this.setPaperActions({name:'testJudgeVos',value:[]});
        this.setPaperActions({name:'testBlankVos',value:[]});
        this.setPaperActions({name:'testQuestionVos',value:[]});
        this.setAllPointActions();
      }
      this.paperTitle=this.getPaper['testPaper']['paperTitle']
    },
    methods:{
      ...mapActions( // 语法糖
        ['setPaperActions','setPointActions','setActiveActions','setAllPointActions','setPaperIdActions'] // 相当于this.$store.dispatch('modifyName'),提交这个方法
      ),
      questionSelect(type){
        this.type=type;
        this.dialogVisible=true;
      },
      getQuestion(){
        var id=[];
        this.$refs.questionList.selectCloumn.forEach(item=>{
          id.push(item.id);
        });
        this.dialogVisible=false;
        var params={type:this.type,ids:id.join(',')};
        selectLibByIds(params).then(res=>{
            if(res.success==true){
              var res=_.cloneDeep(res.obj);
              this.setStateData(res);
            }else{
              this.$message({
                type:'warning',
                message:res.msg,
              })
            }
        })

      },
      setStateData(res){
        switch (this.type){
          case '1':
         /*   var res=[
              {
                singleQuestion:'jaisohidfdifhdifhdifhd',
                options:[
                  '斤斤计较军放到',
                  '斤斤计较军放到',
                  '斤斤计较军放到',
                  '斤斤计较军放到',
                ],
                trueIndex:1,
                knowledgeTitle:'知识点',
                id:2,
                courseId:2,
                difficultLevel:0.6,
              }, {
                singleQuestion:'jaisohidfdifhdifhdifhd',
                options:[
                  '斤斤计较军放到',
                  '斤斤计较军放到',
                  '斤斤计较军放到',
                  '斤斤计较军放到',
                ],
                trueIndex:1,
                knowledgeTitle:'知识点',
                id:2,
                courseId:2,
                difficultLevel:0.6,
              }, {
                singleQuestion:'jaisohidfdifhdifhdifhd',
                options:[
                  '斤斤计较军放到',
                  '斤斤计较军放到',
                  '斤斤计较军放到',
                  '斤斤计较军放到',
                ],
                trueIndex:1,
                knowledgeTitle:'知识点',
                id:2,
                courseId:2,
                difficultLevel:0.6,
              }, {
                singleQuestion:'jaisohidfdifhdifhdifhd',
                options:[
                  '斤斤计较军放到',
                  '斤斤计较军放到',
                  '斤斤计较军放到',
                  '斤斤计较军放到',
                ],
                trueIndex:1,
                knowledgeTitle:'知识点',
                id:2,
                courseId:2,
                difficultLevel:0.6,
              }, {
                singleQuestion:'jaisohidfdifhdifhdifhd',
                options:[
                  '斤斤计较军放到',
                  '斤斤计较军放到',
                  '斤斤计较军放到',
                  '斤斤计较军放到',
                ],
                trueIndex:1,
                knowledgeTitle:'知识点',
                id:2,
                courseId:2,
                difficultLevel:0.6,
              },
            ];*/
            console.log(this.getPaper['testSingleVos']);
            var arrObj=[];
            res.forEach((item)=>{
              var obj={
                singleQuestion:item.singleQuestion,
                singleTestChoice:item.options,
                singleTestAnswer:item.trueIndex,
                knowledgeTest:item.knowledgeTitle,
                difficultLevel:item.difficultLevel+'',
                singleId:item.id,
                testSingleId:null,
                singlePoints:""
              };
              arrObj.push(obj);
            });
            var tempObj=this.getPaper['testSingleVos'];
            if(tempObj.length!=0) {
              arrObj = tempObj.concat(arrObj)
            }
            this.setPaperActions({name:'testSingleVos',value:arrObj});
            break;
          case '2':
        /*    var res=[
              {multipleQuestion:'jaisohidfdifhdifhdifhd',
                options:[
                  '斤斤计较军放到',
                  '斤斤计较军放到',
                  '斤斤计较军放到',
                  '斤斤计较军放到',
                ],
                trueIndex:'023',
                knowledgeTitle:'知识点',
                id:2,
                courseId:2,
                difficultLevel:0.6,
              },{multipleQuestion:'jaisohidfdifhdifhdifhd',
                options:[
                  '斤斤计较军放到',
                  '斤斤计较军放到',
                  '斤斤计较军放到',
                  '斤斤计较军放到',
                ],
                trueIndex:'0123',
                knowledgeTitle:'知识点',
                id:2,
                courseId:2,
                difficultLevel:0.6,
              },{multipleQuestion:'jaisohidfdifhdifhdifhd',
                options:[
                  '斤斤计较军放到',
                  '斤斤计较军放到',
                  '斤斤计较军放到',
                  '斤斤计较军放到',
                ],
                trueIndex:'0123',
                knowledgeTitle:'知识点',
                id:2,
                courseId:2,
                difficultLevel:0.6,
              },{multipleQuestion:'jaisohidfdifhdifhdifhd',
                options:[
                  '斤斤计较军放到',
                  '斤斤计较军放到',
                  '斤斤计较军放到',
                  '斤斤计较军放到',
                ],
                trueIndex:'0123',
                knowledgeTitle:'知识点',
                id:2,
                courseId:2,
                difficultLevel:0.6,
              },{multipleQuestion:'jaisohidfdifhdifhdifhd',
                options:[
                  '斤斤计较军放到',
                  '斤斤计较军放到',
                  '斤斤计较军放到',
                  '斤斤计较军放到',
                ],
                trueIndex:'0123',
                knowledgeTitle:'知识点',
                id:2,
                courseId:2,
                difficultLevel:0.6,
              },
            ];*/
            for (var i = 0; i < res.length; i++) {
              var trueIndex=[];
              const temp=res[i].trueIndex.split("");
              temp.forEach((item,index)=>{
                trueIndex[index]=parseInt(item);
              })
              res[i].trueIndex=trueIndex;
            }
            var arrObj=[];
            res.forEach((item)=>{
              var obj={
                multipleQuestion:item.multipleQuestion,
                multipleTestChoice:item.options,
                multipleTestAnswer:item.trueIndex,
                knowledgeTest:item.knowledgeTitle,
                difficultLevel:item.difficultLevel+'',
                testMultipleId:null,
                multipleId:item.id,
                multiplePoints:"",
              };
              arrObj.push(obj);
            });
            var tempObj=this.getPaper['testMultipleVos'];
            if(tempObj.length!=0) {
              arrObj = tempObj.concat(arrObj)
            }
            this.setPaperActions({name:'testMultipleVos',value:arrObj});
            break;
          case '3':
          /*  var res=[
              {
                judgeQuestion:'jaisohidfdifhdifhdifhd',
                judgeAnswer:true,
                knowledgeTitle:'知识点',
                id:2,
                courseId:2,
                difficultLevel:0.6,
              },{
                judgeQuestion:'jaisohidfdifhdifhdifhd',
                judgeAnswer:true,
                knowledgeTitle:'知识点',
                id:2,
                courseId:2,
                difficultLevel:0.6,
              },{
                judgeQuestion:'jaisohidfdifhdifhdifhd',
                judgeAnswer:true,
                knowledgeTitle:'知识点',
                id:2,
                courseId:2,
                difficultLevel:0.6,
              },{
                judgeQuestion:'jaisohidfdifhdifhdifhd',
                judgeAnswer:true,
                knowledgeTitle:'知识点',
                id:2,
                courseId:2,
                difficultLevel:0.6,
              },{
                judgeQuestion:'jaisohidfdifhdifhdifhd',
                judgeAnswer:true,
                knowledgeTitle:'知识点',
                id:2,
                courseId:2,
                difficultLevel:0.6,
              },{
                judgeQuestion:'jaisohidfdifhdifhdifhd',
                judgeAnswer:true,
                knowledgeTitle:'知识点',
                id:2,
                courseId:2,
                difficultLevel:0.6,
              },
            ];*/
            var arrObj=[];
            res.forEach((item)=>{
              var obj={
                judgeQuestion:item.judgeQuestion,
                judgeAnswer:item.judgeAnswer,
                knowledgeTest:item.knowledgeTitle,
                difficultLevel:item.difficultLevel+'',
                testJudgeId:null,
                judgeId:item.id,
                judgePoints:""
              };
              arrObj.push(obj);
            });
            var tempObj=this.getPaper['testJudgeVos'];
            if(tempObj.length!=0) {
              arrObj = tempObj.concat(arrObj)
            }
            this.setPaperActions({name:'testJudgeVos',value:arrObj});
            break;
          case '4':
           /* var res=[
              {
                blankQuestion:'dddddddddddddddd',
                blankAnswer:[['dddd','ddd'],['ddd','dd']],
                knowledgeTitle:'知识点',
                difficultLevel: 0.6
              },
              {
                blankQuestion:'dddddddddddddddd',
                blankAnswer:[['dddd','ddd'],['ddd','dd']],
                knowledgeTitle:'知识点',
                difficultLevel: 0.6
              },
              {
                blankQuestion:'dddddddddddddddd',
                blankAnswer:[['dddd','ddd'],['ddd','dd']],
                knowledgeTitle:'知识点',
                difficultLevel: 0.6
              },
              {
                blankQuestion:'dddddddddddddddd',
                blankAnswer:[['dddd','ddd'],['ddd','dd']],
                knowledgeTitle:'知识点',
                difficultLevel: 0.6
              },
            ];*/
            var arrObj=[];
            res.forEach((item)=>{
              var obj={
                blankQuestion:item.blankQuestion,
                blankAnswer:item.blankAnswer,
                knowledgeTest:item.knowledgeTitle,
                difficultLevel:item.difficultLevel+'',
                testBlankId:null,
                blankId:item.id,
                blankPoints:"",
              };
              arrObj.push(obj);
            });
            var tempObj=this.getPaper['testBlankVos'];
            console.log(tempObj,'fdf')
            if(tempObj.length!=0) {
              arrObj = tempObj.concat(arrObj)
            }
            this.setPaperActions({name:'testBlankVos',value:arrObj});
            break;
          case '5':
         /*   var res=[
              {
                myQuestion:'jaisohidfdifhdifhdifhd',
                myAnswer:'122',
                detailReviewRules:'评分规则',
                knowledgeTitle:'知识点',
                id:2,
                courseId:2,
                difficultLevel:'0.6',
              },{
                myQuestion:'jaisohidfdifhdifhdifhd',
                myAnswer:'122',
                detailReviewRules:'评分规则',
                knowledgeTitle:'知识点',
                id:2,
                courseId:2,
                difficultLevel:0.6,
              },{
                myQuestion:'jaisohidfdifhdifhdifhd',
                myAnswer:'122',
                detailReviewRules:'评分规则',
                knowledgeTitle:'知识点',
                id:2,
                courseId:2,
                difficultLevel:0.6,
              },{
                myQuestion:'jaisohidfdifhdifhdifhd',
                myAnswer:'122',
                detailReviewRules:'评分规则',
                knowledgeTitle:'知识点',
                id:2,
                courseId:2,
                difficultLevel:0.6,
              },
            ];*/
            var arrObj=[];
            res.forEach((item)=>{
              var obj={
                myQuestion:item.myQuestion,
                myAnswer:item.myAnswer,
                detailReviewRules:item.detailReviewRules,
                knowledgeTest:item.knowledgeTitle,
                difficultLevel:item.difficultLevel+'',
                testQuestionId:null,
                myQuestionId:item.id,
                myPoints:"",
              };
              arrObj.push(obj);
            });
            var tempObj=this.getPaper['testQuestionVos'];
            if(tempObj.length!=0) {
              arrObj = tempObj.concat(arrObj)
            }
            this.setPaperActions({name:'testQuestionVos',value:arrObj});
        }
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
          var paper = _.cloneDeep(this.getPaper);
          paper.testPaper.singleCounter = this.single.length;
          paper.testPaper.singlePoints = this.single.count;
          paper.testPaper.multipleCounter = this.double.length;
          paper.testPaper.multiplePoints = this.double.count;
          paper.testPaper.judgeCounter = this.judge.length;
          paper.testPaper.judgePoints = this.judge.count;
          paper.testPaper.blankCounter = this.blank.length;
          paper.testPaper.blankPoints = this.blank.count;
          paper.testPaper.questionCounter = this.my.length;
          paper.testPaper.questionPoints = this.my.count;
          paper.testPaper.totalPoints = this.single.count + this.double.count + this.judge.count + this.blank.count + this.my.count;
          paper.testPaper.courseId = this.getId;
          if(paper.testMultipleVos&&paper.testMultipleVos.length!=0){
            for(let i=0;i<paper.testMultipleVos.length;i++){
             if(typeof paper.testMultipleVos[i].multipleTestAnswer!='string') {
               console.log(1);
               paper.testMultipleVos[i].multipleTestAnswer = paper.testMultipleVos[i].multipleTestAnswer.join("");
             }
            }
          }
          console.log(this.getActive.source);
          if (this.getActive.source == 'ChargePaper') {
            console.log('管理试卷',paper);
            updateTestPaper(paper).then(res=>{
              if(res.success===true){
                this.$router.go(-1);
              }else{
                this.$message({
                  type:'warning',
                  message:res.msg,
                })
                if(res.msg=='考试前2小时才能修改已发布的试卷试题'){
                  this.$router.go(-1)
                }
              }
            })
          } else {
             console.log('添加试卷',paper);
              addTestPaper(paper).then(res=>{
              if(res.success===true){
                this.setPaperIdActions({paperId:res.obj.paperId});
                this.setActiveActions({active: 3, source: 'paperContent'});
              }else{
                this.$message({
                  type:'warning',
                  message:res.msg,
                })
              }
            });
          }
        }
      },
      check(){
        if(this.single.length==0&&this.double.length==0&&this.judge.length==0&&this.blank.length==0&&this.my.length==0){
          return '请进行题目的输入';
        }else{
          if(this.single.length!=0){
            if(isNaN(this.single.count)){
              return '请进行正确的成绩输入'
            }
            var tempPoint=this.getPoint['singlePoints'];
            for(var i=0;i<this.single.length;i++){
              if(tempPoint[i]===0) {
                return '成绩请不要输入为0'
              }else if(tempPoint[i]==undefined||(typeof tempPoint[i]=='string'&&tempPoint[i].trim()==='')){
                return '请进行单选题成绩的输入'
              }

            }
          }
          if(this.double.length!=0){
            if(isNaN(this.double.count)){
              return '请进行正确的成绩输入'
            }
            var tempPoint=this.getPoint['multiplePoints'];
            for(var i=0;i<this.double.length;i++){
              if(tempPoint[i]===0) {
                return '成绩请不要输入为0'
              }else if(tempPoint[i]==undefined||(typeof tempPoint[i]=='string'&&tempPoint[i].trim()==='')){
                return '请进行多选题成绩的输入'
              }
            }
          }
          if(this.judge.length!=0){
            if(isNaN(this.judge.count)){
              return '请进行正确的成绩输入'
            }
            var tempPoint=this.getPoint['judgePoints'];
            for(var i=0;i<this.judge.length;i++){
              if(tempPoint[i]===0) {
                return '成绩请不要输入为0'
              }else if(tempPoint[i]==undefined||(typeof tempPoint[i]=='string'&&tempPoint[i].trim()==='')){
                return '请进行判断题成绩的输入'
              }
            }
          }
          if(this.blank.length!=0){
            if(isNaN(this.blank.count)){
              return '请进行正确的成绩输入'
            }
            var tempPoint=this.getPoint['blankPoints'];
            for(var i=0;i<this.blank.length;i++){
              if(tempPoint[i]===0) {
                return '成绩请不要输入为0'
              }else if(tempPoint[i]==undefined||(typeof tempPoint[i]=='string'&&tempPoint[i].trim()==='')){
                return '请进行填空题成绩的输入'
              }
            }
          }
          if(this.my.length!=0){
            if(isNaN(this.my.count)){
              return '请进行正确的成绩输入'
            }
            var tempPoint=this.getPoint['myPoints'];
            for(var i=0;i<this.my.length;i++){
              if(tempPoint[i]===0) {
                return '成绩请不要输入为0'
              }else if(tempPoint[i]==undefined||(typeof tempPoint[i]=='string'&&tempPoint[i].trim()==='')){
                return '请进行问答题成绩的输入'
              }
            }
          }
        }
        return;
      }
    }
  }
</script>

<style scoped lang="scss">
  .left{
    position:fixed;
    vertical-align: top;
    display: inline-block;
    width:18%;
    top:130px;
  }
  .card{
    margin: 10px 20px;
    div{
      padding: 2px;
    }
    span{
      color: #1A8CFE ;
    }
  }
  .right{
    margin-top: 10px;
    margin-left: 25%;
    vertical-align:top;
    width:69%;
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
  /deep/  .el-dialog__footer {
    padding: 10px 20px 20px;
    text-align: center;
    margin-top: 30px;
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
