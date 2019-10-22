export const setUser=({commit},user)=>{
	commit("userStatus",user)
}
export const setToken=({commit},token)=>{
	commit("tokenStatus",token)
}
export const setLogin=({commit},isLogin)=>{
	commit("loginStatus",isLogin)
}
export const hideLoading=({commit})=>{
	commit("loading",false)
}
export const showLoading=({commit})=>{
	commit("loading",true)
}
export const setPurchaseInvestment=({commit},Investment)=>{
	commit("purchaseInvestment",Investment)
}
export const setUserUuid=({commit},userUuid)=>{
	commit("setUserUuid",userUuid)
}
export const setUserName=({commit},userName)=>{
	commit("setUserName",userName)
}
export const loginToBack=({commit},loginToBack)=>{
	commit("loginToBack",loginToBack)
}
export const setHeadImage=({commit},headImage)=>{
	commit("setHeadImage",headImage)
}
