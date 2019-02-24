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
      getMessage(this.params).then(res=>{
        if(res.success===true){
          this.myForm=translate(res.obj);
          console.log(this.myForm)
        }
      })
    }
  }
</script>

<style scoped lang="scss">
  .message{
    margin-top: 10px;
  }
</style>
