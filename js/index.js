//初始化
(function() {
	mui.init();
	var subpages = ['home.html', 'bill.html', 'user.html'];
	var subpage_style = {
		top: '0px',
		bottom: '51px'
	};
	var aniShow = {};
	//创建子页面，首个选项卡页面显示，其余隐藏
	mui.plusReady(function() {
		//获取当前webview
		var self = plus.webview.currentWebview();
		for (var i = 0; i < 3; i++) {
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
			//						plus.webview.show(targetTab, 'fade-in', 300);
			plus.webview.show(targetTab);
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
})();