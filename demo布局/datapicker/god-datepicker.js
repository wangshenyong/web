(function(window){
	var datepicker = {};

	datepicker.getMonthData = function (year, month) {
		var ret = [];
		// 判断是否初始化
		if (!year || !month) {
			var today = new Date();
			year = today.getFullYear();
			month = today.getMonth() + 1;
		}

		var firstDay = new Date(year, month-1, 1);
		// 获取这月的第一天是星期几
		var firstDayWeekDay = firstDay.getDay();
		if(firstDayWeekDay === 0) {
			firstDayWeekDay = 7;
		}
		// 获取这月有多少天
		var lastDayOfLastMonth = new Date(year,
		 month-1, 0);
		var lastDateOfLastMonth = 
		lastDayOfLastMonth.getDate();
		// 计算下月的天数
		var preMonthDayCount = firstDayWeekDay - 1;
		var lastDay = new Date(year, month, 0);
		var lastDate = lastDay.getDate();
		
		for (var i=0; i<7*6; i++) {
			var date = i + 1 -preMonthDayCount;
			var showDate = date;
			var thisMonth = month;
			if (date<=0) {
				thisMonth = month-1;
				showDate = lastDateOfLastMonth + date;
			} else if(date>lastDate) {
				thisMonth = month+1;
				showDate = showDate - lastDate;
			}

			if (thisMonth === 0) {
				thisMonth = 12;
			}
			if (thisMonth===13) {
				thisMonth = 1;
			}

			ret.push ({
				month:thisMonth,
				date:date,
				showDate:showDate
			});

		} 
		return ret;
	};
	window.datepicker = datepicker;
})(window);