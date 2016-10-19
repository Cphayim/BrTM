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
			styles: {
				top: '0px',
				bottom: '0px'
			},
			show: {
				autoShow: true,
				aniShow: 'slide-in-right',
				duration: 200
			},
			waiting: {
				autoShow: false
			}
		});
	};
	document.addEventListener('plusready', function() {
		createWebview('login.html');
	});
	//列表按钮事件绑定
	mui('.mui-table-view-cell').on('tap', '.u-userRoom', function() {
		mui.toast('请先登录');
	});
	mui('.mui-table-view-cell').on('tap', '.u-setting', function() {
		open('setting.html');
	});
	mui('.mui-table-view-cell').on('tap', '.u-about', function() {
		open('public.html');
	});
	mui('.box-login').on('tap', 'button', function(e) {
		if (e.target.id == 'j-loginBtn') {
			mui.toast('PHP工程师已醒，登录开放');
			plus.webview.show('login.html', 'slide-in-bottom', 200);
		}
	});
})();