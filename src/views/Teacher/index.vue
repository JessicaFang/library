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
               {url:'/TeacherCourse',label:'试卷管理'},
               {url:'/TeacherSuggestLib',label:'学生试卷管理'},
               {url:'/TeacherStatics',label:'试卷统计'}
               ],
             title:'教师管理系统'
          }
      },
      components:{
        sideBarMenu
      },
      mounted() {
        this.$router.push({name:'TeacherMessage'});
      }
    }
</script>

<style scoped>
</style>
