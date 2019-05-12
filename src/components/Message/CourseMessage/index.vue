<template>
  <el-form ref="form" :rules="rules"  :model="form" label-width="100px" class="form">
    <el-form-item v-show="showId" label="课程号" prop="courseId" >
      <el-input v-model="form.courseId" auto-complete="text"disabled></el-input>
    </el-form-item>
    <el-form-item  label="课程名"  prop="courseName">
      <el-input v-model="form.courseName" auto-complete="text"></el-input>
    </el-form-item>
    <el-form-item  label="课程介绍"  prop="courseIntroduction">
      <textarea rows="6" cols="38" maxlength="300" v-model="form.courseIntroduction" auto-complete="text"></textarea>
    </el-form-item>
  </el-form>
</template>

<script>
  export default {
    name: "index",
    props:{
      myForm:Array,
      showId:{
        type:Boolean,
        default:true,
      }
    },
    data() {
      return {
        form: {},
        rules: {
          courseId: [{required: true, message: '请输入课程号', trigger: 'change'}],
          courseName: [{required: true, message: '请输入课程名', trigger: 'change'}],
          courseIntroduction: [{required: true, message: '请输入课程介绍', trigger: 'change'}],
        }
      }
    },
    beforeMount(){
      this.judgeId();
      const tempForm=this.myForm[this.myForm.length-1];
      if( Object.keys(tempForm).length!=0) {
        this.form=_.cloneDeep(tempForm);
      }else{
        this.form={}
      }
    },
    methods:{
      judgeId(){
        if(!this.showId){
          delete this.rules.courseId;
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
