<template>
	<div id="saBodyss">

		<div id="saContentss">
			<div id="formTitlesss">
				  <el-dialog title="" :visible.sync="studentTableShow">
					
					<div id="stuAlert">
						<span id="stuAlert1"><img @click="stuQquestion" src="../../assets/img/answer.png" alt="">Perkiraan jumlah uang yang akan dibayarkan setiap bulan adalah sebagai berikut</span>
						<table id="stuData" border="1" bordercolor="#99A5B0" style="border-collapse:collapse;width: 100%" >
							<tr style="width:100%">
								<th>Bulan</th>
								<th>Jumlah</th>
							</tr>
							<tr v-for="item in studentpayData">
								<td style="width:50%">{{item.datee}}</td>
								<td>Rp. {{item.value}}</td>
							</tr>
						</table>
						<div id="studentButton">
							<div id="studentButton1" @click="stuCancel">Batalkan</div>
							<div id="studentButton2" @click="stuOk">Konfirmasi</div>
						</div>
					</div>
				  </el-dialog>
				<div style="position:relative">
					<img src="../../assets/img/studentBanner.png" alt="">
					<div id="formContent">
						<div id="formContentTitle">Berkomitmen Untuk Menyediakan Layanan Ppinjaman Uang Bagi<br>Pelajar Yang Memiliki Kesulitan Finansia</div>
						<el-form ref="form" :model="searchForm" label-width="250px" style="padding-right: 250px;width: 700px;margin: 0 auto">	
							<!-- 姓名 -->
							<el-form-item prop="amountApply" >
								<div class="formUserName">Jumlah Pinjaman</div>
								<i id="studentBorrowI">Rp</i>
							    <input type="text" id="login_div" onkeyup="this.value=this.value.replace(/\D/g,'')" onafterpaste="this.value=this.value.replace(/\D/g,'')" maxlength = 15 class="formUserNamee" placeholder="jumlah pinjaman maksimum Rp 1.500.000" v-model="searchForm.amountApply">
							</el-form-item>	
							<!-- iddetailed -->
							<el-form-item prop="term">
								<div class="formUserName">Jangka waktu pinjaman</div>
								<div id="selecttt">
								    <el-select v-model="searchForm.term" style="width: 100%;">
									    <el-option
									      key="6 bulan"
									      label="6 bulan"
									      value="6 bulan">
									    </el-option>
									</el-select>
								</div>
								<span id="studentTips">Perkiraan biaya yang akan dibayarkan setiap bulan：</span>
								<div id="studentRepayV">Rp {{studentsValue}}</div>
							</el-form-item>	
							<el-form-item>
								<el-button type="primary" @click="onSubmit" class="onSubmitS">Lihat rencana pinjaman
								</el-button>
							</el-form-item>
						</el-form>
					</div>
				</div>
			</div>
			<div id="companyContent">
				<div class="companyContentDiv">
					<div id="companyContentTitle">
						Penjelasan singkat tentang Pinjaman Siswa
						<i></i>
					</div>
					<div id="companyContentImg"><img src="../../assets/img/studentDoit.png" alt=""></div>
					<div id="companyContentText">
						<span>Data Permohonan</span>
						<ul id="studentLi">
							<li>•  Kartu Tanda Penduduk (KTP)</li>
							<li>•  Kartu Keluarga (KK)</li>
							<li>•  Kartu Pelajar</li>
							<li>•  Foto Bukti sebagai Mahasiswa</li>
							<li>•  Informasi Penjamin Nasabah</li>
							<li>•  Informasi Kontak Nasabah</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import store from './../../store'
	export default {
		data(){
			return{
				searchForm: {     
				    "amountApply":"",
				    "term":"6 bulan",
				},
				guangbiao: 0,
				upp: 111,
				studentsValue: "",
				studentpayData:[{datee:"",value:""},{datee:"",value:""},{datee:"",value:""},{datee:"",value:""},{datee:"",value:""}],
				studentTableShow: false,
			}
		},
		watch:{

			searchForm: {
　　　　　　　　　handler(curVal,oldVal){
					let v=curVal.amountApply,s=((v*0.13)/1000).toFixed(0)*1000;
			    	let mydatee=new Date,y=mydatee.getFullYear(),m=mydatee.getMonth()+1;
			    	let sm=(m<10 ? "0"+m:m);
　　　　　　　　　　　this.studentsValue=((v*0.9/5+v*0.0175)/1000).toFixed(0)*1000;
					this.studentpayData[0].value=this.dealNumber(s);
					this.studentpayData[0].datee=y+"."+sm;
			    	for(let i=1,yy=0,mm=0;i<6;i++){
			    		if(m<12){
							m++;
			    		}else {
			    			m=1;
			    			y++;
			    		}
			    		let ms=(m<10 ? "0"+m:m);
			    		this.studentpayData[i].datee=y+"."+ms;
			    		// this.studentpayData[i].value=((v*0.9/5+v*0.0175)/1000).toFixed(0)*1000;
			    		this.studentpayData[i].value=this.dealNumber(((v*0.9/5+v*0.0175)/1000).toFixed(0)*1000);
			    		this.studentsValue=this.studentpayData[i].value;
			    	}

　　　　　　　　　},
　　　　　　　　　deep:true
			}
		},
		methods:{
			init(){

			},
			/*将100000转为100,000.00形式*/
			dealNumber(money){
			    if(money && money!=null){
			        money = String(money);
			        var left=money.split('.')[0],right=money.split('.')[1];
			        right = right ? (right.length>=2 ? '.'+right.substr(0,2) : '.'+right+'0') : '';
			        var temp = left.split('').reverse().join('').match(/(\d{1,3})/g);
			        return (Number(money)<0?"-":"") + temp.join('.').split('').reverse().join('')+right;
			    }else if(money===0){   //注意===在这里的使用，如果传入的money为0,if中会将其判定为boolean类型，故而要另外做===判断
			        return '0';
			    }else{
			        return "";
			    }	
			},
			/*将100,000.00转为100000形式*/
			undoNubmer(money){
			    if(money && money!=null){
			        money = String(money);
			        var group = money.split('.');
			        var left = group[0].split('.').join('');
			        return Number(left+"."+group[1]);
			    }else{
			        return "";
			    }	
			},
			mykeyup(){
				let w=this.searchForm.amountApply;
				w=w.toString().length;
				console.log(w)
				function set_text_value_position(obj, spos){
				    var tobj = document.getElementById(obj);
				    if(spos<0)
				            spos = tobj.value.length;
				    if(tobj.setSelectionRange){ //兼容火狐,谷歌
				            setTimeout(function(){
				                tobj.setSelectionRange(spos, spos);
				                console.log(spos)
				                tobj.focus();}
				                ,0);
				    }else if(tobj.createTextRange){ //兼容IE
				            var rng = tobj.createTextRange();
				            rng.move('character', spos);
				            rng.select();
				    }
				}
				//调用演示
				if(!this.guangbiao){
					this.searchForm.amountApply=this.searchForm.amountApply*1000;
				}
				this.guangbiao++;
				set_text_value_position('login_div', w-4); //设置到开头
			},
		    onSubmit(){
		    	let _this=this;
		    	if(!store.getters.token){
	    			setTimeout(function(){
						_this.$router.push({path:"/login"});
						return;
					}, 1000);
		    	}
		    	let j=1;
		    	for(let i in this.searchForm){
		    		if(!this.searchForm[i]){
		    			this.$message("Tidak boleh kosong");
		    			j=0;
		    			return;
		    		}
		    	}
		    	if(this.searchForm["term"]=="6 bulan"){
		    		this.searchForm["term"]=6
		    	};
		    	this.studentTableShow=true;
		    	if(j==1){
					this.$axios.post('/api-user/user/studentLoanInit', this.searchForm).then((response) =>{
						console.log(response.data.code)
						if(response.data.code==0){
							this.$message({message: 'success', type: 'success'});
							setTimeout(()=>{
								this.$router.push({path:"/studentApply1"})
							}, 1500);
						}
						resolve(re);
				   	}).catch( (re)=>{
				   		// console.log(re);
					});
		    	}
				setTimeout(()=>{
					this.$router.push({path:"/studentApply1"})
				}, 500);
		    },
		    stuQquestion(){

		        this.$alert("Anggaran pelunasan hanya sebagai perkiraan. Untuk pelunasan sebenarnya, harap menyesuaikan dengan data pinjaman sebenarnya.<br>Demi menjaga kredit pinjaman anda yang baik, maka harap segera melunasi pinjaman anda. Jika saya tidak melunasi sesuai dengan waktu yang dijanjikan, maka saya bersedia menanggung biaya keterlambatan beserta dendanya. <p>Interest Bunga: 1.75% of principal 1,75% dari pinjaman pokok</p><p>Late Fee Biaya keterlambatan: 50.000</p>",'Penjelasan Biaya', {
		          dangerouslyUseHTMLString: true,
		        },{}).then(() => {

		        }).catch(() => {

		        });
		    },
		    stuCancel(){
		    	this.studentTableShow=false
		    },
		    stuOk(){
				this.studentTableShow=false
		    },
		    open7() {
		    	let _this=this;
		    	let a,h="",s='',mydatee=new Date(),j,v=this.searchForm.amountApply,y=mydatee.getFullYear(),m=mydatee.getMonth()+1;
		    	s=(v*0.13).toFixed(2);j=(v*0.9/5+v*0.0175).toFixed(2);
		    	m=(m<10 ? "0"+m:m);
		    	let arr=[];
		    	arr[0]=y+"."+m;
		    	for(let i=1,yy=0,mm=0;i<6;i++){
		    		
		    		if(m<12){
						m++;
		    		}else {
		    			m=1;
		    			y++;
		    		}
		    		arr[i]=y+"."+m;
		    	}
		        this.$confirm(h,'', {
		          confirmButtonText: '确sdfsdf定',
		          cancelButtonText: '取sdfsdffdsf消',
		          dangerouslyUseHTMLString: true,

		          center: true
		        },{}).then(() => {

		          this.$message({
		            type: 'success',
		            message: '删除成功!'
		          });
		        }).catch(() => {
		          this.$message({
		            type: 'info',
		            message: '已取消删除'
		          });
		        });
		        let _thiss=this;
		        	 setTimeout(function(){
						function addEvent(obj,type,handle){
							try{ // Chrome、FireFox、Opera、Safari、IE9.0及其以上版本
								obj.addEventListener(type,handle,false);
							}catch(e){
							try{ // IE8.0及其以下版本
								obj.attachEvent('on' + type,handle);
								}catch(e){ // 早期浏览器
								obj['on' + type] = handle;
								}
							}
						}
						addEvent(document.getElementById("yiwendianji"),"click",myAlert);
						function myAlert(){
							document.getElementsByClassName("el-message-box")[0].style.cssText="display:none"
					          _this.$alert("werw");
						}
		        	 },500);


	    	}
		},
		mounted(){
			this.init();
		}
	}
