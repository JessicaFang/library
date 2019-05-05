<template>
  <div>
    <el-form ref="form"  :model="form" class="form"  :inline="true">
      <el-form-item label-width="45px" label="难度">
        <el-select clearable v-model="form.difficultLevel" placeholder="请选择题目难度">
          <el-option label="容易" value="0"></el-option>
          <el-option label="一般" value="0.3"></el-option>
          <el-option label="困难" value="0.6"></el-option>
          <el-option label="很困难" value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label-width="60px" label="知识点">
        <el-select clearable v-model="form.knowledgeTitle" placeholder="请选择分类" @focus="getOptions" >
          <el-option v-for="(item,index) in options" :label="item.knowledgeTitle" :key="index" :value="item.knowledgeTitle"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSearch">查找</el-button>
      </el-form-item>
    </el-form>
    <DTable
      :tableHeight="tableHeight"
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
  import {tableConfig,btnConfig} from './tableConfig'
  import DTable from '@/components/Table/DTable'
  import tableMixin from '@/util/Mixins/tableMixins'
  import { mapActions,mapGetters } from 'vuex'
  import { queryKnowLedge,selectLib } from '@/api/teacher'
  import {translateDiff} from '@/util/translate'
  export default {
    name: "index",
    data(){
      return {
        form:{
          difficultLevel:'',
          knowledgeTitle:'',
        },
        options:[],
        tableHeight:200,
        tableData:[],
        table:{},
        total:0,
        ButtonGroup:[],
      }
    },
    props:{
      type:{
        required:true,
        type:String,
      }
    },
    components:{
      DTable,
    },
    mixins: [tableMixin],
    computed:{
      ...mapGetters(['getId']),
    },
    methods:{
      onSearch(){
        this.getTable();
      },
      getTable(){
        const params=Object.assign({},this.defaultParams,this.form,{type:this.type,courseId:this.getId});
        selectLib(params).then(res=>{
            if(res.success==true){
              this.tableData=translateDiff(res.obj);
              this.total=res.total
            }else{
              this.$message({
                type:'warning',
                message:res.msg
              })
            }
          })
      },
      getOptions() {
        var courseId=this.getId;
        queryKnowLedge({courseId}).then(res=>{
          if(res.success==true){
            this.options=res.obj;
          }else{
            this.$message({
              type:'warning',
              message:res.msg,
            })
          }
        });
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

<style scoped lang="scss">
  .table{
    margin-top: 8px;
    /deep/ .el-table__body-wrapper{
      overflow: auto;
      position: relative;
      min-height: 200px;
    }
  }
</style>
