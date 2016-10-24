//全局变量
var path0, path1, path2; //用于指向指定的数据库对象
var oldDate; //编辑前日期
var list = JSON.parse(localStorage.data); //数据库对象
var target; //目标对象，用于数据库对象目标记录
//初始化
(function() {
	mui.init({
		gestureConfig: {
			swipe: false
		},
		keyEventBind: {
			backbutton: true
		} //打开back按键监听
	});
	mui('#slider').slider().setStopped(true)
		//修改返回事件
	mui.back = function() {
		mui.confirm('确定取消本次编辑吗？', '提示', ['取消编辑', '继续编辑'], function(e) {
			if (e.index == 0) {
				plus.webview.hide('edit.html', 'slide-out-top', 400);
				var bill = plus.webview.getWebviewById('bill.html')
					//				mui.fire(bill, 'loadEdit');
			}
		});
	};

	//自定义事件
	window.addEventListener('arg', function(e) {

		/**
		 * 待修改：改为传递路径，从localStorage中获得数据 
		 */
		path0 = e.detail.path0; //数据表路径[年月]
		path1 = e.detail.path1; //数据表路径[日]
		path2 = e.detail.path2; //数据表路径[ID]
		target = list[path0][path1][path2];
		var type = target.type; //表单类型
		var money = target.money; //金额
		var classType = target.classType; //分类
		var account = target.account; //账户
		var remark = target.remark; //备注
		oldDate = path0.substr(0, 4) + '-' + path0.substr(-2) + '-' + path1; //原日期
		/**
		 * 根据页面传值初始化表单 
		 */
		var i = 0; //表单索引
		if (type == 1) {
			//如果类型为1跳转到收入Tab
			mui('#slider').slider({}).gotoItem(1);
			i = 1;
		}
		//初始化表单数据
		mui('.u-money')[i].value = money;
		mui('.u-classType')[i].value = classType;
		mui('.u-account')[i].value = account;
		mui('.u-date')[i].value = oldDate;
		mui('.u-remark')[i].value = remark;
	});
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
})();
//保存数据
(function() {
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
		//本条数据唯一ID不变
		var id = path2;
		//判断用户是否改变了日期？
		if (oldDate == date[i].value) {
			//没有改变日期，直接在原对象上改写属性
			list[path0][path1][path2].type = i;
			list[path0][path1][path2].money = money[i].value;
			list[path0][path1][path2].classType = classType[i].value;
			list[path0][path1][path2].account = account[i].value;
		} else {
			//用户改变了日期
			delete list[path0][path1][path2];//删除原对象
			var obj = {}; //临时存储数据对象
			//时间数据处理 -> 格式 yyyymm, d or dd
			var aDate = date[i].value.split('-');
			var yyyymm = aDate[0] + format(aDate[1]),
				d = Number(aDate[2]);
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
			list[yyyymm][d][id] = obj;
		}
		localStorage.setItem('data', JSON.stringify(list));
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
	//保存操作
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
})();