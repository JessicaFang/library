<template>
  <div class="block">
    <el-pagination
      border
      height="250"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :page-sizes="[10,20,30,40]"
      :page-size="10"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>
</template>

<script>
    export default {
        name: "pagination",
        data() {
          return {
             pageMessage:{
               rows:10,
               page:1,
             },
          };
        },
      props:{
          total:{
            type:Number,
            required:true,
          },
      },
        methods: {
          handleSizeChange(val) {
            this.pageMessage.rows=val;
            this.$emit('pageMesChange',this.pageMessage)
          },
          handleCurrentChange(val) {
            this.pageMessage.page=val;
            this.$emit('pageMesChange',this.pageMessage)
          }
        },
    }
</script>

<style scoped>

</style>
