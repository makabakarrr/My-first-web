
$(function(){
	var index = 0;  //轮播图的索引
	var index_1 = 0; //热门商品栏的索引
	var pictures = $('#bg li');//把所有图片存入数组
	var dots = $('#dot li'); //把小圆点存入数组
	var input_box = $('#hot_text');
	var old_text = $('#hot');
	var new_text = old_text;
	/*点击输入框：删除原有的内容，提示文字*/

	input_box.focus(function(){
		input_box.parentNode.removeChild(old_text);
	});
	input_box.blur(function(){
		input_box.parentNode.appendChild(new_text);
	});
	
	
	
	/*轮播图效果*/
	
//改变要显示的图片
/*pictures.eq(index).addClass('show').siblings().removeClass('show');
		添加类，显示出来.并将其兄弟节点移除类，保证只有一张图片是显示状态
 		先将类删除，再找到索引为index的图片，淡入*/
	function changePic(){

		pictures.removeClass('show').hide().eq(index).fadeIn(800).addClass('show');
		
		dots.eq(index).addClass('show').siblings().removeClass('show');	
	}
//点击小圆点切换图片
	dots.click(function(){
		//改变index的值 ：获取鼠标点击的圆点的索引值，将其赋给index
		index = $(this).index();
		changePic();
	})
//自动切换图片   定时器
	setInterval(function(){
		if(index<2){
			index++;
		}else{
			index = 0;
		}
		changePic();
	},1500)
	
/*热门商品栏的动作*/	

//通过点击左右箭头实现翻页效果
	var page_turn = $('.page a');
	var page_left = $('#left');
	var page_right = $('#right');
	var page_left_1 = $('a.left');
	var page_right_1 = $('a.right')

	page_turn.click(function(){
		var index_page = $(this).index();
		page_turn.eq(index_page).addClass('fortable').siblings().removeClass('fortable');
	})
	page_left.click(function(){
		$('.content_2_container').css('transform','translateX(0)');
	})
	page_right.click(function(){
		$('.content_2_container').css('transform','translateX(-50%)');
	})	
	page_left_1.hover(function(){
		$('.container_7').css('transform','translateX(0)');
	})
	page_right_1.hover(function(){
		$('.container_7').css('transform','translateX(-50%)');
	})
//鼠标点击颜色栏改变显示的图片
 	var address_img_1 = ["img/坚果R1/坚果R1黑色.png","img/坚果R1/坚果R1.png"];
	$('#style_1 li').click(function(){
		$(this).attr('class','active');
		$(this).siblings().attr('class','');
		var index_img = $(this).index();
		$('#img_1 img').attr('src',address_img_1[index_img]);
	})
	var address_img_2 = ["img/坚果3/坚果3红色.png","img/坚果3/坚果3白色.png","img/坚果3/坚果3黑亮色.png","img/坚果3/坚果3黑亮色1.png","img/坚果3/酒红坚果3.png"];
	$('#style_2 li').click(function(){
		$(this).attr('class','active');
		$(this).siblings().attr('class','');
		var index_img = $(this).index();
		$('#img_2 img').attr('src',address_img_2[index_img]);
	})	
	var address_img_3 = ["img/坚果Pro2/坚果Pro2红色.png","img/坚果Pro2/坚果Pro2金色.png","img/坚果Pro2/坚果Pro2黑色.png","img/坚果Pro2/坚果Pro2白色.png"];
	$('#style_3 li').click(function(){
		$(this).attr('class','active');
		$(this).siblings().attr('class','');
		var index_img = $(this).index();
		$('#img_3 img').attr('src',address_img_3[index_img]);
	});
	var address_img_4 = ["img/坚果Pro/坚果Pro红色.png","img/坚果Pro/坚果Pro银魂.png","img/坚果Pro/坚果Pro黑色.png","img/坚果Pro/坚果Pro棕色.png"];
	$('#style_4 li').click(function(){
		$(this).attr('class','active');
		$(this).siblings().attr('class','');
		var index_img = $(this).index();
		$('#img_4 img').attr('src',address_img_4[index_img]);
	})
})

