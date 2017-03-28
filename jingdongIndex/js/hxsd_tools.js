// JavaScript Document


function documentReady(fn){
	if(document.addEventListener)document.addEventListener('DOMContentLoaded', fn, false);  //dom内容加载完毕
	else{
		document.attachEvent('onreadystatechange', function (){//IE兼容
			if(document.readyState=='complete'){
				fn && fn();
			}
		});
	}
};



var hxsd_tools={
	//页面中心显示---------------------------------------------------
	showCenter:function(obj){
		obj.style.display="block";
		function center(){
			var screenW=document.documentElement.clientWidth;
			var screenH=document.documentElement.clientHeight;
			obj.style.left=(screenW-obj.offsetWidth)/2+'px';
			obj.style.top=(screenH-obj.offsetHeight)/2+'px';
		};
		center();
		
		window.onresize=function(){
			center();
		};
	},
	
	//拖拽功能---------------------------------------------------
	drag:function (obj,title){//对象  对象内部的标题
		title=title || obj;
		title.onmousedown=function(ev){
			ev=ev||window.event;
			//计算偏移距离
			var disX=ev.clientX-obj.offsetLeft;    //distance 距离
			var disY=ev.clientY-obj.offsetTop; 
			//开始拖动---------
			document.onmousemove=function(ev){
				ev=ev||window.event;
				var l=ev.clientX-disX; //鼠标x
				var t=ev.clientY-disY;//鼠标y	
				console.log(l,t);
				//先判断,后赋值
				if(l<0){
					l=0;
				};
				if(t<0){
					t=0;
				};
				var screenW=document.documentElement.clientWidth;
				var screenH=document.documentElement.clientHeight;
				if(l>screenW-obj.offsetWidth){
					l=screenW-obj.offsetWidth;
				};
				if(t>screenH-obj.offsetHeight){
					t=screenH-obj.offsetHeight;
				};
				obj.style.left=l+"px";
				obj.style.top=t+"px";
			};
			
			//停止拖动 动作写在document上------
			document.onmouseup=function(){
				document.onmousemove=null;
			};
			//阻止默认事件------------------
			return false;
		};
	},
	
	
	//addClass---------------------------------------------------
	addClass:function (obj,newClassName){
		return obj.className+=" "+newClassName;
	},
	
	
	cleanSpace:function (elm) {   //清除空白节点---------------------------------------------------
		for(var i=0; i<elm.childNodes.length; i++){   
			var node = elm.childNodes[i];
			if(node.nodeType==3 && !/\S/.test(node.nodeValue)) node.parentNode.removeChild(node);   
		}   
	},   
	
	
	
	//过滤文本和空格---------------------------------------------------
	get_firstChild:function (elm){//父节点
		var x=elm.firstChild;
		while (x.nodeType!=1){
			x=x.nextSibling;//把自己变成节点，while继续向前查找
		}
		return x;
	},
	
	get_lastChild:function (elm){
		var x=elm.lastChild;
		while (x.nodeType!=1){
			x=x.previousSibling;//把自己变成节点，while继续向前查找
		}
		return x;
	},
	
	get_previousSibling:function (elm){
		var x=elm.previousSibling;
		while (x.nodeType!=1){
			x=x.previousSibling;//把自己变成节点，while继续向前查找
		}
		return x;
	},
	
	
	get_nextSibling:function (elm){
		var x=elm.nextSibling;
		while (x.nodeType!=1){
			x=x.nextSibling;
		}
		return x;
	},
	//读取样式-----------------------------------------------
	getStyle:function (obj,styleName){
		var value=obj.currentStyle?obj.currentStyle[styleName]:getComputedStyle(obj,false)[styleName];
		if(styleName=='opacity'){
			value=Math.round(parseFloat(value)*100);
		}else{
			value= parseInt(value);	
		};
		return value;
	},
	//运动框架----------------------------------------------------
	move:function(obj,modeJson,fn,time){		//封装函数，后期调用
		var def_speed={
			verySlow:2500,
			slow:1500,
			normal:800,						//创建对象
			fast:500,
			varyFast:200,
		}
		if(time){
			if(typeof time=="string"){
				time=def_speed[time];
			}
		}else{
			time=def_speed.normal;	
		}
		//------------------------------------
		var start={};
		var dis={};
		for(var key in modeJson){
			start[key]=this.getStyle(obj,key);
			dis[key]=modeJson[key]-start[key]
		};
		//--------------------------------------	
		var i=0;
		//var dis=end-start;
		var count=parseInt(time/30);          //-------把时间单位分段
		var stepDis=dis/count;  		            //-------每次移动的距离
		clearInterval(obj.timer);
		obj.timer=setInterval(function(){ 
			i++;
			for(var key in modeJson){
				var a=1-i/count;
				var m_dis=start[key]+dis[key]*(1-a*a*a*a);			//缓动公式
				if(key=='opacity'){
					obj.style.opacity=m_dis/100;
					obj.style.filter="alpha(opacity:"+m_dis+")";//为了兼容IE8
				}else{
						obj.style[key]=m_dis+"px";	
					};
			}
			
			if(i==count){
				clearInterval(obj.timer);
				fn && fn();
			}
		},30);
	},
	
}







