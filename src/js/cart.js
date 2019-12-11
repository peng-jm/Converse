(function(){
	var products=[
		{
			name:"【男装】Converse All Star Funnel Neck Top",
			xinghao:"10018299001",
			yanse:"颜色：黑色",
			chima:"尺码：170",
			price:"¥469.00",
			pic:"./img/cart.png"
		},
		{
			name:"【男女同款】Chuck 70",
			xinghao:"165965C745",
			yanse:"颜色：天空蓝/白",
			chima:"尺码：35",
			price:"¥669.00",
			pic:"./img/xie10.png"
		},
	]
	class shoppingCart{
		constructor(containerId,products){
			this.container=document.getElementById(containerId);
			this.shopList=document.createElement('ul');
			this.cartList=document.createElement('ul');
			this.products=products;
			this.cartProducts=this.getStorage()||[];//购物车里的商品集合
		}
		setStorage(json){
			localStorage.setItem('cart',JSON.stringify(json));
		}
		getStorage(){
			return JSON.parse(localStorage.getItem('cart'))||[];
		}
		init(){
			this.initShopList();//初始化商品列表
			if(this.getStorage().length>0){
				this.renderCartList();//如果本地存储有数据，调用一次渲染购物车函数
			}
		}
		initShopList(){
			var str="";
			this.products.forEach((value)=>{
				str+=`<li class="li-1">
						<div class="img">
							<img src="${value.pic}">
						</div>
						<div class="txt">
							<h3>${value.name}</h3>
							<span class="span1">型号：${value.xinghao}</span>
							<span>${value.yanse}</span>
							<span>${value.chima}</span>
						</div>
						<div class="price">
							<span>${value.price}</span><br/>
							<a href="javascript:;" class="increase-one">添加到购物车</a>
						</div>
					</li>`
			})
			this.shopList.innerHTML=str;
			this.container.appendChild(this.shopList)
			//调用addCartListEvent,给加入购物车按钮添加事件
			this.addCartListEvent();
		}
		addCartListEvent(){
			var that=this;//that是实例对象
			var addCartBtnArr=this.container.querySelectorAll('.increase-one');
			addCartBtnArr.forEach((addCartBtn)=>{
				addCartBtn.onclick=function(){
					//事件函数中的this是事件源：当前被点击的a标签
					var li = this.parentNode.parentNode;
					var currentProduct={
						name:li.children[1].children[0].innerHTML,
						xinghao:li.children[1].children[1].innerHTML,
						yanse:li.children[1].children[2].innerHTML,
						chima:li.children[1].children[3].innerHTML,
						price:li.children[2].children[0].innerHTML,
						pic:li.children[0].children[0].src,
					}
					that.addToCartProducts(currentProduct);
					that.renderCartList();
				}
			})
		}
		addToCartProducts(currentProduct){//接收一个新商品信息，然后把这个商品信息存入到本地存储中
			this.cartProducts=this.getStorage()
			for(var i=0;i<this.cartProducts.length;i++){
				if(this.cartProducts[i].xinghao==currentProduct.xinghao){
					//如果你传入的这个商品信息在购物列表中有重复，就直接把购物车列表中的商品数量加1
					this.cartProducts[i].num++;
					this.setStorage(this.cartProducts);
					return;
				}
			}
			//如果你传入的这个商品信息在购物车列表中没有重复，就直接添加到购物车列表中
			currentProduct.num=1;
			this.cartProducts.push(currentProduct);
			this.setStorage(this.cartProducts);
		}
		renderCartList(){
			var str="";
			this.getStorage().forEach((value)=>{
			    str+=`
					<li class="cart-list1">
						<div class="cart-img1">
							<img src="${value.pic}">
						</div>
						<div class="cart-txt1">
							<h3>${value.name}</h3>
							<span>型号：${value.xinghao}</span>
							<span>${value.yanse}</span>
							<span>${value.chima}</span>
						</div>
						<div class="sum-box">
								<i class="sum1">数量</i>
								<a class="jia">+</a>
								<i class="sumbox">${value.num}</i>
								<a class="jian">-</a>
						</div>
						<div class="cart-price1">
							<a href="javascript:;" class="del">删除</a>
							<span>¥469.00</span>
							<a href="javascript:;" class="jie">结算</a>
						</div>
					</li>
				`
			});
			this.cartList.innerHTML=str;
			document.getElementById('cart').appendChild(this.cartList)
			this.deleteProductEvent();
			this.changeNumberEvent();
		}
		changeNumberEvent(){
			var that=this;
			var aArr=document.getElementById('cart').querySelectorAll('.sum-box');
			aArr.forEach((aArrA)=>{
				aArrA.onclick=function(e){
					var target=e.target;
					var name=this.parentNode.children[1].children[0].innerHTML;
					if(target.className=="jian"){
						that.jianNum(name);
					}
					if(target.className=="jia"){
						that.jiaNum(name);
						that.renderCartList();
					}
				}
			})
		}
		jianNum(name){
			var arr=this.getStorage();
			for(var i=0;i<arr.length;i++){
				if(arr[i].name==name){
					arr[i].num--;
					console.log(arr[i].num)
					this.setStorage(arr);
					this.renderCartList();
					if(arr[i].num<=0){
						this.deleteFormCartProducts(name);
						return;
					}
					return;
				}
			}
		}
		jiaNum(name){
			var arr=this.getStorage();
			for(var i=0;i<arr.length;i++){
				if(arr[i].name==name){
					arr[i].num++;
					this.setStorage(arr);
					return;
				}
			}
		}
		deleteProductEvent(){
			//添加商品删除事件
			var that=this;
			var delArr=document.getElementById('cart').querySelectorAll('.del');
			delArr.forEach((delBtn)=>{
				delBtn.onclick=function(){
					var name=this.parentNode.parentNode.children[1].children[0].innerHTML//删除按钮
					that.deleteFormCartProducts(name);
				}
			})
		}
		deleteFormCartProducts(name){
			this.cartProducts=this.getStorage()
			//从购物车列表中删除商品方法
			this.cartProducts=this.cartProducts.filter((product)=>{
				if(product.name==name){
					return false;
				}else{
					return true;
				}
			});
			this.setStorage(this.cartProducts);
			this.renderCartList();
			if(this.getStorage()<1){
				this.cartList.innerHTML=""
			}
		}
	}
	var car=new shoppingCart("list",products);
	car.init()
})()
