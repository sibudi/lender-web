<template>
	<div id="investmentBody">

        <div id="contents">
            <a href="javascript :history.back(-1)" id="topBack"><img src="../assets/img/iconGoBack.png" alt=""><span>Kembali ke halaman sebelumnya</span></a>
            <div id="topLists">
                <div class="topList Finance" @click="checkRecuit(0)" data-title="Finance"><img src="../assets/img/iconFinance.png" alt=""><span>Finance</span></div>
                <div class="topList Marketing" @click="checkRecuit(1)" data-title="Marketing"><img src="../assets/img/iconMarketing.png" alt=""><span>Marketing</span></div>
                <div class="topList Collection" @click="checkRecuit(2)" data-title="Collection"><img src="../assets/img/iconCollection.png" alt=""><span>Collection</span></div>
                <div class="topList Risk" @click="checkRecuit(3)" data-title="Risk"><img src="../assets/img/iconRisk.png" alt=""><span>Risk</span></div>
                <div class="topList HR" @click="checkRecuit(4)" data-title="HR"><img src="../assets/img/iconHr.png" alt=""><span>HR & Legal</span></div>
                <div class="topList IT" @click="checkRecuit(5)" data-title="IT"><img src="../assets/img/iconIt.png" alt=""><span>IT</span></div>
            </div>
            <div class="showContents">

            </div>
        </div>
		
		<div class="showContent" v-for="item in hrJsonData" :key="item.names">
			<div class="contentTitle" v-show="isShowItem!=item.names" :class="item.names">
				<div class="accounting">{{item.names}}</div>
				<div class="showContentTitle">{{hrJsonTitle}}</div>
				<div class="showMeNow" @click="showContent(item.names)"><img src="../assets/img/showMe.png"alt=""></div>
			</div>
			<div v-show="isShowItem==item.names" :class="item.names">
				<div class="showMeContent">
					<div class="accounting">{{item.names}}</div>
					<div class="showContentTitle">{{hrJsonTitle}}</div>
					<div class="showMeNow"><img @click="showContent()" src="../assets/img/showMeCover.png"alt=""></div>
				</div>
				<div class="mainContent" v-html="item.datas"></div>
				<div class="contentBtn" @click="submitReruit()">Segera ajukan permohonan</div>
			</div>
		</div>
</div>
</template>

<script>
	// hr.json.js
	import hrJson from '../assets/js/hr.json.js'
	export default {
		data(){
			return{
				isShow: false,
				isShowItem: '',
				hrJsonTitle: '',
				hrJsonData: [],
				fromUrl:0,
			}
		},
		methods: {
			checkRecuit(e){
				if(this.fromUrl==0){
					this.fromUrl=1;
					if(this.$route.query["itemIndex"]){
						this.getRecuit(this.$route.query["itemIndex"])
					}else{
						this.getRecuit(0)
					}
				}else{

					this.getRecuit(e)
				}
			},
			getRecuit(e){
				this.hrJsonData=[];
				let d=[];
				for(let i in hrJson.listData[e].data){
					d.push({names:i,datas:hrJson.listData[e].data[i]})
				}
				this.hrJsonTitle=hrJson.listData[e].name;
				this.hrJsonData=d;
			},
			showContent(e){
				this.isShowItem=e;
			},
            submitReruit(){
                this.$alert("Silakan kirim CV Anda ke email hr@do-it.id.Dengan subject email: Nama-Posisi yang diinginkan",'', {
                  dangerouslyUseHTMLString: true,
                })
            }
		},
		mounted(){
			this.checkRecuit(0);
		}
	}
