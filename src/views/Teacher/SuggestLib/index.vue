<template>
  <div>
    <el-form ref="form"  :model="form" class="form"  :inline="true">
      <el-form-item label-width="45px" label="题型" >
        <el-select v-model="form.type" placeholder="请选择题目">
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
      <el-form-item label-width="80px" label="审核状态">
        <el-select v-model="form.suggestState" placeholder="请选择审核状态" clearable>
          <el-option label="待审核" value="待审核"></el-option>
          <el-option label="未通过" value="未通过"></el-option>
          <el-option label="通过" value="通过"></el-option>
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
    <div v-if="dialogVisible">
      <el-dialog
         :title="dialogTitle"
        :visible="visible"
        :before-close="handleClose">
         <component ref="mytemplate"  :obj="myobj" :flag="true" :is="template"></component>
        <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button v-show="template=='SuggestMes'" @click="acceptQuestion">确定</el-button>
    </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  import {submitSuggest} from '@/api/teacher'
  import {selectSuggestById,selectSuggest} from "@/api/student";
  import {tableConfig,btnConfig} from './tableConfig'
  import DTable from '@/components/Table/DTable'
  import TableButton from '@/components/Table/tableButton'
  import tableMixin from '@/util/Mixins/tableMixins'
  import Single from  '@/components/AutoQuestion/Single'
  import Double from  '@/components/AutoQuestion/Double'
  import blankFill from  '@/components/AutoQuestion/blankFill'
  import SuggestMes from './SuggestMes'
  export default {
    name: "index",
    data(){
      return {
        form:{
          type:'1',
          courseId:'',
          suggestState:''
        },
        type:'',
        tableData:[],
        table:{},
        total:0,
        ButtonGroup:{},
        visible:true,
        dialogVisible:false,
        template:'Single',
        myobj:[],
        dialogTitle:'',
      }
    },
    components:{
      DTable,
      TableButton,
      Single,
      Double,
      blankFill,
      SuggestMes
    },
    mixins: [tableMixin],
    methods:{
      translateIndex(index){
        var trueIndex='';
         index=index+'';
         index=index.split('');
         var arr=['A','B','C','D']
         index.forEach(item=>{
            trueIndex+=arr[item];
         })
        return trueIndex;
      },
      typeChange(data) {
        var obj={};
        switch (this.type) {
          case '1':
            obj.question=data.singleQuestion;
            obj.options=data.options;
            obj.answer=this.translateIndex(data.trueIndex)
            this.template = "Single";
            break;
          case '2':
            obj.question=data.multipleQuestion;
            obj.options=data.options;
            obj.answer=this.translateIndex(data.trueIndex)
            this.template = 'Double';
            break;
          case  '3':
            obj.question=data.judgeQuestion;
            obj.answer=data.judgeAnswer?'对':'错';
            this.template = 'blankFill';
            break;
          case  '4':
            obj.question=data.blankQuestion;
            obj.answer=data.blankAnswer;
            this.template = 'blankFill';
            break;
          case  '5':
            obj.question=data.myQuestion;
            obj.answer=data.myAnswer;
            obj.rules=data.detailReviewRules;
            this.template = 'blankFill';
            break;
        }
        return obj;
      },
      handleClick(event) {
        switch (event) {
          case 'VIEW':
            this.handleViewClick();
            break;
          case 'ACCEPT':
            this.handleAcceptClick();
            break;
          case 'REJECT':
            this.handleRejectClick();
            break;
        }
      },
      handleViewClick() {
        var id = this.selectCloumn[0].id
        const params = {type:this.type, id: id};
        selectSuggestById(params).then(res => {
          if (res.success == true) {
            const data=_.cloneDeep(res.obj);
            this.myobj=[];
            this.myobj.push(this.typeChange(data));
            this.dialogTitle='题目查看';
              this.dialogVisible=true;
          }
        })
      },
      getCloumnId(){
        var id = [];
        this.selectCloumn.forEach((item, index) => {
          id[index] = item.id
        });
        id=id.toString();
        return id
      },
      submitSuggest(state,form){
        if(this.selectCloumn.length>0) {
          const id=this.getCloumnId();
          var params =Object.assign({},{ids: id,type:this.type,state:state},form)
          submitSuggest(params).then((res) => {
            if (res.success == true) {
              this.paramsChange(this.total);
              this.getTable();
              this.$message({
                type: 'info',
                message: "操作成功"
              });
              this.dialogVisible = false
            } else {
              this.$message({
                type: 'warning',
                message: res.msg
              });
            }
          })}else{
          this.$message({
            message: "请选择数据",
            type: 'warning'
          });
        }
      },
      handleRejectClick() {
         this.submitSuggest('未通过')
      },
      handleAcceptClick(){
        this.template='SuggestMes';
        this.dialogTitle='题目信息设置';
        this.dialogVisible=true;
      },
      acceptQuestion(){
        this.$refs.mytemplate.$refs.form.validate(valid=>{
          if(valid){
            this.submitSuggest('通过',this.$refs.mytemplate.form)
          }
        })
      },
      getTable(){
        const params=Object.assign({},this.defaultParams,this.form,{sno:''});
        selectSuggest(params).then(res=>{
          if(res.success==true){
            this.tableData=res.obj;
            this.total=res.total;
            this.type=this.form.type;
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
