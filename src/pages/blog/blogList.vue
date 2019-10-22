<template>
	<div id="blogLists">
		<div id="blogListTitle">Blog</div>
		<div id="blogListTitleLine"></div>
		<!-- <div id="blogListsubTitle">Kepercayaan, mulai dari setiap bagian</div> -->
		<div id=".blogListItemss">
			<div class="blogListItem" v-for="item in blogItems">
				<div class="blogListItem1">
					<img @click="pushBlogTo(item.indexs)" :src="item.imgUrl1" alt="">
					<div class="blogListItemTitle">{{item.title1}}</div>
					<span>{{item.date1}}</span>
				</div>				
				<div class="blogListItem2">
					<img v-if="item.indexss" @click="pushBlogTo(item.indexss)" :src="item.imgUrl2" alt="">
					<div class="blogListItemTitle">{{item.title2}}</div>
					<span>{{item.date2}}</span>
				</div>

			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data(){
			return {
				alertShow: 'false',
				blogItems: [{
					indexs:'1',
					title1:'Perkenalkan Tekfin ke Warga Bali , Do-It Blusukan ke Pasar Tradisional',
					imgUrl1: require("../../assets/img/blog/blogItem1.png"),
					date1:'18 .Nov. 2018',
					indexss:'2',
					title2:'Do-It Ikut Sukseskan Fintech Days 2018 OJK di Batam',
					imgUrl2: require("../../assets/img/blog/blogItem20.png"),
					date2:'18 .Nov. 2018'
				},{
					indexs:'3',
					title1:'Menyambut Bulan Inklusi Keuangan, Do-It Melakukan Penyuluhan di Pulau Jawa',
					imgUrl1: require("../../assets/img/blog/blogItem3.png"),
					date1:'18 .Nov. 2018',
					indexss:'4',
					title2:'Kontribusi Do-It dalam Membangun Percepatan Akses Keuangan di Makassar',
					imgUrl2: require("../../assets/img/blog/blogItem4.png"),
					date2:'18 .Nov. 2018'
				},{
					indexs:'5',
					title1:'Do-It Ikut Sukseskan Fintech Days 2018 OJK di Manado',
					imgUrl1: require("../../assets/img/blog/blogItem5.png"),
					date1:'18 .Nov. 2018',
					indexss:'6',
					title2:'Do-It dan OJK Bersinergi untuk Membangun Ekonomi Digital di Sumatera',
					imgUrl2: require("../../assets/img/blog/blogItem6.png"),
					date2:'18 .Nov. 2018'
				},{
					indexs:'7',
					title1:'Kontribusi Tekfin dalam Meningkatkan Kesejahteraan Warga Paguyuban Bumi Saras',
					imgUrl1: require("../../assets/img/blog/blogItem7.png"),
					date1:'18 .Nov. 2018',
				}],
			}
		},
	    methods: {
	    	pushBlogTo(e){
	    		let pathss="blogItem1?QuerayItem="+e;
	    		// _this.$router.push("./bindCard")
	    		this.$router.push({path:pathss})
	    	}
	    }
	}
</script>
<style scoped>
	#blogLists {
		margin: 20px;
		padding: 60px 0 100px 0;
		background-color: white;
		overflow: hidden;
	}
	#blogListTitle {
		margin: 0;
		font-size: 30px;
		color: black;
	}
	#blogListTitleLine {
		width: 30px;
		height: 6px;
		margin: 0 auto 10px;
		background-color: rgb(61,189,182);
		border-radius: 5px;
	}
	#blogListsubTitle  {
		margin: 10px auto;
		font-size: 20px;
		color: #ACACAC;
	}
	#blogListItemss {
		width: 80%;
		margin: 20px auto;
	}
	.blogListItem {
		display: flex;
		max-width: 1400px;
		margin: 0 auto;
	}
	.blogListItem1,.blogListItem2 {
		margin: 20px 40px;
		flex: 1;
	}
	.blogListItemTitle {
		color: black;
		font-size: 20px;
		margin: 10px 0;
		text-align: left;
	}
	.blogListItem img {
		display: block;
		height: 400px;
		width: 100%;
		margin: 0 auto;
	}
	.blogListItem span {
		display: block;
		text-align: left;
		width: 100%;
		color: #BBBBBB;
		font-size: 18px;
	}
</style>