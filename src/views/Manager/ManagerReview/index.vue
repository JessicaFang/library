<template>
  <div>
    <el-form ref="form"  :model="form" class="form"  :inline="true">
      <el-form-item label-width="45px" label="姓名">
        <el-input v-model="form.name" auto-complete="text"></el-input>
      </el-form-item>
      <el-form-item label-width="45px" label="职称" >
        <el-input v-model="form.classOrTitle" auto-complete="text"></el-input>
      </el-form-item>
      <el-form-item label-width="100px" label="是否管理员" >
        <el-select v-model="form.isAdmin" @change="isAdminChange">
          <el-option label="是" value="1"></el-option>
          <el-option label="否" value="0"></el-option>
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
  import {translate} from "@/util/translate";
  import{ getMessage }from '@/api/public'
  import{ updateManager }from '@/api/manager'
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
          isAdmin:'0',
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
          case 'cancel':
            this.handleCancelClick();
        }
      },
      examine(isAdmin,message) {
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
            //可以多个一起设置一起撤销
            var params = {username: no, isAdmin:isAdmin,roleLevel:'2'};
            updateManager(params).then((res) =>{
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
        const isAdmin='1';
        const message="是否进行设置成为管理员";
        this.examine(isAdmin,message);
      },
      handleCancelClick() {
        const isAdmin='0';
        const message="是否进行取消设置";
        this.examine(isAdmin,message);
      },
      onSearch(){
        this.getTable();
      },
      getTable(){
        //需要添加管理员选项
        const params=Object.assign({},this.defaultParams,{roleLevel:'2',status:'1'},this.form);
      /*  const obj=[
          {myEmail: '4408811996@qq.com', tno: '001', sex: '男', name: '小熊', myTitle: '副教授'},
          {myEmail: '4408811996@qq.com', tno: '001', sex: '男', name: '小熊', myTitle: '副教授'},
          {myEmail: '4408811996@qq.com', tno: '001', sex: '男', name: '小熊', myTitle: '副教授'},
          {myEmail: '4408811996@qq.com', tno: '001', sex: '男', name: '小熊', myTitle: '副教授'},
        ]
        this.tableData=translate(obj);
        this.total=4*/
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
      calSelection(val){
        this.selectCloumn=val;
        this.ButtonGroup.forEach((item,index)=>{
          const i = {...item};
          if((i.event=='review'&&this.form.isAdmin=='1')||(i.event=='cancel'&&this.form.isAdmin=='0')) {
            i.disable = true;
          }else{
            i.disable=false;
          }
          this.ButtonGroup.splice(index, 1, i)
        })
      },
      isAdminChange(){
        this.calSelection([]);
        this.getTable();
      }
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
