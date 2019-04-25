<template>
  <div>
    <el-form ref="form"  :model="form" class="form"  :inline="true" >
      <el-form-item label-width="70px" label="试卷名称" >
        <el-input v-model="form.name" auto-complete="text"></el-input>
      </el-form-item>
      <el-form-item label-width="70px" label="试卷状态">
        <el-select v-model="form.paperState" placeholder="请选择试卷状态">
          <el-option label="未批改" value="0"></el-option>
          <el-option label="已批改" value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label-width="70px" label="人工批改">
        <el-select v-model="form.manualCorrecting" placeholder="请选择是否人工批改">
          <el-option label="否" value="0"></el-option>
          <el-option label="是" value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label-width="70px" label="考试时间">
        <el-date-picker
          v-model="form.testTime"
          type="datetime"
          placeholder="选择考试时间">
        </el-date-picker>
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
      :tableHeight="380"
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
  import{ getCourseTeacher }from '@/api/teacher'
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
          courseId:'',
          courseName:'',
        },
        ButtonGroup:{},
        tableData:[],
        table:{},
        total:0,
      }
    },
    components:{
      DTable,
      TableButton,
    },
    computed:{
      ...mapGetters(['getId',])
    },
    mixins: [tableMixin],
    methods:{
      ...mapActions(['setExamActions','setPaperIdActions','setManualActions','setPaperStateActions']),
      handleClick(event) {
        switch (event) {
          case 'ADDPAPER':
            this.setManualActions({flag:false});
            this.handleObjectClick('TeacherExam');
            break;
          case 'ALTER':
            this.setManualActions({flag:true})
            this.handleObjectClick('TeacherExam');
            break;
          case 'GOBACK':
            this.$router.go(-1);
            break;
        }
      },
      handleObjectClick(path){
        const paperId=this.selectCloumn[0].paperId;
         this.setPaperIdActions({paperId:paperId});
        const state=this.selectCloumn[0].paperState;
        this.setPaperStateActions({paperState:state});
        var obj={
          "knowledgeCover": [
            "知识点覆盖面"
          ],
            "paperId": 1,
            "sno": "nishishui",
            "paperTitle": "修改试卷名",
            "paperHead": "试卷头部",
            "totalPoints": 100,
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
            "singleTotalScore": 0,
            "multipleTotalScore": 10,
            "blankTotalScore": 3.33,
            "questionTotalScore": 0,
            "judgeTotalScore": 10,
            "allTotalScore": 23.33,
          "resultMultipleVos": [
            {
              "testMultipleVo": {
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
                "multipleTestAnswer": "013",
                "knowledgeTest": "[\"知识点名称1\",\"zhi2\"]",
                "multiplePoints": 10,
                "selectNum": null,
                "trueRate": null
              },
              "multipleAnswer": "013",
              "right": true,
              "multipleScore": 10
            }
          ],
            "resultSingleVos": [
            {
              "testSingleVo": {
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
                "singleTestAnswer": "2",
                "knowledgeTest": "[\"知识点名称1\",\"zhi2\"]",
                "singlePoints": 10,
                "selectNum": null,
                "trueRate": null
              },
              "singleAnswer": "3",
              "right": false,
              "singleScore": 0
            },
              {
              "testSingleVo": {
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
                "singleTestAnswer": "2",
                "knowledgeTest": "[\"知识点名称1\",\"zhi2\"]",
                "singlePoints": 10,
                "selectNum": null,
                "trueRate": null
              },
              "singleAnswer": "3",
              "right": false,
              "singleScore": 0
            },
          ],

            "resultJudgeVos": [
            {
              "testJudgeVo": {
                "testJudgeId": 1,
                "paperId": null,
                "judgeId": 1,
                "judgeQuestion": "问题",
                "judgeAnswer": true,
                "knowledgeTest": "[\"知识点名称1\",\"zhi2\"]",
                "judgePoints": 10,
                "selectNum": null,
                "trueRate": null
              },
              "judgeAnswer": true,
              "right": true,
              "judgeScore": 10
            }
          ],
            "resultBlankVos": [
            {
              "testBlankVo": {
                "testBlankId": 1,
                "blankId": 1,
                "paperId": null,
                "blankQuestion": "???",
                "blankCounter": 3,
                "blankAnswer": [
                  [
                    "答案1"
                  ],
                  [
                    "答案2"
                  ],
                  [
                    "答案3"
                  ]
                ],
                "knowledgeTest": "[\"知识点名称1\",\"zhi2\"]",
                "blankPoints": 10
              },
              "blankAnswer": [
                "哈哈哈",
                "答案2",
                ""
              ],
              "myScore": null,
              "myReviewerName": null,
              "myReviewerTno": null
            }
          ],
            "resultQuestionVos": [
            {
              "testQuestionVo": {
                "testQuestionId": 1,
                "paperId": null,
                "myQuestionId": 1,
                "myQuestion": "问题",
                "myAnswer": "答案",
                "detailReviewRules": "评分规则",
                "knowledgeTest": "[\"知识点名称1\",\"zhi2\"]",
                "myPoints": 20
              },
              "myAnswer": "呜呜呜呜呜",
              "myScore": 0,
              "myReviewerName": null,
              "myReviewerTno": null
            }
          ]
        };
        this.setExamActions(obj);
        this.$router.push(path)
      },
      getTable(){
        const params=Object.assign({},this.defaultParams,this.form,{id:this.getId});
        this.tableData=[
          {"minutesLength": 120, "sno": "jwuyou", "allTotalScore": 10, "totalPoints": 100, "name": "jwuyou", "passingScore": 65.55, "testTime": "2019-04-10T05:38:53.000+0000", "courseId": 2, "paperState": "1", "paperTitle": "试卷名称", "paperId": 32},
          {"minutesLength": 120, "sno": "jwuyou", "allTotalScore": 10, "totalPoints": 100, "name": "jwuyou", "passingScore": 65.55, "testTime": "2019-04-10T05:38:53.000+0000", "courseId": 2, "paperState": "1", "paperTitle": "试卷名称", "paperId": 32},
          {"minutesLength": 120, "sno": "jwuyou", "allTotalScore": 10, "totalPoints": 100, "name": "jwuyou", "passingScore": 65.55, "testTime": "2019-04-10T05:38:53.000+0000", "courseId": 2, "paperState": "0", "paperTitle": "试卷名称", "paperId": 32},
          {"minutesLength": 120, "sno": "jwuyou", "allTotalScore": 10, "totalPoints": 100, "name": "jwuyou", "passingScore": 65.55, "testTime": "2019-04-10T05:38:53.000+0000", "courseId": 2, "paperState": "0", "paperTitle": "试卷名称", "paperId": 32},
          {"minutesLength": 120, "sno": "jwuyou", "allTotalScore": 10, "totalPoints": 100, "name": "jwuyou", "passingScore": 65.55, "testTime": "2019-04-10T05:38:53.000+0000", "courseId": 2, "paperState": "0", "paperTitle": "试卷名称", "paperId": 32},
          {"minutesLength": 120, "sno": "jwuyou", "allTotalScore": 10, "totalPoints": 100, "name": "jwuyou", "passingScore": 65.55, "testTime": "2019-04-10T05:38:53.000+0000", "courseId": 2, "paperState": "0", "paperTitle": "试卷名称", "paperId": 32},
          {"minutesLength": 120, "sno": "jwuyou", "allTotalScore": 10, "totalPoints": 100, "name": "jwuyou", "passingScore": 65.55, "testTime": "2019-04-10T05:38:53.000+0000", "courseId": 2, "paperState": "0", "paperTitle": "试卷名称", "paperId": 32},
          {"minutesLength": 120, "sno": "jwuyou", "allTotalScore": 10, "totalPoints": 100, "name": "jwuyou", "passingScore": 65.55, "testTime": "2019-04-10T05:38:53.000+0000", "courseId": 2, "paperState": "0", "paperTitle": "试卷名称", "paperId": 32},
          {"minutesLength": 120, "sno": "jwuyou", "allTotalScore": 10, "totalPoints": 100, "name": "jwuyou", "passingScore": 65.55, "testTime": "2019-04-10T05:38:53.000+0000", "courseId": 2, "paperState": "0", "paperTitle": "试卷名称", "paperId": 32},
        ];
        this.total=40;
     /*   getCourseTeacher(params).then(res=>{
          if(res.success==true){
            console.log(res.obj[0]);
            this.tableData=res.obj;
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
