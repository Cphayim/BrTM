//初始化
(function() {
	mui.init();
	//列表滚动属性
	mui('.mui-scroll-wrapper').scroll({
		deceleration: 0.001, //阻尼系数
		bounce: true //是否回弹
	});
})();
//图表
//(function() {
//初始化时期显示器
var date = new Date();
var curYear = date.getFullYear(), //当前年
	curMonth = date.getMonth() + 1; //当前月
var year = curYear, //计数年
	month = curMonth; //计数月
var dateDisplay = document.getElementById('j-dateDisplay');
var curType = 0; //当前图表类型:0[pie],1[bar]
//是否已首次绘图
var isDisplay = false;
//初次绘图触发事件
window.addEventListener('chartLoad', function() {
	if (!isDisplay) {
		readyPie();
		isDisplay = true;
	}
});

/**
 * 饼图绘图准备
 * 1.获取canvas节点以及调用数据库获取指定数据生成绘图数组
 * 2.调用绘制饼图的函数
 */
function readyPie() {
	var y = String(year),
		m = String(format(month));
	dateDisplay.innerHTML = y + '-' + format(m); //修改日期显示器
	getDataForPie(y, m); //获取指定月份的分类数据数组对象
	var inArr = JSON.parse(localStorage.inArrPie); //收入分类数据数组对象
	var outArr = JSON.parse(localStorage.outArrPie); //支出分类数据数组对象
	var inArrLegend = [],
		outArrLegend = [];
	for (var i = 0; i < inArr.length; i++) {
		inArrLegend[i] = inArr[i].name;
	}
	for (var i = 0; i < outArr.length; i++) {
		outArrLegend[i] = outArr[i].name;
	}
	var pie0 = document.getElementById('j-pie0'); //饼图支出canvas
	var pie1 = document.getElementById('j-pie1'); //饼图收入canvas
	drawPie(pie0, '月支出饼状分布图', outArr, outArrLegend);
	drawPie(pie1, '月收入饼状分布图', inArr, inArrLegend);
}
/**
 * 绘制饼图
 * @param {Object} ele 		  绘制区所在的DOM元素
 * @param {Object} title		  图表标题
 * @param {Object} data		  图表数据数组
 * @param {Object} legendData 分类说明
 */
function drawPie(ele, title, data, legendData) {
	var myChart = echarts.init(ele, 'echarts-roma');
	myChart.setOption({
		backgroundColor: '#f3f3f3',
		title: {
			text: title,
			x: 'center',
			top: '20'
		},
		tooltip: {
			trigger: 'item',
			formatter: "{a} <br/>{b} : ￥{c} ({d}%)"
		},
		legend: {
			orient: 'horizontal',
			width: '80%',
			left: 'center',
			bottom: '20',
			data: legendData
		},
		series: [{
			name: title,
			type: 'pie',
			radius: '50%',
			data: data,
			itemStyle: {
				emphasis: {
					shadowBlur: 10,
					shadowOffsetX: 0,
					shadowColor: 'rgba(0, 0, 0, 0.5)'
				}
			}
		}],
		color: ['#ae3c5c', '#2f4554', '#61a0a8', '#d48265', '#91c7ae', '#749f83', '#ca8622', '#bda29a', '#6e7074', '#546570', '#c4ccd3']
	});
}
/**
 * 柱状图绘图准备
 * 1.获取canvas节点以及调用数据库获取指定数据生成绘图数组
 * 2.调用绘制柱状图的函数
 */
function readyBar(){
	var y = String(year);
	dateDisplay.innerHTML = y;//修改日期显示器
	getDataForBar(y);//获取指定年数据数组
	var inArr = JSON.parse(localStorage.inArrBar);//按月收入数组
	var outArr = JSON.parse(localStorage.outArrBar);//按月支出数组
	var bar = document.getElementById('j-bar');
	drawBar(bar,y+'年收支柱状图',outArr,inArr);
}
/**
 * 绘制柱状图
 * @param {Object} ele 		绘制区所在的DOM元素
 * @param {Object} title		图表标题
 * @param {Object} data0		支出数据数组
 * @param {Object} data1		收入数据数组
 */
function drawBar(ele, title, data0, data1) {
	var xAxis = [];//X轴生成
	xAxis.length = 12;
	for (var i = 0; i < xAxis.length; i++) {
		xAxis[i] = i + 1;
	}
	var myChart = echarts.init(ele);
	var option = {
		grid:{
			x:55
		},
		title: {
			text: title,
			x: 'center'
		},
		tooltip: {
			formatter: "{a} <br/>{b}月 : ￥{c}"
		},
		legend: {
			orient: 'horizontal',
			width: '80%',
			left: 'center',
			bottom: '0',
			data: ['支出', '收入']
		},
		xAxis: {
			data: xAxis,
			name: '月'
		},
		yAxis: {
			name: '金额/￥'
		},
		series: [{
			name: '支出',
			type: 'bar',
			data: data0
		},{
			name: '收入',
			type: 'bar',
			data: data1
		}],
		color: ['#ae3c5c', '#2f4554', '#61a0a8', '#d48265', '#91c7ae', '#749f83', '#ca8622', '#bda29a', '#6e7074', '#546570', '#c4ccd3']
	};

	// 使用刚指定的配置项和数据显示图表。
	myChart.setOption(option);
}
/**
 * [获取指定月份数据的数组，用于绘制饼图]
 * @param  {[type]} year  [年]
 * @param  {[type]} month [月]
 */
