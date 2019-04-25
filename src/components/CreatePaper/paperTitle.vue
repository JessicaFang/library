<template>
  <el-card class="box-card card">
      <div class='title'>创建新试卷</div>
      <el-form  :rules="rules" ref="form"  :model="form"  label-width="80px" class="form">
        <el-form-item label="试卷名称" prop="paperTitle">
          <el-input placeholder="请输入试卷名称" v-model="form.paperTitle" >
          </el-input>
        </el-form-item>
        <el-form-item label="试卷分类" prop="classification" >
          <el-select v-model="form.classification" placeholder="请选择分类" @focus="getOptions" multiple>
            <el-option v-for="(item,index) in options" :label="item.label" :key="index" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="组卷方式">
          <el-radio-group v-model="form.method" >
            <el-radio-button label="选题组卷"></el-radio-button>
            <el-radio-button label="抽题组卷"></el-radio-button>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <el-button @click="next" type="primary">下一步</el-button>
  </el-card>
</template>

<script>
    import { mapActions } from 'vuex';
    export default {
        name: "paperTitle",
        data(){
          return {
            form: {
              paperTitle:'',
              classification:[],
              method:'选题组卷',
            },
            options:[],
            rules: {
              paperTitle: [
                {required: true, message: '请输入试题名称', trigger: 'change'}
              ],
              classification: [
                {required: true, message: '请选择试题分类', trigger: 'change'}
              ],
            }
          }
        },
        methods:{
          ...mapActions( // 语法糖
            ['setPaperActions','setActiveActions'] // 相当于this.$store.dispatch('modifyName'),提交这个方法
          ),
          next(){
            this.$refs.form.validate((valid) => {
              if (valid) {
                this.setPaperActions({name:'testPaper',value:{}});
                this.setPaperActions({name:'testPaper',subName:'paperTitle',value:this.form.paperTitle,flag:true});
                this.setPaperActions({name:'testPaper',subName:'knowledgeCover',value:this.form.classification,flag:true});
                this.$emit('next',this.form.method);
                this.setActiveActions({active:2,source:'paperTitle'});
              } else {
                console.log('error submit!!');
              }
            });

          },
          getOptions() {
            this.options = [{
              value: '选项1',
              label: '黄金糕'
            }, {
              value: '选项2',
              label: '双皮奶'
            }, {
              value: '选项3',
              label: '蚵仔煎'
            }, {
              value: '选项4',
              label: '龙须面'
            }, {
              value: '选项5',
              label: '北京烤鸭'
            }]
          }
        }
    }
</script>

<style scoped>
  .form{
    width: 26%;
  }
  .card{
    margin: 20px;
  }
  .title{
    margin: 0 10px 20px 0;
  }
</style>
