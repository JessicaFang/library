<template>
  <el-form :model="form"  :rules="rules" ref="form" label-width="100px" >
    <el-form-item label="邮箱" prop="email">
      <el-input v-model="form.email" class="input"></el-input>
    </el-form-item>
    <el-form-item label="验证码" prop="code">
      <el-input v-model="form.code" class="input"></el-input>
      <el-button type="primary"  class="sendButton"  @click="sendValid">发送</el-button>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" class="button" @click="next">下一步</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  import {mapGetters,mapActions} from 'vuex'
  import {sendCode,validCode} from '@/api/public'
  export default {
    name: "personMessage",
    data(){
      return{
        form:{
          active:2,
        },
        rules:{
          email: [
            {
              validator: (rule, value, callback) => {
                var reg = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
                if (value === ''|| value==undefined) {
                  callback(new Error('请输入邮箱'));
                } else if (!reg.test(value)) {
                  callback(new Error('邮箱格式不对'));
                } else {
                  callback();
                }
              },trigger:'change'
            }
          ],
          code: [
            { required:true ,message:'请输入验证码', trigger: 'change' }
          ],
        }
      }
    },
    computed:{
      ...mapGetters(['getResetForm']),
    },
    methods:{
      ...mapActions(['setResetFormAction']),
      next(){
        this.$refs.form.validate(valid=>{
          if(valid){
            const params = Object.assign({},this.getResetForm,this.form)
            validCode(params).then(res=>{
              if(res.success){
                for(var key in this.form) {
                  this.setResetFormAction({key:key,value:this.form[key]});
                }
                this.$emit('next',2)
              }else{
                this.$message.info(res.msg)
              }
            })

          }
        })
      },
      validEmail(){
         const email=this.form.email;
         var message='';
         var reg = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
         if (email == ''||email==undefined) {
           return  message='请输入邮箱';
         } else if (!reg.test(email)) {
           return  message='邮箱格式不对';
         }
         return message;
       },
      sendValid(){
        var message=this.validEmail();
        if(message.length==0) {
           var params = Object.assign({}, {email: this.form.email}, this.getResetForm);
           console.log(params);
          sendCode(params).then(res=>{
            if(res.success===true){
              this.$message({
                type:'success',
                message:'验证码发送成功',
              })
            }else{
              this.$message.warning(res.msg)
            }
          })
        }else{
           this.$message({
             type:'warning',
             message:message,
           })
        }
      }
    }
  }
</script>

<style scoped>
  .button{
    width: 70%;
  }
   .input{
    width: 70%;
  }
  .sendButton{
    display: inline-block;
    width: 20%;
  }
</style>
