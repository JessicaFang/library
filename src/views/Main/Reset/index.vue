<template>
  <div>
    <top :message="message"></top>
  <!--  <div class="reset">
      <el-form :model="form"  :rules="rules" ref="form" label-width="100px" >
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="form.email" class="input"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pwd">
          <el-input type="password" v-model="form.pwd" autocomplete="off" class="input"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPwd">
          <el-input type="password" v-model="form.checkPwd" autocomplete="off" class="input"></el-input>
        </el-form-item>
        <el-form-item label="验证码" prop="checkNumber">
          <el-input v-model="form.checkNumber" class="input"></el-input>
          <el-button type="primary"  class="sendButton" @click="sendValid">发送</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="formButton" @click="submit">提交</el-button>
        </el-form-item>
      </el-form>
    </div>-->
    <el-steps class="step" :active="active" align-center>
      <el-step title="个人信息输入"></el-step>
      <el-step title="发送验证码"></el-step>
      <el-step title="重置密码"></el-step>
    </el-steps>
    <component
      @next="next"
      :is="template"
    ></component>
    <bottom></bottom>
  </div>
</template>

<script>

  import top from '@/components/top';
  import bottom from '@/components/bottom';
  import personMessage from './personMessage';
  import personVaild from './personVaild';
  import personPwd from './personPwd';
  export default {
    name: "index",
    data(){
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.form.pwd!== '') {
            this.$refs.form.validateField('checkPwd');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.form.pwd) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        message:'重置密码',
        active:'1',
        form: {
          email:'',
          pwd: '',
          checkPwd: '',
          checkNumber:''
        },
        rules: {
          email: [
            { required:true ,message:'请输入邮箱', trigger: 'change' }
          ],
          pwd: [
            { validator: validatePass, trigger: 'change' }
          ],
          checkPwd: [
            { validator: validatePass2, trigger: 'change' }
          ],
          checkNumber: [
            { required:true ,message:'请输入验证码', trigger: 'change' }
          ]
        }
      }
    },
    components:{
      top,
      bottom,
      personMessage,
      personVaild,
      personPwd
    },
    methods:{
      submit(){
        this.$refs.form.validate(valid=>{
          if(valid){
            this.$router.go(-1);
          }
        })
      },
      sendValid(){

      }
    }
  }
</script>

<style scoped>
  .formButton{
    width: 80%;
  }
  .reset{
    width: 560px;
    margin: 50px auto;
  }
  .input{
    width: 80%;
  }
  .sendButton{
    display: inline-block;
  }
  .step{
    margin:  20px 60px;
  }
</style>
