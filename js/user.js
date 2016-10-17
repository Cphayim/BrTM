(function() {
	mui.init()
		/**
		 * 打开一个新的webview 
		 * @param {Object} url
		 */
	function open(url) {
		mui.openWindow({
			url: url,
			id: url,
			show: {
				autoShow: true,
				aniShow: 'slide-in-right',
				duration: 300
			},
			waiting: {
				autoShow: false
			}
		});
	};
	mui('.mui-table-view-cell').on('tap', '.u-userRoom', function() {
		mui.toast('请先登录后操作');
	});
	mui('.mui-table-view-cell').on('tap', '.u-setting', function() {
		open('setting.html');
	});
	mui('.mui-table-view-cell').on('tap', '.u-about', function() {
		open('public.html');
	});
	mui('.m-login').on('tap', 'button', function(e) {
		if (e.target.id == 'j-loginBtn') {
			mui.toast('由于我们的PHP工程师还在睡懒觉，登录功能暂未开放');
		}else{
			mui.toast('由于我们的叶大神还在赖床，注册功能暂未开放');
		}
	});
})();