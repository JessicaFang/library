<template>
  <div>
    <top :message="message"></top>
    <el-steps class="step" :active="active" align-center>
      <el-step title="个人信息输入"></el-step>
      <el-step title="发送验证码"></el-step>
      <el-step title="重置密码"></el-step>
    </el-steps>
    <component
      @next="next"
      class="content"
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
      return{
        message:'重置密码',
        active:1,
        template:'personMessage'
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
        next(active){
        console.log(active);
        this.active=active+1;
        this.template=this.active===2?'personVaild':'personPwd';
      }
    },
    mounted(){
      console.log(this.$route.params)
       if(this.$route.params.active){
         this.next(this.$route.params.active);
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
  .content{
    margin: 60px auto;
    width: 450px;
  }
</style>
