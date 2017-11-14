(function (window) {
	var init = function(mountID, year, month, date) {
		console.info("我被调用了");
		// 获取当前页日期
		console.info("init zhong: "+ year);
		var viewDateAll = datePicker(year, month, date);
		var viewDate = viewDateAll.godDate;
		// 节点渲染
		var html = '<div class="god-datepicker-wrapper" onClick="listenerDate(event)" id="datepicker" >'+
		'<div class="god-datepicker-header">'+
			'<a href="#" class="god-datepicker-btn '+
			 'god-datepicker-prev-btn" name="prev">&lt;</a>'+
			'<a href="#" class="god-datepicker-btn '+
			'god-datepicker-next-btn" name="next">&gt;</a>'+
			'<span class="ui-datepicker-curr-month" id="showYearAndMonth"'+
			'year="'+viewDateAll.year+'" month="'+viewDateAll.month+'">'+
				viewDateAll.year+"-"+parseInt(viewDateAll.month+1)+
			'</span>'+
		'</div>'+
		'<div class="god-datepicker-body">'+
			'<table>'+
				'<thred>'+
					'<tr>'+
						'<th>一</th>'+
						'<th>二</th>'+
						'<th>三</th>'+
						'<th>四</th>'+
						'<th>五</th>'+
						'<th>六</th>'+
						'<th>日</th>'+
					'</tr>'+
				'</thred>'+
				'<tbody>';
				for (var i=0; i<42; i++) {

					if (i%7 === 0) {
						html += '<tr>'
					}
					html += '<td ' + 'year="' + viewDate[i].year + '" ' +
									'month="' + viewDate[i].month +'"'+ '>' +
									 +viewDate[i].date + "</td>";
					if(i%7 === 6) {
						html += '</tr>';
					} 
				}

				html += '</tbody>'+
			'</table>' +
		'</div>' +
	'</div>';

	// 节点插入
	// var htmlNode = document.createElement(html);
	var pre = document.getElementById(mountID);
	var divEle = document.createElement("div");
	divEle.innerHTML = html;
	document.body.appendChild(divEle);
	var left = document.getElementById(mountID).offsetLeft;
	var top = document.getElementById(mountID).offsetTop+
			  document.getElementById(mountID).offsetHeight +3+"px";
	var dateEle = document.getElementById("datepicker");
	dateEle.setAttribute("left",left);
	dateEle.setAttribute("top",top);

	}

	//监听器
	var listenerDate = function (event) {
		var temp = event.target;
		// 上下月日期设置
		var setDate = function(num) {
			var getSpanEle = document.getElementById('showYearAndMonth');
			var tempDate = new Date(getSpanEle.getAttribute("year"),parseInt(getSpanEle.getAttribute("month"))+num,1);
			window.initDatePicker("div",tempDate.getFullYear(),tempDate.getMonth(),tempDate.getDate());
			
		}

		// 设置日期格式化
		var getTddate = function(ele) {

			var forMat = function(data) {
				if (parseInt(data) <10) {
					return '0'+data;
				} else {
					return data;
				}
			};
			var year = ele.getAttribute('year');
			var month = parseInt(ele.getAttribute('month'))+1;
			if (month>12) {
				month = forMat(1);
				year = parseInt(year) + 1;
			}
			var date = forMat(ele.innerHTML);

			var inputEleText = year+"-"+month+"-"+date;
			document.getElementById('date').setAttribute('value',inputEleText);
		};
		// 如果鼠标点击td获取内容
		if (temp.tagName && temp.tagName.toLowerCase() === 'td') {
			console.info(temp.innerHTML);
			getTddate(temp);
		} else if (temp.getAttribute("name") === 'prev') { //上一月
			setDate(-1);
			// window.initDatePicker("div",2016,3,1);
			// initDatePicker('div',2017,1,1);
		} else if (temp.getAttribute("name") === 'next') {//下一月
			setDate(1);
		}
		
	}
	window.listenerDate = listenerDate;
	window.initDatePicker = init;
	
})(window)