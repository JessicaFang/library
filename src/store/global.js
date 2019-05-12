export default {
  // 1. state
  state:{
    /*  city:"城市名"*/
    params: {
      username: '',
      roleLevel: '',
    },
    login:{}

  },
  // // 2. getters
  getters:{
    // 参数列表state指的是state数据
    getParams(state){
      return state.params
    },
    getLogin(state){
      return state.login
    }
  },
  // 3. actions
  // 通常跟api接口打交道
  actions:{

    setParamsActions({commit,state}, params){
      // 跟后台打交道
      // 调用mutaions里面的方法
      commit("setParams", params);
    },
    setLoginActions({commit,state}, params){
      commit("setLogin", params);
    }
  },
  // 4. mutations
  mutations:{
    // state指的是state的数据
    setParams(state, params){
      state.params.username= params.username;
      state.params.roleLevel=params.roleLevel;
    },
    setLogin(state,params){
      state.login.token= params.token;
      state.login.url= params.url;
      console.log(params.token);
      localStorage.setItem('token',params.token);
    }
  }
};
