var Local = function(){
	var game;
	/**游戏执行函数：
	 * 1、方块下落到最低端。
	 * 2、改变方块的颜色
	 * 3、消除行数
	 * 判断游戏是否结束：没有结束就更新界面，结束就停止定时器
	 * 4、更新界面：将下一项里的方块挪到主界面，并随机生成一个新的方块
	 */
	var timeCount = 0;
	var time = 0;
	var action = function(){
		var key;
		if(!game.over()){
			timeFunc();
		}
		
		if(!game.down()){
			game.fixed();//改变颜色
			game.setScore(game.cancel());//消行 
			key = game.over();
			if(key){
				
				stop();
			}else{
				game.resetData();
			}
			
		}
	}
	
	var timeFunc = function(){
		timeCount++;
		if(timeCount == 2){
			timeCount = 0;
			time = time+1;
			game.settime(time);
			if(!(time%20)){//20秒自动增加一行
				game.addLine(addL(1));
			}
		}
	}
	
	/* 开始游戏函数：初始化并更改界面
	 *	1、获取DOM对象游戏div、下一项div
	 *  2、对doms进行初始化
	 * */
	var start = function(){
		var doms = {
			gameDiv: document.getElementById('game'),
			nextDiv: document.getElementById('next'),
			timeDiv: document.getElementById('time'),
			scoreDiv:document.getElementById('score')
		}
		game = new Game();
		game.init(doms);
		bindkeyEvent();
		var timer = setInterval(action,500);
	}
	var stop = function(){
		if(timer){
			clearInterval(timer);
			timer = null;
		}
		document.onkeydown = null;
	}
	
	var addL = function(n){
		var lines = [];
		for(var i=0;i<n;i++){
			var line = [];
			for(var j=0;j<10;j++){
				line.push(Math.ceil((Math.random()+0.1)*2- 1));
			}
			lines.push(line);
		}
	
		return lines;
	}
/*
 *控制方块运动方向：获取键值根据键值判断方向
 * */
	var bindkeyEvent = function() {
		document.onkeydown = function(e){
			var code = e.keyCode || e.which;
			if(code == 40){//下移
				game.fastDown();
			}else if(code == 37){//左移
				game.left();
			}else if(code == 39){//右移
				game.right();
			}else if(code == 32){//切换状态
				game.rotate();
			}
		}
	}
	this.start = start;//指向star函数，导出API
}
