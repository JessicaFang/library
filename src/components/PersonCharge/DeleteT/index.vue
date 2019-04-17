<template>
  <div>
    <el-form ref="form"  :model="form" class="form"  :inline="true">
      <el-form-item label-width="45px" label="姓名">
        <el-input v-model="form.username" auto-complete="text"></el-input>
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
  import{ delCourseTeacher }from '@/api/public'
  import {tableConfig,btnConfig} from './tableConfig'
  import DTable from '@/components/Table/DTable'
  import TableButton from '@/components/Table/tableButton'
  import tableMixin from '@/util/Mixins/tableMixins'
  import { mapGetters } from 'vuex'
  export default {
    name: "index",
    data(){
      return {
        form:{
          username:'',
          classOrTitle:'',
        },
        courseId:'',
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
    mixins: [tableMixin],
    computed: {
      ...mapGetters(['getId'])
    },
    methods:{
      handleClick(event) {
        switch (event) {
          case 'DELETETEACHER':
            this.handleDeleteTeacherClick();
            break;
          case 'GOBACK':
            this.handleGoBackClick();
            break;
        }
      },
      handleDeleteTeacherClick() {
        if(this.selectCloumn.length>0) {
          this.$confirm('是否撤销负责人', "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: 'warning'
          }).then(() => {
            var no = [];
            this.selectCloumn.forEach((item, index) => {
              no[index] = item.tno;
            });
            no=no.toString();
            var params = {courseId:this.courseId,tnos:no};
            delCourseTeacher(params).then((res) =>{
              if(res.success==true){
                this.getTable();
                this.$message({
                  type: 'info',
                  message: "撤销成功"
                });
              }else{
                this.$message({
                  type: 'danger',
                  message: "撤销失败"
                });
              }
            })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: "取消撤销"
            })
          })
        }else{
          this.$message({
            message: "请选择数据",
            type: 'warning'
          });
        }
      },
      handleGoBackClick(){
        this.$router.go(-1);
      },
      getTable(){
        //可以根据名字进行查询
        const params=Object.assign({},this.defaultParams,{courseId:this.courseId},this.form);
        const obj=[
          {courseIntroduction:'的看法角度看',courseName:'政治',courseId:'1',tno:'001',name:'小熊'},
          {courseIntroduction:'的看法角度看',courseName:'政治',courseId:'1',tno:'001',name:'小熊'},
          {courseIntroduction:'的看法角度看',courseName:'政治',courseId:'1',tno:'001',name:'小熊'},
          {courseIntroduction:'的看法角度看',courseName:'政治',courseId:'1',tno:'001',name:'小熊'},
          {courseIntroduction:'的看法角度看',courseName:'政治',courseId:'1',tno:'001',name:'小熊'},
          {courseIntroduction:'的看法角度看',courseName:'政治',courseId:'1',tno:'001',name:'小熊'},
          {courseIntroduction:'的看法角度看',courseName:'政治',courseId:'1',tno:'001',name:'小熊'},
          {courseIntroduction:'的看法角度看',courseName:'政治',courseId:'1',tno:'001',name:'小熊'},
          {courseIntroduction:'的看法角度看',courseName:'政治',courseId:'1',tno:'001',name:'小熊'},
          {courseIntroduction:'的看法角度看',courseName:'政治',courseId:'1',tno:'001',name:'小熊'},
          {courseIntroduction:'的看法角度看',courseName:'政治',courseId:'1',tno:'001',name:'小熊'},
        ];
        this.tableData=obj;
        this.total=40;
        /*  getMessage(params).then(res=>{
          if(res.success==true){
            this.tableData=translate(res.obj);
            this.total=res.total
          }
        })*/
      },
      init(){
        this.courseId=this.getId;
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
