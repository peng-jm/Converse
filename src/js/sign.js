$(function(){
	var flug=true;
	$('.txt').on('change',function(){
		var reg=/^[^\d]{1}\w{5,9}$/;
		var txt=reg.test($('.txt').val())
		if(txt==true){
			$('.yan').html('用户名正确');
			flug=true;
		}
		if($('.txt').val()==""){
			$('.yan').empty();
			flug=false;
		}
		if(txt==false&&!$('.txt').val()==""){
			$('.yan').empty();
			$('.yan').html('您的输入有误');
			flug=false;
		}
	})
	$('.pass1').on('change',function(){
		var reg=/^[0-9]{6,10}$/;
		var txt=reg.test($('.pass1').val());
		if(txt==true){
			$('.yan-2').html('密码输入正确')
			flug=true;
		}
		if($('.pass1').val()==""){
			$('.yan-2').empty();
			flug=false;
		}
		if(txt==false&&!$('.pass1').val()==""){
			$('.yan-2').empty();
			$('.yan-2').html('密码输入错误')
			flug=false;
		}
	})
	$('.pass2').on('change',function(){
		if($('.pass2').val()==$('.pass1').val()){
			$('.yan-3').html('密码输入正确')
			flug=true;
		}
		if($('.pass2').val()==""){
			$('.yan-3').empty();
			flug=false;
		}
		if($('.pass2').val()!=$('.pass1').val()&&!$('.pass2').val()==""){
			$('.yan-3').empty();
			$('.yan-3').html('密码输入错误')
			flug=false;
		}
	})
	window.onload=function(){
		var sum="";
		for(var i=0;i<6;i++){
			var sum1=rand(0,9);
			var sum3=String.fromCharCode(rand(65,90));
			var arr=[sum1,sum3];
			var sum4=rand(0,1);
			sum+=arr[sum4];
		}
		$('.box-one').html(sum);
	}
	$('.btn-1').on('click',function(){
		var sum="";
		for(var i=0;i<6;i++){
			var sum1=rand(0,9);
			var sum3=String.fromCharCode(rand(65,90));
			var arr=[sum1,sum3];
			var sum4=rand(0,1);
			sum+=arr[sum4];
		}
		$('.box-one').empty()
		$('.box-one').html(sum);
	})
	$('.txt-1').on('change',function(){
		if($('.txt-1').val()==$('.box-one').text()){
			$('.yan-4').empty()
			$('.yan-4').html('验证码正确');
			flug=true;
		}
		if($('.txt-1').val()!=$('.box-one').text()&&!$('.txt-1').val()==""){
			$('.yan-4').empty()
			$('.yan-4').html('验证码错误');
			flug=false;
		}
		if($('.txt-1').val()==""){
			$('.yan-4').empty();
			flug=false;
		}
	})
	$('.btn').on('click',function(){
		console.log(flug)
		if($('.txt-1').val()==""||$('.pass2').val()==""||$('.pass1').val()==""||$('.txt').val()==""){
			alert('您还有资料未填')
			return;
		}
		if(flug==true){
			$('#win').html('恭喜您注册成功')
			$('form').hide()
			$('#win').show()
			setCookie($('.txt').val(),$('.pass').val(),2)
		}else{
			alert("您有资料填写错误，请重新填写")
		}
	})
	function rand(min,max){
		return min+Math.floor(Math.random()*(max-min+1));
	}
	function setCookie(key,value,day){
        var date=new Date();
        date.setDate(date.getDate()+day);
        document.cookie=key+"="+value+";expires="+date.toString();
    }

})
