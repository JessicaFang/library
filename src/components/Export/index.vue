<template>
  <el-tabs  v-model="activeName"  @tab-click="handleClick">
    <el-tab-pane label="手动导入" name="first"><hand-export></hand-export></el-tab-pane>
    <el-tab-pane label="自动导入" name="second"><auto-export></auto-export></el-tab-pane>
    <el-tab-pane label="返回上一页" name="thrid"></el-tab-pane>
  </el-tabs>
</template>
<script>
  import AutoExport from './AutoExport';
  import HandExport from './HandExport'

  export default {
    name:'index',
    data() {
      return {
        activeName: 'first',
        courseId:'',
      };
    },
    components:{
      AutoExport,
      HandExport,
    },
    watch:{
      activeName:function (value) {
        if(value==='thrid'){
           this.$router.go(-1);
        }
      }
    },
    methods: {
      handleClick(tab, event) {

      },
    },
  };
</script>

<style scoped>
  /deep/ .el-tabs__nav {
    width: 100%;
  }
  /deep/ #tab-thrid{
    float: right;
    color:#40C9FF ;
  }
</style>
