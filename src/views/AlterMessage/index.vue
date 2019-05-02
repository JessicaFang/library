<template>
  <el-form ref="form" :rules="rules"  :model="form" label-width="100px" class="form">
    <!--<el-form-item label="姓名" prop="name">
      <el-input v-model="form.name" auto-complete="text"></el-input>
    </el-form-item>-->
    <el-form-item  :label="titleLabel"  prop="title">
      <el-input v-model="form.title" auto-complete="text"></el-input>
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
    <el-form-item label="电话号码" prop="myTel">
      <el-input v-model="form.myTel" auto-complete="tel"></el-input>
    </el-form-item>
    <el-form-item label="新密码" prop="pwd">
      <el-input type="password" v-model="form.pwd" auto-complete="password"></el-input>
    </el-form-item>
       <el-form-item label="密码确认" prop="oldPwd">
    <el-input type="password" v-model="form.oldPwd" auto-complete="password"></el-input>
  </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit" class="formButton">修改</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
    import { updateMessage } from '@/api/public'
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
          rules: {
            name: [
              {required: true, message: '请输入姓名', trigger: 'change'}
            ],
            title: [
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
            pwd: [
              {
                validator: (rule, value, callback) => {
                  if (value === '' && this.form.oldPwd !== '') {
                    callback(new Error('请输入密码'));
                  } else {
                    callback();
                  }
                }, trigger: 'change'
              }
            ],
            oldPwd: [
              {
                validator: (rule, value, callback) => {
                  if (value === '' && this.form.pwd !== '') {
                    callback(new Error('请再次输入密码'));
                  } else if (value !== this.form.pwd) {
                    callback(new Error('两次输入密码不一致!'));
                  } else {
                    callback();
                  }
                }, trigger: 'change'
              }
            ],
          }
        }
      },
      watch: {
        myForm: {
          handler() {
            this.titleLabel = this.params.roleLevel == '3' ? '班级' : '职称';
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
      methods: {
        onSubmit() {
          const form = {
            pwd: this.form.pwd,
            oldPwd: this.form.oldPwd,
            sex: this.form.sex,
            myEmail: this.form.myEmail,
            myTel: this.form.myTel,
            classOrTitle: this.form.title
          };
          const params = Object.assign({}, this.params, form);
          this.$refs.form.validate(valid => {
            if (valid) {
              updateMessage(params).then(res => {
                if (res.success == true) {
                  this.$message({
                    type: 'success',
                    message: '更新成功'
                  })
                } else {
                  this.$message({
                    type: 'warning',
                    message: '更新失败'
                  })
                }
              })
            }
          })
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
