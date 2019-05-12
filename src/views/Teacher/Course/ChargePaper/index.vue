<template>
  <div>
    <el-form ref="form"  :model="form" class="form"  :inline="true">
      <el-form-item label-width="75px" label="试卷名称" >
        <el-input v-model="form.paperTitle" placeholder="请输入试卷名称"></el-input>
      </el-form-item>
      <el-form-item label-width="75px" label="试卷状态" >
        <el-select clearable v-model="form.paperState" placeholder="请输入试卷状态">
          <el-option label="已发布" value="1"></el-option>
          <el-option label="未发布" value="0"></el-option>
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
  import { saveLib,delLib,exportData,selectLib,selectLibById } from '@/api/manager'
  import {tableConfig,btnConfig} from './tableConfig'
  import DTable from '@/components/Table/DTable'
  import TableButton from '@/components/Table/tableButton'
  import tableMixin from '@/util/Mixins/tableMixins'
  import { mapActions,mapGetters } from 'vuex'
  import {queryTestPaper,getPaperDetail,delTestPaper} from '@/api/teacher'
  export default {
    name: "index",
    data(){
      return {
        form:{
          paperTitle:'',
          paperState:'',
        },
        tableData:[],
        table:{},
        total:0,
        ButtonGroup:{},
      }
    },
    components:{
      DTable,
      TableButton
    },
    computed:{
      ...mapGetters(['getId'])
    },
    mixins: [tableMixin],
    methods:{
      ...mapActions(['setTotalPaperActions','setActiveActions','setPointActions','setAllPointActions','setPaperIdActions']),
      handleClick(event) {
        switch (event) {
          case 'ALTERQTEST':
            this.handleAlterTestClick();
            break;
          case 'ALTERQPUBLIC':
            this.handleAlterPublicQClick();
            break;
          case 'DELETEQ':
            this.handleDeleteQClick();
            break;
          case 'GOBACK':
            this.$router.go(-1);
            break;
        }
      },
      getCloumnId(){
        var id = [];
        this.selectCloumn.forEach((item, index) => {
          id[index] = item.paperId;
        });
        return id
      },
      handleAlterPublicQClick(){
        var paperId=this.selectCloumn[0].paperId;
        getPaperDetail({paperId}).then(res=> {
          if(res.success==true) {
            var obj = _.cloneDeep(res.obj)
            this.setTotalPaperActions(obj);
            this.setActiveActions({active: 3, source: 'ChargePaper', alterFlag: true});
            this.setPaperIdActions({paperId:paperId});
            this.$router.push({name: 'TeacherAddPaper'});
          }else{
            this.$message({
              type:'warning',
              message:res.msg,
            })
          }
        })
      },
      handleAlterTestClick(){
        var paperId=this.selectCloumn[0].paperId;
        getPaperDetail({paperId}).then(res=>{
          if(res.success==true){
            var obj=_.cloneDeep(res.obj);
            if(obj.testMultipleVos&&obj.testMultipleVos.length!=0){
              for(var i=0;i<obj.testMultipleVos.length;i++){
                var answer=obj.testMultipleVos[i].multipleTestAnswer.split("");
                answer.forEach((item,index,answer)=>{
                   answer[index]=parseInt(item);
                })
                obj.testMultipleVos[i].multipleTestAnswer=answer
              }
            }
            this.setTotalPaperActions(obj);
            this.setAllPointActions();
            for(let i=0;i<obj.testSingleVos.length;i++){
              this.setPointActions({name:'singlePoints',index:i,points:obj.testSingleVos[i]['singlePoints']})
            }
            for(let i=0;i<obj.testMultipleVos.length;i++){
              this.setPointActions({name:'multiplePoints',index:i,points:obj.testMultipleVos[i]['multiplePoints']})
            }
            for(let i=0;i<obj.testJudgeVos.length;i++){
              this.setPointActions({name:'judgePoints',index:i,points:obj.testJudgeVos[i]['judgePoints']})
            }
            for(let i=0;i<obj.testBlankVos.length;i++){
              this.setPointActions({name:'blankPoints',index:i,points:obj.testBlankVos[i]['blankPoints']})
            }
            for(let i=0;i<obj.testQuestionVos.length;i++){
              this.setPointActions({name:'myPoints',index:i,points:obj.testQuestionVos[i]['myPoints']})
            }
            this.setActiveActions({active:2,source:'ChargePaper',alterFlag:true});
            this.$router.push({name:'TeacherAddPaper'});
          }else{
            this.$message({
              type:'warning',
              message:res.msg,
            })
          }
        })
      },
      handleDeleteQClick() {
      if(this.selectCloumn.length>0) {
          const id=this.getCloumnId();
          var params = {ids: id};
          delTestPaper(params).then((res) =>{
            if(res.success==true){
              this.paramsChange(this.total);
              this.getTable();
              this.$message({
                type: 'info',
                message: "删除成功"
              });
            }else{
              this.$message({
                type: 'warning',
                message: res.msg
              });
            }
          })
      }else{
        this.$message({
          message: "请选择数据",
          type: 'warning'
        });
      }
    },
      onSearch(){
        this.getTable();
      },
      getTable(){
        const params=Object.assign({},this.defaultParams,this.form,{courseId:this.getId});
        queryTestPaper(params).then(res=>{
          if(res.success==true){
            for(let item = 0;item<res.obj.length;item++){
              res.obj[item].paperState = res.obj[item].paperState == '1'?'已发布':'未发布'
            }
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
    }
  }
</script>

<style scoped>
  .table{
    margin-top: 8px;
  }
</style>
