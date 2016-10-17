(function() {
	mui.init();
	//初始化单页view
	var viewApi = mui('#app').view({
		defaultPage: '#setting'
	});
	//初始化单页的区域滚动
	mui('.mui-scroll-wrapper').scroll();
	mui.plusReady(function() {
		//注入 or 清空数据
		var importData = document.getElementById('j-importData'),
			emptyData = document.getElementById('j-emptyData');
		//注入
		importData.addEventListener('tap', function() {
			mui.confirm('确认向数据库中注入测试数据吗？\n可能将覆盖你的原有数据', '提示', ['确认', '取消'], function(e) {
				if (e.index == 0) {
					var o = plus.nativeUI.showWaiting('正在调取数据');
					//执行注入
					importDataToLocalStorage();
					setTimeout(function() {
						//重载Webview
						plus.webview.getWebviewById('home.html').reload();
						plus.webview.getWebviewById('bill.html').reload();
						o.setTitle('正在注入数据');
						setTimeout(function() {
							o.setTitle('数据注入成功,正在Reload');
							setTimeout(function() {
								o.close();
							}, 2000)
						}, 2000);
					}, 1000);
				}
			});
		});
		//清空
		emptyData.addEventListener('tap', function() {
			mui.confirm('确认清空本地所有数据吗？\n未同步到服务器的数据将无法找回', '提示', ['确认', '取消'], function(e) {
				if (e.index == 0) {
					var o = plus.nativeUI.showWaiting('正在清空数据');
					//删除数据
					localStorage.removeItem('data');
					//重载Webview
					plus.webview.getWebviewById('home.html').reload();
					plus.webview.getWebviewById('bill.html').reload();
					setTimeout(function() {
						o.setTitle('已清空数据,正在Reload');
						setTimeout(function() {
							o.close();
						}, 1000);
					}, 1000);
				}
			});
		})
	});
	var view = viewApi.view;
	(function($) {
		//处理view的后退与webview后退
		var oldBack = $.back;
		$.back = function() {
			if (viewApi.canBack()) { //如果view可以后退，则执行view的后退
				viewApi.back();
			} else { //执行webview后退
				oldBack();
			}
		};
		//监听页面切换事件方案1,通过view元素监听所有页面切换事件，目前提供pageBeforeShow|pageShow|pageBeforeBack|pageBack四种事件(before事件为动画开始前触发)
		//第一个参数为事件名称，第二个参数为事件回调，其中e.detail.page为当前页面的html对象
		view.addEventListener('pageBeforeShow', function(e) {
			//				console.log(e.detail.page.id + ' beforeShow');
		});
		view.addEventListener('pageShow', function(e) {
			//				console.log(e.detail.page.id + ' show');
		});
		view.addEventListener('pageBeforeBack', function(e) {
			//				console.log(e.detail.page.id + ' beforeBack');
		});
		view.addEventListener('pageBack', function(e) {
			//				console.log(e.detail.page.id + ' back');
		});
	})(mui);
	if (mui.os.stream) {
		document.getElementById("check_update").display = "none";
	}
})();