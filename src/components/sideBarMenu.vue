<template>
  <div>
    <div class="top">
      <h3>{{title}}</h3>
      <div class="topRight">
        <span>欢迎您：{{getParams.username}}</span>&nbsp;&nbsp;&nbsp;&nbsp;||&nbsp;&nbsp;&nbsp;&nbsp;
        <span @click="quit" class="quit">退出</span>&nbsp;&nbsp;&nbsp;&nbsp;
        <img :src="main" class="img" @click="uploadImg">
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
         },
         quit(){
           //退出登录
         }
       },
       beforeMount(){

       },
       mounted(){
      /* console.log(this.$router);*/
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
    margin-top:40px;
    overflow: auto;
  }
  .quit{
    color: white;
    text-decoration: underline;
    cursor: pointer;
  }
</style>
