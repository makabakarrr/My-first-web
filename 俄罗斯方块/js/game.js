//定义Game类包含dom元素，游戏矩阵，初始化游戏div,刷新游戏div
var Game = function(){
	var gameDiv;
	var nextDiv;
	var timeDiv;
	var scoreDiv;
	//分数
	var score = 0; 
	//游戏矩阵
	var gameData = [
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0]
];
//方块数组
	var curr;//当前方块
	var next;//下一项方块
//div数组
	var gameDivs = [];
	var nextDivs = [];
//初始化div函数
	var initDivs = function(container,data,divs){
		for(var i=0;i<data.length;i++){
 			var div = [];
 			for(var j = 0;j<data[0].length;j++){
 				var newNode = document.createElement('div');
 				newNode.className = 'none';
 				newNode.style.top = (i*20)+'px';
 				newNode.style.left = (j*20)+'px';
 				container.appendChild(newNode);
 				div.push(newNode);
 			}
 			divs.push(div);
 		};
 	};
//刷新div函数
	var refreshDivs = function(data,divs){
		for(var i=0;i<data.length;i++){
			for(var j=0;j<data[0].length;j++){
				if(data[i][j] == 0){
					divs[i][j].className = 'none';
				}else if(data[i][j] == 1){
					divs[i][j].className = 'done';
				}else if(data[i][j] == 2){
					divs[i][j].className = 'current';
				}
			}
		}
	}
	 
	
//初始化:游戏界面和下一项界面
	var init = function(doms){
		gameDiv = doms.gameDiv;
		nextDiv = doms.nextDiv;
		timeDiv = doms.timeDiv;
		scoreDiv = doms.scoreDiv;
		curr = SquareFactory.prototype.product(Math.ceil(Math.random()*7),Math.ceil(Math.random()*3));
		next = SquareFactory.prototype.product(Math.ceil(Math.random()*7),Math.ceil(Math.random()*3));
		initDivs(gameDiv,gameData,gameDivs);
		initDivs(nextDiv,next.data,nextDivs);
		setData();
		refreshDivs(gameData,gameDivs);
		refreshDivs(next.data,nextDivs);
	}
//满足传送数据的条件：gameData[curr.origin.x + i][curr.origin.y + j] = curr.data[i][j];
//且方块所在区域gameData的值为零
	var check = function(pos,x,y){
		if((pos.x+x<0)||(pos.x+x >= gameData.length)){
			return false;
		}else if(pos.y+y<0){
			return false;
		}else if(pos.y+y >= gameData[0].length){
			return false;
		}else if(gameData[pos.x+x][pos.y+y] == 1){
			return false;
		}else {
			return true;
		}
	}
/*判断方块能否移动到下一区域:
 * 	首先检测有值区域
 * 1、有值区的下一区域超出边界不能移动
 * 2、有值区的下一区域上gameData有值不能移动
 * */
	var canMove = function(pos,data){
		for(var i=0;i<data.length;i++){
			for(var j=0;j<data.length;j++){
				if(data[i][j] != 0){//值不为零
					if(!check(pos,i,j)){//不满足传送条件
						return false;
					}
				}
			}
		}
		return true;
	}
	
	
	var checkD = function(pos,x,y){
		if((pos.x+x<0)||(pos.x+x >= gameData.length)){
			return false;
		}else if(gameData[pos.x+x][pos.y+y] == 1){
			return false;
		}else {
			return true;
		}
	}
	var canMoveD = function(pos,data){
		for(var i=0;i<data.length;i++){
			for(var j=0;j<data.length;j++){
				if(data[i][j] != 0){//值不为零
					if(!checkD(pos,i,j)){//不满足传送条件
						return false;
					}
				}
			}
		}
		return true;
	}
//传送数据：将下一项内的方块值插入主界面
	var setDataR = function(){
		for(var i=0;i<curr.data.length;i++){
			for(var j=0;j<curr.data[0].length;j++){
				if(curr.data[i][j]!=0){
					if(curr.origin.y+j<0){
						gameData[curr.origin.x + i][j + j] = curr.data[i][j];
					}else if(curr.origin.y+j >= gameData[0].length){
						gameData[curr.origin.x + i][19] = curr.data[i][j];
					}else{
						gameData[curr.origin.x+i][curr.origin.y+j] == curr[i][j];
					}
				}
			}
		}
	}
	var setData = function(){
		for(var i=0;i<curr.data.length;i++){
			for(var j=0;j<curr.data[0].length;j++){
				if(check(curr.origin,i,j)){
					gameData[curr.origin.x + i][curr.origin.y + j] = curr.data[i][j];
				}
			}
		}
	}
