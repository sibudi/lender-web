<template>
	<div id="loading">
		<div id="mask">
			<img src="../assets/img/loading.png" alt="">
		</div>
	</div>
</template>
<script>
	var _PageHeight = document.documentElement.clientHeight,
	  _PageWidth = document.documentElement.clientWidth;
	//计算loading框距离顶部和左部的距离（loading框的宽度为215px，高度为61px）
	var _LoadingTop = _PageHeight > 61 ? (_PageHeight - 61) / 2 : 0,
	  _LoadingLeft = _PageWidth > 215 ? (_PageWidth - 215) / 2 : 0;
	//在页面未加载完毕之前显示的loading Html自定义内容
	var _LoadingHtml = '<div id="loadingDiv" class="mask" style="position:fixed;left:0;width:100%;height:' + _PageHeight + 'px;top:0;background:#f3f8ff;opacity:0.8;filter:alpha(opacity=80);z-index:10000;"><div style="position: absolute; cursor1: wait; left: ' + _LoadingLeft + 'px; top:' + _LoadingTop + 'px; width: auto; height: 57px; line-height: 57px; padding-left: 50px; padding-right: 5px; background: #fff url(/Content/loading.gif) no-repeat scroll 5px 10px; border: 2px solid #95B8E7; color: #696969; ">Page loading, please wait</div></div>';

</script>
<style>
	#loading {
		margin: .4rem;
		text-align: center;
		width: 100%;
	}
	#mask {
      /*display: none;  */
      position: fixed;  
      top: 0%;  
      left: 0%;  
      width: 100%;  
      height: 100%;  
      background-color: black;  
      z-index:1001;  
      -moz-opacity: 0.7;  
      opacity:.70;  
      filter: alpha(opacity=70);
    } 
    #mask img {
    	position: absolute;
    	top: 50%;
    	left:50%;
    	margin-top: -50px;
    	margin-left: -50px;
    	width: 100px;
    	height: 100px;
		-webkit-transition-property: -webkit-transform;
	    -webkit-transition-duration: 1s;
	    -moz-transition-property: -moz-transform;
	    -moz-transition-duration: 1s;
	    -webkit-animation: rotate 1.5s linear infinite;
	    -moz-animation: rotate 1.5s linear infinite;
	    -o-animation: rotate 1.5s linear infinite;
	    animation: rotate 1.5s linear infinite;
	}
	@-webkit-keyframes rotate{from{-webkit-transform: rotate(0deg)}
	    to{-webkit-transform: rotate(360deg)}
	}
	@-moz-keyframes rotate{from{-moz-transform: rotate(0deg)}
	    to{-moz-transform: rotate(359deg)}
	}
	@-o-keyframes rotate{from{-o-transform: rotate(0deg)}
	    to{-o-transform: rotate(359deg)}
	}
	@keyframes rotate{from{transform: rotate(0deg)}
	    to{transform: rotate(359deg)}
	}
</style>