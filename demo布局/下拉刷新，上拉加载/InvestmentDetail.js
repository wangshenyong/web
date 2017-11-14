/**
 *交易明细
 */
ibsapp.register.controller("InvestmentDetailCtrl", ['$scope', '$remote', '$timeout', '$filter', '$dateUtil', '$scrollPage', '$stateParams',
function($scope, $remote, $timeout, $filter, DateUtil, $scrollPage, $stateParams) {
	$scope.init = function() {
		$scope.activeDayFlagList = {
			"1W" : "近一周",
			"1M" : "近一月",
			"3M" : "近三月"
		};
		$scope.dateStr = "近三月";
		$scope.liFlag = "field";
		$scope.activeDayFlag = "3M";
		//默认选中
		$scope.params = {// 上送参数
			"DateType" : '5', // 初始化 - 查找最近一周的记录      传0  ：今天     传1 ：最近一周    传2 ：查询最近1个月 传3 ：最近三个月      传5：自选日期区间
			"pageSize" : 10,
			"currentIndex" : 0
		};
		$scope.noticeIconF = true;
		$scope.EndDate = DateUtil.changeDate().replace(/-/g, '/');
		$scope.BeginDate = DateUtil.changeDate('3M').replace(/-/g, '/');
		$timeout(function() {
			//var selectDate = new MobileSelectDate();
			//var selectDate1 = new MobileSelectDate();
			// selectDate1.init({
			// 	trigger : '#endDate',
			// 	value : $scope.EndDate,
			// 	max : DateUtil.changeDate().replace(/-/g, '/'),
			// 	position : "bottom",
			// 	callback : function() {
			// 		$scope.EndDate = $("#endDate").val();
			// 	}
			// });
			// selectDate.init({
			// 	trigger : '#beginDate',
			// 	value : $scope.BeginDate,
			// 	max : DateUtil.changeDate().replace(/-/g, '/'),
			// 	position : "bottom",
			// 	callback : function() {
			// 		$scope.BeginDate = $("#beginDate").val();
			// 	}
			// });
			$scope.EAcTrsHistoryQryFn();
		}, 100);
	};

	//修改日期选择框样式，并赋值开始日期
	$scope.changeDate = function(e,days) {
		 if (e && e.stopPropagation) { // 因此它支持W3C的stopPropagation()方法　
             e.stopPropagation();
        } else { //否则，我们需要使用IE的方式来取消事件冒泡   　　
             window.event.cancelBubble = true;
        }
		
		$scope.EndDate = DateUtil.changeDate().replace(/-/g, '/');
		$scope.BeginDate = DateUtil.changeDate(days).replace(/-/g, '/');
		$scope.activeDayFlag = days;
		$scope.dateStr = $scope.activeDayFlagList[$scope.activeDayFlag];
		//页面显示的日期文字

	};
	//交易查询
	$scope.EAcTrsHistoryQryFn = function() {
		//当scroller存在时，销毁它，防止产生多个侧滑条
		if ($scope.scroller) {
			$scope.scroller.destroy();
		}
		//上拉初始化次数
		$scope.Loadingcount = 0;
		$scope.list = [];
		//数据重置
		$scope.recordNumber = 0;
		//数据重置
		$scope.params.BeginDate = $scope.BeginDate.replace(/\//g, '-');
		$scope.params.EndDate = $scope.EndDate.replace(/\//g, '-');
		$remote.post("EAcTrsHistoryQry.do", $scope.params, function(data) {
			$scope.list = data.List;
			$scope.recordNumber = data.recordNumber;
		});
		$scope.scroller = $scrollPage.create("transList-all", function(noMoreFn) {//上拉加载函数
			if ($scope.recordNumber > $scope.params.pageSize && $scope.recordNumber > $scope.Loadingcount * $scope.params.pageSize) {
				$scope.Loadingcount = $scope.Loadingcount + 1;
				$scope.params.currentIndex = $scope.Loadingcount * $scope.params.pageSize;
				$remote.post("EAcTrsHistoryQry.do", $scope.params, function(data) {
					$scope.list = $scope.list.concat(data.List);
					$timeout(function() {
						$scope.$apply($scope.list);
						$scope.scroller.refresh();
						$scope.endFlag = $scope.list.length != $scope.recordNumber ? false : true;
						noMoreFn($scope.endFlag);
					}, 100);
				});
			} else {
				noMoreFn(true);
			};
		}, function() {//下拉刷新函数
			$scope.params.currentIndex = 0;
			$scope.Loadingcount = 0;
			$remote.post("EAcTrsHistoryQry.do", $scope.params, function(data) {
				$timeout(function() {
					$scope.list = data.List;
					$scope.$apply($scope.list);
					$scope.scroller.refresh();
				}, 100);
			});
		});
	};
	//查询条件显示
	$scope.showSelect = function() {
		$("#doNotClickMask").show();
		$scope.noticeIconF = false;
		$("#investmentDetailForm").slideDown(500);
		$scope.params.DateType = "5";
		//自选区间，查询时根据起始日期查询
	};
	//点击查询按钮
	$scope.doQuery = function() {
		//重新置为0
		$scope.params.currentIndex = 0;
		$scope.Loadingcount = 0;
		$("#investmentDetailForm").slideUp(100);
		$scope.noticeIconF = true;
		$("#doNotClickMask").hide();
		//交易查询
		$scope.EAcTrsHistoryQryFn();
	};
}]);
