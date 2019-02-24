<template>
  <div class="message">
    <AlterMessage :myForm="myForm" :params="params"></AlterMessage>
  </div>
</template>

<script>
 import {translate} from "@/util/translate";
 import { getMessage } from '@/api/public';
  import AlterMessage from '@/views/AlterMessage'
  import { mapGetters } from 'vuex';
  export default {
    name: "index",
    components:{
      AlterMessage
    },
    data() {
      return {
        myForm:[],
        params:{},
      }
    },
    computed: {
      ...mapGetters(['getParams'])
    },
    beforeMount(){
      this.params=this.getParams;
      console.log(this.params);
      this.myForm=[{myEmail: '4408811996@qq.com', no: '001', sex: '男', name: '小熊', title: '副教授'}];
      console.log(this.myForm)
    /*  getMessage(this.params).then(res=>{
        if(res.success===true){
           this.myForm=translate(res.obj);
           this.myForm={myEmail: '4408811996@qq.com', no: '001', sex: '男', name: '小熊', title: '副教授'};
           console.log(this.myForm)
        }
      })*/
    }
  }
</script>

<style scoped lang="scss">
  .message{
    margin-top: 10px;
  }
</style>
