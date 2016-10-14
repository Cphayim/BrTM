//初始化
(function() {
	mui.init({
		//事件监听类型
		gestureConfig: {
			tap: true,
			doubletap: true,
			longtap: true,
			swipe: true,
			drag: true,
			hold: false,
			release: false
		}
	});
	//列表滚动属性
	mui('.mui-scroll-wrapper').scroll({
		deceleration: 0.001, //阻尼系数
		bounce: false //是否回弹
	});
	//双击NavBar返回顶部
	mui('.mui-bar').on('doubletap', 'h1', function() {
		mui('.mui-scroll-wrapper').scroll().scrollTo(0, 0, 500);
	});
	//	console.log(1)
})();
//数据载入
(function() {
	//判断本地是否有数据
	if (!localStorage.getItem('data')){
		document.querySelector('.listNull').style.display = 'block';
		return;
	};
	//JSON --> JS 对象
	var list = JSON.parse(localStorage.getItem('data'));
	//BillPanel数据加载
//	(function() {
//		var date = new Date();
//		var curYear = String(date.getFullYear()),
//			curMonth = String(format(date.getMonth() + 1));
//		console.log('curYear:' + curYear)
//		console.log('curMonth:' + curMonth)
//		var curMonthIn = 0,
//			curMonthOut = 0,
//			surplus = 0; //当月收支,
//		var curList = list[curYear + curMonth];
//		for (var k in curList) {
//			for (var j in curList[k]) {
//				console.log("curList[k][j].money:" + curList[k][j].money)
//				if (curList[k][j].type == 1) {
//					curMonthIn += Number(curList[k][j].money);
//				} else {
//					curMonthOut += Number(curList[k][j].money);
//				}
//			}
//		}
//		curMonthIn = curMonthIn.toFixed(2);
//		curMonthOut = curMonthOut.toFixed(2);
//		surplus = (curMonthIn - curMonthOut).toFixed(2);
//		mui('.m-billPanel .u-in')[0].innerHTML = curMonthIn;
//		mui('.m-billPanel .u-out')[0].innerHTML = curMonthOut;
//		mui('.m-billPanel .u-surplus')[0].innerHTML = surplus;
//	})();
	//BillLitst数据加载
	(function() {
		var billList = document.getElementById('billList');
		for (var i in list) {
			//创建月份账单容器
			var monthList = document.createElement('div');
			monthList.classList = 'monthList';
			var year = i.substr(0, 4),
				month = i.substr(4, 2),
				catStr = year + '-' + month;
			//创建月份表头
			var monthItem = document.createElement('li');
			monthItem.classList = 'monthItem mui-table-view-divider'
			monthItem.innerHTML += '<span>' + year + ' / </span><h3>' + month + '</h3>';
			for (var j in list[i]) {
				//创建日账单容器
				var dateList = document.createElement('div');
				dateList.classList = 'dateList';

				var date = format(j);
				var day = getDay(catStr + '-' + j);
				//插入日期/星期
				dateList.innerHTML += '<div class="dateItem"><span class="date">' + date + '</span><span class="day">' + day + '</span></div>';

				//创建日账单列表
				var oneList = document.createElement('ul');
				oneList.classList = 'oneList mui-table-view';
//				for (var k in list[i][j]) {
//					var detail = list[i][j][k];
//					var type = detail.type == 1 ? "in" : "out",
//						money = Number(detail.money).toFixed(2), //str->num+两位小数
//						classType = getClassTypeStr(detail.classType);
//					oneList.innerHTML += '<li class="one mui-table-view-cell mui-media"><a href="javascript:;"><i class="mui-media-object mui-pull-left u-icon-class u-icon-class-' + detail.classType + '"></i><div class="mui-media-body"><h4>' + classType + '</h4><span class="u-' + type + '">' + money + '</span><p class="mui-ellipsis">' + detail.remark + '</p></div></a></li>';
//
//				}
				dateList.appendChild(oneList);
				//将日账单容器插入月份账单容器
				monthList.insertBefore(dateList, monthList.childNodes[0]);
				//将月份表头插入月份账单容器
				monthList.insertBefore(monthItem, monthList.childNodes[0]);
			}
			billList.insertBefore(monthList, billList.childNodes[0]);
		}
		mui.init()
	})();

})();