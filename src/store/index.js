import vue from 'vue'
import vuex from 'vuex'
import * as getters from './getters.js'
import * as mutations from './mutations.js'
import * as actions from './actions.js'
import createPersistedState from "vuex-persistedstate"
// import * as store from './store.js'

vue.use(vuex)
// 如果在模块化构建系统中，请确保在开头调用了 Vue.use(Vuex)
const store = new vuex.Store({
	state:{
	    currentUser: '',
	    isLogin: '',
	    token: '',
	    purchaseInvestment: {},
	    userName: '',
	    userUuid: '',
	    loading: false,
	    loginToBack: 0,
	    headImage:''
	},
	mutations,
	actions,
	getters,
	plugins: [createPersistedState()]
})

export default (store)