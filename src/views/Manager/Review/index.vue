<template>
  <div>
    <el-form ref="form"  :model="form" class="form"  :inline="true">
      <el-form-item label-width="70px" label="审核对象" >
        <el-select v-model="roleLevel" @change="getTable">
          <el-option label="老师" value="2"></el-option>
          <el-option label="学生" value="3"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label-width="45px" label="姓名">
        <el-input v-model="form.name" auto-complete="text"></el-input>
      </el-form-item>
      <el-form-item label-width="80px" label="班级|职称" >
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
  import{ getMessage }from '@/api/public'
  import{ examine }from '@/api/manager'
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
          name:'',
          classOrTitle:'',
        },
        roleLevel:'2',
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
    computed: {
      ...mapGetters(['getParams'])
    },
    methods:{
      handleClick(event) {
        switch (event) {
          case 'review':
            this.handleReviewClick();
            break;
          case 'DELETE':
            this.handleDeleteClick();
        }
      },
      examine(status,message) {
        if(this.selectCloumn.length>0) {
          this.$confirm(message, "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: 'warning'
          }).then(() => {
            var no = [];
            this.selectCloumn.forEach((item, index) => {
              no[index] = item.no
            });
            no=no.toString();
            var params = {username: no, status:status,roleLevel:this.roleLevel};
            examine(params).then((res) =>{
              if(res.success==true){
                this.getTable();
                this.$message({
                  type: 'info',
                  message: "操作成功"
                });
              }else{
                this.$message({
                  type: 'danger',
                  message: "操作失败"
                });
              }
            })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: "取消审核"
            })
          })
        }else{
          this.$message({
            message: "请选择数据",
            type: 'warning'
          });
        }
      },
      handleReviewClick(){
        const status='1';
        const message="是否审核通过";
        this.examine(status,message);
      },
      handleDeleteClick() {
        const status='0';
        const message="是否审核不通过";
        this.examine(status,message);
      },
      onSearch(){
        this.getTable();
      },
      getTable(){
        //this.defaultParams多少页多少行
        const params=Object.assign({},this.defaultParams,{roleLevel:this.roleLevel,status:'0'},this.form);
        getMessage(params).then(res=>{
          if(res.success==true){
            this.tableData=translate(res.obj);
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
