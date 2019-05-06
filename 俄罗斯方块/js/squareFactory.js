/**
 *功能： 生产一个新的俄罗斯方块
 */
var Square1 = function(){
	Square.call(this);
	this.data = [
		[0,2,0,0],
		[0,2,0,0],
		[0,2,0,0],
		[0,2,0,0]
	];
}
Square1.prototype = Square.prototype;

var Square2 = function(){
	Square.call(this);
	this.data = [
		[0,2,0,0],
		[0,2,2,0],
		[0,2,0,0],
		[0,0,0,0]
	];
}
Square2.prototype = Square.prototype;

var Square3 = function(){
	Square.call(this);
	this.data = [
		[0,2,0,0],
		[0,2,0,0],
		[0,2,2,0],
		[0,0,0,0]
	];
}
Square3.prototype = Square.prototype;

var Square4 = function(){
	Square.call(this);
	this.data = [
		[0,0,2,0],
		[0,0,2,0],
		[0,2,2,0],
		[0,0,0,0]
	];
}
Square4.prototype = Square.prototype;

var Square5 = function(){
	Square.call(this);
	this.data = [
		[0,0,0,0],
		[0,2,2,0],
		[2,2,0,0],
		[0,0,0,0]
	];
}
Square5.prototype = Square.prototype;

var Square6 = function(){
	Square.call(this);
	this.data = [
		[0,0,0,0],
		[0,2,2,0],
		[0,0,2,2],
		[0,0,0,0]
	];
}
Square6.prototype = Square.prototype;

var Square7 = function(){
	Square.call(this);
	this.data = [
		[0,0,0,0],
		[0,2,2,0],
		[0,2,2,0],
		[0,0,0,0]
	];
}
Square7.prototype = Square.prototype;

var SquareFactory = function(){};
//生产出带随机旋转状态的随机方块
SquareFactory.prototype.product = function(index,num){
	var square;
	switch(index){
		case 1:
			square = new Square1();
			break;
		case 2:
			square = new Square2();
			break;
		case 3:
			square = new Square3();
			break;
		case 4:
			square = new Square4();
			break;
		case 5:
			square = new Square5();
			break;
		case 6:
			square = new Square6();
			break;
		case 7:
			square = new Square7();
			break;
		default:
			break;
	}
	square.rotate(num);
	return square;
	
}
