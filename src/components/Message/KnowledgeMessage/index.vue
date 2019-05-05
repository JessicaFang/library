<template>
  <el-form ref="form" :rules="rules"  :model="form" label-width="100px" class="form">
    <el-form-item label="课程号" prop="courseId" >
      <el-input v-model="form.courseId" auto-complete="text"disabled></el-input>
    </el-form-item>
    <el-form-item  label="知识点"  prop="knowledgeTitle">
      <el-input v-model="form.knowledgeTitle" auto-complete="text"></el-input>
    </el-form-item>
  </el-form>
</template>

<script>
  export default {
    name: "index",
    props:{
      myForm:Array,
      id:Number
    },
    data() {
      return {
        form: {},
        rules: {
          knowledgeTitle: [{required: true, message: '请输入知识点', trigger: 'change'}],
        }
      }
    },
    beforeMount(){
      console.log(this.myForm);
      const tempForm=this.myForm[this.myForm.length-1];
      if( Object.keys(tempForm).length!=0) {
        this.form=_.cloneDeep(tempForm);
      }else{
        this.form={}
      }
      this.form.courseId=this.id;
    },
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
