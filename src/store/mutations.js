export const userStatus=(state,user)=>{
	if(user){
		state.currentUser=user;
		state.isLogin=true;
	}else{
		// sessionStorage.setItem("userName",null);
		// sessionStorage.setItem("userToken",'');
		state.currentUser=null;
		state.isLogin=false;
		state.token="";
	}
}
export const tokenStatus=(state,token)=>{
	state.token=token;
	// sessionStorage.setItem("userToken",token);
}
export const loginStatus=(state,isLogin)=>{
	state.isLogin=isLogin;
	// sessionStorage.setItem("userToken",isLogin);
}
export const loading=(state,loading)=>{
	state.loading=loading;
}
export const purchaseInvestment=(state,purchaseInvestment)=>{
	state.purchaseInvestment=purchaseInvestment;
}
export const setUserName=(state,userName)=>{
	state.userName=userName;
}
export const setUserUuid=(state,userUuid)=>{
	state.userUuid=userUuid;
}
export const loginToBack=(state,loginToBack)=>{
	state.loginToBack=loginToBack;
}
export const setHeadImage=(state,headImage)=>{
	state.headImage = headImage;
}