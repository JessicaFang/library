<template>
  <div>
    <el-tabs v-model="activeName">
      <el-tab-pane label="题库分析" name="lib">
         <questionStatic></questionStatic>
      </el-tab-pane>
      <!--试卷分析-->
      <el-tab-pane label="试卷分析" name="test">
        <testStatic></testStatic>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import questionStatic from './questionStatic'
  import testStatic from './testStatic';
  export default {
    name: "index",
    data(){
      return{
        activeName:'lib',
      }
    },
    components:{
      questionStatic,
      testStatic,
    },
  }
</script>

<style scoped>

</style>
