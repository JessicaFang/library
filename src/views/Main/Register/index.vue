<template>
  <div>
    <top :message="message"></top>
    <div class="register">
        <el-form ref="form" :rules="rules" :model="form" label-width="60px" class="form">
          <el-form-item label="号码" prop="username">
              <el-input v-model="form.username"></el-input>
           </el-form-item>
          <el-form-item label="密码" prop="password">
             <el-input type="password" v-model="form.password"></el-input>
          </el-form-item>
          <el-form-item label="姓名" prop="name">
            <el-input  v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input  v-model="form.email"></el-input>
          </el-form-item>
          <el-form-item label="职位" prop="roleLevel">
            <el-radio-group v-model="form.roleLevel">
              <el-radio label="2">学生</el-radio>
              <el-radio label="3" >老师</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item  :label="jugdeLabel()" prop="classOrTitle">
              <el-input  v-model="form.classOrTitle"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit" class="formButton">注册</el-button>
          </el-form-item>
        </el-form>
    </div>
    <bottom></bottom>
    </div>
</template>

<script>
  import Top from '@/components/top';
  import bottom from '@/components/bottom';
  import { Register } from '@/api/app'
    export default {
        name: "index",
      data(){
          return {
            message:'注册',
            form:{
              username:'',
              password:'',
              name:'',
              email:'',
              roleLevel:'',
              classOrTitle:''
            },
            rules: {
              username: [
                {required: true, message: '请输入号码', trigger: 'change'},
              ],
              password: [
                {required: true, message: '请输入密码', trigger: 'change'}
              ],
              name: [
                {required: true, message: '请输入姓名', trigger: 'change'}
              ],
              email:[
                {
                  validator: (rule, value, callback) => {
                    var reg = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
                    if (value === '') {
                      callback(new Error('请输入邮箱'));
                    } else if (!reg.test(value)) {
                      callback(new Error('邮箱格式不对'));
                    } else {
                      callback();
                    }
                  },trigger:'change'
                }
              ],
              roleLevel: [
                {required: true, message: '请选择职位', trigger: 'change'}
              ],
              classOrTitle: [
                {required: true, message: '请输入班级或者职称', trigger: 'change'}
              ],
            }
       }
      },
      components:{
          Top,
           bottom
      },
      methods:{
        jugdeLabel(){
         return  this.form.roleLevel=='3'? '职称':'班级';
        },
        onSubmit(){
          this.$refs.form.validate(valid=>{
            this.$router.go(-1);
          /*  if (valid){
              Register(this.form).then(res=>{
                if(res.sucesss===true){

                }
              })
            } */
          })
        }
      }
    }
</script>

<style scoped lang="scss">

  .register{
    width: 500px;
    margin: 50px auto;
  }
  .form{
    margin: 50px 20px 0px 0px;
  }
  .formButton{
    width: 100%;
  }
</style>
