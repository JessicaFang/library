export default {
  // 1. state
  state:{
    paper: {
      'testPaper':{},
      'testSingleVos':[],
      'testMultipleVos':[],
      'testJudgeVos':[],
      'testBlankVos':[],
      'testQuestionVos':[],
    },
    myActive:{active:1,source:''},
    flag:true,
  },
  // // 2. getters
  getters:{
    // 参数列表state指的是state数据
    getPaper(state){
      return state.paper
    },
    getActive(state){
      return state.myActive
    },
  },
  actions:{
    // 设置城市信息
    // 参数列表：{commit, state}
    // state指的是state数据
    // commit调用mutations的方法
    // name就是调用此方法时要传的参数
    setTotalPaperActions({commit,state}, params){
      commit("setTotalPaper", params);
    },
    setPaperActions({commit,state}, params){
      commit("setPaper", params);
    },
    setActiveActions({commit,state},params){
      commit('setActive',params);
    },
    delPaperActions({commit,state},params){
      commit('delPaper',params);
    },
    alterPaperPointActions({commit,state},params){
      commit('alterPaperPoint',params);
    },
  },
  // 4. mutations
  mutations:{
    alterPaperPoint(state,params){
       state.paper[params.name][params.index][params.pointName]=params.points;
    },
    delPaper(state,params){
       state.paper[params.name].splice(params.index,1);
    },
    setPaper(state, params){
        if(params.flag) {
          state.paper[params.name][params.subName] = params.value;
        }else{
          state.paper[params.name] = params.value;
        }
    },
    setTotalPaper(state, params){
          state.paper= params;
    },
    setActive(state,params){
      if(state.flag==false){
        state.flag=true;
        return;
      }else {
        state.myActive.active = params.active;
        state.myActive.source=params.source
        if (params.alterFlag) {
          state.flag = false;
        }
      }
    }
  }
};
