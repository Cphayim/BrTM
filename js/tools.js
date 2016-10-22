/*
	工具类
 */

/**
 * ajax操作
 * @param {Object} opts 对象
 		method 请求方法
 		url    请求地址
 		data   参数
 		async  是否异步
 		success 请求返回成功后执行的回调函数
 		error   请求返回失败后执行的回调函数
 */
var ajax = function(opts) {
	//默认参数
	var defaults = {
		method: 'GET',
		url: '',
		data: '',
		async: true,
		contentType: 'application/x-www-form-urlencoded',
		success: function() {},
		error: function() {}
	};
	//参数更新
	for (var key in opts) {
		defaults[key] = opts[key];
	}
	//数据处理
	if (typeof defaults.data === 'object') {
		var str = '';
		for (var key in defaults.data) {
			str += key + '=' + defaults.data[key] + '&';
		}
		defaults.data = str.substring(0, str.length - 1);
	}

	defaults.method = defaults.method.toUpperCase();
	if (defaults.method === 'GET') {
		defaults.url += '?' + defaults.data;
	}
	//创建xhr
	var xhr = new XMLHttpRequest();
	//开启请求
	xhr.open(defaults.method, defaults.url, defaults.async);
	//发送请求
	if (defaults.method === 'GET') {
		xhr.send(null);
	} else {
		xhr.setRequestHeader("Content-type", defaults.contentType);
		xhr.send(defaults.data);
	}
	//等待响应
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			if (xhr.status == 200) {
				defaults.success.call(xhr, [xhr.responseText]);
			} else {
				defaults.error.call(xhr, [xhr.status]);
			}
		}
	}
};

/**
 * 判断对象是否为空
 * @param {Object} obj 对象
 */
function isEmptyObject(obj) {
	for (var n in obj) {
		return false
	}
	return true;
}
/**
 * 判断数组是否为空
 * @param {Object} arr 数组
 */
function isEmptyArray(arr) {
	if (arr.length > 0) return false;
	return true;
}
/**
 *  返回格式化后的月份或日期(补0)
 * @param {Object} d 月份或日期
 */
function format(d) {
	d = Number(d);
	return d < 10 ? '0' + String(d) : String(d);
}

/**
 * 传入时间字符串，返回周几(中文)
 * @param {Object} str 时间字符串('2016-10-15'或'2016/10/15')
 */
function getDay(str) {
	var time = new Date(str);
	var result = null;
	switch (time.getDay()) {
		case 0:
			result = '周日';
			break;
		case 1:
			result = '周一';
			break;
		case 2:
			result = '周二';
			break;
		case 3:
			result = '周三';
			break;
		case 4:
			result = '周四';
			break;
		case 5:
			result = '周五';
			break;
		case 6:
			result = '周六';
			break;
	}
	return result;
}

/**
 * 传入classType，返回中文分类字符串,用于建表
 * @param {Object} str classType
 */
function getClassTypeStr(str) {
	var result;
	switch (str) {
		case 'food':
			result = '一日三餐';
			break;
		case 'traffic':
			result = '交通出行';
			break;
		case 'clothing':
			result = '衣服饰品';
			break;
		case 'communication':
			result = '通讯社交';
			break;
		case 'home':
			result = '家居日用';
			break;
		case 'entertainment':
			result = '休闲娱乐';
			break;
		case 'other0':
			result = '其它支出';
			break;
		case 'wage':
			result = '工资收入';
			break;
		case 'investment':
			result = '投资收入';
			break;
		case 'bonus':
			result = '奖金';
			break;
		case 'other1':
			result = '其它收入';
			break;
		default:
			result = "未分类";
	}
	return result;
}
/**
 * 返回中文分类字符串,用于建图
 * @param {Object} i number
 */
function getOutClassTypeStr(i) {
	var result;
	switch (i) {
		case 0:
			result = '一日三餐';
			break;
		case 1:
			result = '交通出行';
			break;
		case 2:
			result = '衣服饰品';
			break;
		case 3:
			result = '通讯社交';
			break;
		case 4:
			result = '家居日用';
			break;
		case 5:
			result = '休闲娱乐';
			break;
		case 6:
			result = '其它支出';
			break;
	}
	return result;
}

function getInClassTypeStr(i) {
	var result;
	switch (i) {
		case 0:
			result = '工资收入';
			break;
		case 1:
			result = '投资收入';
			break;
		case 2:
			result = '奖金';
			break;
		case 3:
			result = '其它收入';
			break;
	}
	return result;
}
/**
 * 返回数组索引,用于建图
 * @param {Object} str
 */
function getOutClassTypeIndex(str) {
	var result;
	switch (str) {
		case 'food':
			result = 0;
			break;
		case 'traffic':
			result = 1;
			break;
		case 'clothing':
			result = 2;
			break;
		case 'communication':
			result = 3;
			break;
		case 'home':
			result = 4;
			break;
		case 'entertainment':
			result = 5;
			break;
		case 'other0':
			result = 6;
			break;
	}
	return result;
}
function getInClassTypeIndex(str) {
	var result;
	switch (str) {
		case 'wage':
			result = 0;
			break;
		case 'investment':
			result = 1;
			break;
		case 'bonus':
			result = 2;
			break;
		case 'other1':
			result = 3;
			break;
	}
	return result;
}
/**
 * 检查邮箱格式 
 * @param {Object} mail
 */
function checkMail(mail) {
	var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
	if (filter.test(mail)) return true;
	else return false;
}

/**
 * 预创建webview
 * @param {Object} url
 */
function createWebview(url) {
	var styles = {};
	// 在Android5以上设备，如果默认没有开启硬件加速，则强制设置开启
	if (!plus.webview.defaultHardwareAccelerated() && parseInt(plus.os.version) >= 5) {
		styles.hardwareAccelerated = true;
	}
	plus.webview.create(url, url, styles);
}
/**
 * 刷新"home.html" webview
 */
function reloadHomeWebview() {
	//关闭预加载的子webview
	plus.webview.getWebviewById('record.html').close();
	//刷新webview
	plus.webview.getWebviewById('home.html').reload();
}
/**
 * 刷新"home.html" webview
 */
function reloadBillWebview() {
	plus.webview.getWebviewById('bill.html').reload();
}
/**
 * 刷新 "chart.html" webview
 */
function reloadChartWebview() {
	plus.webview.getWebviewById('chart.html').reload();
}
/**
 * 刷新 "user.html" webview
 */
function reloadUserWebview() {
	plus.webview.getWebviewById('login.html').close();
	plus.webview.getWebviewById('register.html').close();
	plus.webview.getWebviewById('user.html').reload();
}