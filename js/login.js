(function() {
	mui.init({
		keyEventBind: {
			backbutton: true
		} //打开back按键监听
	});
	//修改返回事件
	mui.back = function() {
		reloadUserWebview();
	};
	//预加载
//	document.addEventListener('plusready',function(){
//		createWebview('register.html');
//	});
	//获取按钮
	var loginSub = document.getElementById('j-loginSub');
	var regBtn = document.getElementById('regBtn');
	//登录事件绑定
	loginSub.addEventListener('tap', function() {
		//获取表单元素
		var username = document.getElementById('username');
		var password = document.getElementById('password');
		//判断信息完整
		if (username.value == '' || password.value == '') {
			mui.toast('用户名或密码为空');
			return;
		}
		//打开等待框
//		var w = plus.nativeUI.showWaiting('正在登录');
		//发送请求
		ajax({
			url: 'https://api.yingfeng.me/br/login.php',
			method: 'POST',
			data: {
				username: username.value,
				password: md5(password.value)
			},
			success: function(data) {
				if (data == 'T') {
					mui.toast('你好，' + username.value);

				} else if (data == 'F') {
					mui.toast('用户名或错误');
				}
//				w.close();
			},
			error: function(error) {
				mui.toast('登录失败：服务器状态异常');
//				w.close();
			}
		});
	});
	
	//前往注册页面
	regBtn.addEventListener('click',function(){
		plus.webview.getWebviewById('register.html').show('slide-in-bottom',400);
	});
})();