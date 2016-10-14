//初始化
(function() {
	mui.init({
		//事件监听类型
		gestureConfig: {
			tap: true,
			doubletap: true,
			longtap: true,
			swipe: true,
			drag: true,
			hold: false,
			release: false
		}
	});
	//列表滚动属性
	mui('.mui-scroll-wrapper').scroll({
		deceleration: 0.001, //阻尼系数
		bounce: false //是否回弹
	});
	//双击NavBar返回顶部
	mui('.mui-bar').on('doubletap', 'h1', function() {
		mui('.mui-scroll-wrapper').scroll().scrollTo(0, 0, 500);
	});
//	console.log(1)
})();
//明细列表数据载入
(function() {
	//本地是否有数据
	if (localStorage.getItem("Data")) {
		var list = localStorage.getItem()
	} else {
//		document.querySelector('.listNull').style.display = 'block';
	}
})();