var input_box = document.getElementById('input');
var list_todo = document.getElementById('todo');
var list_done = document.getElementById('done')
var unfinished_num = document.getElementById('unfinished_num');
var finished_num = document.getElementById('finished_num');

var txt1 = "<div class='selected'><input type= 'checkbox' onchange='selectAll()'/>全选</div>";
var txt2 = "<div class='unselected'><input type= 'checkbox' onchange='unselectAll()'/>全不选</div>";

var todo = document.getElementById('todo_list');
var done = document.getElementById('done_list');
var div1 = document.createElement('div');
div1.setAttribute('class', 'select');
var div2 = document.createElement('div');
div2.setAttribute('class', 'select');
todo.appendChild(div1);
done.appendChild(div2);

var i = 0,
	j = 0,
	k = 0,
	flag1 = 1,//标志位，避免多次添加
	flag2 = 1,
	flag3 = 0;//建立标志位，辨别是否为全选状态 0：否   1：是
	flag4 = 0;
/*input_box.onfocus = function(){
	if(this.value == '添加事件'){
		this.value = '';
	}
}*/
input_box.onblur = function() {
	this.placeholder = '添加事件';
	this.value = '';
}
/*更改事件数量*/
var setNum = function(num1, num2) {
	unfinished_num.innerHTML = num1;
	finished_num.innerHTML = num2;
}

//添加待完成事件:通过回车添加，回车后输入框失去焦点
document.onkeydown = function(ev) {
	if(ev.keyCode == 13) {
		if((input_box.value != '添加事件') && (input_box.value != '')) {
			i = i + 1;
			k = k + 1;
			var txt_input = input_box.value;
			//勾选事件能移到已完成区域   点击p标签能够编辑  点击a标签将当前li移除 
			var textstring = "<input type='checkbox' onchange = 'moveTo(" + i + ")' class='sel'/><p id=list_" + i + " onclick = edit(" + i + ")>" + txt_input + "</p><a id='li-" + i + "'onclick = remove(" + i + ")>-</a>";
			var txt = document.createTextNode(textstring); //创建文本节点
			var ele = document.createElement('li');
			ele.innerHTML = textstring; //可总结为一步
			list_todo.appendChild(ele);
			setNum(k, j);
			//console.log(list_todo);
		}
		input_box.blur();

	}
}

/*	勾选事件
  	获取到input,查看checked
        若为true,往下添加
  	若为false，往上添加
 	更改事件数量
 * */
var moveTo = function(i) {
	var para = document.getElementById("list_" + i); //获取p元素
	var ele_2 = para.parentElement; //获取到li
	var input_2 = ele_2.firstElementChild; //获取到input →document.getElementById().parentElement.firstElementChild
	
	
		if(input_2.checked == true) {
			j += 1;
			k -= 1;
			list_done.appendChild(ele_2); //往已完成列表添加
			input_2.setAttribute('class','unsel');
		} else if(input_2.checked == false) {
			list_todo.appendChild(ele_2); //往未完成列表移动
			input_2.setAttribute('class','sel');
			k += 1;
			j -= 1;
		}
	
	

	setNum(k, j); //更改数量
	 //判断是否出现全选全不选
}

/*点击p标签触发对P进行修改的函数,此时已经有标签产生：
 	点击p产生输入框，并获得焦点，选中已经存在的值,
 	输入事件，失去焦点：p的innerHTML为输入值
 	没有输入值，失去焦点： P的innerHtml为未修改的值
 * */
var edit = function(i) {
	var para = document.getElementById("list_" + i);
	var para_txt = para.innerHTML;
	para.innerHTML = "<input type = 'text' id='list-" + i + "' value = '" + para_txt + "' class='edit'/>";
	var input_1 = document.getElementById('list-' + i);

	input_1.select(); //怎么选中默认值？？？为什么框框也选中

	input_1.onblur = function() {
		if((input_1.value == '') || (input_1.value == para_txt)) {
			para_txt = para_txt;
		} else {
			para_txt = input_1.value;
		}
		para.innerHTML = para_txt;
	}
}
/*删除list
 * 		找到当前li
 * 		找到li的父节点
 * 		删除当前li元素
 * 		更改事件数量，判断全选全不选
 * */
var remove = function(i) {
	var a = document.getElementById('li-' + i);
	var li_1 = a.parentElement;
	var ol_1 = li_1.parentElement;
	ol_1.removeChild(li_1);
	if(ol_1.id == 'todo') {
		k -= 1;
	} else if(ol_1.id == 'done') {
		j -= 1;
	}
	setNum(k, j);
}
//显示全选和全不选
var selectA = function(k, j, flag1, flag2) {
	if(k > 1) {
		if(flag1) {
			div1.innerHTML = txt1;
			flag1 = 0; //避免重复添加
		}
	} else {
		div1.innerHTML = '';
		flag1 = 1;
	}
	if(j > 1) {
		if(flag2) {
			div2.innerHTML = txt2;
			flag2 = 0;
		}
	} else {
		div2.innerHTML = '';
		flag2 = 1;
	}

}

var div_target1 = document.getElementsByClassName('selected');//找到插入的目标元素,插入到目标元素之前
var div_target2 = document.getElementsByClassName('unselected');//找到插入的目标元素,插入到目标元素之前
	

function selectAll() {
	var input_arr = document.getElementsByClassName('sel');
	var input_curr = div_target1[0].firstElementChild;//找到当前input
	if(input_curr.checked == true){
		
		for(var i = 0; i < input_arr.length; i++) {
			input_arr[i].checked = true;
		}
		flag3 = 1;
	}else if(input_curr.checked == false){
		for(var i = 0; i < input_arr.length; i++) {
			input_arr[i].checked = false;
		}
		flag3 = 0;
	}
}



function unselectAll() {
	var input_arr = document.getElementsByClassName('unsel');
	var input_curr = div_target2[0].firstElementChild;//找到当前input
	console.log(input_curr.checked);
	if(input_curr.checked == true && flag4 == 0){
		
		for(var i = 0; i < input_arr.length; i++) {
			input_arr[i].checked = false;
		}
		flag4 = 1;
	}else if(input_curr.checked == false && flag4){
		for(var i = 0; i < input_arr.length; i++) {
			input_arr[i].checked = true;
		}
		flag4 = 0;
	}
}