function interval(i){
	var clsTimer = window.setInterval(function(){
	console.log("clsTimer: "+clsTimer);
	window.clearInterval(clsTimer);
	}
	,1000);
	
}
function forInterval() {
	for (var i=10; i>0; i--) {
		window.setInterval(interval(i),1000);
	}
}
forInterval();