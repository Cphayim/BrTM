//初始化
//(function() {
	mui.init();
	//获取系统时间填充表单默认值
	var date = new Date();
	var currentDate = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
	var aDate = document.querySelectorAll('.u-date');
	for (var i = 0; i < aDate.length; i++) {
		aDate[i].value = currentDate;
	}
	
	/**
	 * 获取表单数据，存入数据对象list
	 * @param {Object} i 表单索引 0:支出,1收入
	 */
	function Save(i){
		
	}
	//从localStorage中获取本地数据对象
	var list = {}
	if(localStorage.getItem('data')){
		list = JSON.parse(localStorage.getItem('data'));
	}
	mui.plusReady(function() {
		var saveOut = document.getElementById('j-save-out');
		var saveIn = document.getElementById('j-save-in');
		saveOut.addEventListener('tap',function(){
			Save(0);
		});
		saveIn.addEventListener('tap',function(){
			Save(1);
		});
	});
//})