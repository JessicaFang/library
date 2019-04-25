<template>
  <div>
    <el-form ref="form"  :model="form" class="form"  :inline="true">
      <el-form-item label-width="60px" label="课程号">
        <el-input v-model="form.courseId" placeholder="请输入课程号"></el-input>
      </el-form-item>
      <el-form-item label-width="45px" label="难度">
        <el-select v-model="form.difficultLevel" placeholder="请选择题目难度">
          <el-option label="较容易" value="0"></el-option>
          <el-option label="容易" value="0.3"></el-option>
          <el-option label="较困难" value="0.6"></el-option>
          <el-option label="困难" value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label-width="60px" label="知识点">
        <el-input v-model="form.knowledgeTitle" placeholder="请输入知识点"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSearch">查找</el-button>
      </el-form-item>
    </el-form>
    <DTable
      :tableHeight="tableHeight"
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
  import {tableConfig,btnConfig} from './tableConfig'
  import DTable from '@/components/Table/DTable'
  import tableMixin from '@/util/Mixins/tableMixins'
  import { mapActions } from 'vuex'
  export default {
    name: "index",
    data(){
      return {
        form:{
          type:'1',
          courseId:'',
          difficultLevel:'',
          knowledgeTitle:'',
        },
        tableHeight:200,
        type:'',
        tableData:[],
        table:{},
        total:0,
        ButtonGroup:[],
      }
    },
    components:{
      DTable,
    },
    mixins: [tableMixin],
    methods:{
      onSearch(){
        this.getTable();
      },
      getTable(){
        this.tableData=[
          {courseId:'1',id:'001',difficultLevel:'容易',questionContent:'手机端付款'},
          {courseId:'1',id:'001',difficultLevel:'容易',questionContent:'手机端付款'},
          {courseId:'1',id:'001',difficultLevel:'容易',questionContent:'手机端付款'},
          {courseId:'1',id:'001',difficultLevel:'容易',questionContent:'手机端付款'},
          {courseId:'1',id:'001',difficultLevel:'容易',questionContent:'手机端付款'},
          {courseId:'1',id:'001',difficultLevel:'容易',questionContent:'手机端付款'},
          {courseId:'1',id:'001',difficultLevel:'容易',questionContent:'手机端付款'},
          {courseId:'1',id:'001',difficultLevel:'容易',questionContent:'手机端付款'},
          {courseId:'1',id:'001',difficultLevel:'容易',questionContent:'手机端付款'},
          {courseId:'1',id:'001',difficultLevel:'容易',questionContent:'手机端付款'},
        ]
        this.total=40;
        const params=Object.assign({},this.defaultParams,this.form);
        this.type=this.form.type;
        //this.defaultParams多少页多少行
        /*  const params=Object.assign({},this.defaultParams,{roleLevel:this.roleLevel,status:'0'},this.form);
          getMessage(params).then(res=>{
            if(res.success==true){
              this.tableData=translate(res.obj);
              this.total=res.total
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

<style scoped lang="scss">
  .table{
    margin-top: 8px;
    /deep/ .el-table__body-wrapper{
      overflow: auto;
      position: relative;
      min-height: 200px;
    }
  }
</style>
