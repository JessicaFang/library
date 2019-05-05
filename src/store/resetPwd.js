export default {
  // 1. state
  state:{
    resetForm: {},
  },
  // // 2. getters
  getters:{
    getResetForm(state){
      return state.resetForm
    },
  },
  // 3. actions
  // 通常跟api接口打交道
  actions:{
    setResetFormAction({commit,state}, params){
      commit("resetForm", params);
    },
    setResetFormClearAction({commit,state}, params){
      commit("resetFormClear", params);
    },
  },
  // 4. mutations
  mutations:{
    resetForm(state, params){
      state.resetForm[params.key]= params.value;
    },
    resetFormClear(state, params){
      state.resetForm={};
    },
  }
};
