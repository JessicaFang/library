import vue from 'vue'
import vuex from 'vuex'
import global from './global'
import manager from './manager'
import createPersistedState from "vuex-persistedstate"
import resetPwd from './resetPwd'
vue.use(vuex);
const store=new vuex.Store({
  modules:{
    global,
    manager,
    resetPwd,
  },
  plugins:[createPersistedState({
    storage: window.sessionStorage
  })]
})
export default store;
