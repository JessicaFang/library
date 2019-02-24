<template>
  <div>
    <top :message="message"></top>
    <div class="reset">
    <el-form :model="form"  :rules="rules" ref="form" label-width="100px" >
      <el-form-item label="号码" prop="username">
        <el-input v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pwd">
        <el-input type="password" v-model="form.pwd" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPwd">
        <el-input type="password" v-model="form.checkPwd" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="验证码" prop="checkNumber">
        <el-input v-model="form.checkNumber"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" class="formButton" @click="submit">提交</el-button>
      </el-form-item>
    </el-form>
    </div>
    <bottom></bottom>
  </div>
</template>

<script>
  import top from '@/components/top';
  import bottom from '@/components/bottom';
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
            form: {
              username:'',
              pwd: '',
              checkPwd: '',
              checkNumber:''
            },
            rules: {
              username: [
                { required:true ,message:'请输入号码', trigger: 'change' }
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
          bottom
      },
      methods:{
        submit(){
          this.$refs.form.validate(valid=>{
            if(valid){
                this.$router.go(-1);
            }
          })
        }
      }
    }
</script>

<style scoped>
  .formButton{
    width: 100%;
  }
  .reset{
    width: 500px;
    margin: 50px auto;
  }
</style>
