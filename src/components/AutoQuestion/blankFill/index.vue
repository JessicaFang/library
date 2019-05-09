<template>
  <div>
    <el-card v-for="(item,index1) in list" :key="index1">
      <div class="content">
        <div class="title"><span>{{index1+1}}、题目</span></div>
        <div v-html="item.blankQuestion"></div>
        <div class="blank">答案</div>
        <div v-for="(answer,index2) in item.blankAnswer" :key="index2" class="answer">
          <span>{{index2+1}}、</span><!--
          --><span v-for="(i,index3) in answer" :key="index3">{{i}}<span v-show="index3<answer.length-1">&nbsp;||&nbsp;</span></span>
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
  import {mapGetters,mapActions} from 'vuex'
  export default {
    name: "index",
    data(){
      return {
        list:[],
        pointList:[]
      }
    },
    computed: {
      ...mapGetters(['getQuestMes','getPaper','getPoint']),
      blank(){
        return this.getPaper['testBlankVos'];
      },
      points(){
        return this.getPoint['blankPoints'];
      }
    },
    watch:{
      blank:{
        handler:function () {
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
      init(){
        const blankState=this.getPaper['testBlankVos'];
        this.list=[];
        if(blankState&&blankState.length!=0) {
          blankState.forEach((item, index) => {
            this.$set(this.list,index,item)
          })
        }
        this.pointList=this.getPoint['blankPoints'];
      },
      edit(index){
        const data=this.getPaper['testBlankVos'][index];
        this.setQuestActions({type:'4',data:data,index:index});
        this.$router.push({name:'TeacherEditPaper'});
      },
      del(index){
        this.delPaperActions({name:'testBlankVos',index:index})
        this.delPointActions({name:'blankPoints',index:index})
      },
      inputGrade(index){
        var points=this.pointList[index];
        this.setPointActions({name:'blankPoints',index:index,points:points})
        this.alterPaperPointActions({name:'testBlankVos',index:index,pointName:'blankPoints',points:points})
      }
    },
    beforeMount(){
      this.init();
    }
  }


</script>

<style scoped lang="scss">
  .title {
    margin: 0px 0px 10px 0px;
    height: 20px;
  }
  .title span{
    font-weight:bold;
    /*color: white;*/
    border-radius: 2px;
    line-height:20px;
    /*background:#409EFF;*/
    /*padding:6px 6px;*/
  }
   .blank{
     font-weight:bold;

     width: 40px;
    /*background: #409EFF;*/
    margin: 0px 0px 10px 0px;
    text-align: left;
    /*color: white;*/
    border-radius: 2px;
    height: 20px;
    /*padding:5px 0px;*/
  }
  .blank{
    margin-top: 10px;
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
