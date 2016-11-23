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
	var c = 'v0.3.71';
	mui.plusReady(function() {
		if (localStorage.tip != c) { //localStorage.tip != 'v0.3.71'
			//			mui.confirm('更新信息:\nv0.2.63\n - 数据同步功能上线，登录后点击流水账单界面右上角即可同步 \n\nv0.2.57\n - 修复了一个导致编辑界面Tab自动定向失败的Bug \n\nv0.2.56\n - 完善了图表模块功能\n - 添加了编辑功能，流水页点击单条记录即可编辑', '版本公告', ['确定', '取消'], function(e) {
			//			});
			mui.alert('更新内容: \n\nv0.3.71\n - 前端工程师脑子发热启动了Beta3\n - 而且一言不合更换了小清新UI配色\n - 对了，还把轮播图给砍掉了\
			\n\nv0.2.68\n - 修复了导致记录界面日期自动获取失败的Bug\n - 预算额度设置添加了防止溢出的规则\
			\n\nv0.2.63\n - 数据同步功能上线，登录后点击流水账单界面右上角即可同步', c + '版本公告', '确定');
			localStorage.tip = c;
		}
	});
})();