</script>
<style scoped>
	#saBodyss {
		position: static;
	}
	#formTitlesss {
		position: relative;
		margin:20px;
		height: 800px;
		overflow: hidden;
	}
	#studentBorrowI {
		display: block;
		position: absolute;
		padding-left: 20px;
		font-size: 20px;
		top: 40px;
		left: 0;
		color: #1F2532;
	}
	.formUserNamee {
		border-radius: 20px;
		height: 40px;
		width: 390px;
		padding-left: 60px;
		line-height: 40px;
		font-size: 16px;
	}
	#formContent {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
	}
	#formContentTitle {
		width: 1000px;
		margin: 80px auto;
		height: 80px;
		line-height: 40px;
		font-size: 30px;
		color: white;
	}
	.formUserName {
		font-size: 20px;
		color: white;
		text-align: left;
	}
	#studentTips {
		line-height: 40px;
		font-size: 16px;
		color: white;
		text-align: left;
		display: block;
	}
	#studentRepayV {
		width: 100%;
		text-align: right;
		font-size: 30px;
		color: #FF642E;
	}
	.onSubmitS {
		width:450px;
		background-color:#2AD2C8;
		border:#2AD2C8;
		border-radius:20px;
		height: 40px;
		line-height: 16px;
		font-size: 18px;
	}
	#formTitlesss img {
		width: 100%;
	}
	#selecttt {
		border-radius: 20px;
		overflow: hidden;
	}
	#companyContent {
		min-width: 1400px;
		height: 500px;
		overflow: hidden;
		margin: 20px;
		box-shadow: 5px 5px 5px #eee;
		background-color: white;
	}

	#companyContentTitle {
		width: 1050px;
		text-align: center;
		height: 40px;
		margin: 60px auto;
		line-height: 40px;
		font-size: 35px;
		color: #1F2532;
		font-family: PingFangSC;
		font-weight: Medium;
	}
	#companyContentImg {
		width: 400px;
		height: 300px;
		overflow: hidden;
		float: left;
		margin: 20px 50px;
		margin-left: 150px;
	}
	#companyContentImg img {
		margin-left: 50px;
		height: 100%;
	}
	#companyContentText {
		float: left;
		text-align: left;
		line-height: 25px;
		padding: 20px 50px;
		width: 350px;
		height: 260px;
	}
	#companyContentText span {
		font-size: 25px;
		line-height: 40px;
		height: 40px;
		display: block;
		width: 100%;
	}
	.companyContentDiv {
		width: 1050px;
		margin: 0 auto;
		overflow: hidden;
	}
	#studentLi li {
		height: 35px;
		line-height: 35px;
	}
	#ddd {
		color: red;
		font-size: 33px;
	}
	.el-message-box--center .el-message-box__title {
		justify-content: left;
		text-align: left;
	}
	#stuAlert {
		color:#4A4A4A;
		z-index: 99;
		background-color: white;
		padding: 20px;
		border-radius: 5px;
	}
	#stuAlert1 {
		margin-top: -40px;
		display: block;
		height: 50px;
		line-height: 30px;
		width: 100%;
		text-align: left;
		color: gray;
		border: 0;
		background-color: white;
	}
	#stuAlert1 img {
		float: left;
		width: 20px;
		height: 20px;
		padding: 5px 10px 5px 0;
	}
	#stuData tr{
		height: 30px;
		line-height: 30px;
		text-align: center;
	}
	#studentButton {
		width: 100%;
		margin-top: 20px;
		display: flex;
	}
	#studentButton1,#studentButton2 {
		flex: 1;
		height: 40px;
		line-height: 40px;
		border-radius: 5px;
		color: #ffff;
		font-size: 16px;
		text-align: center;
	}
	#studentButton1 {
		background-color: rgb(153,165,176);
		margin-right: 60px;
	}
	#studentButton1:hover {
		cursor: pointer;
	}
	#studentButton2:hover {
		cursor: pointer;
	}
	#studentButton2 {
		background-color: #2AD2C8;
		margin-left: 60px;
	}
	.el-button--primary:focus, .el-button--primary:hover {
		background-color: #2AD2C8;
	}
	#app .el-button--primary {
		background-color: #2AD2C8;
	}
	.el-button,.el-button--default,.el-button--small,.el-button--primary {
		background-color: #2AD2C8;
	}
</style>