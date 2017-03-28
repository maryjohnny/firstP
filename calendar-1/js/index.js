window.onload=function(){
	var newYear=0;
	var newMonth=0;
	var newDate=0;
	var calendar=document.getElementById('calendar');
	var day_list=document.getElementById('date_list');
	var oTitle=document.getElementById('title');
	var sel=document.getElementsByTagName('select');
	//--------------------------------------------------------

	function change(a,b,c){
		var n=0;
		day_list.innerHTML='';
		var oDate=new Date();//死规定，必须先设置一个表
		var jb=oDate.getFullYear();
		oDate.setFullYear(oDate.getFullYear()+a);
		oDate.setMonth(oDate.getMonth()+b);
		oDate.setDate(oDate.getDate()+c);
		var year=oDate.getFullYear();//获取到当前的年份
		
		var month=oDate.getMonth();  // 获取当前月份；
		var day=oDate.getDate();	//获取当前日期
		console.log(day);
		oTitle.innerHTML=year+'年'+(month+1)+'月'+day+'日';
		var month=parseInt(oDate.getMonth());//获取到当前的月份，因为在下面需要对月份进行加减，对其进行格式转换成数字；取整
   		oDate.setMonth(month+1,0); 
		var month=oDate.getMonth();
		var allDays=oDate.getDate();
		oDate.setDate(1);
		var first_week=oDate.getDay();
		
		oTitle.innerHTML=year+'年'+(month+1)+'月'+day+'日';
		day_list.innerHTML='';
		
		for(var j=0;j<first_week;j++){ //在li的前面插入空白
			var aLi=document.createElement('li');
			day_list.appendChild(aLi);
		}
		for(var i=0;i<allDays;i++){ //把li的内容放进去，从1到31
			var aLi=document.createElement('li');
			aLi.innerHTML=i+1;
			day_list.appendChild(aLi);
		}
	//------------------------------------------------------------------
		aLi=day_list.children;
		for(var i=0;i<aLi.length;i++){
			if(a==0){
				if(b==0){
					if(i%7==0||i%7==6)aLi[i].className='sun';
					if(aLi[i].innerHTML==day)aLi[i].className='today';
					if(aLi[i].innerHTML<day)aLi[i].className='ccc';
				}
				if(b<0)aLi[i].className='ccc';
				if(b>0)aLi[i].className='';
			}
			if(a>0){
				aLi[i].className='';
				if(i%7==0||i%7==6){aLi[i].className='sun'};
			}
			if(a<0){
				aLi[i].className='ccc';
			}
		}	
	}
	change(newYear,newMonth,newDate);
	sel[0].onchange=function(){
		var oDate=new Date();
		var year=oDate.getFullYear();
		newYear=sel[0].value-year;
		console.log(newYear);
		change(newYear,newMonth,newDate);
	}
	sel[1].onchange=function(){
		var oDate=new Date();
		var month=oDate.getMonth();
		newMonth=sel[1].value-month;
		change(newYear,newMonth,newDate);	
	}
	sel[2].onchange=function(){
		var oDate=new Date();
		var today=oDate.getDate();
		newDate=sel[2].value-today;
		change(newYear,newMonth,newDate);	
	}

}