<template>
   <side-bar-menu  :menu="menuList" :title="title"></side-bar-menu>
</template>
<script>
  import sideBarMenu from '@/components/sideBarMenu'
  export default {
    name: "index",
    data(){
      return {
        menuList:[
          {url:'/StudentMessage',label:'个人信息'},
          {url:'/ChoiceTest',label:'考试列表'},
          {url:'/ChargeTest',label:'试卷查看'}
        ],
        title:'学生管理系统'
      }
    },
    components:{
      sideBarMenu
    },
    mounted(){
      this.$router.push({name:'StudentMessage'})
    }
  }
</script>
<style scoped>

</style>
