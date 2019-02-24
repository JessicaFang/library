<template>
  <div>
    <el-form ref="form"  :model="form" class="form"  :inline="true">
      <el-form-item label-width="70px" label="课程号" >
        <el-input v-model="form.courseId" auto-complete="text"></el-input>
      </el-form-item>
      <el-form-item label-width="70px" label="课程名">
        <el-input v-model="form.courseName" auto-complete="text"></el-input>
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
    <div v-if="dialogVisible">
    <el-dialog
      :title="dialogTitle"
      :visible="visible"
      :before-close="handleClose">
      <course-message ref="message" :showId="showId" :myForm="courseForm" ></course-message>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="updateMessage">确 定</el-button>
    </span>
    </el-dialog>
    </div>
  </div>
</template>

<script>
  import CourseMessage from '@/components/Message/CourseMessage'
  import {translate} from "@/util/translate";
  import{ addCourse,deleteCourse,alterCourse }from '@/api/manager'
  import{ examine }from '@/api/manager'
  import {tableConfig,btnConfig} from './tableConfig'
  import DTable from '@/components/Table/DTable'
  import TableButton from '@/components/Table/tableButton'
  import tableMixin from '@/util/Mixins/tableMixins'
  import { mapActions } from 'vuex'
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
        courseForm:[],
        dialogTitle:'',
        dialogVisible:false,
        updateMessage:'',
        showId:true,
        visible:true,
      }
    },
    components:{
      DTable,
      TableButton,
      CourseMessage
    },
    mixins: [tableMixin],
    methods:{
      ...mapActions( // 语法糖
        ['seIdActions'] // 相当于this.$store.dispatch('modifyName'),提交这个方法
      ),
      handleClick(event) {
        switch (event) {
          case 'ADD':
            this.handleAddClick();
            break;
          case 'ALTER':
            this.handleAlterClick();
            break;
          case 'DELETE':
            this.handleDeleteClick();
            break;
          case 'CHARGEK':
            this.handleObjectClick('Knowledge');
            break;
          case 'CHOICEM':
            this.handleObjectClick('ChoiceT');
            break;
          case 'DELETEM':
            this.handleObjectClick('DeleteT');
            break;
          case 'CHOICES':
            this.handleObjectClick('ChoiceS');
            break;
          case 'DELETES':
            this.handleObjectClick('DeleteS');
            break;
          case 'IMPORT':
            this.handleObjectClick('ManagerExport');
            break;


        }
      },
      ADD(){
        this.$refs.message.$refs.form.validate((valid) => {
          if (valid) {
            addCourse(this.$refs.message.form).then(res=>{
              if(res.success==true) {
                this.dialogVisible = false;
                this.$message({
                  type: 'success',
                  message: '添加成功'
                })
              }
            })
          } else {
            return false;
          }
        });
      },
      handleAddClick(){
        this.dialogTitle='课程添加';
        this.courseForm.length=0;
        this.courseForm.splice(0,1,{});
        this.$nextTick(()=>{
          this.dialogVisible=true;
        })
        this.showId=false;
        this.updateMessage=this.ADD;
      },
      handleDeleteClick() {
        if(this.selectCloumn.length>0) {
          this.$confirm('是否删除课程', "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: 'warning'
          }).then(() => {
            var id = [];
            this.selectCloumn.forEach((item, index) => {
              id[index] = item.courseId
            });
            id=id.toString();
            var params = {courseIds:id};
            deleteCourse(params).then((res) =>{
              if(res.success==true){
                this.getTable();
                this.$message({
                  type: 'info',
                  message: "删除成功"
                });
              }else{
                this.$message({
                  type: 'danger',
                  message: "删除失败"
                });
              }
            })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: "取消删除"
            })
          })
        }else{
          this.$message({
            message: "请选择数据",
            type: 'warning'
          });
        }
      },
      ALTER(){
        this.$refs.message.$refs.form.validate((valid) => {
          if (valid) {
            alterCourse(this.$refs.message.form).then(res=>{
              if(res.success==true) {
                this.dialogVisible = false;
                this.$message({
                  type: 'success',
                  message: '修改成功'
                })
              }
            })
          } else {
            return false;
          }
        });
      },
      handleAlterClick(){
        this.dialogTitle='课程修改';
        this.courseForm.length=0;
        this.courseForm.splice(0,1,this.selectCloumn[0]);
        this.$nextTick(()=>{
          this.dialogVisible=true;
        })
         this.updateMessage=this.ALTER;
      },
      handleObjectClick(path){
        const id=this.selectCloumn[0].courseId;
        this.seIdActions(id);
        this.$router.push(path)
      },
      onSearch(){
        this.getTable();
      },
      getTable(){
        //this.defaultParams多少页多少行
        const params=Object.assign({},this.defaultParams,{roleLevel:this.roleLevel,status:'0'},this.form);
        this.tableData=[
          {courseId:'1',courseName:'计网',courseIntroduction:'费称号'},
          {courseId:'1',courseName:'计网',courseIntroduction:'费称号'},
          {courseId:'1',courseName:'计网',courseIntroduction:'费称号'},
          {courseId:'1',courseName:'计网',courseIntroduction:'费称号'},
          {courseId:'1',courseName:'计网',courseIntroduction:'费称号'},
          {courseId:'1',courseName:'计网',courseIntroduction:'费称号'},
          {courseId:'1',courseName:'计网',courseIntroduction:'费称号'},
          {courseId:'1',courseName:'计网',courseIntroduction:'费称号'},
          {courseId:'1',courseName:'计网',courseIntroduction:'费称号'},
          {courseId:'1',courseName:'计网',courseIntroduction:'费称号'},
        ];
        this.total=40;
      /*  getMessage(params).then(res=>{
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

<style scoped>
  .table{
    margin-top: 8px;
  }
</style>
