(function(window, vx) {
    var mod = vx.module("ui.libraries");

    mod.directive("drawcle", function() {
        return {
            restrict: 'ECMA',
            // template: "",
            link: function(scope, element, attrs) {
                var canvas = document.getElementById("canvas");

                canvas.style.background = canvas.style.background || "rgb(255,255,255)";

                function drawbing() {};
                drawbing.prototype = {
                    init: function(canvas, message, fontcolor, fontr) {

                        this.canvas = canvas;
                        this.width = canvas.width;
                        this.height = canvas.height;
                        this.message = message;
                        this.fontcolor = fontcolor;
                        this.rx = this.width / 2;
                        this.ry = this.height / 2;
                        this.r = this.width / 2 - 2;
                        this.background = canvas.style.background;
                        this.ctx = canvas.getContext("2d");
                        this.fontr = fontr
                        this.arrayfont = [];

                        var i = 1;
                        // 百分比转弧度
                        this.message[0].pict = parseFloat(this.message[0].pict) * Math.PI * 2;

                        console.log(this.message[0].pict);
                        while (i < this.message.length) {
                            this.message[i].pict = parseFloat(this.message[i].pict) * Math.PI * 2 +
                                parseFloat(this.message[i - 1].pict);
                            console.log(this.message[i].pict);
                            i++;
                        }
                        var temp = parseFloat(this.message[i - 1].pict) + parseFloat(this.message[0].pict);
                        this.message.push(this.cloneObj(this.message[0]));
                        console.log("ddd  ", this.message[0].pict);
                        this.message[i].pict = temp;
                        console.log("ddd  ", this.message[0].pict);
                        this.compute();

                    },
                    draw: function() {



                        for (var i = 1; i < this.message.length; i++) {

                            // 绘制扇形
                            this.ctx.beginPath();
                            this.ctx.moveTo(this.rx, this.ry);
                            this.ctx.fillStyle = this.message[i].color;
                            this.ctx.strokeStyle = this.background;
                            this.ctx.lineWidth = 10;
                            this.ctx.arc(this.rx, this.ry, this.r,
                                this.message[i - 1].pict, this.message[i].pict, false);
                            this.ctx.lineCap = "round";
                            this.ctx.lienJoin = "round";
                            this.ctx.miterLimit = 1;
                            this.ctx.closePath();
                            this.ctx.fill();
                            this.ctx.stroke();

                            // 绘制文字
                            this.ctx.beginPath();
                            this.ctx.fillStyle = this.fontcolor;
                            this.ctx.font = "20px Arial";
                            this.ctx.textAlign = "center";
                            this.ctx.fillText(this.message[i].msg, this.arrayfont[i - 1].fx, this.arrayfont[i - 1].fy);
                            this.ctx.fill();
                            this.ctx.stroke();
                            this.ctx.stroke();
                        }
                    },
                    // 计算文字坐标
                    compute: function() {
                        var fx = 0;
                        var fy = 0;
                        console.log("this.message[0]:%s", this.message[0].pict);
                        for (var i = 1; i < this.message.length; i++) {

                            var midPict = (this.message[i].pict + this.message[i - 1].pict) / 2;
                            console.log("midPict i mesi mesi-1:%s；%s;%s,%s", midPict, i, this.message[i].pict, this.message[i - 1].pict);
                            fx = Math.cos(midPict) * this.fontr + this.width / 2;
                            fy = Math.sin(midPict) * this.fontr + this.height / 2;
                            this.arrayfont.push({ fx: fx, fy: fy });
                        }
                        console.log(this.arrayfont);
                    },
                    // 对象赋值
                    cloneObj: function(obj) {
                        var newObj = {};
                        for (var key in obj) {
                            newObj[key] = obj[key];
                        }
                        return newObj;
                    }


                }
                var drawp = new drawbing();
                drawp.init(canvas, scope.drawData.message, scope.drawData.fontcolor, scope.drawData.fontr);
                drawp.draw();
            }
        }
    });

})(window, window.vx);