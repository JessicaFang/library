<template>
  <div>
    <el-form ref="form"  :model="form" class="form"  :inline="true">
      <el-form-item label-width="75px" label="课程号" >
        <el-input v-model="form.courseId" placeholder="请输入课程号"></el-input>
      </el-form-item>
      <el-form-item label-width="75px" label="试卷名称" >
        <el-input v-model="form.paperTitle" placeholder="请输入试卷名称"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSearch">查找</el-button>
      </el-form-item>
    </el-form>
    <table-button
      class="tableBtn"
      :ButtonGroup="ButtonGroup"
      @handleClick="handleClick">
    </table-button>
    <DTable
      class="table"
      @selectChange="calSelection"
      :table="table"
      :tableData="tableData"
      :total="total"
      @pageMesChange = "handleMesChange"
    ></DTable>
  </div>
</template>

<script>
  import {queryTestPaper } from '@/api/student'
  import {tableConfig,btnConfig} from './tableConfig'
  import DTable from '@/components/Table/DTable'
  import TableButton from '@/components/Table/tableButton'
  import tableMixin from '@/util/Mixins/tableMixins'
  import { mapActions,mapGetters } from 'vuex'
  export default {
    name: "index",
    data(){
      return {
        form:{
          paperTitle:'',
          courseId:'',
        },
        tableData:[],
        table:{},
        total:0,
        ButtonGroup:{},
      }
    },
    components:{
      DTable,
      TableButton
    },
    computed:{
      ...mapGetters(['getId']),
    },
    mixins: [tableMixin],
    methods:{
      ...mapActions(['setExamActions']),
      handleClick(event) {
        switch (event) {
          case 'Test':
            this.handleTestClick();
            break;
        }
      },
      handleTestClick(){
        var id=this.selectCloumn[0].paperId
       /* queryTestPaper(id).then()*/
        var res={
          "success": true,
          "msg": "操作成功",
          "obj": {
            "testPaper": {
              "passingScore": 60,
              "paperId": 1,
              "paperTitle": "修改试卷名",
              "paperHead": "试卷头部",
              "totalPoints": 100,
              "minutesLength": 120,
              "testTime": "2019-04-24T08:01:57.000+0000",
              "createDate": "2019-01-27",
              "paperState": "1",
              "analysisReport": null,
              "knowledgeCover": [
                "知识点覆盖面"
              ],
              "singleCounter": 5,
              "singlePoints": 20,
              "multipleCounter": 5,
              "multiplePoints": 20,
              "judgeCounter": 5,
              "judgePoints": 20,
              "blankCounter": 5,
              "blankPoints": 20,
              "questionCounter": 5,
              "questionPoints": 20,
              "courseId": 2
            },
            "testSingleVos": [
              {
                "testSingleId": 1,
                "paperId": null,
                "singleId": 1,
                "singleQuestion": "单选试题题目",
                "singleTestChoice": [
                  "我是谁",
                  "我来自哪里",
                  "我将要去何处",
                  "我为什么存在"
                ],
                "singleTestAnswer": null,
                "knowledgeTest": "[\"知识点名称1\",\"zhi2\"]",
                "singlePoints": 10,
                "selectNum": null,
                "trueRate": null
              },
              {
                "testSingleId": 5,
                "paperId": null,
                "singleId": 1,
                "singleQuestion": "单选试题题目",
                "singleTestChoice": [
                  "我是谁",
                  "我来自哪里",
                  "我将要去何处",
                  "我为什么存在"
                ],
                "singleTestAnswer": null,
                "knowledgeTest": "[\"知识点名称1\",\"zhi2\"]",
                "singlePoints": 10,
                "selectNum": null,
                "trueRate": null
              }
            ],
            "testBlankVos": [
              {
                "testBlankId": 1,
                "blankId": 1,
                "paperId": null,
                "blankQuestion": "???",
                "blankCounter": 3,
                "blankAnswer": null,
                "knowledgeTest": "[\"知识点名称1\",\"zhi2\"]",
                "blankPoints": 10
              }
            ],
            "testJudgeVos": [
              {
                "testJudgeId": 1,
                "paperId": null,
                "judgeId": 1,
                "judgeQuestion": "问题",
                "judgeAnswer": null,
                "knowledgeTest": "[\"知识点名称1\",\"zhi2\"]",
                "judgePoints": 10,
                "selectNum": null,
                "trueRate": null
              }
            ],
            "testMultipleVos": [
              {
                "testMultipleId": 1,
                "multipleId": 1,
                "paperId": null,
                "multipleQuestion": "多选试题题目",
                "multipleTestChoice": [
                  "我是谁",
                  "我来自哪里",
                  "我将要去何处",
                  "我为什么存在"
                ],
                "multipleTestAnswer": null,
                "knowledgeTest": "[\"知识点名称1\",\"zhi2\"]",
                "multiplePoints": 10,
                "selectNum": null,
                "trueRate": null
              }
            ],
            "testQuestionVos": [
              {
                "testQuestionId": 1,
                "paperId": null,
                "myQuestionId": 1,
                "myQuestion": "问题",
                "myAnswer": null,
                "detailReviewRules": "评分规则",
                "knowledgeTest": "[\"知识点名称1\",\"zhi2\"]",
                "myPoints": 20
              }
            ]
          },
          "total": null,
          "attributes": null
        };
        console.log(res.obj);
        this.setExamActions(res.obj);
        /*this.$router.push('StudentExaming')*/
        window.open('http://127.0.0.1:8080/#/StudentExaming','_self','big','fullscreen=yes')
      },
      onSearch(){
        this.getTable();
      },
      getTable(){
        const params=Object.assign({},this.defaultParams,this.form,{finished:'0',paperState:'1'});
        this.tableData=[
          {passingScore:60,minutesLength:40,totalPoints:100,testTime:"2019-01-28T10:06:57.000+0000",courseId:2,paperState:'0',paperId:1,paperTitle:'试卷名称',createDate:'2019-01-28'},
          {passingScore:60,minutesLength:40,totalPoints:100,testTime:"2019-01-28T10:06:57.000+0000",courseId:2,paperState:'0',paperId:1,paperTitle:'试卷名称',createDate:'2019-01-28'},
          {passingScore:60,minutesLength:40,totalPoints:100,testTime:"2019-01-28T10:06:57.000+0000",courseId:2,paperState:'0',paperId:1,paperTitle:'试卷名称',createDate:'2019-01-28'},
          {passingScore:60,minutesLength:40,totalPoints:100,testTime:"2019-01-28T10:06:57.000+0000",courseId:2,paperState:'0',paperId:1,paperTitle:'试卷名称',createDate:'2019-01-28'},
          {passingScore:60,minutesLength:40,totalPoints:100,testTime:"2019-01-28T10:06:57.000+0000",courseId:2,paperState:'0',paperId:1,paperTitle:'试卷名称',createDate:'2019-01-28'},
          {passingScore:60,minutesLength:40,totalPoints:100,testTime:"2019-01-28T10:06:57.000+0000",courseId:2,paperState:'0',paperId:1,paperTitle:'试卷名称',createDate:'2019-01-28'},
          {passingScore:60,minutesLength:40,totalPoints:100,testTime:"2019-01-28T10:06:57.000+0000",courseId:2,paperState:'0',paperId:1,paperTitle:'试卷名称',createDate:'2019-01-28'},
          {passingScore:60,minutesLength:40,totalPoints:100,testTime:"2019-01-28T10:06:57.000+0000",courseId:2,paperState:'0',paperId:1,paperTitle:'试卷名称',createDate:'2019-01-28'},
          {passingScore:60,minutesLength:40,totalPoints:100,testTime:"2019-01-28T10:06:57.000+0000",courseId:2,paperState:'0',paperId:1,paperTitle:'试卷名称',createDate:'2019-01-28'},
          {passingScore:60,minutesLength:40,totalPoints:100,testTime:"2019-01-28T10:06:57.000+0000",courseId:2,paperState:'0',paperId:1,paperTitle:'试卷名称',createDate:'2019-01-28'},
          {passingScore:60,minutesLength:40,totalPoints:100,testTime:"2019-01-28T10:06:57.000+0000",courseId:2,paperState:'0',paperId:1,paperTitle:'试卷名称',createDate:'2019-01-28'},
          {passingScore:60,minutesLength:40,totalPoints:100,testTime:"2019-01-28T10:06:57.000+0000",courseId:2,paperState:'0',paperId:1,paperTitle:'试卷名称',createDate:'2019-01-28'},
        ],
        this.total=40;
        /*selectLib(params).then(res=>{
          if(res.success==true){
            this.tableData=res.data;
            this.total=res.total;
          }
        })*/
      },
      init(){
        this.table=tableConfig;
        this.ButtonGroup=btnConfig;
      },

    },
    beforeMount(){
      this.init();
      this.getTable();
    }
  }
</script>

<style scoped>
  .table{
    margin-top: 8px;
  }
</style>
