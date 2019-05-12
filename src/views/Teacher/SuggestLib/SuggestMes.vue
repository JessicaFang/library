<template>
  <el-form ref="form" :rules="rules"  :model="form"  class="form">
    <el-form-item label-width="80px" label="难度"  prop="difficultLevel">
      <el-select clearable v-model="form.difficultLevel">
        <el-option label="容易" value="0"></el-option>
        <el-option label="一般" value="0.3"></el-option>
        <el-option label="困难" value="0.6"></el-option>
        <el-option label="很困难" value="1"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label-width="80px" label="知识点" prop="knowledgeTitle">
      <el-select clearable v-model="form.knowledgeTitle" @focus="knowledgeEvent">
        <el-option
          v-for="item in knowledgeTitleList"
          :key="item.knowledgeTitle"
          :label="item.knowledgeTitle"
          :value="item.knowledgeTitle">
        </el-option>
      </el-select>
    </el-form-item>
  </el-form>
</template>

<script>
  import {queryKnowledge} from '@/api/manager'
  export default {
    name: "SuggestMes",
    data() {
      return {
        form: {
        },
        knowledgeTitleList:'',
        rules: {
          difficultLevel: [{required: true, message: '请输入课程号', trigger: 'change'}],
          knowledgeTitle: [{required: true, message: '请输入课程名', trigger: 'change'}],
        }
      }
    },
    methods:{
      knowledgeEvent() {
        queryKnowledge({courseId: this.courseId}).then(res => {
          if (res.success) {
            this.knowledgeTitleList = res.obj
          } else {
            this.$message.warning(res.msg)
          }
        })
      },
    }
  }
</script>

<style scoped lang="scss">
  .form{
    margin: 0 auto;
    width: 60%;
  }
</style>

