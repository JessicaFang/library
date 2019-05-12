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
               {url:'/TeacherMessage',label:'个人信息'},
               {url:'/TeacherCourse',label:'课程管理'},
               {url:'/TeacherSuggestLib',label:'建议题库管理'}
               ],
             title:'教师管理系统'
          }
      },
      components:{
        sideBarMenu
      },
      mounted(){
        this.$router.push({name:'TeacherMessage'})
      }
    }
</script>

<style scoped>
</style>
