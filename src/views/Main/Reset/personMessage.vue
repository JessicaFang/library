<template>
  <el-form :model="form"  :rules="rules" ref="form" label-width="100px" >
    <el-form-item label="姓名" prop="userId">
      <el-input v-model="form.userId"></el-input>
    </el-form-item>
    <el-form-item label="职位" prop="roleLevel">
      <el-radio-group v-model="form.roleLevel">
        <el-radio label="3">学生</el-radio>
        <el-radio label="2">老师</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" class="button" @click="next">下一步</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  import {mapGetters,mapActions} from 'vuex'
  export default {
    name: "personMessage",
    data(){
      return{
        form:{},
        rules:{
          userId: [
            { required:true ,message:'请输入号码', trigger: 'change' }
          ],
          roleLevel: [
            { required:true ,message:'请输入职位', trigger: 'change' }
          ],
        }
      }
    },
    methods:{
      ...mapActions(['setResetFormAction','setResetFormClearAction']),
      next(){
        this.$refs.form.validate(valid=>{
          if(valid){
             this.setResetFormClearAction();
             for(var key in this.form) {
               this.setResetFormAction({key:key,value:this.form[key]});
             }
             this.$emit('next',1);
          }
        })
      }

    }
  }
</script>

<style scoped>
.button{
  width: 100%;
}
</style>
