(function() {
	mui.init();
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
		ajax({
			url: 'https://api.yingfeng.me/br/register.php',
			method: 'POST',
			data: {
				username: inputs[0].value,
				email: inputs[1].value,
				password: md5(inputs[2].value)
			},
			success: function(data) {
				var arg = data[0].split(','); 
				if (arg[0] == 'DB_R') {
					mui.toast('用户名或邮箱已被注册');
				}else if(arg[0]=='DB_UNR'&&arg[1]=='RS'){
					mui.toast(inputs[0].value+',注册成功');
				}
			}
		});
	});
})();