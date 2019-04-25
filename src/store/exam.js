export default {
  // 1. state
  state:{
    exam: {},
    isManual:false,
    paperState:0,
    paperId:0,
  },
  // // 2. getters
  getters:{
    getExam(state){
      return state.exam
    },
    getIsManual(state){
      return state.isManual
    },
    getPaperState(state){
      return state.paperState
    },
    getPaperId(state){
      return state.paperId
    }
  },
  actions:{
    setExamActions({commit,state}, params){
      commit("setExam", params);
    },
    setManualActions({commit,state}, params){
      commit("setManual", params);
    },
    setPaperStateActions({commit,state}, params){
      commit("setPaperState", params);
    },
    setPaperIdActions({commit,state}, params){
      commit("setPaperId", params);
    },
  },
  // 4. mutations
  mutations:{
    setExam(state, params){
      state.exam= params;
    },
    setManual(state, params){
      state.isManual= params.flag;
    },
    setPaperState(state, params){
      state.paperState= params.paperState;
    },
    setPaperId(state, params){
      state.paperId= params.paperId;
    },
  }
};
