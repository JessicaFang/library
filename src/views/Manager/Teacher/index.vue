<template>
  <div>
    <el-form ref="form"  :model="form" class="form"  :inline="true">
      <el-form-item label-width="45px" label="姓名">
        <el-input v-model="form.username" auto-complete="text"></el-input>
      </el-form-item>
      <el-form-item label-width="80px" label="职称" >
        <el-input v-model="form.classOrTitle" auto-complete="text"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSearch">查找</el-button>
      </el-form-item>
    </el-form>
    <input @change="importData"  style="display: none" type="file" ref="file" name="file" accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"/>
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
      title="教师信息修改"
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
          username:'',
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
      importData(){
        var file=this.$refs.file.files[0];
        var fileName=this.$refs.file.files[0].name
        var formData=new FormData();
        formData.append(fileName,file);
        console.log(formData.get(fileName));
        importData(formData).then(res=>{
          if(res.success==true){
            this.$message({
              type:'success',
              message:'导入成功',
            });
            this.getTable();
          }
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
            var params = {username: username};
            exportData(params).then((res) =>{
              if(res.success==true){
                var blob=new Blob(res.data);
                var a=document.createElement('a');
                a.href=URL.createObjectURL(blob);
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
         this.params.roleLevel='2';
         this.params.username=this.myForm.name;
         this.dialogVisible=true;
       },
      updateMessage(){
        this.$nextTick(() => {
          this.$refs.message.$refs.form.validate((valid) => {
            if (valid) {
              updateData(this.$refs.message.form).then(res=>{
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
        })
      },
      handleDeleteClick(){
        if(this.selectCloumn.length>0) {
            var username=this.getCloumn();
            var params = {username: username};
            deleteData(params).then((res) =>{
              if(res.success==true){
                this.getTable();
                this.$message({
                  type: 'info',
                  message: "操作成功"
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
        //this.defaultParams多少页多少行
        const obj=[
          {myEmail: '4408811996@qq.com', tno: '001', sex: '男', name: '小熊', myTitle: '副教授'},
          {myEmail: '4408811996@qq.com', tno: '001', sex: '男', name: '小熊', myTitle: '副教授'},
          {myEmail: '4408811996@qq.com', tno: '001', sex: '男', name: '小熊', myTitle: '副教授'},
          {myEmail: '4408811996@qq.com', tno: '001', sex: '男', name: '小熊', myTitle: '副教授'},
          {myEmail: '4408811996@qq.com', tno: '001', sex: '男', name: '小熊', myTitle: '副教授'},
          {myEmail: '4408811996@qq.com', tno: '001', sex: '男', name: '小熊', myTitle: '副教授'},
          {myEmail: '4408811996@qq.com', tno: '001', sex: '男', name: '小熊', myTitle: '副教授'},
          {myEmail: '4408811996@qq.com', tno: '001', sex: '男', name: '小熊', myTitle: '副教授'},
          {myEmail: '4408811996@qq.com', tno: '001', sex: '男', name: '小熊', myTitle: '副教授'},
        ]
        this.tableData=translate(obj);
        this.total=4
      /*  const params=Object.assign({},this.defaultParams,{roleLevel:'2',status:'1'},this.form);
        getMessage(params).then(res=>{
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
