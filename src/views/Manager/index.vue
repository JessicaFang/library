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
          {url:'/ManagerMessage',label:'个人信息管理'},
          {url:'/ManagerReviewM',label:'管理员设置'},
          {url:'/ManagerReviewST',label:'人员审核'},
          {url:'/ManagerTeacher',label:'教师管理'},
          {url:'/ManagerStudent',label:'学生管理'},
          {url:'/ManagerCourse',label:'课程管理'},
          {url:'/ManagerQuestLib',label:'题库管理'}
        ],
        title:'管理人员管理系统'
      }
    },
    components:{
      sideBarMenu
    },
  }
</script>

<style scoped>
</style>
