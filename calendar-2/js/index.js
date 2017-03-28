window.onload=function(){
	var calendar=document.getElementById('calendar');
	var day_list=document.getElementById('date_list');
	var oTitle=document.getElementById('title');
	var oTitle=document.getElementById('title');
	var oPre=document.getElementById('pre');
	var oNext=document.getElementById('next');
	var iNow=0;//-----设置当前月为零
	var arr=['壹月','贰月','叁月','肆月','伍月','陆月','柒月','捌月','玖月','拾月','拾壹月','拾贰月']
	var bigNumber=document.createElement('div');
	//--------------------------------------------------------
	function run(n){
		day_list.innerHTML='';
		var oDate=new Date();//死规定，必须先设置一个表
		oDate.setMonth(oDate.getMonth()+n);
		var year=oDate.getFullYear();//获取到当前的年份
		var month=oDate.getMonth();  // 获取当前月份；
		
		//var month=parseInt(oDate.getMonth()+n);//获取到当前的月份，因为在下面需要对月份进行加减，对其进行格式转换成数字；取整

        console.log(month);


		var day=oDate.getDate();//获取到今天的日期
		oDate.setMonth(month+1,0);//设置月份，当前的月份加1，就是下个月，取第零天就相当于这个月的最后一天
		
		var allDays=oDate.getDate();//获取到现在这个月一共多少天
		
		oDate.setDate(1);//把日期拨到1号
		var first_week=oDate.getDay(); //获取当前是周几
		
		for(var j=0;j<first_week;j++){ //运用for循环，j从0开始，0,1,2,3一共在day_list里面插入四个空内容的li
			var aLi=document.createElement('li');
			day_list.appendChild(aLi);
		}
		
		for(var i=0;i<allDays;i++){ //运用for循环，先创建一个li标签，然后把所有的li的内容扔到day_list里面
			var aLi=document.createElement('li');
			aLi.innerHTML=i+1;
			day_list.appendChild(aLi);//结果是从头开始对齐
		}
		aLi=day_list.children; //获取到aLi
		for(var i=0;i<aLi.length;i++){
			if(n==0){
				if(i%7==0||i%7==6){
					aLi[i].className='sun';
				}
				
				if(aLi[i].innerHTML==day){
					aLi[i].className='today';	
				}
				
				if(aLi[i].innerHTML<day){
					aLi[i].className='ccc';
				}
			}
			if(n<0){
				aLi[i].className='ccc'	
			}
			if(n>0){
				aLi[i].className='';
				if(i%7==0||i%7==6){
					aLi[i].className='sun';
				}
			}
				
		}
		
		
		oTitle.innerHTML=year+'年'+(month+1)+'月'+day+'日';
	   //--------------------------------------------------------
	bigNumber.id='bg';
	for(var k=0;k<(month+1);k++){
		bigNumber.innerHTML=arr[k];
	}
	document.body.appendChild(bigNumber);
	}
	//-----------------------------------------------------------
	run(iNow);
	oPre.onclick=function(){
		iNow--;	
		run(iNow);
	}	
	oNext.onclick=function(){
		iNow++;
		run(iNow);
	}
   	//--------------------------------------------------------
	
}