//设置时间
	var settime = function(time){
		timeDiv.innerHTML = time;
	}
//设置分数值
var gameScore = 0;
	var setScore = function(line){
		
		switch(line){
			case 1:
				gameScore = gameScore+10;
				break;
			case 2:
				gameScore = gameScore+25;
				break;
			case 3:
				gameScore = gameScore+45;
				break;
			case 4:
				gameScore = gameScore+70;
				break;
			default:
				break;
		}
		
		scoreDiv.innerHTML = gameScore;
	}
	
//清除数据：注意！在小方块的无值区域上若gameData上有值要避开不清零
	var clearData = function(){ 
		for(var i=0;i<curr.data.length;i++){
			for(var j=0;j<curr.data[0].length;j++){
				if(check(curr.origin,i,j)){//重点！！！！
					gameData[curr.origin.x + i][curr.origin.y + j] = 0;
				}
					
			
			}
		}
	}

//方块下移函数  
	var down = function(){
		if(curr.canDown(canMoveD)){
			clearData();
			curr.down();
			setData();
			refreshDivs(gameData,gameDivs);
			return true;
		}else{
			return false;
		}
		
	}
	var left = function(){
		if(curr.canLeft(canMove)){
			clearData();
			curr.left();
			setData();
			refreshDivs(gameData,gameDivs);
		}
		
	};
	var right = function(){
		if(curr.canRight(canMove)){
			clearData();
			curr.right();
			setData();
			refreshDivs(gameData,gameDivs);
		}
		
	};
	var rotate= function(){
			if(curr.canRotate(canMove)){
				clearData();
				curr.rotate();
				setData();
				refreshDivs(gameData,gameDivs);
			}	
	}
	var fastDown = function(){
		while(curr.canDown(canMove)){
			down();
		}
	}
//改变小方块的颜色
	var fixed = function(){
		for(var i=0;i<curr.data.length;i++){
			for(var j=0;j<curr.data[0].length;j++){
				if(check(curr.origin,i,j)){
					if(gameData[curr.origin.x+i][curr.origin.y+j] == 2){
						gameData[curr.origin.x+i][curr.origin.y+j] = 1;
					}
				}
				
			}
		}
		refreshDivs(gameData,gameDivs);
	}
//改变小方块的同时将另一个小方块放进主界面
	var resetData = function(){
		curr = next;
		setData();
		next = SquareFactory.prototype.product(Math.ceil(Math.random()*7),Math.ceil(Math.random()*3));
		refreshDivs(gameData,gameDivs);
		refreshDivs(next.data,nextDivs);
	}
//消除主界面上已满的行
	var cancel = function(){
		var line = 0;
		for(var i=gameData.length-1;i>=0;i--){
			var clear = true;//第i行是满行
			for(var j=0;j<gameData[0].length;j++){
				if(gameData[i][j] != 1){
					clear = false;
					break;
				}
			}
			if(clear){
				line = line + 1;//没消除一行，line的值加一
				for(var m=i;m>0;m--){
					for(var n=0;n<gameData[0].length;n++){
						gameData[m][n] = gameData[m-1][n];//先将第i行的值更改为第i-1行，i-1行改为i-2，所以结果第一行为空
					}
				}
					for(var n=0;n<gameData[0].length;n++){
						gameData[0][n] = 0;//再为第一行赋值
					}
				i++;
			}
		}
		return line;
	}
	
//检测游戏是否结束
	var over = function(){
		var gameover = false;
		for(var i=0;i<gameData[0].length;i++){
			if(gameData[1][i] == 1){
				gameover = true;
			}
		}
		return gameover;
	}
/*为底部添加干扰行lines
 * 1、将gameData往上移
 * 2、将lines添加到gameData底部
 * 3、改变小方块的纵坐标，往上挪lines的长度
 */
	var addLine = function(lines){
		for(var i=0;i<gameData.length-lines.length;i++){
			gameData[i] = gameData[i+lines.length];
		}
		for(var j=0;j<lines.length;j++){
			gameData[j-lines.length+gameData.length] = lines[j];
		}
		curr.origin.x = curr.origin.x - lines.length;
		if(curr.origin.x<0){
			curr.origin.x = 0;
		}
		refreshDivs(gameData,gameDivs);
	}

	//导出API
	this.init = init;//定义init指向init函数
	this.down = down;
	this.left = left;
	this.right = right;
	this.rotate = rotate;
	this.fastDown = fastDown;
	this.fixed = fixed;
	this.resetData = resetData; 
	this.cancel = cancel;
	this.over = over;
	this.settime = settime;
	this.setScore = setScore;
	this.addLine = addLine;
}
