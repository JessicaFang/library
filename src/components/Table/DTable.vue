<template>
  <div>
  <el-table
    ref="table"
    :data="tableData"
    :max-height="tableHeight"
    style="width: 100%"
    border
    @selection-change="handleSelectionChange">
    <el-table-column
      v-show="table.selection"
      type="selection"
      width="55">
    </el-table-column>
    <el-table-column
      v-for="(item,index) in table.list"
      :key="index"
      :prop="item.prop"
      :label="item.label"
      :width="item.width"
     >
      <template  slot-scope="scope">
        <div v-html="scope.row[item.prop]"></div>
      </template>
    </el-table-column>
  </el-table>
    <pagination class="bottom" :total="total"  @pageMesChange ='pageMesChange' ></pagination>
</div>
</template>

<script>
    import Pagination from './pagination'
    export default {
        name: "DTable",
      props:{
          tableData:Array,
          table:{
            type:Object,
            required:true,
          },
          total:{
            type:Number,
            required:true,
          },
          tableHeight:{
              type:Number,
              default:450
          }
      },
      data(){
          return {
            multipleSelection: []
          }
      },
      components:{
        Pagination
      },
      methods: {
        handleSelectionChange(val) {
          this.multipleSelection = val;
          this.$emit('selectChange',val);
        },
        pageMesChange(val){
          this.$emit('pageMesChange',val);
        }
      },
      mounted(){
       /*   console.log(this.tableData);*/
      }
    }
</script>

<style scoped>
  .bottom{
    margin-top: 20px;
    float: right;
  }
  /deep/ .el-table__body-wrapper {
  overflow: auto;
  position: relative;
  min-height: 400px;
}
</style>
