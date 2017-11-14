(function (window){
	var datepicker = window.datepicker;
	datepicker.buildUi = function (year, month) {
		var monthData = datepicker.getMonthData(year,month);
		var html = 
		'<div class="god-datepicker-header">'+
			'<a href="#" class="god-datepicker-btn'+
			' god-datepicker-prev-btn">&lt;</a>'+
			'<a href="#" class="god-datepicker-btn '+
			' god-datepicker-next-btn">&gt;</a>'+
			'<span class="ui-datepicker-curr-month">'+
			'	2016-12-12'+
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
				for (var i=0; i<monthData.length; i++){
					var date = monthData[i];
					if(i%7 === 0) {
						html += '<tr>';
					}
					html += '<td>' +date.showDate + '</td>';
					if(i%7 === 6) {
						html += '</tr>';
					}
				}	
				html += 
				'</tbody>'+
			'</table>'+
		'</div>';
		return html;
	};
	datepicker.init = function ($dom) {
		var html = datepicker.buildUi(2016,9);
		$dom.innerHTML = html;
	}
})(window);