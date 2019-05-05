<template>
  <div>
    <el-form ref="form"  :model="form" class="form"  :inline="true">
      <el-form-item label-width="45px" label="姓名">
        <el-input v-model="form.name" auto-complete="text"></el-input>
      </el-form-item>
      <el-form-item label-width="80px" label="班级" >
        <el-input v-model="form.classOrTitle" auto-complete="text"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSearch">查找</el-button>
      </el-form-item>
    </el-form>
    <input @change="importUser"  style="display: none" type="file" ref="file" name="file" accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"/>
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
    <el-dialog
      title="学生信息修改"
      :visible.sync="dialogVisible"
      width="40%"
      :before-close="handleClose">
      <basic-message ref="message" :myForm="myForm" :params="params"></basic-message>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="updateMessage">确 定</el-button>
    </span>
    </el-dialog>
  </div>
</template>

<script>
  import {url} from '@/util/gobalVar'
  import BasicMessage from '@/components/Message/BasicMessage'
  import {translate} from "@/util/translate";
  import{ getMessage }from '@/api/public'
  import{ importData,exportData,updateData,deleteData }from '@/api/manager'
  import {tableConfig,btnConfig} from './tableConfig'
  import DTable from '@/components/Table/DTable'
  import TableButton from '@/components/Table/tableButton'
  import tableMixin from '@/util/Mixins/tableMixins'
  export default {
    name: "index",
    data(){
      return {
        form:{
          name:'',
          classOrTitle:'',
        },
        tableData:[],
        table:{},
        total:0,
        ButtonGroup:{},
        myForm: [],
        params:{},
        dialogVisible:false,
      }
    },
    components:{
      DTable,
      TableButton,
      BasicMessage
    },
    mixins: [tableMixin],
    methods:{
      getCloumn(){
        var username = [];
        this.selectCloumn.forEach((item, index) => {
          username[index] = item.no
        });
        username=username.toString();
        return username;
      },
      handleClick(event) {
        switch (event) {
          case 'import':
            this.handleImportClick();
            break;
          case 'export':
            this.handleExportClick();
            break;
          case 'alter':
            this.handleAlterClick();
            break;
          case 'delete':
            this.handleDeleteClick();
            break;
        }
      },
      handleImportClick(){
        this.$refs.file.click();
      },
      importUser(){
        var file=this.$refs.file.files[0];
        var fileName=this.$refs.file.files[0].name
        var formData=new FormData();
        formData.append(fileName,file);
        importData(formData).then(res=>{
          if(res.success==true){
            this.$message({
              type:'success',
              message:'导入成功',
            });
            this.getTable();
          }else{
            this.$message({
              type:'warning',
              message:res.msg,
            })
          }
          this.$refs.file.value = null;
        })
      },
      handleExportClick() {
        if(this.selectCloumn.length>0) {
          this.$confirm('是否进行导出', "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: 'warning'
          }).then(() => {
            var username=this.getCloumn();
            var params = {usernames: username,roleLevel:3};
            exportData(params).then((res) =>{
              if(res.success==false){
                this.$message({
                  type: 'danger',
                  message: res.msg
                });
              }else{
                var a=document.createElement('a');
                a.href=url()+'/iEExl/exportUser?roleLevel=3&usernames='+username;
                a.download='用户列表.xlsx';
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
      calSelection(val){
        this.selectCloumn=val;
        this.ButtonGroup.forEach((item,index)=>{
          const i = {...item};
          if(i.event=='alter')  i.disable=!(this.selectCloumn.length > 0 && this.selectCloumn.length < 2);
          this.ButtonGroup.splice(index, 1, i)
        })
      },
      handleAlterClick(){
        this.myForm=this.selectCloumn[0];
        this.params.roleLevel='3';
        this.params.username=this.myForm.name;
        this.dialogVisible=true;
      },
      updateMessage(){
        this.$nextTick(() => {
          this.$refs.message.$refs.form.validate((valid) => {
            if (valid) {
              var params=Object.assign({},{roleLevel:3,username:this.$refs.message.form.no},this.$refs.message.form);
              delete params.latestLoginTime
              updateData(params).then(res=>{
                if(res.success==true) {
                  this.getTable()
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
        })
      },
      handleDeleteClick(){
        if(this.selectCloumn.length>0) {
          var username=this.getCloumn();
          var params = {usernames: username,roleLevel:3};
          deleteData(params).then((res) =>{
            if(res.success==true){
              this.getTable();
              this.$message({
                type: 'info',
                message: "操作成功"
              })
            }else{
              this.$message({
                type: 'warning',
                message: res.msg
              })
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
          const params=Object.assign({},this.defaultParams,{roleLevel:3,status:'1'},this.form);
          getMessage(params).then(res=>{
            if(res.success==true){
              this.tableData=translate(res.obj);
              this.total=res.total
            }else{
              this.$message({
                type:'warning',
                message:res.msg
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
