<template>
  <el-form :model="form"  :rules="rules" ref="form" label-width="100px" >
    <el-form-item label="密码" prop="password">
      <el-input type="password" v-model="form.password" autocomplete="off" class="input"></el-input>
    </el-form-item>
    <el-form-item label="确认密码" prop="checkPwd">
      <el-input type="password" v-model="form.checkPwd" autocomplete="off" class="input"></el-input>
    </el-form-item>
    <el-form-item >
      <el-button type="primary" @click="onSubmit" class="button">重置密码</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  import {mapGetters,mapActions} from 'vuex'
  import {resetPwd} from '@/api/public'
  export default {
    name: "personMessage",
    data(){
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.form.password!== '') {
            this.$refs.form.validateField('checkPwd');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.form.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        form: {
          password:'',
          checkPwd:'',
        },
        rules: {
          password: [
            { validator: validatePass, trigger: 'change' }
          ],
          checkPwd: [
            { validator: validatePass2, trigger: 'change' }
          ],
        }
      }
    },
    computed:{
      ...mapGetters(['getResetForm']),
    },
    methods:{
      ...mapActions(['setResetFormAction',]),
      onSubmit(){
        this.$refs.form.validate(valid=>{
          if(valid){
             const params=Object.assign({},{password:this.form.password},this.getResetForm)
            resetPwd(params).then(res=>{
               if(res.success===true){
                  this.$message({
                    type:'success',
                    message:'重置密码成功'
                  })
                 this.$router.push({name:'Login'})
               }else{
                 this.$message({
                   type:'warning',
                   message:res.msg
                 })
               }
            })
          }
        })
      },
    }
  }
</script>

<style scoped>
  .button{
    width: 100%;
  }


</style>
