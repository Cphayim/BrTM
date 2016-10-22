(function() {
	mui.init();
	//初始化单页的区域滚动
	mui('.mui-scroll-wrapper').scroll({
		deceleration: 0.001, //阻尼系数
		bounce: false //是否回弹
	});
	mui.plusReady(function() {
		//注入 or 清空数据
		var importData = document.getElementById('j-importData'),
			emptyData = document.getElementById('j-emptyData'),
			signOut = document.getElementById('j-signOut');
		//注入
		importData.addEventListener('tap', function() {
			if (isLogin) {
				mui.alert('已登录用户无法使用该测试功能');
			} else {
				mui.confirm('确认向数据库中注入测试数据吗？\n可能将覆盖你的原有数据', '提示', ['确认', '取消'], function(e) {
					if (e.index == 0) {
						var o = plus.nativeUI.showWaiting('正在调取数据');
						//执行注入
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
					}
				});
			}
		});
		//清空
		emptyData.addEventListener('tap', function() {
			if (isLogin) {
				mui.alert('已登录用户无法使用该测试功能');
			} else {
				mui.confirm('确认清空本地所有数据吗？\n未同步到服务器的数据将无法找回', '提示', ['确认', '取消'], function(e) {
					if (e.index == 0) {
						var o = plus.nativeUI.showWaiting('正在清空数据');
						//删除数据
						localStorage.removeItem('data');
						//重载Webview
						reloadHomeWebview();
						reloadBillWebview();
						reloadUserWebview();
						reloadChartWebview();
						setTimeout(function() {
							o.setTitle('已清空数据,正在Reload');
							setTimeout(function() {
								o.close();
							}, 1000);
						}, 1000);
					}
				});
			}
		});
		//判断是否登录
		var isLogin = (localStorage.loginInfo) ? true : false;
		console.log(isLogin);
		//已登录则恢复退出按钮
		if (isLogin) signOut.removeAttribute('disabled');
		//退出登录
		signOut.addEventListener('tap', function() {
			mui.confirm('确认退出登录？', '提示', ['确认', '取消'], function(e) {
				if (e.index == 0) {
					var w = plus.nativeUI.showWaiting('正在退出登录');
					localStorage.removeItem('loginInfo');
					w.close();
					reloadUserWebview();
					mui.back();
				}
			});
		});
	});
})();