<template>
  <div>
    <el-form ref="form"  :model="form" class="form"  :inline="true">
      <el-form-item label-width="45px" label="姓名">
        <el-input v-model="form.name" auto-complete="text"></el-input>
      </el-form-item>
      <el-form-item label-width="45px" label="职称" >
        <el-input v-model="form.classOrTitle" auto-complete="text"></el-input>
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
  import {translate} from "@/util/translate";
  import KnowledgeMessage from '@/components/Message/KnowledgeMessage'
  import {addCourseTeacher} from '@/api/public'
  import {tableConfig,btnConfig} from './tableConfig'
  import DTable from '@/components/Table/DTable'
  import TableButton from '@/components/Table/tableButton'
  import tableMixin from '@/util/Mixins/tableMixins'
  import { mapGetters } from 'vuex'
  import{queryUnCourseTeacher} from '@/api/public'
  export default {
    name: "index",
    data(){
      return {
        form:{
          name:'',
          classOrTitle:'',
        },
        courseId:'',
        ButtonGroup:{},
        tableData:[],
        table:{},
        total:0,
        dialogTitle:'',
        dialogVisible:false,
        knowForm:{},
        updateMessage:'',
      }
    },
    components:{
      DTable,
      TableButton,
      KnowledgeMessage
    },
    mixins: [tableMixin],
    computed: {
      ...mapGetters(['getId'])
    },
    methods:{
      handleClick(event) {
        switch (event) {
          case 'ADDTEACHER':
            this.handleAddTeacherClick();
            break;
          case 'GOBACK':
            this.handleGoBackClick();
            break;
        }
      },
      handleAddTeacherClick() {
        if(this.selectCloumn.length>0) {
          this.$confirm('是否添加负责人', "提示", {
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
            addCourseTeacher(params).then((res) =>{
              if(res.success==true){
                this.getTable();
                this.$message({
                  type: 'info',
                  message: "添加成功"
                });
              }else{
                this.$message({
                  type: 'danger',
                  message: "添加失败"
                });
              }
            })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: "取消添加"
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
        //this.defaultParams多少页多少行
        //只需要还未被选择的学生
        const params=Object.assign({},this.defaultParams,this.form,{courseId:this.courseId});
        console.log(params)
          queryUnCourseTeacher(params).then(res=>{
            if(res.success==true){
              this.tableData=translate(res.obj);
              this.total=res.total
            }else{
              this.$message.warning(res.msg)
            }
          })
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
