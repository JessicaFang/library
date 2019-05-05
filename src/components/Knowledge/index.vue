<template>
  <div>
    <el-form ref="form"  :model="form" class="form"  :inline="true">
      <el-form-item label-width="60px" label="知识点" >
        <el-input v-model="form.knowledgeTitle" auto-complete="text"></el-input>
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
      @pageMesChange =  "handleMesChange"
    ></DTable>
    <div v-if="dialogVisible">
    <el-dialog
      :title="dialogTitle"
      :visible="visible"
      :before-close="handleClose">
      <knowledge-message ref="message" :id="getId" :myForm="knowForm" ></knowledge-message>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="updateMessage">确 定</el-button>
    </span>
    </el-dialog>
    </div>
  </div>
</template>

<script>
  import KnowledgeMessage from '@/components/Message/KnowledgeMessage'
  import {translate} from "@/util/translate";
  import{queryKnowledge, addKnowledge,deleteKnowledge,alterKnowledge }from '@/api/manager'
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
          knowledgeTitle:''
        },
        courseId:'',
        ButtonGroup:{},
        tableData:[],
        table:{},
        total:0,
        dialogTitle:'',
        dialogVisible:false,
        knowForm:[],
        updateMessage:'',
        visible:true,
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
          case 'ADD':
            this.handleAddClick();
            break;
          case 'DELETE':
            this.handleDeleteClick();
            break;
          case 'GOBACK':
            this.handleGoBackClick();
            break;
        }
      },
      ADD(){
        this.$refs.message.$refs.form.validate((valid) => {
          if (valid) {
            addKnowledge(this.$refs.message.form).then(res=>{
              if(res.success==true) {
                this.dialogVisible = false;
                this.$message({
                  type: 'success',
                  message: '添加成功'
                })

                this.getTable()
              }else{
                this.$message({
                  type: 'warning',
                  message: res.msg
                })
              }
            })
          } else {
            return false;
          }
        });
      },
      handleAddClick(){
        this.knowForm.length=0;
        this.knowForm.splice(0,1,{});
        this.dialogTitle='知识点添加';
        this.$nextTick(()=>{
          this.dialogVisible=true;
        })
        this.updateMessage=this.ADD;
      },
      handleDeleteClick() {
        if(this.selectCloumn.length>0) {
            var know = [];
            this.selectCloumn.forEach((item, index) => {
              know[index] = item.knowledgeTitle;
            });
            know=know.toString();
            var params = {courseId:this.courseId,knowledgeTitles:know};
            deleteKnowledge(params).then((res) =>{
              if(res.success==true){
                this.paramsChange();
                this.getTable();
                this.$message({
                  type: 'info',
                  message: "删除成功"
                });
              }else{
                this.$message({
                  type: 'warning',
                  message: "删除失败"
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
      handleGoBackClick(){
        this.$router.go(-1);
      },
      getTable(){
        const params=Object.assign({},this.defaultParams,{courseId:this.courseId,knowledgeTitle:this.form.knowledgeTitle});
        queryKnowledge(params).then(res=>{
          if(res.success){
            this.tableData=res.obj
            this.total = res.total
          }else{
            this.$message({
              type:'warning',
              message:res.msg
            })
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
