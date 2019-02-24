<template>
  <div>
     <table-button :ButtonGroup="ButtonGroup" @handleClick="handleClick"></table-button>
     <DTable class="table" @selectChange="calSelection" :table="table" :tableData="tableData"></DTable>
    <div v-if="dialogVisible">
    <el-dialog
      title="提示"
      visible="visible"
      width="30%"
      :before-close="handleClose">
      <AlterMessage :myForm="myForm" :params="params"></AlterMessage>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
    </span>
    </el-dialog>
    </div>
  </div>
</template>

<script>
  import AlterMessage from '@/views/AlterMessage'
  import TableButton from '@/components/Table/tableButton'
  import DTable from '@/components/Table/DTable'
  import tableMixin from '@/util/Mixins/tableMixins'
  export default {
    name:'index',
    components:{
      DTable,
      TableButton,
      AlterMessage
    },
    mixins: [tableMixin],
    data() {
      return {
        visible:true,
        params: {roleLevel: '2'},
        myForm: [],
        dialogVisible:false,
        ButtonGroup:[
          {colLength:8,event:'ADD',icon: 'el-icon-plus',label:'增加'},
          {colLength:8,event:'DELETE',icon: 'el-icon-plus',label:'删除'},
          {colLength:8,event:'ALTER',icon: 'el-icon-plus',label:'修改'},
        ],
        table:{
          selection:true,
          list:[
            {prop:'date',label:'日期'},
            {prop:'name',label:'名字'},
            {prop:'address',label:'地址'},
          ],
          total:40,
        },
        tableData: [{
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-08',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-06',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-07',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }],
      }
    },
    methods:{
      handleClose(done) {
        if(confirm('确认关闭？')){
         this.dialogVisible=false;
       }
     }
    }

  }
</script>

<style scoped>
.table{
 margin-top: 30px;
}
</style>
