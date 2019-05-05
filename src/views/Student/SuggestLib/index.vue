<template>
  <div>
    <el-form ref="form"  :model="form" class="form"  :inline="true">
      <el-form-item label-width="45px" label="题型" >
        <el-select v-model="form.type" placeholder="请选择题型">
          <el-option label="单选题" value="1"></el-option>
          <el-option label="多选题" value="2"></el-option>
          <el-option label="填空题" value="3"></el-option>
          <el-option label="判断题" value="4"></el-option>
          <el-option label="简答题" value="5"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label-width="60px" label="课程号">
        <el-input v-model="form.courseId" placeholder="请输入课程号"></el-input>
      </el-form-item>
      <el-form-item label-width="75px" label="审核状态">
        <el-select v-model="form.suggestState" placeholder="请选择状态">
          <el-option label="待审核" value="待审核"></el-option>
          <el-option label="未通过" value="未通过"></el-option>
          <el-option label="未提交" value="未提交"></el-option>
          <el-option label="已审核" value="已审核"></el-option>
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
  import {selectSuggest,selectSuggestById,delSuggest,exportSuggest,submitSuggest} from '@/api/student'
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
          type:'1',
          courseId:'2',
          suggestState:''
        },
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
    computed:{
      ...mapGetters(['getParams']),
    },
    mixins: [tableMixin],
    methods:{
      ...mapActions( // 语法糖
        ['setQuestActions'] // 相当于this.$store.dispatch('modifyName'),提交这个方法
      ),
      handleClick(event) {
        switch (event) {
          case 'ALTERQ':
            this.handleAlterQClick();
            break;
          case 'EXPORTQ':
            this.handleExportQClick();
            break;
          case 'DELETEQ':
            this.handleDeleteQClick();
            break;
          case 'REVIEW':
          this.handleReviewQClick();
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
        if(this.selectCloumn[0].suggestState!='已审核') {
          var type = this.type;
          var data={};
          var id = this.selectCloumn[0].id
          const params = {type: type, id: id};
          selectSuggestById(params).then(res=>{
            if(res.success==true){
              data=res.obj;
              this.setQuestActions({type: type, data: data})
              this.$router.push('/StudentAlterQ')
            }
          })
          /*  if(type=='1') {
            data = {
             trueIndex: '1',
             options: [
               '啊啊啊啊',
               '啊啊啊啊',
               '啊啊啊啊',
               '啊啊啊啊',
             ],
             knowledgeTitle: '知识点',
             id: '2',
             courseId: '2',
             singleQuestion: '<p>helloworld</p>',
             difficultLevel: '0.6'
           }
         }else if(type=='2'){
           data={
             trueIndex: '023',
             options: [
             '啊啊啊啊',
             '啊啊啊啊',
             '啊啊啊啊',
             '啊啊啊啊',
           ],
             knowledgeTitle: '知识点',
             id: '2',
             courseId: '2',
             multipleQuestion: '<p>helloworld</p>',
             difficultLevel: '0.6'
          }
         }else if(type=='4'){
           data={
             judgeAnswer:true,
             knowledgeTitle: '知识点',
             id: '2',
             courseId: '2',
             judgeQuestion: '<p>helloworld</p>',
             difficultLevel: '0.6'
           }
         }else if(type=='3'){
           data={
             blankAnswer: [ ['023','232'],['fdfjd','fjdk']],
             knowledgeTitle: '知识点',
             id: '2',
             courseId: '2',
             blankQuestion: '<p>helloworld</p>',
             difficultLevel: '0.6'
           }
         }else if(type=='5'){
           data={
             detailReviewRules:'评分规则',
             myAnswer: 'hahahah',
             knowledgeTitle: '知识点',
             id: '2',
             courseId: '2',
             myQuestion: '<p>helloworld</p>',
             difficultLevel: '0.6'
           }
         }*/
        }else{
          this.$message({
             type:'warning',
             message:'该题目已经提交审核'
          })
        }
      },
      handleDeleteQClick() {
      if(this.selectCloumn.length>0) {
          const id=this.getCloumnId();
          var params = {ids: id, type:this.type};
          delSuggest(params).then((res) =>{
            if(res.success==true){
              //参数识别
              this.paramsChange();
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
      handleReviewQClick() {
        if(this.selectCloumn.length>0) {
          var flag=true;
          this.selectCloumn.forEach((item, index) => {
             if(item.suggestState!='未提交'){
               flag=false;
             }
          });
          if(flag){
          const id=this.getCloumnId();
          var params = {ids: id,type:this.type};
          submitSuggest(params).then((res) => {
            if (res.success == true) {
              if(this.form.suggestState=='未提交')this.paramsChange();
              this.getTable();
              this.$message({
                type: 'info',
                message: "操作成功"
              });
            } else {
              this.$message({
                type: 'danger',
                message: "操作失败"
              });
            }
          })}else{
            this.$message({
              type:'warning',
              message:'只能提交未提交的数据'
            })
          }
        }else{
          this.$message({
            message: "请选择数据",
            type: 'warning'
          });
        }
      },
      handleExportQClick() {
        if(this.selectCloumn.length>0) {
          const id=this.getCloumnId();
          var params = {ids: id,type:this.type};
       /*   var url='http://jwuyou.ngrok.xiaomiqiu.cn/iEExl/exportLib'
          url=url+'?type='+this.type+'&ids='+id;*/
           exportSuggest(params).then((res) => {
             console.log(res);
             var blob = new Blob(res.obj);
             var a=document.createElement('a');
             a.href=URL.createObjectURL(blob);
             a.download='题目信息.xlsx';
             a.style.display='none';
             document.body.appendChild(a);
             a.click();
             a.remove();
            if (res.success == true) {
              console.log(res);
              this.getTable();
              this.$message({
                type: 'info',
                message: "操作成功"
              });
            } else {
              this.$message({
                type: 'danger',
                message: "操作失败"
              });
            }
          })}else{
          this.$message({
            message: "请选择数据",
            type: 'warning'
          });
        }
      },
      onSearch(){
        this.defaultParams={page:1,rows:10};
        this.getTable();
      },
      getTable(){
        const params=Object.assign({},this.defaultParams,this.form,{sno:this.getParams.username});
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
