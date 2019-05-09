<template>
  <div>
    <div class="toolbar" ref="toolbar" v-show="showTool"></div>
    <div class="editor" ref="editor" ></div>
  </div>
</template>

<script>
     import {upload} from '@/api/public'
     import E from 'wangeditor';
     export default {
      name: "editorBar",
      data(){
        return {
          editor:null,
          content:'',
          showTool:false,
        }
      },
      props:{
        value:{
          type:String,
          default:'',
        },
        valueChange:{
          type:Boolean,
          default:true,
        },
        index:Number,
        showToolBar:{
           type:Boolean,
           default:true,
        }
      },
      //提供父组件v-model
      model:{
        prop:'value',
        event:'input',
      },
      watch:{
        //顺序是这里发生改变，onchange传递数据出去，触发change事件，然后把值赋给questionForm，
        // 接着通过v-model回传到wangeditor,然后被监听之后又用this.editor.txt.html更改时数据,所以发生改变
        value: function(newValue) {
          console.log(this.valueChange)
           if (this.valueChange) {
             this.editor.txt.html(newValue);
             this.$emit('endChange');
           }
         }
       },
       methods:{
         setEditor() {
           this.editor = new E(this.$refs.toolbar,this.$refs.editor);
           //定义图片上传的地址
           this.editor.customConfig.uploadImgShowBase64 = true;
           this.editor.customConfig.showLinkImg=false;
           this.editor.customConfig.withCredentials = true;
           this.editor.customConfig.uploadImgParamsWithUrl = true;
           this.editor.customConfig.uploadImgMaxSize = 100* 1024  // 将图片大小限制为 2M
           this.editor.customConfig.uploadImgHeaders = {
             'Accept': 'text/x-json',
             'Access-Control-Allow-Origin':'*',
           }
           this.editor.customConfig.uploadFileName = 'files';
           this.editor.customConfig.uploadImgMaxLength = 6 // 限制一次最多上传 3 张图片
           this.editor.customConfig.uploadImgTimeout = 3 * 60 * 10000// 设置超时时间
           this.editor.customConfig.debugger = true ;
           this.editor.customConfig.zIndex = 300;
           this.editor.customConfig.customUploadImg = async (files, insert) => {
             /* files 是 input 中选中的文件列表 */
             var formData = new FormData();
             formData.append('files', files[0]);
             //先让图片进行上传，在修改图片路径
             var result = await upload(formData);
             console.log(result);
             /* upload方法是后台提供的上传图片的接口 */
             /* insert 是编辑器自带的 获取图片 url 后，插入到编辑器的方法 上传代码返回结果之后，将图片插入到编辑器中*/
             if (result.errno == 0) {
               for (var i = 0; i < result.data.length; i++) {
                 insert('http://jwuyou.ngrok.xiaomiqiu.cn' + result.data[i]);
               }
             }
           };
          this.editor.customConfig.menus=[
            'head',  // 标题
            'bold',  // 粗体
            'fontSize',  // 字号
            'fontName',  // 字体
            'italic',  // 斜体
            'underline',  // 下划线
            'strikeThrough',  // 删除线
            'link',  // 插入链接
            'list',  // 列表
            'justify',  // 对齐方式
            'quote',  // 引用
            'image',  // 插入图片
            'table',  // 表格
            'code',  // 插入代码
            'undo',  // 撤销
            'redo'  // 重复
          ];
   /*       this.editor.customConfig.uploadImgHooks = {
            fail: (xhr, editor, result) => {
              // 插入图片失败回调

            },
            success: (xhr, editor, result) => {
              // 图片上传成功回调
              //
              // let imgUrl = result.data;
              // insertImg(imgUrl)
            },
            timeout: (xhr, editor) => {
              // 网络超时的回调
            },
            error: (xhr, editor) => {
                console.log(xhr);
            },
            customInsert: (insertImg, result, editor) => {
              // 图片上传并返回结果，自定义插入图片的事件（而不是编辑器自动插入图片！！！）
              // insertImg 是插入图片的函数，editor 是编辑器对象，result 是服务器端返回的结果
              // 举例：假如上传图片成功后，服务器端返回的是 {url:'....'} 这种格式，即可这样插入图片：
              // 图片上传成功,插入图片的回调
            /!*  console.log(result);*!/
              // if(result.code == 200){
              //获取返回服务器地址
              var url = result.data;
              console.log(url);
              //url插入到富文本中
              insertImg(url)//将内容插入到富文本中
              // }
            }
          };*/
           const that=this;
           this.editor.customConfig.onchange=function(html){
             that.$emit('htmlChange',html);
            };
           this.editor.customConfig.onfocus = function (html) {
             if(that.showToolBar) {
               that.$refs.editor.classList.add('status');
               that.showTool = true;
             }
           };
           this.editor.create();
           this.$refs.editor.addEventListener('click', function () {
               that.$refs.editor.click();
           })
        },
      },
      mounted(){
        this.setEditor();
        this.editor.txt.html(this.value)
      }
    }
</script>

<style scoped lang="scss">
  .toolbar{
    border-top: 1px solid gray;
    border-left: 1px solid gray;
    border-right: 1px solid gray;
  }
  /deep/  .w-e-toolbar{
    flex-wrap:wrap;
  }
  .editor{
    border: 1px solid gray;
    height: 70px;
  }
  .status{
    height: 100px;
  }
  /deep/ .w-e-text{
    overflow-y: auto;
  }
</style>
