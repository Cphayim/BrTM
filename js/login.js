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
		var w = plus.nativeUI.showWaiting('正在登录');
		//发送登录请求
		ajax({
			url: 'https://api.yingfeng.me/br/login.php',
			method: 'POST',
			data: {
				username: username.value,
				password: MD5(password.value)
			},
			success: function(data) {
				var arg = data[0].split(';'); //arg:[0]判断信息,[1]用户名,[2]头像URL,[3]授权信息
				if (arg[0] == 'T') {
					//登录成功,保存用户名
					localStorage.setItem('username', arg[1]);
					console.log('username'+localStorage.username);
					mui.toast('你好，' + localStorage.username);
					//保存登录授权信息
					localStorage.setItem('loginInfo', arg[3]);
					console.log('loginInfo'+localStorage.loginInfo);
					//保存头像
					localStorage.setItem('pictureURL', arg[2]);
					console.log('pictureURL'+localStorage.pictureURL);
					//返回并刷新
					reloadUserWebview();
				} else if (arg[0] == 'F') {
					//用户/密码错误
					mui.toast('用户名或错误');
				}
				w.close();
			},
			error: function(error) {
				mui.toast('网络或服务器状态异常');
				w.close();
			}
		});
	});

	//前往注册页面
	regBtn.addEventListener('click', function() {
		plus.webview.show('register.html', 'slide-in-bottom', 400);
	});
})();