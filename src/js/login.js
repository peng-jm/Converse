	 function getCookie(key){
		var str=document.cookie;//所有的当前域下的cookie，是字符串格式
		var arr = str.split("; ");//字符串转数组格式
		for(var i=0;i<arr.length;i++){
			var newArr=arr[i].split('=');
			if(newArr[0]==key){
				return newArr[1];
			}
		}
    }
	//console.log()
 $('.btn').click(function(){
	 console.log(getCookie($('.txt').val()))
	 if($('.pass1').val()==getCookie($('.txt').val())){
		 $('form').hide();
		 $('#box').show();
		 $('#box').html('恭喜您登陆成功')
	 }else{
		 alert('用户名或密码错误')
	 }
 })