</script>
<style>
	#investmentBody {
		margin: 20px;
		margin-top: 0;
		padding: 40px 0;
		background-color: white;
		overflow: hidden;
	}
    .cellls_title {
        margin-top: .18rem;
        margin-bottom: .08rem;
        padding-left: .15rem;
        padding-right: .15rem;
        font-size: .13rem;
        color: #a6a6a6;
    }

    .cellls {
        position: relative;
        background-color: #fff;
        line-height: 1.41176471;
        overflow: hidden;
        /*margin-top: 5px;*/
    }

    .celll {
        padding: .12rem 0;
        margin: 0 .15rem;
        position: relative;
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: center;
        -webkit-align-items: center;
        -ms-flex-align: center;
        align-items: center;
    }

    .right.celll:after {
        content: " ";
        position: absolute;
        left: .15rem;
        right: 0;
        bottom: 0;
        border-top: 1px solid #E4E4E4;
        color: #E4E4E4;
        -webkit-transform-origin: 0 0;
        transform-origin: 0 0;
        -webkit-transform: scaleY(.5);
        transform: scaleY(.5);
    }
    .none.celll:after{
        border-top: none;
    }

    .celll_hd {
        display: block;
        /*min-width: .8rem;*/
        word-wrap: break-word;
        word-break: break-all;
        overflow: hidden;
        margin-right: 8px;
        /*font-size: .15rem;*/
    }

    .celll_cn {
        -webkit-box-flex: 1;
        -webkit-flex: 1;
        -ms-flex: 1;
        flex: 1;
    }

    .celll_ft {
        text-align: right;
        line-height: 1;
        width: .10rem;
        height: .14rem;
        padding-left: .06rem;
    }

    .celll .btn_empty {
        padding: .01rem;
        color: #afafaf;
        background: #f9f9f9;
        border-radius: 50%;
        visibility: hidden;
    }

    .icon-check {
        color: #e7e7e7;
    }



    .aboutContent {
        width: 13.6rem;
        height: 3.3rem;
        margin: .3rem;
        padding: .3rem 0;
        background-color: white;
    }
    .aboutTitle {
        width: 100%;
        text-align: center;
        font-size: .3rem;
        color: rgb(61,189,182)
    }
    .aboutText {
        width: 13rem;
        height: 3rem;
        padding: .3rem;
        font-size: .2rem;
        line-height: .3rem;
        text-indent:2em;
    }

    #contents {
        width: 100%;
        max-width: 1200px;
        margin: 0 auto;
        height: 2rem;
        box-sizing: border-box;
    }
    #topLists {
        display: flex;
        justify-content: space-between;
        overflow: hidden;
    }
    .topList {
        text-align: center;
        width: .86rem;
        height: 1.5rem;
        cursor: pointer;
    }
    .topList img {
        width: .86rem;
        height: .86rem;
    }
    .topList span {
        display: block;
        width: .86rem;
        height: .5rem;
        line-height: .5rem;
    }
    #topBack {
        display: block;
        margin: .2rem .1rem .2rem 0;
        height: .2rem;
        width: 2.5rem;
        line-height: .2rem;
        font-size: .14rem;
        cursor: pointer;
    }
    #topBack img {
        width: .1rem;
        height: .15rem;
        margin: .025rem .1rem .025rem 0;
        display: block;
        float: left;
    }
    #topBack span {
        display: block;
        float: left;
    }
    .showContents {
        margin-bottom: 1.5rem;
        color: #2A2A2A;
    }
    .showContent {
        width: 100%;
        overflow: hidden;
        max-width: 1200px;
        margin: 0 auto;
    }
    .contentTitle {
        display: flex;
        text-align: center;
        height: .6rem;
        line-height: .6rem;
        background-color: #F7F9FA;
        border: 1px solid #EBEFF1;
        border-top: 0;
        overflow: hidden;
    }
    .showMeContent {
        display: flex;
        text-align: center;
        height: .6rem;
        line-height: .6rem;
        overflow: hidden;   
    }
    .accounting {
        flex: 4;
        text-align: left;
        padding-left: .6rem;
        font-size: .18rem;
        color:#2A2A2A
    }
    .showContentTitle {
        flex: 2;
        color:#737E9B
    }
    .showMeNow {
        flex: 1;
    }
    .showMeNow img {
        margin: .176rem 0;
        height: .25rem;
        width: 1.5rem;
        cursor: pointer;
        margin-right: .6rem;
    }
    .mainContent {
        height: 100%;
        padding: 0 1rem;
        word-break: break-all;white-space: normal;
        font-size: .14rem;
        width: 100%;
        text-align: left;
        overflow: hidden;
        line-height: 25px;
        box-sizing: border-box;
    }
    .layerConfirm {
        position: relative;
        top: 30%;
        left: 50%;
        width: 4rem;
        height: 3rem;
        margin-left: -1.5rem;
        margin-top: -.2rem;
        background-color: white;
        border-radius: .05rem; 
        overflow: hidden; 
    }
    #confirmIcon {
        background-color: #2BD2C6;
        height: 1.6rem;
        /*border-radius: .05rem;*/
    }
    #confirmIcon img {
        display: block;
        width: .9rem;
        height: .9rem;
        padding: .35rem 0;
        margin: 0 auto;
    }
    #confirmContent {
        padding: .2rem;
        font-size: .14rem;
        height: .4rem;
        line-height: .4rem;
        color: #4C4C4C;
        text-align: center;
    }
    #iconClose {
        position: absolute;
        top: .2rem;
        right: .2rem;
        width: .2rem;
        height: .2rem;
        background: url("../assets/img/iconClose.png");
        background-repeat: no-repeat;
        background-size: 100% 100%;
    }
    .contentBtn {
        width: 3rem;
        height: .4rem;
        line-height: .4rem;
        text-align: center;
        color: white;
        font-size: .16rem;
        margin: 0.4rem auto;
        background-color: #2BD2C6;
        border-radius: .05rem;
        cursor: pointer;
    }
    .shows {
    	display: block;
        border: 1px solid #EBEFF1;
    }
</style>