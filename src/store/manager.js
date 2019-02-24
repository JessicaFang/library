export default {
  // 1. state
  state:{
    /*  city:"城市名"*/
   courseId:'',
   questionMessage:{},

  },
  // // 2. getters
  getters:{
    // 参数列表state指的是state数据
    getId(state){
      return state.courseId;
    },
    getQuestMes(state){
      return state.questionMessage;
    }
  },
  // 3. actions
  // 通常跟api接口打交道
  actions:{
    // 设置城市信息
    // 参数列表：{commit, state}
    // state指的是state数据
    // commit调用mutations的方法
    // name就是调用此方法时要传的参数
    seIdActions({commit,state}, id){
      // 跟后台打交道
      // 调用mutaions里面的方法
      commit("setId",id );
    } ,
    setQuestActions({commit,state}, Mes){
      // 跟后台打交道
      // 调用mutaions里面的方法
      commit("setQuestion",Mes );
    }
  },
  // 4. mutations
  mutations:{
    // state指的是state的数据
    setId(state, id){
      state.courseId= id;
    },
    setQuestion(state, Mes){
      state.questionMessage=Mes;
    }
  }
};
