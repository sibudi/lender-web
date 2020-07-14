import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
	// mode: 'history',
  	routes: [{
			name: "首页",
			path: "/",
			// component:resolve => require(['../pages/student/studentApply.vue'],resolve),
			component:resolve => require(['../pages/Home.vue'],resolve),
			meta: {
		        auth: false
		    }
		},{
			name: "login",
			path: "/login",
			component:resolve => require(['../pages/login/Login.vue'],resolve),
			meta: {
		        auth: false
		    }
		},{
			name: "实名认证",
			path: "/authentication",
			component:resolve => require(['../pages/trust/Authentication.vue'],resolve),
			meta: {
		        auth: true
		    }	
		},{
			name: "散标列表",
			path: "/Scattered",
			component:resolve => require(['../pages/financial/ScatteredList.vue'],resolve),
			meta: {
		        auth: true
		    }	
		},{
			name: "散标详情",
			path: "/ScatteredDetail",
			component:resolve => require(['../pages/financial/ScatteredDetail.vue'],resolve),
			meta: {
		        auth: true
		    }	
		},{
			name: "历史借款记录",
			path: "/HistoryDetail",
			component:resolve => require(['../pages/financial/HistoryDetail.vue'],resolve),
			meta: {
		        auth: true
		    }	
		},
		// {
		// 	name: "购物车",
		// 	path: "/cart",
		// 	component:resolve => require(['../pages/cart/Cart.vue'],resolve),
		// 	meta: {
		//         auth: true,
		//         noFooter:true
		//     }	
		// },{
		// 	name: "支付",
		// 	path: "/pay",
		// 	component:resolve => require(['../pages/cart/Pay.vue'],resolve),
		// 	meta: {
		//         auth: true,
		//         noFooter:true
		//     }	
		// },
		{
			name: "cart",
			path: "/cart",
			component:resolve => require(['../pages/cart/cart.vue'],resolve),
			meta: {
		        auth: true,
		        noFooter:true
		    }	
		}
		,{
	  	name: "查看债权",
	    path: '/rights',
	   	component:resolve => require(['../pages/center/CreditorRights.vue'],resolve),
	  },{
	  	name: "债权详细信息",
	    path: '/rightsdetail',
	   	component:resolve => require(['../pages/center/CreditorDetail.vue'],resolve),
	  },{
    	name: "新消息通知",
      path: '/message',
     	component:resolve => require(['../pages/center/Message.vue'],resolve),
    },{
    	name: "个人中心历史借款",
      path: '/history',
     	component:resolve => require(['../pages/center/History.vue'],resolve),
    },{
			name: "个人中心",
			path: "/center",
			redirect: "/center/setting",
			component:resolve => require(['../pages/center/Center.vue'],resolve),
			meta: {
		        auth: false
		   },
		   children:[
		     {
		     		name: "基本配置",
		        path: 'setting',
		       	component:resolve => require(['../pages/center/BasicSetting.vue'],resolve),
		      },
		      {
		      	name: "我的资产",
		        path: 'assets',
		       	component:resolve => require(['../pages/center/AssetsDetail.vue'],resolve),
		      },
		      {
		      	name: "购买记录",
		        path: 'records',
		       	component:resolve => require(['../pages/center/Records.vue'],resolve),
		      },
		      {
		      	name: "重置密码",
		        path: 'reset',
		       	component:resolve => require(['../pages/center/ResetPassword.vue'],resolve),
		      },
		      {
		      	name: "提现",
		        path: 'withdrawal',
		       	component:resolve => require(['../pages/center/WithDrawal.vue'],resolve),
		      },
		   ]	
		},{
			name: "购买债券",
			path: "/purchaseInvestment",
			component:resolve => require(['../pages/purchaseInvestment.vue'],resolve),
			meta: {
		        auth: false
		    }
		},{
			name: "绑定银行卡",
			path: "/bindCard",
			component:resolve => require(['../pages/bindCard.vue'],resolve),
			meta: {
		        auth: false
		    }	
		},{
			name: "投资",
			path: "/investment",
			component:resolve => require(['../pages/investment.vue'],resolve),
			meta: {
		        auth: false
		    }
	 	},{
			name: "投资记录",
			path: "/investRecord",
			component:resolve => require(['../pages/user/userparts/InvestRecord.vue'],resolve),
			meta: {
		        auth: false
		    }
		},{
			name: "借款介绍",
			path: "/borrowintro",
			component:resolve => require(['../pages/BorrowIntro.vue'],resolve)
		},
		// {
		// 	name: "个人中心",
		// 	path: "/me",
		// 	component:resolve => require(['../pages/user/Me.vue'],resolve),
		// 		meta: {
		//         auth: false
		//     }
		// },
		{
			name: "债权",
			path: "/debt",
			component:resolve => require(['../pages/user/Debt.vue'],resolve),
				meta: {
		        auth: false
		    }
		},{
			name: "债权详情",
			path: "/debtdetail",
			component:resolve => require(['../pages/user/DebtDetail.vue'],resolve),
				meta: {
		        auth: false
		    }
		},{
			name: 'faq',
		    path:'/faq',
		    component:resolve => require(['../pages/faq.vue'], resolve),
			meta: {
		        auth: false
		    }
		},{
			name: 'recruit',
		    path:'/recruit',
		    component:resolve => require(['../pages/recruit.vue'], resolve),
			meta: {
		        auth: false
		    }
		},{
			name: 'joinus',
		    path:'/joinus',
		    component:resolve => require(['../pages/joinus.vue'], resolve),
			meta: {
		        auth: false
		    }
		},{
			name: 'aboutUs',
		    path:'/aboutUs',
		    component:resolve => require(['../pages/aboutUs.vue'], resolve),
			meta: {
		        auth: false
		    }
		},{
			name: 'BorrowIntro',
		    path:'/BorrowIntro',
		    component:resolve => require(['../pages/BorrowIntro.vue'], resolve),
			meta: {
		        auth: false
		    }
		},{
			name: 'studentApply',
		    path:'/studentApply',
		    component:resolve => require(['../pages/student/studentApply.vue'], resolve),
			meta: {
		        auth: false
		    }
		},{
			name: 'studentApply1',
		    path:'/studentApply1',
		    component:resolve => require(['../pages/student/studentApply1.vue'], resolve),
			meta: {
		        auth: false
		    }
		},{
			name: 'studentApply2',
		    path:'/studentApply2',
		    component:resolve => require(['../pages/student/studentApply2.vue'], resolve),
			meta: {
		        auth: false
		    }
		},{
			name: 'studentApply3',
		    path:'/studentApply3',
		    component:resolve => require(['../pages/student/studentApply3.vue'], resolve),
			meta: {
		        auth: false
		    }
		},{
			name: 'studentApply4',
		    path:'/studentApply4',
		    component:resolve => require(['../pages/student/studentApply4.vue'], resolve),
			meta: {
		        auth: false
		    }
		},{			
			name: 'complaint',
		    path:'/complaint',
		    component:resolve => require(['../pages/complaint.vue'], resolve),
			meta: {
		        auth: false
		    }		
		},{			
			name: 'guaranteeProtacol',
		    path:'/guaranteeProtacol',
		    component:resolve => require(['../pages/agreement/guaranteeProtacol.vue'], resolve),
			meta: {
		        auth: false
		    }
		},{			
			name: 'blogItem1',
		    path:'/blogItem1',
		    component:resolve => require(['../pages/blog/blogItem1.vue'], resolve),
			meta: {
		        auth: false
		    }
		},{			
			name: 'blogList',
		    path:'/blogList',
		    component:resolve => require(['../pages/blog/blogList.vue'], resolve),
			meta: {
		        auth: false
		    }
		},{
			name: 'purchaseFixed',
		    path:'/purchaseFixed',
		    component:resolve => require(['../pages/purchaseFixed.vue'], resolve),
			meta: {
		        auth: false
		    }
		},{
			name: '404',
		    path:'/404',
		    component:resolve => require(['../pages/404.vue'], resolve),
			meta: {
		        auth: false
		    }
		},{
		  path:'*',
		  redirect:{path:'/404'}
	}]
})
