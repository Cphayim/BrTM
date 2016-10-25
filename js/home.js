//初始化
(function() {
	console.log(localStorage.timestamp);
	mui.init({
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
	//开启轮播
	mui('.mui-slider').slider({
		interval: 5000
	});
	//预加载record
	document.addEventListener('plusready', function() {
		createWebview('record.html');		
	});
	
	var recordBtn = document.getElementById('j-openRecord');
	//事件绑定
	recordBtn.addEventListener('click', function() {
		plus.webview.show("record.html", 'slide-in-right', 300); // 显示窗口
	});
	mui.plusReady(function() {
		var balance = '未设置';
		//判断是否设置了额度
		if (localStorage.balance) balance = localStorage.balance;
		//设置预算额度
		mui('.m-display').on('tap', 'div', function() {
			mui.prompt('设置后将根据您的本月支出计算出\n余额，当前预算额度：' + balance, '请输入预算额度(整数)', '预算额度', ['确定', '取消'], function(e) {
				if (e.index == 0) {
					var num = Number(e.value);
					//判断用户输入是否非法
					if (isNaN(num)) {
						mui.toast('设置失败，请输入数字！');
					} else if (num == 0) {} else {
						//保存设置到localStorage
						localStorage.setItem('balance', num);
						mui.toast('设置成功');
						//刷新webview
						reloadHomeWebview();
					}
				}
			});
		});
	});
})();
//Home Module
(function() {
	var curMonthIn = 0,
		curMonthOut = 0; //当月收支
	var curDateIn = 0,
		curDateOut = 0; //当日收支
	//homeInfo数据加载
	(function() {
		//判断本地是否有数据，没有数据则终止函数
		if (!localStorage.getItem('data')) return;
		//JSON --> JS 对象
		var list = JSON.parse(localStorage.getItem('data'));
		//获取当前日期
		var date = new Date();
		var curYear = String(date.getFullYear()),
			curMonth = String(format(date.getMonth() + 1)),
			curDate = String(date.getDate());
		var curMonthList = list[curYear + curMonth]; //当月数据表
		//如果当月无数据，则终止函数
		if (!curMonthList) return;
		//遍历当月数据
		for (var k in curMonthList) {
			for (var j in curMonthList[k]) {
				if (curMonthList[k][j].type == 1) {
					curMonthIn += Number(curMonthList[k][j].money);
					if (curDate == k) curDateIn += Number(curMonthList[k][j].money);
				} else {
					curMonthOut += Number(curMonthList[k][j].money);
					if (curDate == k) curDateOut += Number(curMonthList[k][j].money);
				}
			}
		}
		//保留两位小数
		curMonthIn = curMonthIn.toFixed(2);
		curMonthOut = curMonthOut.toFixed(2);
		curDateIn = curDateIn.toFixed(2);
		curDateOut = curDateOut.toFixed(2);
		//写入节点
		mui('#j-monthInfo span.u-in')[0].innerHTML = '￥' + curMonthIn;
		mui('#j-monthInfo span.u-out')[0].innerHTML = '￥' + curMonthOut;
		mui('#j-todayInfo span.u-in')[0].innerHTML = '￥' + curDateIn;
		mui('#j-todayInfo span.u-out')[0].innerHTML = '￥' + curDateOut;
	})();
	//显示预算余额
	if (localStorage.balance) {
		var balance = (Number(localStorage.balance) - curMonthOut).toFixed(2);
		mui('.u-balance')[0].innerHTML = '￥' + balance;
	}
})();