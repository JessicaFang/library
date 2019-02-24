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
          {url:'/StudentAddQuest',label:'题目添加'},
          {url:'/SuggestLib',label:'题库管理'}
        ],
        title:'学生管理系统'
      }
    },
    components:{
      sideBarMenu
    },
  }
</script>
<style scoped>

</style>
