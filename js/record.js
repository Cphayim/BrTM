(function() {
	mui.init({
		keyEventBind: {
			backbutton: true
		} //打开back按键监听
	});
	//修改返回事件
	mui.back = function() {
		plus.webview.hide('record.html', 'slide-out-right', 300);
	};
	//获取系统时间填充表单默认值
	var date = new Date();
	var currentDate = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
	var aDate = document.querySelectorAll('.u-date');
	for (var i = 0; i < aDate.length; i++) {
		aDate[i].value = currentDate;
	}
	//金额输入框补两位小数
	var moneyInput = document.querySelectorAll('.u-money');
	for (var i = 0; i < moneyInput.length; i++) {
		moneyInput[i].addEventListener('blur', function() {
			//如果有输入值，补小数
			if (this.value) {
				this.value = String(Number(this.value).toFixed(2));
			}
		});
	}
	//获取表单元素DOM节点数组([0]:支出,[1]:收入)
	var money = mui('.u-money'),
		classType = mui('.u-classType'),
		account = mui('.u-account'),
		date = mui('.u-date'),
		remark = mui('.u-remark');
	/**
	 * 获取表单数据，存入数据对象list
	 * @param {Object} i 表单索引 (0:支出,1收入)
	 */
	function save(i) {
		//获取本条数据唯一标识
		var nextId = Number(localStorage.nextId);
		var obj = {}; //临时存储数据对象
		//时间数据处理 -> 格式 yyyymm, d or dd
		var aDate = date[i].value.split('-');
		var yyyymm = aDate[0] + format(aDate[1]),
			d = aDate[2];
		obj = {
			"type": i,
			"money": money[i].value,
			"classType": classType[i].value,
			"account": account[i].value,
			"remark": remark[i].value
		};
		//判断指定层是否存在对象，不存在则创建
		if (!list[yyyymm]) list[yyyymm] = {};
		if (!list[yyyymm][d]) list[yyyymm][d] = {};
		//将obj的引用赋给list指定层
		list[yyyymm][d][nextId] = obj;
		localStorage.setItem('data', JSON.stringify(list));
		localStorage.nextId = ++nextId;
	}
	//创建list空对象
	var list = {};
	//判断本地是否有数据
	if (localStorage.getItem('data')) {
		//本地数据覆盖list对象
		list = JSON.parse(localStorage.getItem('data'));
	}

	/**
	 * 刷新外层webview，并关闭当前的webview
	 */
	function reLoadWebview() {
		reloadHomeWebview();
		reloadBillWebview();
		reloadChartWebview();
	}
	//等待plus初始化完毕(操作webview)
	mui.plusReady(function() {
		var saveOut = document.getElementById('j-save-out');
		var saveIn = document.getElementById('j-save-in');
		//事件绑定
		saveOut.addEventListener('tap', function() {
			save(0);
			mui.toast('账单已保存');
			reLoadWebview();
		});
		saveIn.addEventListener('tap', function() {
			save(1);
			mui.toast('账单已保存');
			reLoadWebview();
		});
		mui('.mui-slider-group').on('tap', '.u-date', function() {
			mui.toast('正在打开日期选择器');
		});
	});
})();