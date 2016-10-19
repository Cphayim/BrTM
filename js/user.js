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
	//预加载
	document.addEventListener('plusready', function() {
		createWebview('login.html');
		createWebview('register.html');
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
	mui('.box-login').on('click', 'button', function(e) {
		if (e.target.id == 'j-loginBtn') {
			mui.toast('PHP工程师已觉醒，登录开放');
			plus.webview.show('login.html', 'slide-in-bottom', 400);
		}
	});
})();