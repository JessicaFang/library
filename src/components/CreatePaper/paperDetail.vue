<template>
  <div>
  <el-form  :rules="rules" ref="form"   :model="form"  label-width="80px" class="form">
    <el-form-item label="试卷名称" prop="paperTitle">
      <el-input placeholder="请输入试卷名称" v-model="form.paperTitle" >
      </el-input>
    </el-form-item>
    <el-form-item label="试卷头" prop="paperHead">
      <el-input placeholder="请输入试卷头" v-model="form.paperHead" >
      </el-input>
    </el-form-item>
    <el-form-item label="考试时间" prop="testTime" >
      <el-date-picker
        v-model="form.testTime"
        type="datetime"
        placeholder="选择考试时间">
      </el-date-picker>
    </el-form-item>
    <el-form-item label="考试时长" prop="minutesLength" >
      <el-input placeholder="请输入考试时间" v-model="form.minutesLength" ></el-input>
    </el-form-item>
    <el-form-item label="及格分数" prop="passingScore">
      <el-input placeholder="请输入几个分数" v-model="form.passingScore" ></el-input>
    </el-form-item>
  </el-form>
    <div class="submitButton">
    <el-button @click="publicTest" class="submit" type="primary">发布试卷</el-button>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex';
  export default {
    name: "paperDetail",
    data(){
      return{
        form:{
          paperHead:'',
          paperTitle:'',
          minutesLength:'',
          testTime:'',
          passingScore:'',
        },
        rules: {
          paperTitle: [
            {required: true, message: '请输入试题名称', trigger: 'change'}
          ],
          testTime: [
            {required: true, message: '请选择试题分类', trigger: 'change'}
          ],
          minutesLength:[
            {
              validator: (rule, value, callback) => {
                var reg = /^[1-9][0-9]+$|^[1-9]$/
                if (value === '') {
                  callback(new Error('请输入考试时间'));
                } else if (!reg.test(value)) {
                  callback(new Error('请输入正确的考试时间'));
                } else {
                  callback();
                }
              },trigger:'change'
            }
          ],
          passingScore:[
            {
              validator: (rule, value, callback) => {
                var reg =/^[0-9]+\.?[0-9]*$/
                if (value === '') {
                  callback(new Error('请输入及格分数'));
                } else if (!reg.test(value)) {
                  callback(new Error('请输入正确的分数'));
                } else {
                  callback();
                }
              },trigger:'change'
            }
          ],
        }
      }
    },
    computed: {
      ...mapGetters(['getPaper']),
    },
    methods:{
      publicTest(){
        this.$refs.form.validate((valid) => {
          if (valid) {
              console.log(this.form)
          } else {
            console.log('error submit!!');
          }
        });
      }
    },
    beforeMount(){
      /*  paperHead:'',
          paperTitle:'',
          minutesLength:'',
          testTime:'',
          passingScore:'',
          */
      for(var key in this.form){
        this.form[key]=this.getPaper['testPaper'][key];
      }
    }
  }
</script>
<style scoped>
  .form{
    width: 479px;
    margin: 61px auto;
  }
  .submitButton{
    width: 479px;
    margin: 0 auto;
  }
  .submit{
    width: 100%;
  }
</style>
