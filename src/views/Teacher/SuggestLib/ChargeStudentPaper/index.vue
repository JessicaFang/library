<template>
  <div>
    <el-form ref="form"  :model="form" class="form"  :inline="true" >
      <el-form-item label-width="70px" label="学生姓名" >
        <el-input v-model="form.name" auto-complete="text"></el-input>
      </el-form-item>
      <el-form-item label-width="70px" label="试卷状态">
        <el-select clearable v-model="form.paperState" placeholder="请选择试卷状态">
          <el-option label="未批改" value="0"></el-option>
          <el-option label="已批改" value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label-width="70px" label="人工批改">
        <el-select clearable v-model="form.manualCorrecting" placeholder="请选择是否人工批改">
          <el-option label="否" value="0"></el-option>
          <el-option label="是" value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label-width="70px" label="考试时间">
        <el-date-picker
          v-model="form.testTime"
          type="datetime"
          placeholder="选择考试时间">
        </el-date-picker>
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
      :tableHeight="380"
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
  import{ getCourseTeacher }from '@/api/teacher'
  import {tableConfig,btnConfig} from './tableConfig'
  import DTable from '@/components/Table/DTable'
  import TableButton from '@/components/Table/tableButton'
  import tableMixin from '@/util/Mixins/tableMixins'
  import { mapActions,mapGetters } from 'vuex'
  import { teaQueryBaseStuPaper,queryStuPaper } from '@/api/teacher'
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
      ...mapGetters(['getId',])
    },
    mixins: [tableMixin],
    methods:{
      ...mapActions(['setExamActions','setPaperIdActions','setManualActions','setPaperStateActions']),
      handleClick(event) {
        switch (event) {
          case 'ADDPAPER':
            this.setManualActions({flag:false});
            this.handleObjectClick('TeacherExam');
            break;
          case 'ALTER':
            this.setManualActions({flag:true})
            this.handleObjectClick('TeacherExam');
            break;
          case 'GOBACK':
            this.$router.go(-1);
            break;
        }
      },
      handleObjectClick(path){
        const paperId=this.selectCloumn[0].paperId;
        const sno=this.selectCloumn[0].sno;
         this.setPaperIdActions({paperId:paperId});
        const state=this.selectCloumn[0].paperState;
        this.setPaperStateActions({paperState:state});
        var params={roleLevel:2,paperId:paperId,sno:sno}
        queryStuPaper(params).then(res=>{
          if(res.success==true){
            var obj=_.cloneDeep(res.obj)
          this.setExamActions(obj);
          this.$router.push(path)
          }else{
            this.$message({
              type:'warning',
              message:res.msg
            })
          }
        })

      },
      getTable(){
        const params=Object.assign({},this.defaultParams,this.form,{courseId:this.getId});
        teaQueryBaseStuPaper(params).then(res=>{
          if(res.success==true) {
            for(let item = 0;item<res.obj.length;item++){
              if(res.obj[item].paperState == '1'){
                res.obj[item].paperState = '已批改'
              }
              else res.obj[item].paperState = '未批改'
            }
            this.tableData = res.obj;
            this.total = res.total;
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
    }
  }
</script>

<style scoped>
  .table{
    margin-top: 8px;
  }
</style>
