<template>
  <div>
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
    <el-tabs v-model="subActiveName" type="card" @tab-click="testRate">
      <el-tab-pane label="分数段统计" name="scoreSection">
        <div id="charts"></div>
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
  </div>
</template>
<script>
  export default {
    name: "index"
  }
</script>

<style scoped>

</style>
