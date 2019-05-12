<template>
  <div>
    <el-form ref="form"  :model="form" class="form"  :inline="true">
      <el-form-item label-width="45px" label="题型" >
        <el-select v-model="form.type" placeholder="请选择题型" @change="onSearch">
          <el-option label="单选题" value="1"></el-option>
          <el-option label="多选题" value="2"></el-option>
          <el-option label="判断题" value="3"></el-option>
          <el-option label="填空题" value="4"></el-option>
          <el-option label="简答题" value="5"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label-width="60px" label="课程号">
        <el-input v-model="form.courseId" placeholder="请输入课程号"></el-input>
      </el-form-item>
      <el-form-item label-width="45px" label="难度">
        <el-select clearable v-model="form.difficultLevel">
          <el-option label="容易" value="0"></el-option>
          <el-option label="一般" value="0.3"></el-option>
          <el-option label="困难" value="0.6"></el-option>
          <el-option label="很困难" value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="知识点">
        <el-select clearable v-model="form.knowledgeTitle" @focus="knowledgeEvent">
          <el-option
            v-for="item in knowledgeTitleList"
            :key="item.knowledgeTitle"
            :label="item.knowledgeTitle"
            :value="item.knowledgeTitle">
          </el-option>
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
  import {url} from '@/util/gobalVar'
  import{ selectLib,delLib ,queryKnowledge,selectLibById }from '@/api/manager'
  import{translateDiff} from '@/util/translate'
  import{ exportLib }from '@/api/manager'
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
          type:'1',
          courseId:'',
          difficultLevel:'',
          knowledgeTitle:'',
        },
        knowledgeTitleList:[],
        type:'',
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
    mixins: [tableMixin],
    methods:{
      ...mapActions( // 语法糖
        ['setQuestActions'] // 相当于this.$store.dispatch('modifyName'),提交这个方法
      ),
      knowledgeEvent() {
        queryKnowledge({courseId: this.courseId}).then(res => {
          if (res.success) {
            this.knowledgeTitleList = res.obj
          } else {
            this.$message.info(res.msg)
          }
        })
      },
      handleClick(event) {
        switch (event) {
          case 'ALTERQ':
            this.handleAlterQClick();
            break;
          case 'EXPORTQ':
            this.handleExportQClick();
            break;
          case 'DELETEQ':
            console.log(2);
            this.handleDeleteQClick();
        }
      },
      getCloumnId(){
        var id = [];
        this.selectCloumn.forEach((item, index) => {
          id[index] = item.id
        });
        id=id.toString();
        return id
      },
      handleAlterQClick(){
        var type=this.type;
        var id=this.selectCloumn[0].id
        const params={type:type,id:id};
        selectLibById(params).then(res=>{
          if(res.success==true){
            var data=res.obj;
            this.setQuestActions({type:type,data:data})
            this.$router.push('/ALTERQ')
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
            var params = {ids: id, type:this.form.type};
            delLib(params).then((res) =>{
              if(res.success==true){
                this.paramsChange(this.total);
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
        }else{
          this.$message({
            message: "请选择数据",
            type: 'warning'
          });
        }
      },
      handleExportQClick() {
        if(this.selectCloumn.length>0) {

          this.$confirm('是否进行导出', "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: 'warning'
          }).then(() => {
            const id=this.getCloumnId();
            var params = {type:this.form.type,ids:id};
            exportLib(params).then((res) =>{
              if(res.success==false){
                this.$message({
                  type: 'danger',
                  message: res.msg
                });
              }else{
                var a=document.createElement('a');
                a.href=url()+'/iEExl/exportLib?type='+this.form.type+'&ids='+id;
                a.download='题目列表.xlsx';
                a.style.display='none';
                document.body.appendChild(a);
                a.click();
                a.remove();
                this.getTable();
                this.$message({
                  type: 'info',
                  message: "操作成功"
                });
              }
            })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: "取消导出"
            })
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
        this.type=this.form.type;
        //this.defaultParams多少页多少行
        const params=Object.assign({},this.defaultParams,this.form);
        selectLib(params).then(res=>{
          if(res.success==true){
            this.tableData=translateDiff(res.obj);
            this.total=res.total
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
