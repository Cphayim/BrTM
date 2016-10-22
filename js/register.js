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
	//获取按钮和表单元素
	var form = document.getElementById('j-regForm');
	var inputs = form.getElementsByTagName('input');
	var regSub = document.getElementById('j-regSub');
	regSub.addEventListener('tap', function() {
		var required = true; //是否完整填写
		//判断是否完整填写
		for (var i = 0; i < inputs.length; i++) {
			if (inputs[i].value == '') {
				required = false;
				mui.toast('请完整填写信息')
			}
		}
		//信息填写不全，跳出函数
		if (!required) return;
		//判断两次密码是否一致
		if (!(inputs[2].value === inputs[3].value)) {
			mui.toast('两次输入的密码不一致');
			return;
		}
		//判断密码长度是否不少于6位
		if (inputs[2].value.split('').length < 6) {
			mui.toast('请使用不少于6位的密码');
			return;
		}
		//判断邮箱格式
		if (!checkMail(inputs[1].value)) {
			mui.toast('请输入正确的邮箱格式');
			return;
		}
		var w = plus.nativeUI.showWaiting('正在注册');
		//发送注册请求
		ajax({
			url: 'https://api.yingfeng.me/br/register.php',
			method: 'POST',
			data: {
				username: inputs[0].value,
				email: inputs[1].value,
				password: MD5(inputs[2].value)
			},
			success: function(data) {
				var arg = data[0].split(',');
				if (arg[0] == 'DB_R') {
					//重名
					mui.toast('用户名或邮箱已被注册');
					w.close();
				} else if (arg[0] == 'DB_UNR' && arg[1] == 'RS') {
					//注册成功
					mui.toast(inputs[0].value + ',注册成功');
					//自动登录
					var w = plus.nativeUI.showWaiting('正在登录');
					//发送登录请求
					ajax({
						url: 'https://api.yingfeng.me/br/login.php',
						method: 'POST',
						data: {
							username: inputs[0].value,
							password: MD5(inputs[2].value)
						},
						success: function(data) {
							var arg = data[0].split(';'); //arg:[0]判断信息,[1]用户名,[2]头像URL,[3]授权信息
							if (arg[0] == 'T') {
								//登录成功,保存用户名
								localStorage.setItem('username', arg[1]);
								console.log('username' + localStorage.username);
								mui.toast('你好，' + localStorage.username);
								//保存登录授权信息
								localStorage.setItem('loginInfo', arg[3]);
								console.log('loginInfo' + localStorage.loginInfo);
								//保存头像
								localStorage.setItem('pictureURL', arg[2]);
								console.log('pictureURL' + localStorage.pictureURL);
								//返回并刷新
								reloadUserWebview();
							} else if (arg[0] == 'F') {
								//用户/密码错误
								mui.toast('用户名或错误');
							}
							plus.nativeUI.closeWaiting();
						},
						error: function(error) {
							mui.toast('网络或服务器状态异常');
							plus.nativeUI.closeWaiting();
						}
					});
				} else if (arg[0] == 'DB_UNR' && arg[1] == 'DB_ERRO') {
					mui.toast('服务器端数据库写入失败，请稍后尝试');
				} else {
					mui.toast('表单存在无效字段');
				}
				w.close();
			},
			error: function(error) {
				mui.toast('网络或服务器状态异常');
				w.close();
			}
		});
	});
})();