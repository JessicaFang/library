<template>
  <div>
    <el-form ref="form"  :model="form" class="form"  :inline="true">
      <el-form-item label-width="75px" label="试卷名称" >
        <el-input v-model="form.paperTitle" placeholder="请输入试卷名称"></el-input>
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
      @pageMesChange = "handleMesChange"
    ></DTable>
  </div>
</template>

<script>
  import { saveLib,delLib,exportData,selectLib,selectLibById } from '@/api/manager'
  import {tableConfig,btnConfig} from './tableConfig'
  import DTable from '@/components/Table/DTable'
  import TableButton from '@/components/Table/tableButton'
  import tableMixin from '@/util/Mixins/tableMixins'
  import { mapActions,mapGetters } from 'vuex'
  export default {
    name: "index",
    data(){
      return {
        form:{
          paperTitle:'',
        },
        tableData:[],
        table:{},
        total:0,
        ButtonGroup:{},
      }
    },
    components:{
      DTable,
      TableButton
    },
    computed:{
      ...mapGetters(['getId']),
    },
    mixins: [tableMixin],
    methods:{
      ...mapActions(['setTotalPaperActions','setActiveActions','setPointActions','setAllPointActions']),
      handleClick(event) {
        switch (event) {
          case 'ALTERQTEST':
            this.handleAlterTestClick();
            break;
          case 'ALTERQPUBLIC':
            this.handleAlterPublicQClick();
            break;
          case 'DELETEQ':
            this.handleDeleteQClick();
            break;
          case 'GOBACK':
            this.$router.go(-1);
            break;
        }
      },
      getCloumnId(){
        var id = [];
        this.selectCloumn.forEach((item, index) => {
          id[index] = item.paperId;
        });
        id=id.toString();
        return id
      },
      handleAlterPublicQClick(){
        var res={
          "success": true,
          "msg": "操作成功",
          "obj": {
            "testPaper": {
              "passingScore": 60,
              "paperId": 4,
              "paperTitle": "自动组卷测试",
              "paperHead": null,
              "totalPoints": 71.2,
              "minutesLength": 40,
              "testTime": "2019-03-28T09:48:03.000+0000",
              "createDate": "2019-03-27",
              "paperState": "0",
              "analysisReport": null,
              "knowledgeCover": null,
              "singleCounter": 10,
              "singlePoints": 20,
              "multipleCounter": 5,
              "multiplePoints": 20,
              "judgeCounter": 2,
              "judgePoints": 5.2,
              "blankCounter": 2,
              "blankPoints": 6,
              "questionCounter": 4,
              "questionPoints": 20,
              "courseId": 2
            },
            "testQuestionVos": [],
            "testMultipleVos": [],
            "testBlankVos": [],
            "testSingleVos": [
              {
                "testSingleId": 7,
                "paperId": null,
                "singleId": 10,
                "singleQuestion": "<p>1</p>",
                "singleTestChoice": [
                  "<p>1</p>",
                  "<p>1</p>",
                  "<p>1</p>",
                  "<p>1</p>"
                ],
                "singleTestAnswer": "1",
                "knowledgeTest": "[\"知识点名称1\",\"zhi2\"]",
                "singlePoints": 2,
                "selectNum": null,
                "trueRate": null
              },
              {
                "testSingleId": 8,
                "paperId": null,
                "singleId": 11,
                "singleQuestion": "<p>1</p>",
                "singleTestChoice": [
                  "<p>1</p>",
                  "<p>1</p>",
                  "<p>1</p>",
                  "<p>1</p>"
                ],
                "singleTestAnswer": "2",
                "knowledgeTest": "[\"知识点名称1\",\"zhi2\"]",
                "singlePoints": 2,
                "selectNum": null,
                "trueRate": null
              },
              {
                "testSingleId": 9,
                "paperId": null,
                "singleId": 12,
                "singleQuestion": "驾驶人有下列哪种违法行为一次记6分",
                "singleTestChoice": [
                  "使用其他车辆行驶证",
                  "饮酒后驾驶机动车",
                  "车速超过规定时速50%以上",
                  "违法占用应急车道行驶"
                ],
                "singleTestAnswer": "3",
                "knowledgeTest": "[\"知识点名称1\",\"zhi2\"]",
                "singlePoints": 2,
                "selectNum": null,
                "trueRate": null
              },
              {
                "testSingleId": 10,
                "paperId": null,
                "singleId": 13,
                "singleQuestion": "驾驶人有下列哪种违法行为一次记6分",
                "singleTestChoice": [
                  "使用其他车辆行驶证",
                  "饮酒后驾驶机动车",
                  "车速超过规定时速50%以上",
                  "违法占用应急车道行驶"
                ],
                "singleTestAnswer": "3",
                "knowledgeTest": "[\"知识点名称1\",\"zhi2\"]",
                "singlePoints": 2,
                "selectNum": null,
                "trueRate": null
              },
              {
                "testSingleId": 11,
                "paperId": null,
                "singleId": 14,
                "singleQuestion": "<p>dfdfd</p>",
                "singleTestChoice": [
                  "<p>a</p>",
                  "<p>a</p>",
                  "<p>a</p>",
                  "<p>a</p>"
                ],
                "singleTestAnswer": "0",
                "knowledgeTest": "[\"知识点名称1\",\"zhi2\"]",
                "singlePoints": 2,
                "selectNum": null,
                "trueRate": null
              },
              {
                "testSingleId": 12,
                "paperId": null,
                "singleId": 15,
                "singleQuestion": "<p>q</p>",
                "singleTestChoice": [
                  "<p>q</p>",
                  "<p>q</p>",
                  "<p>q</p>",
                  "<p>q</p>"
                ],
                "singleTestAnswer": "2",
                "knowledgeTest": "[\"知识点名称1\",\"zhi2\"]",
                "singlePoints": 2,
                "selectNum": null,
                "trueRate": null
              },
              {
                "testSingleId": 13,
                "paperId": null,
                "singleId": 16,
                "singleQuestion": "<p>c</p>",
                "singleTestChoice": [
                  "<p>c</p>",
                  "<p>c</p>",
                  "<p>c</p>",
                  "<p>c</p>"
                ],
                "singleTestAnswer": "1",
                "knowledgeTest": "[\"知识点名称1\",\"zhi2\"]",
                "singlePoints": 2,
                "selectNum": null,
                "trueRate": null
              },
              {
                "testSingleId": 14,
                "paperId": null,
                "singleId": 17,
                "singleQuestion": "<p>c</p>",
                "singleTestChoice": [
                  "<p>c</p>",
                  "<p>c</p>",
                  "<p>c</p>",
                  "<p>c</p>"
                ],
                "singleTestAnswer": "3",
                "knowledgeTest": "[\"知识点名称1\",\"zhi2\"]",
                "singlePoints": 2,
                "selectNum": null,
                "trueRate": null
              },
              {
                "testSingleId": 15,
                "paperId": null,
                "singleId": 18,
                "singleQuestion": "驾驶人有下列哪种违法行为一次记6分",
                "singleTestChoice": [
                  "使用其他车辆行驶证",
                  "饮酒后驾驶机动车",
                  "车速超过规定时速50%以上",
                  "违法占用应急车道行驶"
                ],
                "singleTestAnswer": "3",
                "knowledgeTest": "[\"知识点名称1\",\"zhi2\"]",
                "singlePoints": 2,
                "selectNum": null,
                "trueRate": null
              }
            ],
            "testJudgeVos": []
          },
          "total": null,
          "attributes": null
        };
        var obj=_.cloneDeep(res.obj)
        this.setTotalPaperActions(obj);
        this.setActiveActions({active:3,source:'ChargePaper',alterFlag:true});
        this.$router.push({name:'TeacherAddPaper'});
      },
      handleAlterTestClick(){
        var res={
          "success": true,
          "msg": "操作成功",
          "obj": {
            "testPaper": {
              "passingScore": 60,
              "paperId": 4,
              "paperTitle": "自动组卷测试",
              "paperHead": null,
              "totalPoints": 71.2,
              "minutesLength": 40,
              "testTime": "2019-03-28T09:48:03.000+0000",
              "createDate": "2019-03-27",
              "paperState": "0",
              "analysisReport": null,
              "knowledgeCover": null,
              "singleCounter": 10,
              "singlePoints": 20,
              "multipleCounter": 5,
              "multiplePoints": 20,
              "judgeCounter": 2,
              "judgePoints": 5.2,
              "blankCounter": 2,
              "blankPoints": 6,
              "questionCounter": 4,
              "questionPoints": 20,
              "courseId": 2
            },
            "testQuestionVos": [],
            "testMultipleVos": [],
            "testBlankVos": [],
            "testSingleVos": [
              {
                "testSingleId": 7,
                "paperId": null,
                "singleId": 10,
                "singleQuestion": "<p>1</p>",
                "singleTestChoice": [
                  "<p>1</p>",
                  "<p>1</p>",
                  "<p>1</p>",
                  "<p>1</p>"
                ],
                "singleTestAnswer": "1",
                "knowledgeTest": "[\"知识点名称1\",\"zhi2\"]",
                "singlePoints": 2,
                "selectNum": null,
                "trueRate": null
              },
              {
                "testSingleId": 8,
                "paperId": null,
                "singleId": 11,
                "singleQuestion": "<p>1</p>",
                "singleTestChoice": [
                  "<p>1</p>",
                  "<p>1</p>",
                  "<p>1</p>",
                  "<p>1</p>"
                ],
                "singleTestAnswer": "2",
                "knowledgeTest": "[\"知识点名称1\",\"zhi2\"]",
                "singlePoints": 2,
                "selectNum": null,
                "trueRate": null
              },
              {
                "testSingleId": 9,
                "paperId": null,
                "singleId": 12,
                "singleQuestion": "驾驶人有下列哪种违法行为一次记6分",
                "singleTestChoice": [
                  "使用其他车辆行驶证",
                  "饮酒后驾驶机动车",
                  "车速超过规定时速50%以上",
                  "违法占用应急车道行驶"
                ],
                "singleTestAnswer": "3",
                "knowledgeTest": "[\"知识点名称1\",\"zhi2\"]",
                "singlePoints": 2,
                "selectNum": null,
                "trueRate": null
              },
              {
                "testSingleId": 10,
                "paperId": null,
                "singleId": 13,
                "singleQuestion": "驾驶人有下列哪种违法行为一次记6分",
                "singleTestChoice": [
                  "使用其他车辆行驶证",
                  "饮酒后驾驶机动车",
                  "车速超过规定时速50%以上",
                  "违法占用应急车道行驶"
                ],
                "singleTestAnswer": "3",
                "knowledgeTest": "[\"知识点名称1\",\"zhi2\"]",
                "singlePoints": 2,
                "selectNum": null,
                "trueRate": null
              },
              {
                "testSingleId": 11,
                "paperId": null,
                "singleId": 14,
                "singleQuestion": "<p>dfdfd</p>",
                "singleTestChoice": [
                  "<p>a</p>",
                  "<p>a</p>",
                  "<p>a</p>",
                  "<p>a</p>"
                ],
                "singleTestAnswer": "0",
                "knowledgeTest": "[\"知识点名称1\",\"zhi2\"]",
                "singlePoints": 2,
                "selectNum": null,
                "trueRate": null
              },
              {
                "testSingleId": 12,
                "paperId": null,
                "singleId": 15,
                "singleQuestion": "<p>q</p>",
                "singleTestChoice": [
                  "<p>q</p>",
                  "<p>q</p>",
                  "<p>q</p>",
                  "<p>q</p>"
                ],
                "singleTestAnswer": "2",
                "knowledgeTest": "[\"知识点名称1\",\"zhi2\"]",
                "singlePoints": 2,
                "selectNum": null,
                "trueRate": null
              },
              {
                "testSingleId": 13,
                "paperId": null,
                "singleId": 16,
                "singleQuestion": "<p>c</p>",
                "singleTestChoice": [
                  "<p>c</p>",
                  "<p>c</p>",
                  "<p>c</p>",
                  "<p>c</p>"
                ],
                "singleTestAnswer": "1",
                "knowledgeTest": "[\"知识点名称1\",\"zhi2\"]",
                "singlePoints": 2,
                "selectNum": null,
                "trueRate": null
              },
              {
                "testSingleId": 14,
                "paperId": null,
                "singleId": 17,
                "singleQuestion": "<p>c</p>",
                "singleTestChoice": [
                  "<p>c</p>",
                  "<p>c</p>",
                  "<p>c</p>",
                  "<p>c</p>"
                ],
                "singleTestAnswer": "3",
                "knowledgeTest": "[\"知识点名称1\",\"zhi2\"]",
                "singlePoints": 2,
                "selectNum": null,
                "trueRate": null
              },
              {
                "testSingleId": 15,
                "paperId": null,
                "singleId": 18,
                "singleQuestion": "驾驶人有下列哪种违法行为一次记6分",
                "singleTestChoice": [
                  "使用其他车辆行驶证",
                  "饮酒后驾驶机动车",
                  "车速超过规定时速50%以上",
                  "违法占用应急车道行驶"
                ],
                "singleTestAnswer": "3",
                "knowledgeTest": "[\"知识点名称1\",\"zhi2\"]",
                "singlePoints": 2,
                "selectNum": null,
                "trueRate": null
              }
            ],
            "testJudgeVos": []
          },
          "total": null,
          "attributes": null
        };
        var obj=_.cloneDeep(res.obj)
        this.setTotalPaperActions(obj);
        this.setAllPointActions();
        for(let i=0;i<obj.testSingleVos.length;i++){
          this.setPointActions({name:'singlePoints',index:i,points:obj.testSingleVos[i]['singlePoints']})
        }
        for(let i=0;i<obj.testMultipleVos.length;i++){
          this.setPointActions({name:'multiplePoints',index:i,points:obj.testMultipleVos[i]['multiplePoints']})
        }
        for(let i=0;i<obj.testJudgeVos.length;i++){
          this.setPointActions({name:'judgePoints',index:i,points:obj.testJudgeVos[i]['judgePoints']})
        }
        for(let i=0;i<obj.testBlankVos.length;i++){
          this.setPointActions({name:'blankPoints',index:i,points:obj.testBlankVos[i]['blankPoints']})
        }
        for(let i=0;i<obj.testQuestionVos.length;i++){
          this.setPointActions({name:'myPoints',index:i,points:obj.testQuestionVos[i]['myPoints']})
        }
        this.setActiveActions({active:2,source:'ChargePaper',alterFlag:true});
        this.$router.push({name:'TeacherAddPaper'});
     /*   if(this.selectCloumn[0].suggestState!='已审核') {
          var id = this.selectCloumn[0].id
          const params = {type: type, id: id};
            selectLibById(params).then(res=>{
            if(res.success==true){
              data=res.obj;
              this.setQuestActions({type: type, data: data})
              this.$router.push('/StudentAlterQ')
            }
          })
        }else{
          this.$message({
             type:'warning',
             message:'该题目已经提交审核'
          })
        }*/
      },
      handleDeleteQClick() {
      if(this.selectCloumn.length>0) {
          const id=this.getCloumnId();
          var params = {ids: id};
           delLib(params).then((res) =>{
            if(res.success==true){
              this.paramsChange();
              this.getTable();
              this.$message({
                type: 'info',
                message: "删除成功"
              });
            }else{
              this.$message({
                type: 'danger',
                message: "删除失败"
              });
            }
          })
      }else{
        this.$message({
          message: "请选择数据",
          type: 'warning'
        });
      }
    },
      handleExportQClick() {
        if(this.selectCloumn.length>0) {
          const id=this.getCloumnId();
          var params = {ids: id};
             exportData(params).then((res) => {
            if (res.success == true) {
              console.log(res);
              this.getTable();
              this.$message({
                type: 'info',
                message: "操作成功"
              });
            } else {
              this.$message({
                type: 'danger',
                message: "操作失败"
              });
            }
          })}else{
          this.$message({
            message: "请选择数据",
            type: 'warning'
          });
        }
      },
      onSearch(){
        this.getTable();
      },
      getTable(){
        const params=Object.assign({},this.defaultParams,this.form,{courseId:this.getId,paperState:'1'});
        this.tableData=[
          {passingScore:60,minutesLength:40,totalPoints:100,testTime:"2019-01-28T10:06:57.000+0000",courseId:2,paperState:'0',paperId:1,paperTitle:'试卷名称',createDate:'2019-01-28'},
          {passingScore:60,minutesLength:40,totalPoints:100,testTime:"2019-01-28T10:06:57.000+0000",courseId:2,paperState:'0',paperId:1,paperTitle:'试卷名称',createDate:'2019-01-28'},
          {passingScore:60,minutesLength:40,totalPoints:100,testTime:"2019-01-28T10:06:57.000+0000",courseId:2,paperState:'0',paperId:1,paperTitle:'试卷名称',createDate:'2019-01-28'},
          {passingScore:60,minutesLength:40,totalPoints:100,testTime:"2019-01-28T10:06:57.000+0000",courseId:2,paperState:'0',paperId:1,paperTitle:'试卷名称',createDate:'2019-01-28'},
          {passingScore:60,minutesLength:40,totalPoints:100,testTime:"2019-01-28T10:06:57.000+0000",courseId:2,paperState:'0',paperId:1,paperTitle:'试卷名称',createDate:'2019-01-28'},
          {passingScore:60,minutesLength:40,totalPoints:100,testTime:"2019-01-28T10:06:57.000+0000",courseId:2,paperState:'0',paperId:1,paperTitle:'试卷名称',createDate:'2019-01-28'},
          {passingScore:60,minutesLength:40,totalPoints:100,testTime:"2019-01-28T10:06:57.000+0000",courseId:2,paperState:'0',paperId:1,paperTitle:'试卷名称',createDate:'2019-01-28'},
          {passingScore:60,minutesLength:40,totalPoints:100,testTime:"2019-01-28T10:06:57.000+0000",courseId:2,paperState:'0',paperId:1,paperTitle:'试卷名称',createDate:'2019-01-28'},
          {passingScore:60,minutesLength:40,totalPoints:100,testTime:"2019-01-28T10:06:57.000+0000",courseId:2,paperState:'0',paperId:1,paperTitle:'试卷名称',createDate:'2019-01-28'},
          {passingScore:60,minutesLength:40,totalPoints:100,testTime:"2019-01-28T10:06:57.000+0000",courseId:2,paperState:'0',paperId:1,paperTitle:'试卷名称',createDate:'2019-01-28'},
          {passingScore:60,minutesLength:40,totalPoints:100,testTime:"2019-01-28T10:06:57.000+0000",courseId:2,paperState:'0',paperId:1,paperTitle:'试卷名称',createDate:'2019-01-28'},
          {passingScore:60,minutesLength:40,totalPoints:100,testTime:"2019-01-28T10:06:57.000+0000",courseId:2,paperState:'0',paperId:1,paperTitle:'试卷名称',createDate:'2019-01-28'},
        ],
        this.total=40;
        /*selectLib(params).then(res=>{
          if(res.success==true){
            this.tableData=res.data;
            this.total=res.total;
          }
        })*/
      },
      init(){
        this.table=tableConfig;
        this.ButtonGroup=btnConfig;
      },
    },
    beforeMount(){
      this.init();
      this.getTable();
    }
  }
</script>

<style scoped>
  .table{
    margin-top: 8px;
  }
</style>
