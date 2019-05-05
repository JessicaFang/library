<template>
  <div>
    <el-form  ref="form" :model="form" class="form" :inline="true">
      <el-form-item label-width="75px" label="试卷名称" >
        <el-input v-model="form.paperTitle" placeholder="请输入试卷名称"></el-input>
      </el-form-item>
      <el-form-item label-width="75px" label="课程号" >
        <el-input v-model="form.courseId" placeholder="请输入课程号"></el-input>
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
      :tableHeight="390"
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
  import TableButton from '@/components/Table/tableButton'
  import tableMixin from '@/util/Mixins/tableMixins'
  import {queryTestPaper} from "@/api/teacher"
  import { translateDiff }from '@/util/translate'
  export default {
    name: "index",
    data(){
      return{
        form:{},
        tableData: [],
        total: 0,
        ButtonGroup:[],
      }
    },
    components:{
      DTable,
      TableButton
    },
    mixins: [tableMixin],
    methods:{
      handleClick(event) {
        switch (event) {
          case 'VIEW':
            this.handleViewClick();
            break;
        }
      },
      handleViewClick(){
        var paperId=this.selectCloumn[0].paperId;
        this.$router.push({name:'TeacherEcharts',params:{paperId:paperId}})
      },
      getTable() {
        const params=Object.assign({},this.defaultParams,this.form,{paperState:'1'});
        queryTestPaper(params).then(res=>{
          if(res.success==true){
            this.tableData=res.obj;
            this.total=res.total;
          }else{
            this.$message({
              type:'warning',
              message:res.msg,
            })
          }
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
  .table{
    margin-top: 8px;
  }
</style>
