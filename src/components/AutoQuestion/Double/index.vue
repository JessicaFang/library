<template>
  <div>
    <el-card  v-for="(item,index1) in list" :key="index1">
      <div class="content">
        <div class="title"><span>{{index1+1}}、题目</span></div>
        <div v-html="item.multipleQuestion"></div>
        <div class="double">答案</div>
        <div v-for="(opt,index2) in item.options" :key="index2" class="answers">
          <input disabled v-model="item.trueIndex" type="checkbox" :value="index2" />
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
    data() {
      return {
        list:[],
        pointList:[],
      }
    },
    props:['point'],
    computed: {
      ...mapGetters(['getQuestMes','getPaper','getPoint']),
      double(){
        return this.getPaper['testMultipleVos'];
      },
      points(){
        return this.getPoint['multiplePoints'];
      }
    },
    watch:{
      double:{
        handler:function (newVal,OldVal) {
          this.init();
        },
        deep:true,
      },
      points:{
        handler(){
          this.init();
        },
        deep:true,
      }
    },
    methods:{
      ...mapActions( // 语法糖
        ['setPaperActions','setQuestActions','setPointActions','delPaperActions','delPointActions','alterPaperPointActions']
      ),
      translate(index){
        const list=['A、','B、','C、','D、'];
        return list[index];
      },
      init(obj){
        const multipleState=this.getPaper['testMultipleVos'];
        this.list=[];
        if(multipleState&&multipleState.length!=0) {
          multipleState.forEach((item, index) => {
            var obj = {
              'multipleQuestion': item.multipleQuestion,
              'options': item.multipleTestChoice,
              'trueIndex': item.multipleTestAnswer,
              'knowledgeTitle': item.knowledgeTitle,
              'difficultLevel': item.difficultLevel,
              'multiplePoints':item.multiplePoints,
            };
            this.$set(this.list,index,obj)
          })
        };
        this.pointList=this.getPoint['multiplePoints'];
        //console.log(this.pointList)
      },
      edit(index){
        const data=this.getPaper['testMultipleVos'][index];
        this.setQuestActions({type:'2',data:data,index:index});
        this.$router.push({name:'TeacherEditPaper'});
      },
      del(index){
        this.delPaperActions({name:'testMultipleVos',index:index})
        this.delPointActions({name:'multiplePoints',index:index})
      },
      inputGrade(index){
        var points=this.pointList[index];
        this.setPointActions({name:'multiplePoints',index:index,points:points})
        this.alterPaperPointActions({name:'testMultipleVos',index:index,pointName:'multiplePoints',points:points})

      }
    },
    beforeMount(){
      this.init();

    }
  }



</script>

<style scoped lang="scss">
  .answers{
    display: flex;
    align-items: center;
    margin: 8px 0;
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
  .double,.error{
    width: 60px;
    background: #409EFF;
    margin: 0px 0px 10px 0px;
    text-align: center;
    color: white;
    border-radius: 2px;
    height: 20px;
    padding:5px 0px;
  }
  .double{
    margin-top: 10px;
  }
  .error{
    width: 100px;
    background: #F56C6C;
    margin-top: 10px;
  }
  .content{
    display: inline-block;
    width: 85%;
    vertical-align: top;
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
