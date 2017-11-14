(function () {

	var datePicker = function (year, month, date) {

		var godDate = [];
		// 如果没有参数就用当前日期初始化
		if((!year || !month || !date) && month!=0) {
			var toDay = new Date();
			year = toDay.getFullYear();
			month = toDay.getMonth();
			date = toDay.getDate();
			console.info("日期初始化");
			// console.info("init: "+year+","+month+','+date);
		}
console.info("startinit: "+year+","+month+','+date);
		// 当前月的最后一天
		var thisLastDate = new Date(year, month, 0).getDate();
		// 当前月第一天是星期数
		var thisFirstDateOfDay = new Date(year, month-1, 1).getDay();
		if(thisFirstDateOfDay === 7) {
			thisFirstDateOfDay = 0;
		}
console.info("init: "+year+","+month+','+date);
		// 上一个月的最后一天
		var preLastDate = new Date(year, month-1, 0).getDate();
		// 上个月的月份
		var preMonth = new Date(year, month-2, 1).getMonth();
		// 上个月的年份
		var preYear = new Date(year, month-2, 1).getFullYear();

		// 下个月的最后一天
		var nextLastDate =  new Date(year, month+1, 0).getDate();
		// 下个月的月份
		var nextMonth = new Date(year, month, 1).getMonth();
		// 下个月的年份
		var nextYear = new Date(year, month, 1).getFullYear();
// console.info(preYear+","+(preMonth+1)+','+preLastDate);
// console.info(year+","+month+','+thisLastDate);
// console.info(nextYear+","+(nextMonth+1)+','+nextLastDate);
		// 当前页的日期存储
		for (var i=0; i<42; i++) {
			var temp = {};
			// 如果当前页有上一个的日期
			if (i<=thisFirstDateOfDay) {
				temp.date = preLastDate - thisFirstDateOfDay + i;
				temp.month = preMonth + 1;
				temp.year = preYear; 
			} else if (i <= (thisLastDate+thisFirstDateOfDay)) {    //如果日期是当前月
				temp.date = i - thisFirstDateOfDay;
				temp.month = month;
				temp.year = year;
			} else {  //如果日期有下一月
				temp.date = i - thisLastDate - thisFirstDateOfDay;
				temp.month = nextMonth + 1;
				temp.year = nextYear;
			}
			godDate.push(temp);
		}

		return {
			"godDate":godDate,
			"year":year,
			"month":month
		};
	}
	window.datePicker = datePicker;
})();