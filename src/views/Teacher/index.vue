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
               {url:'/TeacherSuggestLib',label:'答卷批改'},
               {url:'/TeacherStatics',label:'结果统计'}
               ],
             title:'在线考试'
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
