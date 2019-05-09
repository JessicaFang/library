export function reset(type,question) {
    switch (type){
      case '1':
        question.questionForm={
          singleQuestion:'',
            options:[],
            trueIndex:''
        };
        break;
      case '2':
        question.questionForm={
          multipleQuestion:'',
            options:[],
            trueIndex:[],
        };
        break;
      case  '3':
        question.questionForm={
          judgeQuestion:'',
          judgeAnswer:''
        };
        question.choice=['',''];
        break;
      case '4':
        question.questionForm={
          blankQuestion: '',
          blankAnswer: [[]],
        };
        question.list=1;
        question.blankInput= [];
        break;
      case  '5':
        question.questionForm={
          myQuestion:'',
            myAnswer:'',
            detailReviewRules:''
        };
        break;
  }
}
