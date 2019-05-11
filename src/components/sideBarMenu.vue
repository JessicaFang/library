<template>
  <div>
    <div class="top">
      <h3>{{title}}</h3>
      <div class="topRight">
        <span>欢迎您：{{getParams.username}}</span>&nbsp;&nbsp;&nbsp;&nbsp;||&nbsp;&nbsp;&nbsp;&nbsp;
        <span @click="quit" class="quit">退出</span>&nbsp;&nbsp;&nbsp;&nbsp;
        <img :src="main" class="img" ref="faceUrl" @click="uploadImg">
        <input @change="addImg"  style="display: none" type="file" ref="img" name="image" accept="image/x-png,image/gif,image/jpeg,image/bmp"/>
      </div>
    </div>
    <div class="sideBar">
      <el-menu
        :default-active="$route.path"
        class="el-menu-vertical-demo"
        background-color="#3a3e4a"
        text-color="#fff"
        active-text-color="#ffd04b"
        router
      >
        <el-menu-item v-for="(item,index) in menu" :key="index" :index="item.url">
          <i class="el-icon-menu"></i>
          <span slot="title">{{item.label}}</span>
        </el-menu-item>
      </el-menu>
    </div>
    <div class="content"><router-view></router-view></div>
  </div>
</template>

<script>
    import main from '@/assets/Main.jpg'
     import { mapGetters } from 'vuex'
     import {uploadFaceUrl  } from '@/api/public'
     import {url } from '@/util/url'
     export default {
     name: "sideBarMenu",
     props:['menu','title'],
     computed: {
       ...mapGetters(['getParams'])
     },
     data(){
        return {
          main:main,
        }
     },
       methods:{
         uploadImg(){
           this.$refs.img.click();
         },
         addImg(){
           var file=this.$refs.img.files[0];
           var size=file.size;
           if(size>5*1024*1024*1024){
             this.$message({
               message:'请选择5M以内的图片',
               type:'warning'
             })
           }else{
             var param = new FormData();
             param.append('faceUrl',file);
             param.append('username',this.getParams.username);
             param.append('roleLevel',this.getParams.roleLevel);
             uploadFaceUrl(param).then(res=>{
               if(res.success==true){
                 this.main=url()+res.obj
               }else{
                 this.$message({
                   type:'warning',
                   message:res.msg
                 })
               }
             })

           }
         },
         quit(){
           //退出登录
         }
       },
       beforeMount(){

       },
       mounted(){

       }
    }
</script>

<style scoped lang="scss">
   .img{
     width: 35px;
     height: 35px;
     border: 1px solid silver ;
     border-radius: 50%;
   }
  .top{
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    background: #323744;
    color: #ffffff;
    height: 40px;
  }
  .sideBar{
    position: absolute;
    background: #3a3e4a;
    min-height:calc(100% - 40px);
    min-width:200px;
  }
  .topRight{
    display: flex;
    justify-content: center;
    align-items: center;
  }
  /deep/ .el-menu {
    border-right: 0px;
    list-style: none;
    position: relative;
    margin: 0;
    padding-left: 0;
  }
  .content{
    position: absolute;
    left:250px;
    width: calc(100% - 300px);
    max-height: calc( 100% - 100px);
    padding:20px 20px 0px 20px;

    margin-top:40px;
    overflow: auto;
  }
  .quit{
    color: white;
    text-decoration: underline;
    cursor: pointer;
  }
</style>
