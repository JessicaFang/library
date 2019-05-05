<template>
  <div>
    <el-form ref="form"  :model="form" class="form"  :inline="true" >
      <el-form-item label-width="70px" label="课程号" >
        <el-input v-model="form.courseId" auto-complete="text"></el-input>
      </el-form-item>
      <el-form-item label-width="70px" label="成绩排序">
        <el-select v-model="form.orderByGrade" placeholder="成绩排序">
          <el-option label='升序' value="0"></el-option>
          <el-option label="降序" value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label-width="70px" label="成绩批改">
        <el-select v-model="form.paperState" placeholder="成绩批改">
          <el-option label='未批改' value="0"></el-option>
          <el-option label="已批改" value="1"></el-option>
        </el-select>
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
  import{ stuQueryBaseStuPaper,queryStuPaper }from '@/api/student'
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
          orderByGrade:'0',
          paperState:'0',
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
      ...mapGetters(['getId','getParams'])
    },
    mixins: [tableMixin],
    methods:{
      ...mapActions(['setExamActions','setPaperIdActions','setManualActions','setPaperStateActions']),
      handleClick(event) {
        switch (event) {
          case 'ADDPAPER':
            this.setManualActions({flag:false});
            this.handleObjectClick('StudentExam');
            break;
        }
      },
      handleObjectClick(path){
        const paperId=this.selectCloumn[0].paperId;
        this.setPaperIdActions({paperId:paperId});
        const state=this.selectCloumn[0].paperState;
        this.setPaperStateActions({paperState:state});
        var params={roleLevel:3,paperId:paperId,sno:this.getParams.username};
        queryStuPaper(params).then(res=>{
          if(res.success==true){
            var obj=_.cloneDeep(res.obj);
            this.setExamActions(obj);
            this.$router.push(path)
          }else{
            this.$message({
              type:'warning',
              message:res.msg,
            })
          }
        })
      },
      getTable(){
        const params=Object.assign({},this.defaultParams,this.form,{sno:this.getParams.username});
     /*   this.tableData=[
          {"minutesLength": 120, "sno": "jwuyou", "allTotalScore": 10, "totalPoints": 100, "name": "jwuyou", "passingScore": 65.55, "testTime": "2019-04-10T05:38:53.000+0000", "courseId": 2, "paperState": "1", "paperTitle": "试卷名称", "paperId": 32},
          {"minutesLength": 120, "sno": "jwuyou", "allTotalScore": 10, "totalPoints": 100, "name": "jwuyou", "passingScore": 65.55, "testTime": "2019-04-10T05:38:53.000+0000", "courseId": 2, "paperState": "1", "paperTitle": "试卷名称", "paperId": 32},
          {"minutesLength": 120, "sno": "jwuyou", "allTotalScore": 10, "totalPoints": 100, "name": "jwuyou", "passingScore": 65.55, "testTime": "2019-04-10T05:38:53.000+0000", "courseId": 2, "paperState": "0", "paperTitle": "试卷名称", "paperId": 32},
          {"minutesLength": 120, "sno": "jwuyou", "allTotalScore": 10, "totalPoints": 100, "name": "jwuyou", "passingScore": 65.55, "testTime": "2019-04-10T05:38:53.000+0000", "courseId": 2, "paperState": "0", "paperTitle": "试卷名称", "paperId": 32},
          {"minutesLength": 120, "sno": "jwuyou", "allTotalScore": 10, "totalPoints": 100, "name": "jwuyou", "passingScore": 65.55, "testTime": "2019-04-10T05:38:53.000+0000", "courseId": 2, "paperState": "0", "paperTitle": "试卷名称", "paperId": 32},
          {"minutesLength": 120, "sno": "jwuyou", "allTotalScore": 10, "totalPoints": 100, "name": "jwuyou", "passingScore": 65.55, "testTime": "2019-04-10T05:38:53.000+0000", "courseId": 2, "paperState": "0", "paperTitle": "试卷名称", "paperId": 32},
          {"minutesLength": 120, "sno": "jwuyou", "allTotalScore": 10, "totalPoints": 100, "name": "jwuyou", "passingScore": 65.55, "testTime": "2019-04-10T05:38:53.000+0000", "courseId": 2, "paperState": "0", "paperTitle": "试卷名称", "paperId": 32},
          {"minutesLength": 120, "sno": "jwuyou", "allTotalScore": 10, "totalPoints": 100, "name": "jwuyou", "passingScore": 65.55, "testTime": "2019-04-10T05:38:53.000+0000", "courseId": 2, "paperState": "0", "paperTitle": "试卷名称", "paperId": 32},
          {"minutesLength": 120, "sno": "jwuyou", "allTotalScore": 10, "totalPoints": 100, "name": "jwuyou", "passingScore": 65.55, "testTime": "2019-04-10T05:38:53.000+0000", "courseId": 2, "paperState": "0", "paperTitle": "试卷名称", "paperId": 32},
        ];
        this.total=40;*/
           stuQueryBaseStuPaper(params).then(res=>{
             if(res.success==true){
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
