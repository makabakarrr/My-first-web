//方块类
var Square = function(){
	//定义方块数据
	this.data = [
		[0,0,0,0],
		[0,0,0,0],
		[0,0,0,0],
		[0,0,0,0]
	];
	//方块原点
	this.origin = {
		x: 0,
		y: 3
	}
	this.times = 0;
	
}
Square.prototype.canDown = function(canMoveD){
		var test={};
		test.x = this.origin.x+1;
		test.y = this.origin.y;
		return canMoveD(test,this.data);
}
Square.prototype.down = function(){
	this.origin.x = this.origin.x + 1;
}
Square.prototype.canLeft = function(canMove){
		var test={};
		test.x = this.origin.x;
		test.y = this.origin.y-1;
		return canMove(test,this.data);
}
Square.prototype.left = function(){
	this.origin.y = this.origin.y - 1;
}
Square.prototype.canRight = function(canMove){
		var test={};
		test.x = this.origin.x;
		test.y = this.origin.y + 1;
		return canMove(test,this.data);
}
Square.prototype.right = function(){
	this.origin.y = this.origin.y + 1;
}
Square.prototype.canRotate = function(canMove){
	var t = this.times +1;
	t = t%4;//四种旋转方式
	var test = [
		[0,0,0,0],
		[0,0,0,0],
		[0,0,0,0],
		[0,0,0,0]
	];
	for(var k=0;k<t;k++){
		for(var i=0;i<this.data.length;i++){
			for(var j=0;j<this.data[0].length;j++){
				test[i][j] = this.data[j][3-i];
			}
		}
	}
	return canMove(this.origin,test);
}
Square.prototype.rotate = function(num){
	if(!num){
		num = 1;
	}
	this.times = this.times + 1 + num;
	var t = this.times % 4;
	var rorate_a = [
		[0,0,0,0],
		[0,0,0,0],
		[0,0,0,0],
		[0,0,0,0]
	];
	for(var k=0;k<=t;k++){
		for(var i=0;i<this.data.length;i++){
			for(var j=0;j<this.data[0].length;j++){
				rorate_a[i][j] = this.data[j][3-i];
			}
		}
	}
	
	this.data = rorate_a;
	
}
