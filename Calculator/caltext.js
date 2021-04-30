"use script";

const $contents = document.getElementById("sometexts");//計算式の親要素
const $caltext = document.getElementsByClassName("caltext");//計算式
const $cal = document.getElementsByClassName("cal");//演算子
const $number = document.getElementsByClassName("number");//数字
const $breaket = document.getElementsByClassName("breaket");//()

let aflg = 0;
let bflg = 0;

//文字打つところの表示
let pointer = document.createElement("p").textContent;
pointer = " |";

function pointerfunc() {
	if (aflg === 0) {
        pointer = " |";
		$caltext[index].children[0].textContent = total + pointer;
		aflg = 1;
	}else if (aflg === 1) {
		pointer = "";
		$caltext[index].children[0].textContent = total + pointer;
		aflg = 0;
	};
	setTimeout("pointerfunc()", 450);
};

//色々と定義
let index = 0;
let total = ""; //表示する数値
let work = ""; //計算する数値
let answer = ""; //計算して出た数値
let number = ""; //数値
let cal = ""; //演算子
let aftnumber = 0;//数値の後
let aftcal = 0;//演算子の後
let sqrt = 0;//√の後
let sqrtnum = "";//√の計算する数値
let aftbrk = 0;//括弧の後
let brknum = "";//括弧で囲われた数値
let afteq = 0; //=の後
let h = [""];
pointerfunc();

//数値
for (let i = 0; i < $number.length; i++) {
	$number[i].addEventListener("click", (e)=>{
		
		number = e.target.id;
		total = total + number;
		$caltext[index].children[0].textContent = total + pointer;
		
		if (sqrt === 1 && aftbrk === 0) {
			sqrtnum += number;
		}else if(aftbrk === 1) {
			brknum += number;
		}else{
			work += number;
		};
		
		aftnumber = 1;
		aftcal = 0;
		console.log(work);
		h[index]+="num";
		//console.log(allnum);
		//console.log(allaft);
	});
};

//演算子
for (let i = 0; i < $cal.length; i++) {
	$cal[i].addEventListener("click", (e)=>{
		
		cal = "";
		cal = e.target.id;
		total = total + cal;
		$caltext[index].children[0].textContent = total + pointer;
		
		if (e.target.id === "√") {
			cal = "";
			work += cal;
			sqrt = 1;
			if (aftnumber === 1 && aftbrk === 0) {
				work += "*";
			};
		}else if (sqrt === 1 && aftbrk === 0) {
			work += Math.sqrt(sqrtnum);
		    sqrtnum = "";
		    sqrt = 0;
			aftnumber = 0;
		}else {
			aftnumber = 0;
		};
		
		if (aftbrk === 1) {
			brknum += cal;
		}else if(sqrt === 0){
			work = work + cal;
		};
		
		aftcal = 1;
		//aftnumber = 0;
		console.log(work);
		h[index] += "cal";
		//console.log(brknum);
	});
};

//括弧
let totalbrk = "";
for (let i = 0; i < $breaket.length; i++) {
	$breaket[i].addEventListener("click", (e)=>{
		
		total = total + e.target.id;
		$caltext[index].children[0].textContent = total + pointer;
		
		if (e.target.id === "(") {
			if (aftnumber === 1 && sqrt === 0) {
		        //数値の後
			    work += "*";
		    };
		    aftbrk = 1;
			brknum = "";
		}else {
			if (sqrt === 1 && aftnumber === 1) {
				sqrtnum = eval(brknum);
			    work += Math.sqrt(sqrtnum);
				sqrt = 0;
				sqrtnum = "";
				aftnumber = 0;
			}else {
				brknum = work + eval(brknum);
				work = brknum;
			    //work += eval(brknum);
		    };
			//brknum = "";
			aftbrk = 0;
		};
		
		console.log(work);
	});
};
 
// イコール
function equalwork() {
	if (sqrt === 1) {
		work = work + Math.sqrt(sqrtnum);
	};
	console.log(work);
	answer = eval(work);
	total = total + "=" + answer;
	work = work + "=" + answer;
	$caltext[index].children[0].textContent = total + pointer;
	afteq = 1;
};


function restart() {
	[total, work, answer, sqrtnum, brknum] = ["", "", "", "", ""];
	[aftnumber, aftcal, sqrt, aftbrk, afteq, aflg, bflg] = [0, 0, 0, 0, 0, 0, 0];
	$caltext[index].children[0].textContent = total + pointer;
};

//acボタン
function acwork(){
    restart();
};

//削除ボタン
function deletefunc() {
	
	if (total.length === 0 && index !== 0) {
		index--;
		$caltext[index+1].children[0].textContent = "";
		total = $caltext[index].children[0].textContent;
	}else if (afteq === 0) {
	
	    let slicenum = total.slice(-1);
	    total = total.slice(0,-1);
	
	    if (sqrt === 1) {
	    	if (aftbrk === 0) {
		        sqrtnum = sqrtnum.slice(0,-1);
	        };
	    }else if (aftbrk === 1) {
		    brknum = brknum.slice(0,-1);
	    }else {
		    work = work.slice(0,-1);
	    };
	
	    if (slicenum === "√") {
		    sqrt = 0;
		    if (aftnumber === 1) {
		    	work = work.slice(0, -1);
		    };
	    }else if (slicenum === "(") {
		    aftbrk = 0;
		    if (aftnumber === 1) {
		    	work = work.slice(0, -1);
		    };
	    }else if (slicenum === ")") {
	    	aftbrk = 1;
	    };
	
	    if (aftnumber === 1) {
		    slicenum = total.slice(-1);
		    slicenum = slicenum.replace(/[^0-9]/g, "");
		    if (slicenum.length === 0) {
		     	aftnumber = 0;
		    };
	    }else if (aftcal === 1) {
		    slicenum = total.slice(-1);
		    slicenum = slicenum.replace(/[^0-9]/g, "");
		    if (slicenum.length === 1) {
		    	aftnumber = 1;
		    	aftcal = 0;
		    };
	    };
	    $caltext[index].children[0].textContent = total + pointer;
	    console.log(work);
    };
};

//改行
function nextcolumn() {
	h.push("");
	console.log(h[index])
	let copytext = $contents.firstElementChild.cloneNode(true);
	$contents.appendChild(copytext);
	copytext.children[0].textContent = "";
	index++;
	$caltext[index-1].children[0].textContent = total;
	restart();
	$caltext[index].children[0].textContent = total + pointer;
};
