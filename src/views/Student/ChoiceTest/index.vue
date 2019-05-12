<template>
    <div>
      <el-form ref="form" :model="form" class="form" :inline="true">
        <el-form-item label-width="75px" label="课程号">
          <el-input v-model="form.courseId" placeholder="请输入课程号"></el-input>
        </el-form-item>
        <el-form-item label-width="75px" label="试卷名称">
          <el-input v-model="form.paperTitle" placeholder="请输入试卷名称"></el-input>
        </el-form-item>
        <el-form-item label-width="75px" label="试卷状态">
          <el-select clearable v-model="form.finished" placeholder="请选择试卷状态">
            <el-option label='未开考' value="0"></el-option>
            <el-option label='正在进行' value="1"></el-option>
            <el-option label='已结束' value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSearch">查找</el-button>
        </el-form-item>
      </el-form>
      <table-button
        class="tableBtn"
        :ButtonGroup="ButtonGroup"
        @handleClick="handleClick">
      </table-button>
      <DTable
        class="table"
        @selectChange="calSelection"
        :table="table"
        :tableData="tableData"
        :total="total"
        @pageMesChange="handleMesChange"
      ></DTable>
    </div>

</template>

<script>
  import {queryTestPaper, studentQueryTestPaper} from '@/api/student'
  import {tableConfig, btnConfig} from './tableConfig'
  import DTable from '@/components/Table/DTable'
  import TableButton from '@/components/Table/tableButton'
  import tableMixin from '@/util/Mixins/tableMixins'
  import {mapActions, mapGetters} from 'vuex'

  export default {
    name: "index",
    data() {
      return {
        form: {
          paperTitle: '',
          courseId: '',
        },
        tableData: [],
        table: {},
        total: 0,
        ButtonGroup: {},
      }
    },
    components: {
      DTable,
      TableButton
    },
    computed: {
      ...mapGetters(['getId']),
    },
    mixins: [tableMixin],
    methods: {
      ...mapActions(['setExamActions', 'setPaperIdActions']),
      handleClick(event) {
        switch (event) {
          case 'Test':
            this.handleTestClick();
            break;
        }
      },
      handleTestClick() {
        var paperId = this.selectCloumn[0].paperId
        studentQueryTestPaper({paperId}).then(res => {
          if (res.success === true) {
            this.setPaperIdActions({paperId: paperId});
            this.setExamActions(res.obj);
            this.$router.push("StudentExaming")
          } else {
            this.$message({
              type: 'warning',
              message: res.msg,
            })
          }
        })
      },
      onSearch() {
        this.getTable();
      },
      getTable() {
        const params = Object.assign({}, this.defaultParams, this.form, {paperState: '1'});
        queryTestPaper(params).then(res => {
          if (res.success == true) {
            this.tableData = res.obj;
            this.total = res.total;
          }
        })
      },
      init() {
        this.table = tableConfig;
        this.ButtonGroup = btnConfig;
      },

    },
    beforeMount() {
      this.init();
      this.getTable();
    }
  }
</script>

<style scoped>
  .table {
    margin-top: 8px;
  }
</style>
