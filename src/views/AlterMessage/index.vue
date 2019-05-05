<template>
  <el-form ref="form" :rules="rules"  :model="form" label-width="100px" class="form">
    <el-form-item  :label="noLabel" prop="no">
      <el-input v-model="form.no" disabled></el-input>
    </el-form-item>
    <el-form-item label="姓名" prop="name">
      <el-input v-model="form.name" ></el-input>
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
    <el-form-item>
      <el-button type="primary" @click="changePwd" class="formButton">修改密码</el-button>
      <el-button type="primary" @click="onSubmit" class="formButton">修改</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  import { updateMessage } from '@/api/public';
  import {mapGetters,mapActions} from 'vuex';
  export default {
    name: "index",
    props: {
      myForm: Array,
      params: Object,
    },
    data() {
      return {
        titleLabel: '',
        form: {},
        noLabel:'',
        rules: {
          classOrTitle: [
            {
              validator: (rule, value, callback) => {
                if (value === '') {
                  callback(new Error('请输入' + this.titleLabel));
                } else {
                  callback();
                }
              }, trigger: 'change'
            }
          ],
          name: [
            {required: true, message: '请输入姓名', trigger: 'change'}
          ],
          sex: [
            {required: true, message: '请输入性别', trigger: 'change'}
          ],
          myEmail: [
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
              }, trigger: 'change'
            }
          ],
        }
      }
    },
    computed:{
      ...mapGetters(['getParams'])
    },
    watch: {
      myForm: {
        handler() {
          const tempForm = this.myForm[this.myForm.length - 1];
          if (tempForm) {
            this.form = tempForm;
          } else {
            this.form = {};
          }
        },
        deep: true,
      }
    },
    mounted() {
      if( this.params.roleLevel=='3'){
        this.noLabel='学号';
        this.titleLabel='班级';
      }else{
        this.noLabel='教师号';
        this.titleLabel='职称';
      }
    },
    methods: {
      ...mapActions(['setResetFormAction','setResetFormClearAction']),
      onSubmit() {
        const form = {
          sex: this.form.sex,
          myEmail: this.form.myEmail,
          classOrTitle: this.form.classOrTitle,
          name:this.form.name
        };
        const params = Object.assign({}, this.params, form);
        this.$refs.form.validate(valid => {
          if (valid) {
            updateMessage(params).then(res => {
              if (res.success == true) {
                this.$message({
                  type: 'success',
                  message: '更新成功',
                })
                this.$emit('update')
              } else {
                this.$message({
                  type: 'warning',
                  message: '更新失败'
                })
              }
            })
          }
        })
      },
      changePwd() {
        var obj = {
          userId: this.getParams.username,
          roleLevel: this.getParams.roleLevel,
        }
        this.setResetFormClearAction();
        for (var key in obj) {
          this.setResetFormAction({key: key, value:obj[key]});
        }
        this.$router.push({name:'Reset',params:{active:1}})
      }
    }
  }
</script>

<style scoped lang="scss">
  .form,.formButton{
    margin: 0 auto;
    width: 60%;
  }
  .formButton{
    width: 30%;
  }
  /deep/ .el-form-item:last-child {
    text-align: center;
  }
</style>
