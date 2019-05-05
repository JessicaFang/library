<template>
  <div>
    <el-table
      :data=testTableData
      border
      :height="143"
      style="width: 100%">
      <el-table-column
        v-for="(value,key,index) in testTableTitle"
        :key=index
        :prop=key
        :label=value>
      </el-table-column>
    </el-table>
    <el-tabs v-model="subActiveName" class="tabs" type="border-card" @tab-click="testRate">
      <el-tab-pane  label="客观题正确率" name="testRate">
        <div class="tabs-content" v-loading="loading">
          <div>
            <el-card v-for='(item,index) in testSingleVos' :key="index">
              <table>
                <tr>
                  <td>{{index+1}}、<span class="questionTitle" v-html="item.singleQuestion"></span></td>
                  <td class="td-center">答题率</td>
                  <td class="td-right">人数</td>
                </tr>
                <tr v-for="(value,index) in item.singleTestChoice">
                  <td><span v-text="translate(index)"></span>、<span class="questionContent" v-html="value"></span></td>
                  <td class="td-center"><el-progress :text-inside="true" :stroke-width="16" :percentage="item.trueRate[index]"></el-progress></td>
                  <td class="td-right">{{item.selectNum[index]}}</td>
                </tr>
                <tr>
                  <td colspan="3">答案：<span v-text="translate(item.singleTestAnswer)"></span></td>
                </tr>
              </table>
            </el-card>
          </div>
          <div>
            <el-card v-for='(item,index) in testMultipleVos' :key="index">
              <table>
                <tr>
                  <td>{{index+1}}、<span class="questionTitle" v-html="item.multipleQuestion"></span></td>
                  <td class="td-center">答题率</td>
                  <td class="td-right">人数</td>
                </tr>
                <tr v-for="(value,index) in item.multipleTestChoice">
                  <td><span v-text="translate(index)"></span>、<span v-html="value" class="questionContent"></span></td>
                  <td class="td-center"><el-progress :text-inside="true" :stroke-width="16" :percentage="item.trueRate[index]"></el-progress></td>
                  <td class="td-right">{{item.selectNum[index]}}</td>
                </tr>
                <tr>
                  <td colspan="3">答案：<span v-text="translate(item.multipleTestAnswer)"></span></td>
                </tr>
              </table>
            </el-card>
          </div>
          <div>
            <el-card v-for='(item,index) in testJudgeVos' :key="index">
              <table>
                <tr>
                  <td>{{index+1}}、<span v-html="item.judgeQuestion" class="questionTitle"></span></td>
                  <td class="td-center">答题率</td>
                  <td class="td-right">人数</td>
                </tr>
                <tr v-for="(value,index) in item.trueRate">
                  <td>{{Boolean(parseInt(index))}}</td>
                  <td class="td-center"><el-progress  :text-inside="true" :stroke-width="16" :percentage="value"></el-progress></td>
                  <td class="td-right">{{item.selectNum[index]}}</td>
                </tr>
                <tr>
                  <td colspan="3">答案：{{item.judgeAnswer}}</td>
                </tr>
              </table>
            </el-card>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="分数段统计" name="scoreSection">
        <div v-loading="loading">
          <div id="charts"  class="charts"  style="width: 600px;height:320px;"></div>
        </div>
      </el-tab-pane>
    </el-tabs>
      <el-button type="primary" class="button" @click="goBack">返回上一页</el-button>
  </div>
</template>
<script>
  import {scoreSection, avgHighLowScore, refDifficulty, testRate} from "@/api/teacher"
  export default {
    name: "index",
    data(){
      return{
        subActiveName:'testRate',
        table:{},
        loading:false,
        paperId: 0,
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
    beforeMount() {
      this.paperId=this.$route.params.paperId;
      this.getTableData();
      this.getQuestionData();
    },
    methods: {
      getTableData() {
        let params = {paperId: this.paperId}
        avgHighLowScore(params).then((res) => {
          this.testTableData.push(res.obj)
        })
      },
      testRate() {
        if ('scoreSection' == this.subActiveName) {
          this.getChartsData();
        }
      },
      getQuestionData(){
        let params = {paperId: this.paperId};
        this.loading=true;
        testRate(params).then((res) => {
          this.testSingleVos = res.obj.testSingleVos
          this.testMultipleVos = res.obj.testMultipleVos
          this.testJudgeVos = res.obj.testJudgeVos
          this.loading=false;
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
      },
      getChartsData() {
        this.loading=true;
        let params = {paperId: this.paperId}
        scoreSection(params).then((res) => {
          if (res.success) {
            this.showCharts(res.obj);
            this.loading=false;
          }
        })
      },
      showCharts(yData) {
        // 条形图
        let myChart = this.$echarts.init(document.getElementById('charts'));
        // 指定图表的配置项和数据
        let option = {
          title: {
            left: 'center',
            text: '分数段统计条形图'
          },
          legend: {
            data: ['人数']
          },
          xAxis: {
            name: '分数',
            data: ["0-60", "60-70", "70-80", "80-90", "90-100"]
          },
          yAxis: {},
          series: [{
            type: 'bar',
            data: yData
          }]
        };
        myChart.setOption(option)
      },
      goBack(){
        this.$router.go(-1);
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
  .questionContent,.questionTitle{
    display: inline-block;
  }
  .tabs{
    margin-top: 10px;
  }
  .tabs-content{
    max-height: 320px;
    overflow-y:auto ;
    padding: 0 10px;
  }
  .charts{
    margin: 0 auto;
  }
  .button{
    width: 100%;
    margin: 10px 0;
    position: fixed;
    bottom:10px
  }
</style>
