<template>
  <div>
    <el-tabs v-model="activeName">
      <el-tab-pane label="题库分析" name="lib">
        <el-form  ref="form"  :model="form" class="form" :inline="true">
          <el-form-item  >
            <el-select v-model="form.type" placeholder="请选择">
              <el-option
                v-for="item in typeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button @click="getLib" type="primary" icon="el-icon-search">搜索</el-button>
          </el-form-item>
        </el-form>
        <DTable
          class="table"
          @selectChange="calSelection"
          :table="table"
          :tableData="tableData"
          :total="total"
          @pageMesChange = "handleMesChange"
        ></DTable>
      </el-tab-pane>

      <!--试卷分析-->
      <el-tab-pane label="试卷分析" name="test">
        <el-card>
          <el-table
            :data=testTableData
            border
            style="width: 100%">
            <el-table-column
              v-for="(value,key,index) in testTableTitle"
              :key=index
              :prop=key
              :label=value>
            </el-table-column>
          </el-table>
        </el-card>

        <el-tabs v-model="subActiveName" type="card" @tab-click="testRate">
          <el-tab-pane label="分数段统计" name="scoreSection">
            <div id="myChart" style="float:left;width: 600px;height:400px;margin-top: 10%"></div>
            <div id="myChart1" style="float:left;width: 600px;height:400px;margin-top: 10%"></div>
          </el-tab-pane>
          <el-tab-pane label="客观题正确率" name="testRate">
            <div>
              <el-card v-for='(item,index) in testSingleVos' :key="index">
                <table>
                  <tr>
                    <td>{{index+1}}.{{item.singleQuestion}}</td>
                    <td class="td-center">答题率</td>
                    <td class="td-right">人数</td>
                  </tr>
                  <tr v-for="(value,index) in item.singleTestChoice">
                    <td><span v-text="translate(index)"></span>.{{value}}</td>
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
                    <td>{{index+1}}.{{item.multipleQuestion}}</td>
                    <td class="td-center">答题率</td>
                    <td class="td-right">人数</td>
                  </tr>
                  <tr v-for="(value,index) in item.multipleTestChoice">
                    <td><span v-text="translate(index)"></span>.{{value}}</td>
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
                    <td>{{index+1}}.{{item.judgeQuestion}}</td>
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
          </el-tab-pane>
        </el-tabs>

      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import {tableConfig,btnConfig} from './tableConfig'
  import DTable from '@/components/Table/DTable'
  import tableMixin from '@/util/Mixins/tableMixins'
  import {scoreSection, avgHighLowScore, refDifficulty, testRate} from "@/api/teacher"
  export default {
    name: "index",
    data() {
      return {
        //试卷
        activeName: 'lib',
        form:{
          type: '1',
        },
        typeOptions: [{
          value: '1',
          label: '单选题'
        }, {
          value: '2',
          label: '多选题'
        }, {
          value: '3',
          label: '判断题'
        }, {
          value: '4',
          label: '填空题'
        }, {
          value: '5',
          label: '问答题'
        }],
        tableData: [],
        table:{},
        total: 0,
        ButtonGroup:[],
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
        subActiveName: 'scoreSection',
        testJudgeVos: [],
        testMultipleVos: [],
        testSingleVos: []
      }
    },
    components:{
      DTable,
    },
    mixins: [tableMixin],
    mounted() {
      this.init();
      this.getChartsData()
      this.getTableData()
    },
    methods: {
      init(){
        this.table=tableConfig;
        this.ButtonGroup=btnConfig;
      },
      getLib() {
        var params=Object.assign({},{courseId: 2, type: this.form.type},this.defaultParams);
        refDifficulty(params).then((res) => {
          console.log(res.obj)
          res.obj.forEach(item => {
            item.difficultLevel = this.transferDifficulty(item.difficultLevel)
          })
          this.total = res.total
          this.tableData = res.obj
        })
      },
      getTableData() {
        let params = {paperId: this.paperId}
        avgHighLowScore(params).then((res) => {
          let testTime = new Date(res.obj.testTime)
          res.obj.testTime = testTime.getFullYear()+'-'+testTime.getMonth()+1+'-'+testTime.getDate()+' '+testTime.getHours()+':'+testTime.getMinutes()+':'+testTime.getSeconds();
          this.testTableData.push(res.obj)
        })
      },
      getChartsData() {
        let params = {paperId: this.paperId}
        scoreSection(params).then((res) => {
          if (res.success) {
            this.showCharts(res.obj)
          } else {

          }
        })
      },
      showCharts(yData) {
        // 条形图
        let myChart = echarts.init(document.getElementById('myChart'))
        // 指定图表的配置项和数据
        let option = {
          title: {
            left:'center',
            text: '条形图'
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

        //饼状图
        let myChart1 = echarts.init(document.getElementById('myChart1'))
        let totalNum = 0
        yData.forEach(item=>{
          totalNum+=item
        })
        let option1 = {
          title: {
            text: '饼状图',
            left: 'center',
            top: 20
          },

          tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },

          visualMap: {
            show: false,
            min: 0,
            max: totalNum,
            inRange: {
              colorLightness: [0, 1]
            }
          },
          series : [
            {
              name:'分数段统计',
              type:'pie',
              radius : '55%',
              center: ['50%', '50%'],
              data:[
                {value:yData[0], name:'0-60'},
                {value:yData[1], name:'60-70'},
                {value:yData[2], name:'70-80'},
                {value:yData[3], name:'80-90'},
                {value:yData[4], name:'90-100'}
              ].sort(function (a, b) { return a.value - b.value; }),
              roseType: 'radius',
              label: {
                normal: {
                  textStyle: {
                    color: 'rgba(5, 5, 15, 0.8)'
                  }
                }
              },
              labelLine: {
                normal: {
                  lineStyle: {
                    color: 'rgba(5, 5, 15, 0.8)'
                  },
                  smooth: 0.2,
                  length: 10,
                  length2: 20
                }
              },
              itemStyle: {
                normal: {
                  color: '#c23531'
                }
              },
              animationType: 'scale',
              animationEasing: 'elasticOut',
              animationDelay: function (idx) {
                return Math.random() * 200;
              }
            }
          ]
        };
        myChart1.setOption(option1)
      },
      testRate() {
        if ('scoreSection' == this.subActiveName) return
        let params = {paperId: this.paperId}
        testRate(params).then((res) => {
          console.log(res)
          this.testSingleVos = res.obj.testSingleVos
          this.testMultipleVos = res.obj.testMultipleVos
          this.testJudgeVos = res.obj.testJudgeVos
        })
      },
      transferDifficulty(difficulty) {
        console.log(difficulty)
        if (difficulty < 0.3) return '容易'
        if (difficulty < 0.6) return '较容易'
        if (difficulty < 0.9) return '困难'
        if (difficulty <= 1) return '较困难'
      },
      handleCurrentChange(currentPage) {
        this.currentPage = currentPage
        this.getLib()
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
</style>
