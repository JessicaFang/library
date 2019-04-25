import vue from 'vue'
import vuex from 'vuex'
import global from './global'
import manager from './manager'
import paper from './paper'
import points from './points'
import exam from './exam'
import createPersistedState from "vuex-persistedstate"
vue.use(vuex);
const store=new vuex.Store({
  modules:{
    global,
    manager,
    paper,
    points,
    exam
  },
  plugins:[createPersistedState({
    storage: window.sessionStorage,
    reducer(val) {
      return {
        // 只储存state中的user
        global: val.global,
        exam:val.exam
      }
    }
  })]
})
export default store;
