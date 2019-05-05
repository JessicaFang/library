<template>
    <div>
      <el-form  ref="form" :model="form" class="form" :inline="true">
        <el-form-item label="课程号" >
          <el-input v-model="form.courseId" placeholder="请输入课程号"></el-input>
        </el-form-item>
        <el-form-item label="题型" >
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
          <el-button @click="getTable" type="primary" icon="el-icon-search">搜索</el-button>
        </el-form-item>
      </el-form>
      <DTable
        class="table"
        :tableHeight="420"
        @selectChange="calSelection"
        :table="table"
        :tableData="tableData"
        :total="total"
        @pageMesChange = "handleMesChange"
      ></DTable>
    </div>
</template>

<script>
  import {tableConfig,btnConfig} from './tableConfig'
  import DTable from '@/components/Table/DTable'
  import tableMixin from '@/util/Mixins/tableMixins'
  import {scoreSection, avgHighLowScore, refDifficulty, testRate} from "@/api/teacher"
  import { translateDiff }from '@/util/translate'
    export default {
        name: "index",
      data(){
          return{
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
            total: 0,
            ButtonGroup:[],
          }
      },
      components:{
        DTable,
      },
      mixins: [tableMixin],
      methods:{
        getTable() {
          var params=Object.assign({},this.form,this.defaultParams);
          refDifficulty(params).then((res) => {
            this.total = res.total;
            this.tableData =translateDiff(res.obj)
          })
        },
        init(){
          this.table=tableConfig;
          this.ButtonGroup=btnConfig;
        },
      },
      beforeMount(){
        this.init();
        this.getTable();
      },
    }
</script>

<style scoped>

</style>