function getDataForPie(year, month) {
	var inArr = [], //收入建图数组
		outArr = []; //支出建图数组
	inArr.length = 4; //数组长度
	outArr.length = 7;
	//初始化数组对象
	for (var i = 0; i < inArr.length; i++) {
		inArr[i] = {}; //创建对象
		//对象初始化
		inArr[i].name = getInClassTypeStr(i);
		inArr[i].value = 0;
	}
	for (var i = 0; i < outArr.length; i++) {
		outArr[i] = {}; //创建对象
		//对象初始化
		outArr[i].name = getOutClassTypeStr(i);
		outArr[i].value = 0;
	}
	//初始化存入localStorahe
	localStorage.inArrPie = JSON.stringify(inArr);
	localStorage.outArrPie = JSON.stringify(outArr);
	//拼接年月
	var date = year + month;
	//数据库为空
	if (!localStorage.data) return;
	var list = JSON.parse(localStorage.data);
	//当前月份数据为空
	if (isEmptyObject(list[date])) return;
	var monthList = list[date];
	//遍历月数据表
	for (var j in monthList) {
		for (var k in monthList[j]) {
			var detail = monthList[j][k]; //详细信息
			money = Number(detail.money);
			if (detail.type == 1) { //收入
				inArr[getInClassTypeIndex(detail.classType)].value += money;
			} else { //支出
				outArr[getOutClassTypeIndex(detail.classType)].value += money;
			}
		}
	}
	//覆盖初始化数据
	localStorage.inArrPie = JSON.stringify(inArr);
	localStorage.outArrPie = JSON.stringify(outArr);
}
/**
 * [获取制定年份数据的数组，用于绘制柱状图]
 * @param  {[type]} year [年]
 */
function getDataForBar(year) {
	var inArr = [], //收入建图数组
		outArr = []; //支出建图数组
	inArr.length = 12;
	outArr.length = 12;
	//初始化数组
	for (var i = 0; i < 12; i++) {
		inArr[i] = 0;
		outArr[i] = 0;
	}
	//初始化数据存入localStorage
	localStorage.inArrBar = JSON.stringify(inArr);
	localStorage.outArrBar = JSON.stringify(outArr);
	//数据库为空
	if (!localStorage.data) return;
	var list = JSON.parse(localStorage.data);
	//遍历整个数据库
	for (var i in list) {
		//不是当前年则continue
		if (!(i.substr(0, 4) == year)) continue;
		var month = Number(i.substr(-2)); //获取月数
		for (var j in list[i]) {
			for (var k in list[i][j]) {
				var detail = list[i][j][k]; //详细信息
				money = Number(detail.money);
				if (detail.type == 1) {
					inArr[month - 1] += money;
				} else {
					outArr[month - 1] += money;
				}
			}
		}
	}
	//覆盖初始化数据
	localStorage.inArrBar = JSON.stringify(inArr);
	localStorage.outArrBar = JSON.stringify(outArr);
}
//事件绑定
//图表类型切换
var isOpen = false; //图表切换器是否开启
mui('.mui-pagination').on('tap', '.chartType', function() {
	if (!isOpen) {
		this.querySelector('a').className = 'mui-icon mui-icon-up';
		document.getElementById('j-typeSelector').style.display = 'block';
		isOpen = !isOpen;
	} else {
		this.querySelector('a').className = 'mui-icon mui-icon-down';
		document.getElementById('j-typeSelector').style.display = 'none';
		isOpen = !isOpen;
	}
});
mui('#j-typeSelector').on('change', 'input', function() {
	var pieBox = document.getElementById('j-pie-box'),
		barBox = document.getElementById('j-bar-box');
	if (this.value == 'pie') {
		pieBox.style.display = 'block';
		barBox.style.display = 'none';
		curType = 0;
		readyPie();
	} else if (this.value == 'bar') {
		barBox.style.display = 'block';
		pieBox.style.display = 'none';
		curType = 1;
		readyBar();
	}
	var chartType = document.querySelector('.chartType');
	chartType.querySelector('a').className = 'mui-icon mui-icon-down';
	document.getElementById('j-typeSelector').style.display = 'none';
	isOpen = false;
});
//上个月图表
mui('.mui-pagination').on('tap', '.mui-previous', function() {
	//判断当前图表类型
	if (curType === 0) { //饼图
		if (month === 1) { //返回上一年，不返回2016年之前
			if (year - 1 < 2016) {
				mui.toast('没法再往前了，记个账还没出生呢');
				return;
			}
			year--;
			month = 12;
		} else { //返回上个月
			month--;
		}
		readyPie();
	} else { //柱状图
		if(year-1 <2016){
			mui.toast('没法再往前了，记个账还没出生呢');
				return;
		}
		year--;
		readyBar();
	}
});
//下个月图表
mui('.mui-pagination').on('tap', '.mui-next', function() {
	//判断当前图表类型
	if (curType === 0) { //饼图
		if (year === curYear && month + 1 > curMonth) {
			mui.toast('不能超过当前年月哦！');
			return;
		}
		if (month === 12) {
			if (year + 1 > curYear) {
				mui.toast('不能超过当前年月哦！');
				return;
			}
			year++;
			month = 1;
		} else {
			month++;
		}
		readyPie();
	} else { //柱状图
		if(year+1>curYear){
			mui.toast('想飞到明年？');
			return;
		}
		year++;
		readyBar();
	}
});
//})();