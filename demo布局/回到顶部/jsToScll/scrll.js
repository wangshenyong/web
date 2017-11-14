window.onload = function(){
	var timer = null;
	var isTop = false;
	var isFlag = false;
	var clientHeight = document.documentElement.clientHeight;
	

	var btn = document.getElementById("top");
	btn.addEventListener("click",function(){

		if(!isFlag){
		 timer = setInterval(backToTop,30);
		}

	});

	window.onresize = function(){

		var clientWidth =document.documentElement.clientWidth;
		if(clientWidth>1270)
		{
			btn.style.marginLeft = "50%";
			btn.style.left = "600px"; 
			console.info("margin");
		}
		else {
			btn.style.marginLeft = "0px";
			btn.style.left = clientWidth-45+"px";
			console.info("right");
		}
		console.info("sdf");
	}

	window.onscroll = function(){

		var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
		var speed = Math.ceil(scrollTop/7);
		if(clientHeight<scrollTop)
		{
			btn.style.display = "block";
		}else{
			btn.style.display = "none";
		}
		if(!isTop)
		{
			clearInterval(timer);	
			isFlag = false;
			
		}
		isTop = false;
		
	};

	function backToTop(){

		isFlag=true;
		var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
		var speed = Math.ceil(scrollTop/7);
		document.documentElement.scrollTop = document.body.scrollTop = scrollTop-speed;
		isTop = true;

		if(scrollTop==0){
			clearInterval(timer);
			isFlag=false;
		}


	}
}