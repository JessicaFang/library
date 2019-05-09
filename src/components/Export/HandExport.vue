<template>
  <div>
    <el-form :inline="true" :model="form" class="form">
      <el-form-item label="题目类型">
        <el-select v-model="form.type" @change="typeChange">
          <el-option label="单选题" value="1"></el-option>
          <el-option label="多选题" value="2"></el-option>
          <el-option label="判断题" value="3"></el-option>
          <el-option label="填空题" value="4"></el-option>
          <el-option label="简答题" value="5"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="题目难度" v-show="formShow">
        <el-select clearable v-model="form.difficultLevel">
          <el-option label="容易" value="0"></el-option>
          <el-option label="一般" value="0.3"></el-option>
          <el-option label="困难" value="0.6"></el-option>
          <el-option label="很困难" value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="知识点" v-show="formShow">
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
    <component
      @submit="onSubmit"
      :is="template"
      ref="question"
    ></component>
  </div>
</template>

<script>
  import {queryKnowledge, saveLib} from "@/api/manager";
  import {saveSuggest} from "@/api/student";
  import {reset} from '@/util/reset'
  import Single from '@/components/Question/Single'
  import Double from '@/components/Question/Double'
  import blankFill from '@/components/Question/blankFill'
  import Judge from '@/components/Question/Judge'
  import essayTest from '@/components/Question/essayTest'
  import {mapGetters} from 'vuex';

  export default {
    name: "HandExport",
    data() {
      return {
        form: {
          difficultLevel: '0',
          type: '1',
          knowledgeTitle: '',
          courseId: '',
        },
        knowledgeTitleList: [],
        template: 'Single',
        formShow: true,
      }
    },
    computed: {
      ...mapGetters(['getParams', 'getId'])
    },
    components: {
      Single,
      Double,
      blankFill,
      Judge,
      essayTest
    },
    methods: {
      knowledgeEvent() {
        queryKnowledge({courseId: this.courseId}).then(res => {
          if (res.success) {
            this.knowledgeTitleList = res.obj
          } else {
            this.$message.info(res.msg)
          }
        })
      },
      typeChange() {
        switch (this.form.type) {
          case '1':
            this.template = "Single";
            break;
          case '2':
            this.template = 'Double';
            break;
          case '3':
            this.template = 'Judge';
            break;
          case  '4':
            this.template = 'blankFill';
            break;
          case  '5':
            this.template = 'essayTest';
            break;
        }
      },
      onSubmit(form) {
        var data=_.cloneDeep(form)
        const params = Object.assign({}, this.form, data);
        var save = '';
        if (this.getParams.roleLevel == '3') {
          delete params.difficultLevel;
          delete params.knowledgeTitle;
          save = saveSuggest;
          params.sno = this.getParams.username;
        } else {
          save = saveLib;
        }
        save(params).then(res => {
          if (res.success == true) {
            this.$message({
              type: 'warning',
              message: '上传题目成功',
            })
            reset(this.form.type, this.$refs.question);
          } else {
            this.$message({
              type: 'warning',
              message: '上传题目失败',
            })
          }
        })
      }
    },
    mounted() {
      this.form.courseId = this.getId;
      this.formShow = this.getParams.roleLevel == '3' ? false : true;
    }
  }
</script>

<style scoped>
  .editorBar {
    padding: 0 10px;
  }
</style>
