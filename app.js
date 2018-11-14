//当前是否在画（橡皮擦或者画画）
var draw = true;
var canvas;
//声明绘图开始的坐标
var ctx;
//画笔颜色
var color = "black";
//画笔粗细
var startX;
var weight = 5;
var startY;

var endX;
var endY;
//页面加载结束之后会调用的方法
$(document).ready(function(){
	//同步像素
	setPixel();
	//监听绘图的方法
	readyToDraw();
	//设置颜色按钮
	setColors();
	//调用weight监听
	setWeight();
});

function setPixel(){
	canvas = document.getElementById("canvas");	
	ctx = canvas.getContext("2d");
	canvas.width = window.innerWidth;	
	canvas.height = window.innerHeight;
}

function readyToDraw(){
	//为canvas添加监听
	$(canvas).bind("touchstart touchmove touchend",function(event){
		//判断事件类型
		switch(event.type){
			case "touchstart":
			startX = event.originalEvent.targetTouches[0].clientX;
			startY = event.originalEvent.targetTouches[0].clientY;
			if(!draw){
				$(".era").removeClass("hidden").addClass("show");
				$(".era").css({"left":startX-10+"px","top":startY-10+"px"});
				ctx.clearRect(startX-10,startY-10,20,20);
			}
			break;
			case "touchmove":
			endX = event.originalEvent.targetTouches[0].clientX;
			endY = event.originalEvent.targetTouches[0].clientY;
			if(draw){
			    ctx.beginPath();
			    ctx.moveTo(startX,startY);
			    ctx.lineTo(endX,endY);
			    ctx.lineWidth = weight;
			    ctx.strokeStyle = color;
			    ctx.closePath();
			    ctx.stroke();
			    startX = endX;
			    startY = endY;
			}else{
				$(".era").css({"left":endX-10+"px","top":endY-10+"px"});
				ctx.clearRect(endX-10,endY-10,20,20);
			}
			break;
			case "touchend":
			$(".era").removeClass("show").addClass("hidden");
			break;
		}
	});
}
//让颜色按钮好用的方法
function setColors(){
	$(".red").click(function(){
		$(".colors li").css("border-radius","0");
		$(this).css("border-radius","0.2rem");
		color = "red";
	});
	$(".yellow").click(function(){
		$(".colors li").css("border-radius","0");
		$(this).css("border-radius","0.2rem");
		color = "yellow";
	});
	$(".blue").click(function(){
		$(".colors li").css("border-radius","0");
		$(this).css("border-radius","0.2rem");
		color = "blue";
	});
	$(".green").click(function(){
		$(".colors li").css("border-radius","0");
		$(this).css("border-radius","0.2rem");
		color = "green";
	});
	$(".black").click(function(){
		$(".colors li").css("border-radius","0");
		$(this).css("border-radius","0.2rem");
		color = "black";
	});
	$(".purple").click(function(){
		$(".colors li").css("border-radius","0");
		$(this).css("border-radius","0.2rem");
		color = "purple";
	});
	$(".eraser").click(function(){
		draw = !draw;
		if(draw){
			$(".eraser").html("橡皮擦");
		}else{
			$(".eraser").html("画笔");
		}
	});
}

function save(){
	//base64
	var dataUrl = canvas.toDataURL();
	window.localStorage.setItem("theSrc",dataUrl);
	window.location.href = "index.html";
}

function setWeight(){
	//监听滑动条的值
	$(".p1").on("click",function(){
		weight = 2;
		$(".weight p").removeClass("active");
		$(this).addClass("active");
	});
	
	$(".p3").on("click",function(){
		weight = 5;
		$(".weight p").removeClass("active");
		$(this).addClass("active");
	});
	$(".p5").on("click",function(){
		weight = 7;
		$(".weight p").removeClass("active");
		$(this).addClass("active");
	});
}



