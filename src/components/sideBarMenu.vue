<template>
  <div>
    <div class="top">
      <h3 class="systemTitle">{{title}}</h3>
      <div class="topRight">
        <span>欢迎你：{{getParams.username}}</span>&nbsp;&nbsp;||&nbsp;&nbsp;
        <span @click="quit" class="quit">退出</span>&nbsp;&nbsp;
        <img :src="main" class="img" @click="uploadImg">
        <input @change="addImg"  style="display: none" type="file" ref="img" name="image" accept="image/x-png,image/gif,image/jpeg,image/bmp"/>
      </div>
    </div>
    <div class="sideBar">
      <el-menu
        :default-active="$route.path"
        class="el-menu-vertical-demo"
        background-color="#545c64"
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
     import { mapGetters,mapActions } from 'vuex'
    import {uploadFaceUrl  } from '@/api/public'
    import {Quit  } from '@/api/app'
    import { url } from '@/util/gobalVar'
     export default {
     name: "sideBarMenu",
     props:['menu','title'],
     computed: {
       ...mapGetters(['getParams','getLogin'])
     },
     data(){
        return {
          main:'',
        }
     },
       methods:{
         ...mapActions(['setLoginActions']),
        /* uploadImg(){
           this.$refs.img.click();
         },
         dealImg(base64,bili,callback){
           var img=new Image();
           img.src=base64;
           this.main=base64;
           console.log(img)
           var that=this;
           img.onload=function () {
             var canvas = document.createElement('canvas');
             var ctx=canvas.getContext('2d');
             var w=that.width/bili;
             var h=that.height/bili;
             var anw = document.createAttribute("width");
             anw.nodeValue = w;
             var anh = document.createAttribute("height");
             anh.nodeValue = h;
             canvas.setAttributeNode(anw);
             canvas.setAttributeNode(anh);
             ctx.drawImage(this,0,0,w,h);
             var dataURL=canvas.toDataURL('image/jpeg');
             callback(that.dataURLtoBlob(dataURL));
           }
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
             var r=new FileReader();
             r.readAsDataURL(file);
             var that=this;
             r.onload=function (e) {
               var base64=e.target.result;
               that.dealImg(base64,1.5,(blob)=>{
                 console.log(blob)
               })
             }
           }
         },
         //canvas图片处理  绘制和压缩图片
        dataURLtoBlob(dataurl) {
          var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
          bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
          while(n--){
             u8arr[n] = bstr.charCodeAt(n);
          }
          return new Blob([u8arr], {type:mime});
         },*/
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
                 this.setLoginActions({token:localStorage.getItem("token"),url:res.obj});
                 this.main=url()+this.getLogin.url;
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
              var params=this.getLogin.token;
              Quit({token:params}).then(res=>{
                this.$message.success('退出成功，即将返回登录页面');
                this.$router.push({name:"Login"})
              })
         },
       },
       created(){
          if(this.getLogin.url&&this.getLogin.url!='') {
            this.main = url() + this.getLogin.url;
          }else{
            this.main=main;
          }
       },
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
    background:#545C64;
    color: white;
    font-size: 18px;
    height: 39px;
    border-bottom: 1px solid white;
  }
  .systemTitle{
    padding-left: 10px;
  }
  .sideBar{
    position: absolute;
    background: #545C64;
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
    left:200px;
    width: calc(100% - 200px);
    max-height: calc( 100% - 40px);
    overflow: auto;
  }
  .quit{
    cursor: pointer;
  }
</style>
