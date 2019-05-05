<template>
  <el-form ref="form" :rules="rules"  :model="form" label-width="100px" class="form">
    <el-form-item label-width="80px" label="难度"  prop="difficultLevel">
      <el-select clearable v-model="form.difficultLevel">
        <el-option label="较容易" value="0"></el-option>
        <el-option label="容易" value="0.3"></el-option>
        <el-option label="较困难" value="0.6"></el-option>
        <el-option label="困难" value="1"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label-width="80px" label="知识点" prop="knowledgeTitle">
      <el-input v-model="form.knowledgeTitle" placeholder="请输入知识点"></el-input>
    </el-form-item>
  </el-form>
</template>

<script>
  export default {
    name: "SuggestMes",
    data() {
      return {
        form: {
        },
        rules: {
          difficultLevel: [{required: true, message: '请输入课程号', trigger: 'change'}],
          knowledgeTitle: [{required: true, message: '请输入课程名', trigger: 'change'}],
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  .form{
    margin: 0 auto;
    width: 60%;
  }
  /deep/ .el-form-item:last-child {
    text-align: center;
  }
</style>

