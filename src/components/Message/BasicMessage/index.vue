<template>
  <el-form ref="form" :rules="rules"  :model="form" label-width="100px" class="form">
    <el-form-item label="姓名" prop="name">
      <el-input v-model="form.name" auto-complete="text"></el-input>
    </el-form-item>
    <el-form-item  :label="titleLabel"  prop="classOrTitle">
      <el-input v-model="form.classOrTitle" auto-complete="text"></el-input>
    </el-form-item>
    <el-form-item label="性别" prop="sex">
      <el-radio-group v-model="form.sex">
        <el-radio label="男"></el-radio>
        <el-radio label="女"></el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="邮箱" prop="myEmail">
      <el-input v-model="form.myEmail" auto-complete="email"></el-input>
    </el-form-item>
  </el-form>
</template>

<script>
  import { updateMessage } from '@/api/public'
  export default {
    name: "index",
    props:{
      myForm:Object,
      params:Object,
    },
    data(){
      return {
        titleLabel:'',
        form:{},
        rules: {
          name: [
            {required: true, message: '请输入姓名', trigger: 'change'}
          ],
          classOrTitle: [
            { validator: (rule, value, callback) => {
                if (value === '') {
                  callback(new Error('请输入'+this.titleLabel));
                } else {
                  callback();
                }
              }, trigger: 'change' }
          ],
          sex: [
            {required: true, message: '请输入性别', trigger: 'change'}
          ],
          myEmail:[
            {
              validator: (rule, value, callback) => {
                var reg = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
                if (value === '') {
                  callback(new Error('请输入邮箱'));
                } else if (!reg.test(value)) {
                  callback(new Error('邮箱格式不对'));
                } else {
                  callback();
                }
              },trigger:'change'
            }
          ],
        }
      }
    },
    beforeMount(){
      this.titleLabel= this.params.roleLevel=='3'?'班级':'职称'
      const tempForm=_.cloneDeep(this.myForm);
      if( Object.keys(tempForm).length!=0) {
        this.form=tempForm;
      }
    },

  }
</script>

<style scoped lang="scss">
  .form{
    margin: 0 auto;
    width: 60%;
  }
  /deep/ .el-form-item:last-child {
    text-align: center;
  }
</style>
