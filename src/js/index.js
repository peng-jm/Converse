	$(function(){
		$('.mouse').mouseenter(function(){
			$('.position-box').show();
			$.ajax({
				url:"./js/list.json",
				type:'get',
				datatype:'jsonp',
				success:function(data){
					$('.ul-one').empty();
					$('.ul-two').empty();
					var str=""
					var str1=""
					for(var i=0;i<data.length;i++){
						if(i<=4){
							data[i].forEach(function(value){
								str+='<li><a href="#"><img src="'+value.IP+'">'+value.name+'</a></li>'
							})
							
						}
						if(i>4){
							data[i].forEach(function(value){
								str1+='<li><a href="#"><img src="'+value.IP+'">'+value.name+'</a></li>'
							})
						}
					}
					$('.ul-one').append(str)
					$('.ul-two').append(str1)
				}
			})
		})
		$('#nav').mouseleave(function(){
			$('.position-box').hide()
			$('.ul-one').empty();
			$('.ul-two').empty();
		})
		var mySwiper=new Swiper('.swiper-container',{
		// direction:'vertical',//垂直切换选项
		loop:true,//循环模式选项
		//分页器（小圆点）
		pagination:{
			el:'.swiper-pagination',
			clickable:true,
		},
		//前进后退按钮
		navigation:{
			nextEl:'.swiper-button-next',
			prevEl:'.swiper-button-prev',
		},
		//自动播放
		autoplay:{
			autoplay:true,
			delay:1000,
			disableOnInteraction:false,
		},
		//滚动条
		// scrollbar:{
		// 	el:'.swiper-scrollbar',
		// },
	})
	//鼠标覆盖停止自动切换
		mySwiper.el.onmouseover = function(){
			mySwiper.autoplay.stop();
		}
	//鼠标离开开始自动切换
		mySwiper.el.onmouseout = function(){
			mySwiper.autoplay.start();
		}
		onscroll=function(){
			var scrollY=scroll().top
				var y=getClient().height/4
				$('.vxone')
				.stop(true,false)
				.animate({top:y+scrollY},700)
			if(scrollY<=0){
				$('vx').animate({top:200})
			}
			if(scrollY>150){
				$('#header').addClass('pos')
			}
			if(scrollY<150){
				$('#header').removeClass('pos')
			}
			if(scrollY>400){
				$('#getback').show()
			}
			if(scrollY<400){
				$('#getback').hide()
			}
		}
		$('.get').click(function(){
 			document.body.scrollTop = document.documentElement.scrollTop = 0;
 		})
		function scroll(){
			return {
				left:document.documentElement.scrollLeft+document.body.scrollLeft,
				top:document.documentElement.scrollTop+document.body.scrollTop
			}
		}
		function getClient(){
           if(window.innerWidth!=undefined){
               return {
                   width:window.innerWidth,
                   height:window.innerHeight
               }
           }else if(document.compatMode=="Css1Comapt"){
               return {
                   width:document.documentElement.clientWidth,
                   height:document.documentElement.clientHeight
               }
           }else{
               return {
                   width:document.body.clientWidth,
                   height:document.body.clientHeight
               }
           }
		}
	})
