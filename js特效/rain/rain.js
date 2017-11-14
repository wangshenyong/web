var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
window.onload = function() {
    canvas.style.background = "rgba(0,0,0,0.5)";
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    var rainArray = [];
    var i=0;
    for ( i=0; i<30; i++ ) {
    	console.log("i: "+i);
    	// var drawtemp = new draw();

    	// drawtemp.init(ctx,canvas,random(canvas.width,0),0,1,2,10,1,1,50,random(canvas.height,canvas.height*0.8));
    	rainArray.push(new draw());
    }
    var k = new draw();
    k.init(ctx,canvas,random(canvas.width,0),0,1,2,10,1,1,50,random(canvas.height,canvas.height*0.95));
    k.draw();
    k.update();
    //  var d = new draw();

    // d.init(ctx,canvas,random(canvas.width,0),0,1,2,10,1,1,50,random(canvas.height,canvas.height*0.95));
    // d.draw();
    // d.update();
    // console.log(k);
    //      console.log(d);
    // for ( i=0; i<rainArray.length; i++) {
    // 	rainArray[i].init(ctx,canvas,random(canvas.width,0),0,1,2,10,1,1,50,random(canvas.height,canvas.height*0.8));
    // 	rainArray[i].update();
    // 	console.log("ikkk: "+i);
    // }
    // var k;
    //  k = new draw();
  	 // console.log("height: "+random(canvas.height,canvas.height*0.95));
    // k.init(ctx,canvas,random(canvas.width,0),0,1,2,10,1,1,50,random(canvas.height,canvas.height*0.95));
    // k.draw();
    // k.update();
   //  window.setInterval(function() {
   //      k.update();
  	// for (let i=0; i<rainArray.length; i++) {
  	// 	rainArray[i].update();
  	// }
  	//  k = new draw();
  	//  console.log("height: "+random(canvas.height,canvas.height*0.95));
   //  k.init(ctx,canvas,random(canvas.width,0),0,1,2,10,1,1,50,random(canvas.height,canvas.height*0.95));
   //  k.draw();
   //  k.update();
   //  },1000);
    // k.update();
}
window.onresize = function() {
    console.log(document.innerWidth);
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

function draw() {};
draw.prototype = {
    init: function(ctx, canvas, rx, ry, rv, rw, rh,av,ar,maxAr,areah) {
        this.ctx = ctx;
        this.canvas = canvas;
        this.rx = rx;
        this.ry = ry;
        this.rv = rv;
        this.rw = rw;
        this.rh = rh;
        this.av = ar;
        this.ar = ar;
        this.maxAr = maxAr;
        this.areah = areah;
        this.clsTime = null;
    },
    draw: function() {
        if (this.areah > this.ry) {
            // console.info(this);
            this.ctx.beginPath();
            this.ctx.fillStyle = "rgba(0,0,0,0.09)";
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
            this.ctx.beginPath();
            this.ctx.fillStyle = "red";
            this.ctx.fillRect(this.rx, this.ry, this.rw, this.rh);
            // console.log("rect");
        } else if ( that.maxAr > that.ar ) {
            this.ctx.beginPath();
            this.ctx.fillStyle = "rgba(0,0,0,0.005)";
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
            this.ctx.beginPath();
            this.ctx.strokeStyle = "#c1c1c1";
            this.ctx.arc(this.rx, this.ry, this.ar, 0, Math.PI * 2);
            this.ctx.stroke();
        } 
    },
    update: function() {
    	that = this;
    	console.log(this);
    	this.clsTime = window.setInterval(function() {
    		// console.log("clsTime:" + that.clsTime);
    		if ( that.areah > that.ry ) {
    		 that.ry = parseInt(that.rv) + that.ry;
    		 console.log(that.clsTime+":"+that.ry);
    		} else if ( that.maxAr > that.ar ){
    			console.log("arc");
    			that.ar = parseInt(that.av) + that.ar;
    		} else {
    			console.log("cls:"+that.clsTime);
    			window.clearInterval(that.clsTime)
    			// console.log("cls:"+window.clearInterval(that.clsTime));
    		} 
    		 that.draw();
    	}, 1000/60);
    	
       
       
    }
}

// function rect (ctx,y) {
// 	ctx.beginPath();
// 	ctx.fillStyle = "rgba(0,0,0,0.05)";
// 	ctx.fillRect(0,0,canvas.width,canvas.height);
// 	ctx.beginPath();
// 	ctx.fillStyle="red";
// 	ctx.fillRect(10,y,3,10);
// 	console.log(random(canvas.width,0))
// 	console.log("rect");
// }

// function drawacr (x,y,r) {
// 	// ctx.beginPath();
// 	// ctx.fillStyle="rgba(0,0,0,0.05)";
// 	// ctx.fillRect(0,0,canvas.width,canvas.height);
// 	ctx.beginPath();
// 	ctx.strokeStyle = "#c1c1c1";
// 	ctx.arc(x,y,r,0,Math.PI*2);
// 	ctx.stroke();
// }
// function draw() {
// 	var y=1;

// 	setInterval(function(){
// 		y = y+0.1;
// 		// drawacr (150,150,y);
// 		rect (ctx,y);
// 		drawacr (150,150,y);
// 	},1000/60);
// }
function random(max, min) {
    return Math.random() * (max - min) + min;
}