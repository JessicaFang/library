export default {
  // 1. state
  state:{
    point: {
      'singlePoints':[],
      'multiplePoints':[],
      'judgePoints':[],
      'blankPoints':[],
      'myPoints':[],
    },
  },
  // // 2. getters
  getters:{
    getPoint(state){
      return state.point;
    },
  },
  actions:{
    setAllPointActions({commit,state},params){
      commit('setAllPoint',params);
    },
    setPointActions({commit,state},params){
      commit('setPoint',params);
    },
    delPointActions({commit,state},params){
      commit('delPoint',params);
    },
  },
  // 4. mutations
  mutations:{
    setPoint(state,params){
       state.point[params.name][params.index]=params.points;
    },
    setAllPoint(state,params){
      for(var key in state.point){
         state.point[key]=[];
      }
    },
    delPoint(state,params){
      console.log(state.point[params.name]);
      state.point[params.name].splice(params.index,1);
    }
  }
};
