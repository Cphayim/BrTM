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
 *  返回格式化后的月份或日期(补0)
 * @param {Object} d 月份或日期
 */
function format(d) {
	d = Number(d);
	return d < 10 ? '0' + d : d;
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
 * 传入classType，返回中文分类字符串
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
		case 'wage':
			result = '工资到手';
			break;
		default:
			result = "未分类";
	}
	return result;
}