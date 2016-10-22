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
(function() {
	//初始化时期显示器
	var date = new Date();
	var year = String(date.getFullYear()), //当前年
		month = String(format(date.getMonth() + 1)); //当前月
	var dateDisplay = document.getElementById('j-dateDisplay');
	date.innerHTML = year + '-' + month; //修改日期显示器时期

	//是否已首次绘图
	var isDisplay = false;
	//初次绘图触发事件
	window.addEventListener('chartLoad', function() {
		if (!isDisplay) {
			readyPie();
			isDisplay = true;
		}
	});

	//饼图绘图准备
	function readyPie() {
		getDataForPie(year, month); //获取指定月份的分类数据数组对象
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
		drawPie(pie0,'月支出饼状分布图',outArr,outArrLegend);
		drawPie(pie1,'月收入饼状分布图',inArr,inArrLegend);
	}

	/**
	 * 绘制饼图
	 * @param {Object} ele 		  绘制区所在的DOM元素
	 * @param {Object} title		  图表标题
	 * @param {Object} data		  图表数据
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
				formatter: "{a} <br/>{b} : {c} ({d}%)"
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
				data: data
			}]
		});
	}

	/**
	 * [获取指定月份数据用于绘制饼图数组]
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
			console.log('j=' + j);
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
	//事件绑定
	mui('.mui-pagination').on('tap', '.u-date', function() {
		mui.toast('图表逻辑正在开发中，目前只能显示当月数据')
	});
})();