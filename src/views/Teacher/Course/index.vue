<template>
  <div>
    <el-form ref="form"  :model="form" class="form"  :inline="true">
      <el-form-item label-width="70px" label="课程号" >
        <el-input v-model="form.courseId" auto-complete="text" placeholder="请输入课程号"></el-input>
      </el-form-item>
      <el-form-item label-width="70px" label="课程名"  >
        <el-input v-model="form.courseName" auto-complete="text" placeholder="请输入课程名"></el-input>
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
  import CourseMessage from '@/components/Message/CourseMessage'
  import{ getCourseTeacher }from '@/api/teacher'
  import {tableConfig,btnConfig} from './tableConfig'
  import DTable from '@/components/Table/DTable'
  import TableButton from '@/components/Table/tableButton'
  import tableMixin from '@/util/Mixins/tableMixins'
  import { mapActions,mapGetters } from 'vuex'
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
      }
    },
    components:{
      DTable,
      TableButton,
    },
    computed:{
      ...mapGetters(['getParams'])
    },
    mixins: [tableMixin],
    methods:{
      ...mapActions( // 语法糖
        ['seIdActions'] // 相当于this.$store.dispatch('modifyName'),提交这个方法
      ),
      handleClick(event) {
        switch (event) {
          case 'CHARGEK':
            this.handleObjectClick('TeacherKnowledge');
            break;
          case 'CHOICES':
            this.handleObjectClick('TeacherChoiceS');
            break;
          case 'DELETES':
            this.handleObjectClick('TeacherDeleteS');
            break;
          case 'IMPORT':
            this.handleObjectClick('TeacherImport');
            break;
          case 'CHARGE':
            this.handleObjectClick('TeacherChargeC');
            break;
        }
      },
      handleObjectClick(path){
        const id=this.selectCloumn[0].courseId;
        this.seIdActions(id);
        this.$router.push(path)
      },
      getTable(){
        console.log(this.getParams);
        const params=Object.assign({},this.defaultParams,{tno:this.getParams.username},this.form);
        getCourseTeacher(params).then(res=>{
          if(res.success==true){
            console.log(res.obj[0]);
            this.tableData=res.obj;
            this.total=res.total;
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
    }
  }
</script>

<style scoped>
  .table{
    margin-top: 8px;
  }
</style>
