<template>
    <div>
      <top :message="message1"></top>
      <div class="center">
        <div class="left">
          <img :src="image" class="left"/>
        </div>
        <div class="right">
          <top class="top" :message="message2"></top>
          <el-form ref="form" :rules="rules" :model="form" label-width="60px" class="rightForm">
            <el-form-item label="姓名" prop="username">
              <el-input v-model="form.username"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input type="password" v-model="form.password"></el-input>
            </el-form-item>
            <el-form-item label="职位" prop="roleLevel">
              <el-radio-group v-model="form.roleLevel">
                <el-radio label="3">学生</el-radio>
                <el-radio label="2" >老师</el-radio>
                <el-radio label="1">管理员</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit" class="formButton">登录</el-button>
            </el-form-item>
          </el-form><!--
      --><ul class="formBottom"><!--
      --><li><router-link to="/register">注册账号</router-link></li>|<!--
      --><li><router-link to="/reset">重置密码</router-link></li></ul>
        </div>
      </div>
      <bottom></bottom>
    </div>
</template>

<script>
  import Top from '@/components/top'
  import bottom from '@/components/bottom'
  import { Login } from '@/api/app'
  import  main from '@/assets/Main.jpg'
  import { mapActions } from 'vuex'
  export default {
    name: 'App',
    data(){
      return {
        message1:'在线考试系统',
        message2:'登录',
        form:{
          username:'',
          password:'',
          roleLevel:'',
        },
        image:main,
        rules: {
          username: [
            {required: true, message: '请输入姓名', trigger: 'change'},
          ],
          password: [
            {required: true, message: '请输入密码', trigger: 'change'}
          ],
          roleLevel: [
            {required: true, message: '请选择职位', trigger: 'change'}
          ],
        }
      }
    },
    components:{
      Top,
      bottom
    },
    methods:{
      ...mapActions( // 语法糖
        ['setParamsActions','setLoginActions'] // 相当于this.$store.dispatch('modifyName'),提交这个方法
      ),
      judge(){
         let params = Object.assign({},this.form)
         Login(params).then(res=>{
           if(res.success){
             console.log('login',res.obj);
            this.setParamsActions({username:params.username,roleLevel:res.obj[0].roleLevel});
            this.setLoginActions({token:res.obj[0].token,url:res.obj[0].url});
            switch (this.form.roleLevel){
              case "1":
                this.$router.push({name:'Manager'});
                break;
              case "2":
                this.$router.push({name:'Teacher'});
                break;
              case "3":
                this.$router.push({name:'Student'});
                break;
              default:
                console.log("err");
            }
          }else{
            this.$message.warning(res.msg)
          }
        })

      },
      onSubmit(){
        this.$refs.form.validate(valid=>{
          if(valid){
            this.judge();
          }
        })
      },
    }
  }
</script>

<style scoped lang="scss">
  .center{
    margin: 0 auto;
    width: 1000px;
    max-height: 500px;
    min-height: 500px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  img{
    height: 400px;
  }
  .right{
    width: 330px;
    height: 400px;
    border: 1px solid #d6dfea;
    border-radius: 2px;
  }
  .top{
    font-size: 10px;
  }
  .rightForm{
    margin: 46px 18px;
  }
  .formButton{
    width: 100%;
  }
  .formBottom{
    padding: 0px;
    list-style-type: none;
    text-align: center;
    li{
      display: inline-block;
      color:#d6dfea ;
    }
  }
</style>
