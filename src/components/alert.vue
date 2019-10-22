<template>
	<div id="loading">
		<div id="masks">
			<div id="alertTitle">{{alertData.title}}</div>
			<div id="alertContent">{{alertData.alertContent}}</div>
			<div id="alertBtn">
				<div id="alertBtn1" @click="aBtn1">{{alertData.alertBtn1}}</div>
				<div id="alertBtn2" @click="aBtn2" v-show="alertData.alertBtn2">{{alertData.alertBtn2}}</div>
			
			</div>
		</div>
	</div>
</template>
<script>
	
	export default {
		props: ["alertData"],
		name: 'alert',
		data(){
			return {

			}
		},

		methods: {
			loading(){

			},
			aBtn1(){
				
			},
			aBtn2(){
				this.$emit("father","false");
			}
		},
		mounted(){
			this.loading();
		}
	}
</script>
<style>
	#loading {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		margin: 0;
		background-color: rgba(0,0,0,.4);
		overflow: hidden;
		z-index: 100;
		overflow-y:hidden;
	}
	#masks {
		width: 300px;
		/*height: 200px;*/
		position: absolute;
		left: 50%;
		top: 30%;
		margin-left: -150px;
		background-color: pink;
		text-align: center;
		padding: 20px;
		border-radius: 10px;
	}
	#alertTitle {
		margin: 0 auto;
		width: 100%;
		height: 40px;
		line-height: 40px;
		text-align: center;
		font-size: 18px;
	}
	#alertContent {
		padding: 20px;
	}
	#alertBtn {
		height: 40px;
		display: flex;
	}
	#alertBtn>div {
		flex: 1;
		float: left;
	}
</style>