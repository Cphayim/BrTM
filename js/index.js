//初始化
(function() {
	mui.init();
	var subpages = ['home.html', 'bill.html', 'chart.html', 'user.html'];
	var subpage_style = {
		top: '0px',
		bottom: '51px',
		render: 'always'
	};
	var aniShow = {};
	//创建子页面，首个选项卡页面显示，其余隐藏
	mui.plusReady(function() {
		//获取当前webview
		var self = plus.webview.currentWebview();
		//设置入口不隐藏
		self.setStyle({
			render: 'always'
		}); //解决部分Android下返回闪屏问题
		for (var i = 0; i < subpages.length; i++) {
			var temp = {};
			var sub = plus.webview.create(subpages[i], subpages[i], subpage_style);
			if (i > 0) {
				sub.hide();
			} else {
				temp[subpages[i]] = 'true';
				//记录开启状态
				mui.extend(aniShow, temp);
			}
			self.append(sub);
		}
	});
	//当前激活选项
	var activeTab = subpages[0];
	//选项卡tap事件
	mui('.mui-bar-tab').on('tap', 'a', function(e) {
		var targetTab = this.getAttribute('href');
		//判断是否为当前选项卡页面
		if (targetTab == activeTab) return;
		//显示目标选项卡
		//若为iOS平台或非首次显示，则直接显示
		if (mui.os.ios || aniShow[targetTab]) {
			plus.webview.show(targetTab);
		} else {
			//否则，使用fade-in动画，且保存变量
			var temp = {};
			temp[targetTab] = 'true';
			mui.extend(aniShow, temp);
			plus.webview.show(targetTab, 'fade-in', 300);
			//			plus.webview.show(targetTab);
		}
		//触发自定义事件
		if (targetTab == 'chart.html') {
			mui.fire(plus.webview.getWebviewById(targetTab), 'chartLoad');
		}
		//隐藏当前
		plus.webview.hide(activeTab);
		//更改当前活跃的选项卡
		activeTab = targetTab;
	});
	//自定义事件，模拟点击“首页选项卡”
	document.addEventListener('gohome', function() {
		var defaultTab = document.getElementById("defaultTab");
		//模拟首页点击
		mui.trigger(defaultTab, 'tap');
		//切换选项卡高亮
		var current = document.querySelector(".mui-bar-tab>.mui-tab-item.mui-active");
		if (defaultTab !== current) {
			current.classList.remove('mui-active');
			defaultTab.classList.add('mui-active');
		}
	});
	//判断是否初次打开
	if (!localStorage.getItem('nextId')) {
		localStorage.setItem('nextId', '1100');
	}
	/**
	 * 版本提示信息
	 */
	mui.plusReady(function() {
		if (localStorage.tip != 'v0.2.56') {
			mui.confirm('重要提示：\n      此版本前端更换了部分数据库存储格式，用户点击"确定"后系统将自动清空本地数据并加入新格式的测试数据\n     老版用户若有重要数据未保存请点击"取消"自行备份后前往"设置"清空数据，之后可使用注入功能重新注入测试数据或正常使用。"数据同步"功能将很快上线，感谢！\n\n版本更新:\n - 完善了图表模块功能\n - 添加了编辑功能，流水页点击单条记录即可编辑', 'V0.2.56 版本提示', ['确定', '取消'], function(e) {
				if (e.index == 0) {
					mui.confirm('是否要清空本地数据并导入新的测试数据', '二次确认', ['确定', '取消'], function(e) {
						if (e.index == 0) {
							var o = plus.nativeUI.showWaiting('正在清空数据');
							//删除数据
							localStorage.removeItem('data');
							setTimeout(function() {
								o.setTitle('已清空数据');
								setTimeout(function() {
									o.setTitle('正在调取数据');
									importDataToLocalStorage();
									setTimeout(function() {
										//重载Webview
										reloadHomeWebview();
										reloadBillWebview();
										reloadUserWebview();
										reloadChartWebview();
										o.setTitle('正在注入数据');
										setTimeout(function() {
											o.setTitle('数据注入成功,正在Reload');
											setTimeout(function() {
												o.close();
											}, 2000)
										}, 2000);
									}, 1000);
								}, 1000);
							}, 1000);
						}
					});
				}
			});
			localStorage.tip = 'v0.2.56';
		}
	});
})();