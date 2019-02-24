<template>
  <div>
    <el-form ref="form"  :model="form" class="form"  :inline="true">
      <el-form-item label-width="45px" label="题型" >
        <el-select v-model="form.type" placeholder="请选择题目难度">
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
      <el-form-item label-width="45px" label="难度">
        <el-select v-model="form.difficultLevel" placeholder="请选择题目难度">
          <el-option label="较容易" value="0"></el-option>
          <el-option label="容易" value="0.3"></el-option>
          <el-option label="较困难" value="0.6"></el-option>
          <el-option label="困难" value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label-width="60px" label="知识点">
        <el-input v-model="form.knowledgeTitle" placeholder="请输入知识点"></el-input>
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
  import{ delLib }from '@/api/manager'
  import{ exportData }from '@/api/public'
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
        var data={};
         if(type=='1') {
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
         }
        this.setQuestActions({type:type,data:data})
        this.$router.push('/StudentAlterQ')
      },
      handleDeleteQClick() {
        if(this.selectCloumn.length>0) {
            const id=this.getCloumnId();
            var params = {id: id, type:this.form.type};
            delLib(params).then((res) =>{
              if(res.success==true){
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
          const id=this.getCloumnId();
          var params = {id: id};
          exportData(params).then((res) => {
            if (res.success == true) {
              var blob = new Blob(res.data);
              var a = document.createElement('a');
              a.href = URL.createObjectURL(blob);
              a.download = '用户列表.xlsx';
              a.style.display = 'none';
              document.body.appendChild(a);
              a.click();
              a.remove();
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
        this.tableData=[
          {courseId:'1',id:'001',difficultLevel:'容易',questionContent:'手机端付款'},
          {courseId:'1',id:'001',difficultLevel:'容易',questionContent:'手机端付款'},
          {courseId:'1',id:'001',difficultLevel:'容易',questionContent:'手机端付款'},
          {courseId:'1',id:'001',difficultLevel:'容易',questionContent:'手机端付款'},
          {courseId:'1',id:'001',difficultLevel:'容易',questionContent:'手机端付款'},
        ]
        this.total=40;
        const params=Object.assign({},this.defaultParams,this.form);
        this.type=this.form.type;
        //this.defaultParams多少页多少行
      /*  const params=Object.assign({},this.defaultParams,{roleLevel:this.roleLevel,status:'0'},this.form);
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
