<template>
  <div>
    <div class="title">题目</div>
    <editor-bar v-model="questionForm.blankQuestion" @htmlChange="val=>change(val,'blankQuestion')"></editor-bar>
    <div class="blank">填空</div>
    <!--渲染时候的更新问题，v-for的时候数据得到更新，但是questioForm.option进行变化而v-for没有渲染，是得不到数据的-->
    <div  class="blankFill" v-for="(item,index) in list">
      <span>{{index+1}}、</span>
      <div class="blankDiv">
        <el-tag
          class="tag"
          :key="tag"
          v-for="(tag,indexTag) in questionForm.blankAnswer[index]"
          closable
          @close="handleClose(index,indexTag)">
          {{tag}}
        </el-tag>
        <el-input  placeholder="请输入填空内容" class="content"  v-model="blankInput[index]" @keyup.enter.native="havePress(index)"></el-input>
      </div>
      <el-button v-show="index>0"  @click="deleteBlank(index)" icon="el-icon-close"></el-button>
    </div>
    <div class="addBlank"><el-button type="primary"  @click="addBlank">增加一个填空</el-button></div>
    <div class="bottom">
      <el-button class="button" type="primary" @click="onSubmit">提交</el-button>
    </div>
  </div>
</template>
<!--提交的时候查看blankInput有没有数值，有则复制给question.options-->
<script>
  import { validate } from '@/util/validate'
  import editorBar from '@/components/editor/editorBar'
  import { mapGetters } from 'vuex'
  export default {
    name: "index",
    data() {
      return {
        questionForm: {
          blankQuestion: '',
          blankAnswer: [[]],
        },
        list: 1,
        blankInput: [],
      }
    },
    components: {
      editorBar
    },
    computed: {
      ...mapGetters(['getQuestMes'])
    },
    props:{
      questionMes:{
        type:Object,
        default:function () {
          return {};
        },
      }
    },
    methods: {
      change(val, type) {
        this.questionForm[type] = val;
      },
      check() {
        var message = '';
        if (this.validate(this.questionForm.blankQuestion)) {
          for (var i = 0; i < this.list; i++) {
            if(this.questionForm.blankAnswer[i]&&this.questionForm.blankAnswer[i].length==0){
              message = "请进行选项的填写";
              return message;
            }
          }
        } else {
          message = "请进行题目的填写";
          return message;
        }
        return message
      },
      addBlank() {
        if (this.list > 5) {
          this.$message({
            message: "最多只能添加6条空格",
            type: 'warning'
          });
        } else {
          this.list++;
          this.blankInput[this.list-1]='';
          var  temp=this.questionForm.blankAnswer;
          temp.push([]);
          this.$set(this.questionForm,'blankAnswer',temp)
        }
      },
      deleteBlank(index) {
        this.blankInput.splice(index,1);
        var  temp=this.questionForm.blankAnswer;
        temp.splice(index, 1);
        this.$set(this.questionForm,'blankAnswer',temp);
        this.$nextTick(() => {
          this.list--;
        })
      },
      blankCheck() {
        this.blankInput.forEach((item, index) => {
          if (item != undefined && item.trim() != '') {
            this.questionForm.blankAnswer[index][0] = item;
          }
        })
      },
      havePress(index) {
        const blank = this.blankInput[index];
        if (blank != undefined && blank.trim() != '') {
          this.questionForm.blankAnswer[index].push(blank);
          this.blankInput[index] = '';
        }
      },
      handleClose(index, tagIndex) {
        this.questionForm.blankAnswer[index].splice(tagIndex, 1);
      },
      validate(message) {
        if (message.trim()!= '') {
          return true;
        } else {
          return false;
        }
      },
      onSubmit() {
        this.blankCheck();
        var message = this.check();
        if (message.length != 0) {
          this.$message({
            message: message,
            type: 'warning',
          })
        }else{
          const form=_.cloneDeep(this.questionForm);
          this.$emit('submit',form)
        }
      },
    },
    beforeMount(){
      const data=this.questionMes;
      if(data!=undefined&&Object.keys(data).length!=0){
        this.questionForm.blankQuestion=data.blankQuestion;
        this.questionForm.blankAnswer=data.blankAnswer;
        this.list=data.blankAnswer.length;
      }else{
        this.validate=validate;
      }
    }
  }


</script>

<style scoped lang="scss">

  .blankDiv{
    border: 1px solid #dcdfe6;
    margin-bottom: 10px;
    margin-right: 10px;
    width: calc(100% - 92px);
    min-height: 50px;
  }
  .tag{
    margin-top: 5px;
  }
  .title,.blank{
    width: 60px;
    background: #409EFF;
    margin: 15px 2px 10px 2px;
    text-align: center;
    color: white;
    border-radius: 2px;
    height: 20px;
    padding:5px 0px;
  }
  .blank{
    margin-top: 30px;

  }
  .content {
    /deep/ .el-input__inner {
      border: 1px solid transparent;
      padding: 0px;
    }
  }
  .blankFill{
    display: flex;
    align-items:center;
  }
  .addBlank{
    text-align: center;
    margin: 35px 0;
  }
  .addBlank{
    margin: 20px 0 0 0;
  }
  .button{
    width: 100%;
  }
  .bottom{
    text-align: center;
    width: 100%;
    margin: 10px 0px;
  }


</style>
