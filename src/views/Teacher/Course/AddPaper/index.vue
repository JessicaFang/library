<template>
  <div>
    <div  class="head">
      <el-steps  class="headStep" :active="active" align-center>
        <el-step title="1、创建试卷"></el-step>
        <el-step title="2、抽题组卷" ></el-step>
        <el-step title="3、发布试卷" ></el-step>
      </el-steps>
    </div>
    <component
      :method="method"
      @next="next"
      :is="template"
    ></component>
  </div>
</template>

<script>
  import paperTitle from '@/components/CreatePaper/paperTitle'
  import paperContent from '@/components/CreatePaper/paperContent'
  import paperDetail from '@/components/CreatePaper/paperDetail'
  import paperContentAuto from '@/components/CreatePaper/paperContentAuto'
  import { mapGetters,mapActions } from 'vuex';
  export default {
    name: "index",
    data() {
      return {
        template: 'paperTitle',
        method:'',
      }
    },
    components: {
      paperTitle,
      paperContent,
      paperDetail,
      paperContentAuto
    },

    computed: {
      ...mapGetters(['getActive']),
      active() {
        const components = ['', 'paperTitle', 'paperContent', 'paperDetail'];
        if (this.method === '抽题组卷'&&this.getActive.active===2) {
          this.template='paperContentAuto'
        } else {
          this.template = components[this.getActive.active];
        }
        return this.getActive.active;
      },
    },
    methods: {
      ...mapActions( // 语法糖
        ['setActiveActions'] // 相当于this.$store.dispatch('modifyName'),提交这个方法
      ),
      next(method){
        this.method=method;
      }
    },
    beforeMount(){
      this.setActiveActions({active:1,source:'AddPaper'})
    }
  }

</script>

<style scoped>
  .head{
    border-bottom: 1px solid  #1A8CFE;
  }
  .headStep{
    margin: 15px 0 10px 0;
  }
</style>
