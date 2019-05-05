<template>
  <div>
    <el-tabs v-model="activeName">
      <el-tab-pane label="题库分析" name="lib">
         <questionStatic></questionStatic>
      </el-tab-pane>
      <!--试卷分析-->
      <el-tab-pane label="试卷分析" name="test">
        <testStatic></testStatic>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import questionStatic from './questionStatic'
  import testStatic from './testStatic'
  import {scoreSection, avgHighLowScore, refDifficulty, testRate} from "@/api/teacher"
  export default {
    name: "index",
    data() {
      return {
        //试卷
        activeName: 'lib',
        table:{},
        // 考试
        paperId: 1,
        testTableTitle: {
          paperTitle: '试卷名称',
          testNum: '考试人数',
          testTime: '考试时间',
          minutesLength: '考试时长',
          totalPoints: '总分',
          passingScore: '及格分',
          avgScore: '平均分',
          highestScore: '最高分',
          lowestScore: '最低分',
          passRate: '及格率'
        },
        testTableData: [],
        testJudgeVos: [],
        testMultipleVos: [],
        testSingleVos: []
      }
    },
    components:{
      questionStatic,
      testStatic,
    },
    mounted() {
      this.getTableData()
    },
    methods: {
      getTableData() {
        let params = {paperId: this.paperId}
        avgHighLowScore(params).then((res) => {
          this.testTableData.push(res.obj)
        })
      },
      testRate() {
        if ('scoreSection' == this.subActiveName) return
        let params = {paperId: this.paperId}
        testRate(params).then((res) => {
          this.testSingleVos = res.obj.testSingleVos
          this.testMultipleVos = res.obj.testMultipleVos
          this.testJudgeVos = res.obj.testJudgeVos
        })
      },
      translate(value) {
        let code = ['A', 'B', 'C', 'D'];
        let string = '';
        let length=value.length
        if (length > 1) {
          for(let item = 0;item<length;item++){
            string += code[value.charAt(item)]
          }
        } else string += code[value]
        return string;
      }
    }
  }
</script>

<style scoped>
  /deep/ .el-table th.gutter {
    display: table-cell !important;
  }
  table{
    margin:5px auto;
    width:95%;
  }
  td{
    text-align:left;
  }
  .td-right{
    width:100px;
    text-align:center;
  }
  .td-center{
    width:250px;
  }
  .form{
    margin-left: 4px;
  }
  .charts{
    display: inline-block;
  }
</style>
