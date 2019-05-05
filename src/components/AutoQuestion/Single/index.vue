<template>
  <div>
    <el-card v-for="(item,index1) in list" :key="index1">
      <div class="content">
        <div class="title"><span>{{index1+1}}、题目</span></div>
        <div v-html="item.singleQuestion"></div>
        <div class="single">答案</div>
        <div v-for="(opt,index2) in item.options" :key="index2" class="answers">
          <el-radio v-model="item.trueIndex" disabled  :label="index2"></el-radio>
          <span v-text="translate(index2)"></span><div v-html="opt"></div>
        </div>
      </div>
      <div class="grade">
        分数：
        <div class="inputGrade">
          <el-input  v-model="pointList[index1]" @input="inputGrade(index1)"></el-input>
        </div>
      </div>
      <div class="side">
        <ul>
          <li><el-button @click="edit(index1)">编辑</el-button></li>
          <li><el-button @click="del(index1)">删除</el-button></li>
        </ul>
      </div>
    </el-card>
  </div>
</template>

<script>
  import { mapActions,mapGetters } from 'vuex'
  export default {
    name: "index",
    data(){
      return{
        list:[],
        pointList:[],
      }
    },
    computed: {
      ...mapGetters(['getQuestMes','getPaper','getPoint']),
      single(){
        return this.getPaper['testSingleVos'];
      },
      singlePoints(){
        return this.getPoint['singlePoints'];
      }
    },
    watch:{
      single:{
        handler:function (newVal,OldVal) {
          console.log('adfdfd')
          this.init();
        },
        deep:true,
        immediate:true,
      },
      singlePoints :{
        handler(){
          this.init();
        },
        deep:true,
      },
    },
    methods:{
      ...mapActions( // 语法糖
        ['setPaperActions','setQuestActions','delPaperActions','alterPaperPointActions','delPointActions','setPointActions',]
      ),
      init(){
        const singleState=this.getPaper['testSingleVos'];
        console.log(singleState);
        this.list=[];
        if(singleState&&singleState.length!=0) {
          singleState.forEach((item, index) => {
            var obj = {
              'singleQuestion': item.singleQuestion,
              'options': item.singleTestChoice,
              'trueIndex': parseInt(item.singleTestAnswer),
              'knowledgeTitle': item.knowledgeTitle,
              'difficultLevel': item.difficultLevel,
              'singlePoints': item.singlePoints,
            };
            this.$set(this.list,index,obj)
            console.log(this.list);
          })
          this.pointList=this.getPoint['singlePoints'];
        }
      },
      translate(index){
        const list=['A、','B、','C、','D、'];
        return list[index];
      },
      edit(index){
        const data=this.getPaper['testSingleVos'][index];
        this.setQuestActions({type:'1',data:data,index:index});
        this.$router.push({name:'TeacherEditPaper'});
      },
      del(index){
        this.delPaperActions({name:'testSingleVos',index:index});
        this.delPointActions({name:'singlePoints',index:index});
      },
      inputGrade(index){
        var points=this.pointList[index];
        this.setPointActions({name:'singlePoints',index:index,points:points})
       this.alterPaperPointActions({name:'testSingleVos',index:index,pointName:'singlePoints',points:points})
      }
    },
    beforeMount(){
      this.init();
    }
  }


</script>

<style scoped lang="scss">
  /deep/ .el-radio__label{
    display: none;
  }
  /deep/ .el-radio__input.is-disabled.is-checked .el-radio__inner::after{
    background:#409EFF;
  }
  .title {
    margin: 0px 0px 10px 0px;
    height: 20px;
  }
  .title span{
    color: white;
    border-radius: 2px;
    line-height:20px;
    background:#409EFF;
    padding:6px 6px;
  }
   .single,.error{
    width: 60px;
    background: #409EFF;
    margin: 0px 0px 10px 0px;
    text-align: center;
    color: white;
    border-radius: 2px;
    height: 20px;
    padding:5px 0px;
  }
  .error{
    width: 100px;
    background: #F56C6C;
    margin-top: 10px;
  }
  .single{
    margin-top: 10px;
  }
  .answers{
    display: flex;
    align-items: center;
    margin: 8px 0;
  }
  .content{
    display: inline-block;
    width: 60%;
    vertical-align: top;
  }
  .grade{
    display: inline-block;
    width: 17%;
    margin-top: 11%;
    padding-left:15px;
  }
  .inputGrade{
    display: inline-block;
    width: 50%;
  }
  .side{
    display: inline-block;
    width: 18%;
    vertical-align: top;
    ul{
      list-style-type: none;
      li{
        margin-top: 5px;
        float: right;
      }
    }
  }
</style>
