export default {
  // 1. state
  state:{
    /*  city:"城市名"*/
    params: {
      username: '',
      roleLevel: '',
    }

  },
  // // 2. getters
  getters:{
    // 参数列表state指的是state数据
    getParams(state){
      return state.params
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
    setParamsActions({commit,state}, params){
      // 跟后台打交道
      // 调用mutaions里面的方法
      commit("setParams", params);
    }
  },
  // 4. mutations
  mutations:{
    // state指的是state的数据
    setParams(state, params){
      state.params.username= params.username;
      state.params.roleLevel=params.roleLevel;
    }
  }
};
