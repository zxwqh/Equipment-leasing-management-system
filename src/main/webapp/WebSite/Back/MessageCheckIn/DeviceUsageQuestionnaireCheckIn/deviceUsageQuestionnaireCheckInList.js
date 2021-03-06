app.controller('DeviceUsageQuestionnaireCheckInController', function($scope,$timeout,proSvc,SYS_CODE_CON,sysCodeTranslateFactory,RentHistUserSvc,entSvc) {
	
	//ie9下titile正确显示使用
	document.title="租赁费登记-设备使用者";
	
    $scope.sysCodeCon=SYS_CODE_CON;//把常量赋值给一个对象这样可以使用了
    
    $scope.ct=sysCodeTranslateFactory;//把翻译赋值给一个对象
    
    $scope.userInfo = {};
    $scope.userInfo.orgCode=SYS_USER_INFO.orgCode;
    $scope.userInfo.orgLevel=SYS_USER_INFO.orgLevel;
    $scope.userInfo.orgLevel_show=SYS_USER_INFO.orgLevel;
    $scope.userInfo.orgId=SYS_USER_INFO.orgId;
    $scope.userInfo.orgName=SYS_USER_INFO.orgName;
    $scope.userInfo.proId = SYS_USER_INFO.proId;
    $scope.userInfo.proName = SYS_USER_INFO.proName;
    $scope.userInfo.orgPartyId = SYS_USER_INFO.perPartyId;
    
    /*修改z-index 的层级*/
    $scope.changeZIndex=function(num,len){
    	for(var i=0;i<len;i++){
    		if(i==num){
    			$("#state"+num).css("z-index","999");
    		}else{
    			$("#state"+i).css("z-index","99");
    		}
    	}
    };
    
    
    
	$scope.employeeEntity = {};
	$scope.employeeEntity.isInclude = 0;
	
	
	$scope.showLevel = null;
	$scope.employeeEntity.orgName = SYS_USER_INFO.orgName;
	$scope.employeeEntity.orgName_ = SYS_USER_INFO.orgName;//因为没有排除orgName在哪里使用，所以创建了orgName_用于点击时传当前单位属性
	$scope.employeeEntity.orgId_ = SYS_USER_INFO.orgId;
	$scope.employeeEntity.orgCode = SYS_USER_INFO.orgCode;
	$scope.employeeEntity.orgNameInput=SYS_USER_INFO.proName;
	if(SYS_USER_INFO.proId){
		$scope.employeeEntity.currentOrgId=SYS_USER_INFO.proId;
	}else{
		$scope.employeeEntity.currentOrgId=SYS_USER_INFO.orgId;
	}
	
	if($scope.employeeEntity.orgName && SYS_USER_INFO.orgLevel < 3){//控制包含下级的显示，当有当前单位和组织级别小于3的时候展示包含下级单位
		$scope.showLevel = true;
	}else if(!$scope.employeeEntity.orgName || SYS_USER_INFO.orgLevel > 2){
		$scope.showLevel = false;
	}
	
	/*
	 *分页标签参数配置
	*/
	$scope.paginationConf = {
        currentPage:1,/*当前页数*/
        totalItems:1,/*数据总数*/
        itemsPerPage: 20,	/*每页显示多少*/
        pagesLength: 10,		/*分页标签数量显示*/
        perPageOptions: [20, 30, 40, 50],
        /*
         * parm1:当前选择页数
         * parm2:每页显示多少
        */
        onChange:function(parm1,parm2){
        	$scope.paginationConf.currentPage=parm1;
        	$scope.queryAllMess();
        }
    };
			
	/**
	 * 分割时间
	 */
	$scope.Dates_ = {};
	$scope.queryData = {};
	$scope.cutDate = function(){
		if(!$scope.queryData.endDate){
			var myDate = new Date();
			$scope.Dates_.year=myDate.getFullYear();
			$scope.Dates_.month = myDate.getMonth()+1;
			$scope.queryData.month = $scope.Dates_.year+'-'+$scope.Dates_.month;
			$scope.queryData.month = $scope.queryData.month.toString();
		}else{
			if(!$scope.queryData.month){
				$scope.queryData.month = '';
				$scope.month ='';
			}
			if($scope.queryData.month.length!=0){
				$scope.month ='';
				$scope.queryData.month = '';
			}
			$scope.month=$scope.queryData.endDate.split('');
			for(var i=0;i<$scope.month.length;i++){
				if(!$scope.queryData.month){
					$scope.queryData.month='';
				}
				if(i<7){
					$scope.queryData.month+=$scope.month[i];
				}
			}
			$scope.queryData.month=$scope.queryData.month.toString();
		}
	};
	
	
	$scope.queryData={};
	$scope.copyFormParmsList = [];
	/**
	 * 查询
	 */
	$scope.formParmsList = [];
	$scope.queryAllMess = function(pageNo){
		if(pageNo){
			$scope.paginationConf.currentPage = 1;
		}
		
		$scope.cutDate();
		$scope.num = 0;
		function qSucc(rec){
			if(rec.content==""){
				$scope.reveal = false;
				$scope.formParmsList = [];
				$.messager.popup("没有符合条件的数据");
				return;
    		}else{
    			$scope.reveal = true;
    			$scope.formParmsList = rec.content;
    		}
			
			$scope.paginationConf.totalItems = rec.totalElements;
			
			
			$scope.num=$scope.formParmsList.length;
			
			for(var i=0;i<$scope.formParmsList.length;i++){
				$scope.formatMoney('formParmsList','rent',2,i);
				$scope.formatMoney('formParmsList','amount',2,i);
				$scope.formatMoney('formParmsList','cost',2,i);
				$scope.formatMoney('formParmsList','deductCost',2,i);
				
				$scope.formParmsList[i].equAtOrgCode=$scope.formParmsList[i].orgCode;
				$scope.formParmsList[i].equipmentId=$scope.formParmsList[i].equipmentId;
				$scope.formParmsList[i].equAtOrgId=$scope.formParmsList[i].equAtOrgId;
				$scope.formParmsList[i].equAtOrgName=$scope.formParmsList[i].orgName;
				
				   if($scope.formParmsList[i].equNo){
		               if($scope.formParmsList[i].equNo.length > 5){
							$scope.formParmsList[i].equNoA = $scope.formParmsList[i].equNo.substring(0,5)+"...";
						}else{
							$scope.formParmsList[i].equNoA =  $scope.formParmsList[i].equNo;
						}
		           }
				  
				 if($scope.formParmsList[i].equName){
		               if($scope.formParmsList[i].equName.length > 5){
							$scope.formParmsList[i].equNameA = $scope.formParmsList[i].equName.substring(0,5)+"...";
						}else{
							$scope.formParmsList[i].equNameA =  $scope.formParmsList[i].equName;
						}
		           }
				   if($scope.formParmsList[i].brandName){
		               if($scope.formParmsList[i].brandName.length > 5){
							$scope.formParmsList[i].brandNameA = $scope.formParmsList[i].brandName.substring(0,5)+"...";
						}else{
							$scope.formParmsList[i].brandNameA =  $scope.formParmsList[i].brandName;
						}
		           }
				   if($scope.formParmsList[i].models){
		               if($scope.formParmsList[i].models.length > 5){
							$scope.formParmsList[i].modelsA = $scope.formParmsList[i].models.substring(0,5)+"...";
						}else{
							$scope.formParmsList[i].modelsA =  $scope.formParmsList[i].models;
						}
		           }
				   if($scope.formParmsList[i].licenseNo){
		               if($scope.formParmsList[i].licenseNo.length > 5){
							$scope.formParmsList[i].licenseNoA = $scope.formParmsList[i].licenseNo.substring(0,5)+"...";
						}else{
							$scope.formParmsList[i].licenseNoA =  $scope.formParmsList[i].licenseNo;
						}
		           }
				
				$scope.copyFormParmsList[i] = $scope.formParmsList[i];
				if($scope.formParmsList[i].rentType==null){
					$scope.formParmsList[i].rentType = "1";
				}
			}
		};
		
		function qErr(){};
		
		if(!$scope.employeeEntity.changOrgName){
			$scope.employeeEntity.changOrgName = $scope.employeeEntity.orgName_;
		}
		if($scope.changeOrgCode_){
			$scope.employeeEntity.orgCode = $scope.changeOrgCode_;
		}
		
		 
		if($scope.equQryBean.equAtOrgPartyId){
			if($scope.equQryBean.equAtOrgFlag==2){
				$scope.employeeEntity.isInclude = 0;
			}
			if($scope.equQryBean.equAtOrgFlag==3){
				$scope.employeeEntity.isInclude = 0;
			}
			RentHistUserSvc.post({
				//orgCode:$scope.employeeEntity.orgCode,
				pageNo:$scope.paginationConf.currentPage - 1,
				pageSize:$scope.paginationConf.itemsPerPage,
				isInclude:$scope.employeeEntity.isInclude,
				orgFlag:$scope.equQryBean.equAtOrgFlag,
				orgPartyId:$scope.equQryBean.equAtOrgPartyId,
				//orgName:$scope.employeeEntity.changOrgName,
				month:$scope.queryData.month
			},qSucc,qErr);
		}else{
			
			if($scope.userInfo.proId){
				$scope.equQryBean.orgFlag = 3;
			}
			else if(1==$scope.userInfo.orgLevel){
				$scope.equQryBean.orgFlag = 9;
			}
			else if(2==$scope.userInfo.orgLevel){
				$scope.equQryBean.orgFlag = 1;
			}
			else if(3==$scope.userInfo.orgLevel){
				$scope.equQryBean.orgFlag = 2;
			}
			
			if($scope.equQryBean.equAtOrgFlag==2){
				$scope.employeeEntity.isInclude = 0;
			}
			if($scope.equQryBean.equAtOrgFlag==3){
				$scope.employeeEntity.isInclude = 0;
			}
			RentHistUserSvc.post({
				//orgCode:$scope.employeeEntity.orgCode,
				pageNo:$scope.paginationConf.currentPage - 1,
				pageSize:$scope.paginationConf.itemsPerPage,
				isInclude:$scope.employeeEntity.isInclude,
				orgFlag:$scope.equQryBean.orgFlag,
				orgPartyId:$scope.employeeEntity.currentOrgId,
				//orgName:$scope.employeeEntity.changOrgName,
				month:$scope.queryData.month
			},qSucc,qErr);
		}
		
	};
	
	$scope.cancel = function(){
		if($scope.radio_flag){
			$scope.radio_flag=null;
		}
	}

	/**
	 * 保存
	 */
	$scope.saveMess = function(obj){
		if(obj.$invalid){
			if($scope.formParmsList){
				$scope.showFlag="";
				for(var i =0;i<$scope.formParmsList.length;i++){
					if(obj['rentCount'+i].$invalid){
						$scope.showFlag = 'rentCount'+i;
						return;
					}
				}
			}	
		}else{
			function qSucc(rec){
				$.messager.popup(rec.msg);
				$scope.queryAllMess(1);
			};
			
			function qErr(){};
			
			for(var i=0;i<$scope.formParmsList.length;i++){
				if($scope.formParmsList[i].rent && $scope.formParmsList[i].rent.indexOf(",") && $scope.formParmsList[i].rent.indexOf(",") > 0){
					$scope.formParmsList[i].rent=$scope.formParmsList[i].rent.toString().replace(/\,/g,'');
				}
			}
			
			for(var i=0;i<$scope.formParmsList.length;i++){
				if($scope.formParmsList[i].amount && $scope.formParmsList[i].amount.indexOf(",") && $scope.formParmsList[i].amount.indexOf(",") > 0){
					$scope.formParmsList[i].amount=$scope.formParmsList[i].amount.toString().replace(/\,/g,'');
				}
			}
			for(var i=0;i<$scope.formParmsList.length;i++){
				if($scope.formParmsList[i].cost && $scope.formParmsList[i].cost.indexOf(",") && $scope.formParmsList[i].cost.indexOf(",") > 0){
					$scope.formParmsList[i].cost=$scope.formParmsList[i].cost.toString().replace(/\,/g,'');
				}
			}
			for(var i=0;i<$scope.formParmsList.length;i++){
				if($scope.formParmsList[i].deductCost && $scope.formParmsList[i].deductCost.indexOf(",") && $scope.formParmsList[i].deductCost.indexOf(",") > 0){
					$scope.formParmsList[i].deductCost=$scope.formParmsList[i].deductCost.toString().replace(/\,/g,'');
				}
			}
			RentHistUserSvc.post(
					{Action:"AddOrUpd"},
					{
						brhtList:$scope.copyFormParmsList,
						month_:$scope.queryData.month
					},
			qSucc,qErr);
		}
	
	};
	
	/**
	 * 已退场
	 */
    $scope.walkOff = function(){
    	if(!$scope.trBean){
    		$.messager.popup("请选择一条记录");
    		return;
    	}
    	$.messager.confirm("提示","请您在确认租赁费已结清，如已结清，当前设备信息不会在下个月的列表中展现",function(){
    		
    		function qSucc(rec){
    			$.messager.popup(rec.msg);
    			$scope.queryAllMess(1);
    		};
    		
    		function qErr(){};
    		RentHistUserSvc.post({Action:"Exit"},{equipmentId:$scope.trBean.equipmentId,month_:$scope.queryData.month,equAtOrgId:$scope.trBean.equAtOrgId},qSucc,qErr);
    	});
    	
    	
    };
	
	
	//点行选取单选框并赋值
	$scope.radio_flag={};
	$scope.trBean=null;
	$scope.selectRow=function(obj){
		$scope.trBean=obj.f;
		$scope.radio_flag=obj.$index;
	};
	//日期控件
	/**
	 * 获取当前日期的字符串表示形式
	 */
	 
	$scope.getNowDateStr=function()
	{
		var nowDate=new Date();
		year=nowDate.getFullYear();
		month=nowDate.getMonth()+1;
//		month1=nowDate.getMonth()+3;
		month1=nowDate.getMonth()+9;
		//day=nowDate.getDate();
		if(month<10){
			month="0"+month;
		}
		/*if(day<10){
			day="0"+day;
		}*/
	    var strDate=year+"-"+month1;//+"-"+day
	    var endDate=year+"-"+month;
	    $scope.queryData.endDate = endDate;
	    $('#endDateId').datetimepicker('setEndDate', strDate);
	}

	$("button").focus(function(){this.blur()});	
	
	$scope.flagEnd = true; /* 叉号显示初始值赋值 */
	
	/* 清除结束日期 */
	$scope.saveEndBean = null;/* 用于保存结束日期初始值 */
	$scope.cleanDateFunEnd = function()
	{
	    $scope.saveEndBean = $scope.queryData.endDate; /* 保存初始值  */
	    $scope.queryData.endDate = null; /* 清空日期控件值 */
	    document.getElementById("endDateId").focus(); /* 光标定位回日期控件 */
	};
	

	/**
	 * 每三位数字添加一个逗号分隔符号
	 */

	$scope.centsCopyFive1 = '';
	$scope.formatMoney=function(list_,obj2_,counts,this_){//参数分别是：num=输入值，parm=属性,flag=区分添加和修改的符号，counts=小数点最多几位
			$scope.numsArray_ = [];
		
		    $scope.test_ = [];//不能有2个以上的点，这个数组用于接收点的数目
		
			if($scope[list_][this_][obj2_]==null||$scope[list_][this_][obj2_]==""){//首先确定输入的有值
				return;
			}else{
				$scope[list_][this_][obj2_]=$scope[list_][this_][obj2_].toString();//把原值字符串话，因为数据库存的是大类型，只有字符串话才能切割（用于登记的时候重新加上逗号）
				$scope.numsArray_=$scope[list_][this_][obj2_].split("");//把输入的字符变成数组用于判断其中点的数目
			}
			
			for(var i=0;i<$scope[list_][this_].length;i++){//数值第一位不能是0，是0就返回0
				if($scope[list_][this_][0] == 0){
					//$scope.mess[parm] = 0;
					$scope[list_][this_][obj2_]=0;
					return ;
				}
			}
			
			for(var i=0;i<$scope.numsArray_.length;i++){//不能有2个以上的小数点否则为0
				if($scope.numsArray_[i] == '.'){
					$scope.test_.push($scope.numsArray_[i]);
					if($scope.test_.length>1){
						$scope[list_][this_][obj2_] = 0;
						return;
					}
				}
			}
			
			//检索点号的位置或者说是否有点号
			var judge = $scope[list_][this_][obj2_].indexOf(".");
			var cents='';//包括小数点之后
			var centsCopy =0;//不包括小数点之后
			
			//如果有点号之前的值存在（间接判定了点号不是第一位，第一位的时候judge==0）
			if(judge>0){
				cents = $scope[list_][this_][obj2_].substring(judge, $scope[list_][this_][obj2_].length);//包括点开始截取到完结
				centsCopy = cents.substring(1,cents.length);//截取（不包括小数点）点之后的数字原意是根据这个去判断如果小数点之后的字符有不是数字的判定输出结果为0
				$scope[list_][this_][obj2_] = $scope[list_][this_][obj2_].substring(0,judge);//截取（不包括点）点之前的数字
				
				if(centsCopy.length == counts){//当小数点后面的位数达到软需要求时记录数值,counts是方法传入的参数也就是要求小数点最多几位
					$scope.centsCopyFive1 = centsCopy;//$scope.centsCopyFive为一个记录对象，记录当满足小数点要求时，这个时候小数点后的数字是什么，用于下面的赋值
				}
				
				if(centsCopy.length> counts){//当小数点后面的位数超过软需要求时，把之前存的值赋值回cents,达到只能输入固定小数点位数
					cents = '.'+$scope.centsCopyFive1;
				}
			}
			
			$scope[list_][this_][obj2_] = $scope[list_][this_][obj2_].toString().replace(/\,/g,'');//全局匹配有没有逗号，有就清除，用于清除上次的逗号在进行排版
			//如果num不是数字就赋值为0   这个不完美如果小数点后有字母不为0
			if(isNaN($scope[list_][this_][obj2_])){
				$scope[list_][this_][obj2_] = "0";
			}
		
			if(isNaN(centsCopy)){//如果小数点后面的值有不为数字的字符就把小数点之前的置为0，包括小数点之后的字符为空，这样起到如果有不为数字的字符就为0
				$scope[list_][this_][obj2_] = "0";
 				cents = "";
 			}
			
			for (var i = 0; i < Math.floor(($scope[list_][this_][obj2_].length-(1+i))/3); i++){
				$scope[list_][this_][obj2_] = $scope[list_][this_][obj2_].substring(0,$scope[list_][this_][obj2_].length-(4*i+3))+','+$scope[list_][this_][obj2_].substring($scope[list_][this_][obj2_].length-(4*i+3));
			}
			//如果有小数点算上小数点赋值
			if(cents.length!=0){
				$scope[list_][this_][obj2_] = $scope[list_][this_][obj2_]+cents;
				if($scope[list_][this_][obj2_].length > 18){
					$scope[list_][this_][obj2_] = 0;
				}
			}else{
				$scope[list_][this_][obj2_] = $scope[list_][this_][obj2_];
				if($scope[list_][this_][obj2_].length > 18){
					$scope[list_][this_][obj2_] = 0;
				}
			}
		
	};

	$scope.centsCopyFive = '';
	$scope.formatMoneyNum=function(list_,obj2_,counts,this_){//参数分别是：num=输入值，parm=属性,flag=区分添加和修改的符号，counts=小数点最多几位
		
		$scope.numsArray_ = [];
		var judge = "";
	
	    $scope.test_ = [];//不能有2个以上的点，这个数组用于接收点的数目
	
		if($scope[list_][this_][obj2_]==null||$scope[list_][this_][obj2_]==""){//首先确定输入的有值
			return;
		}else{
			$scope[list_][this_][obj2_]=$scope[list_][this_][obj2_].toString();//把原值字符串话，因为数据库存的是大类型，只有字符串话才能切割（用于登记的时候重新加上逗号）
			$scope.numsArray_=$scope[list_][this_][obj2_].split("");//把输入的字符变成数组用于判断其中点的数目
		}
		
		for(var i=0;i<$scope[list_][this_].length;i++){//数值第一位不能是0，是0就返回0
			if($scope[list_][this_][0] == 0){
				//$scope.mess[parm] = 0;
				$scope[list_][this_][obj2_]=0;
				return ;
			}
			
		}
		
		for(var i=0;i<$scope.numsArray_.length;i++){//不能有2个以上的小数点否则为0
			if($scope.numsArray_[i] == '.'){
				$scope.test_.push($scope.numsArray_[i]);
				if($scope.test_.length>1){
					$scope[list_][this_][obj2_] = 0;
					return;
				}
			}
		}
		
		//检索点号的位置或者说是否有点号
		   judge = $scope[list_][this_][obj2_].indexOf(".");
		var cents='';//包括小数点之后
		var centsCopy =0;//不包括小数点之后
		
		//如果有点号之前的值存在（间接判定了点号不是第一位，第一位的时候judge==0）
		if(judge>0){
			cents = $scope[list_][this_][obj2_].substring(judge, $scope[list_][this_][obj2_].length);//包括点开始截取到完结
			
			centsCopy = cents.substring(1,cents.length);//截取（不包括小数点）点之后的数字原意是根据这个去判断如果小数点之后的字符有不是数字的判定输出结果为0
			$scope[list_][this_][obj2_] = $scope[list_][this_][obj2_].substring(0,judge);//截取（不包括点）点之前的数字
			
			if(centsCopy.length == counts){//当小数点后面的位数达到软需要求时记录数值,counts是方法传入的参数也就是要求小数点最多几位
				$scope.centsCopyFive = centsCopy;//$scope.centsCopyFive为一个记录对象，记录当满足小数点要求时，这个时候小数点后的数字是什么，用于下面的赋值
			}
			
			if(centsCopy.length > counts){//当小数点后面的位数超过软需要求时，把之前存的值赋值回cents,达到只能输入固定小数点位数
				cents = '.'+$scope.centsCopyFive;
			}
		}
		
		$scope[list_][this_][obj2_] = $scope[list_][this_][obj2_].toString().replace(/\,/g,'');//全局匹配有没有逗号，有就清除，用于清除上次的逗号在进行排版
		//如果num不是数字就赋值为0   这个不完美如果小数点后有字母不为0
			if(isNaN($scope[list_][this_][obj2_])){
				$scope[list_][this_][obj2_] = "0";
			}
			if(isNaN(centsCopy)){//如果小数点后面的值有不为数字的字符就把小数点之前的置为0，包括小数点之后的字符为空，这样起到如果有不为数字的字符就为0
				$scope[list_][this_][obj2_] = "0";
				cents = "";
			}
		//如果有小数点算上小数点赋值
		if(cents.length!=0){
			$scope[list_][this_][obj2_] = $scope[list_][this_][obj2_]+cents;
		}else{
			$scope[list_][this_][obj2_] = $scope[list_][this_][obj2_];
		}
	
};

	
	

	
	/*
	*input框ng-change事件
	*/
$scope.KeyWordQuery = function(inputValue,showFlag){/* 需要 */
	$scope.KeyWordListFlag = false;//如果改变输入框的值就把flag变成false，用于时时监控不管是改变的值是有查询结果还是没有都先为false这样可以把青花瓷的例子筛选出来，也可以把没改变的时候筛选出来
	if(inputValue.length == 0){//如果输入框没有值了，就隐藏下面的展示结果域
		$scope[showFlag] = false;
		$scope.flagShow = false;
	}else{
		$scope.flagShow = true;
	}
	$scope.KeyWordList=[];/* 需要 */

	if($scope.employeeEntity.orgName.length < 1){
		$scope.showLevel = false;
		$scope.employeeEntity.isInclude = false;//复选框控制
	}
	
	function qSucc(rec){/* 需要 */
		if(rec.content.length<=0){/* 需要 */
			$scope[showFlag]=false;/* 需要 */
			$scope.flagAdd_show = true;//添加按钮不能点
		}else{
			$scope[showFlag]=true;/* 需要 */
			$scope.KeyWordList=rec.content;/* 需要 */
			$scope.KeyWordListFlag = true;//如果有查询的值flag就为true
			
			for(var i=0;i<$scope.KeyWordList.length;i++){//这里的遍历主要用于在改变输入值的时候如果有查询出对应的名字就赋值对应的code（解决在不展示查询信息的时候也可以根据查到的code去查询（如中铁二局查到后失去焦点在点查询的时候）
				if($scope.employeeEntity.orgName == $scope.KeyWordList[i].name){//如果输入的name等于展示集合的name那就赋值给对应的code
					//$scope.employeeEntity.code = $scope.KeyWordList[i].code;//此地赋值code
					$scope.changeOrgCode_ = $scope.KeyWordList[i].code;
					$scope.employeeEntity.deptId = $scope.KeyWordList[i].currOrgId;//id是用来赋值给当前单位下的人的
					$scope.saveDeptId = $scope.KeyWordList[i].currOrgId;
					$scope.flagAdd_show = false;//添加按钮不能点
					if($scope.KeyWordList[i].orgLevel == 2){
						$scope.userInfo.orgLevel_show = 2;
					}
					if($scope.KeyWordList[i].orgLevel == 3){
						$scope.userInfo.orgLevel_show = 3;
					}
					if($scope.KeyWordList[i].orgLevel == 1){
						$scope.userInfo.orgLevel_show = 1;
					}
					break;
				}else{
					$scope.changeOrgCode_ = $scope.employeeEntity.orgName;//没有就赋值名字为code相当于去查空（如中次）
					$scope.userInfo.orgLevel_show = 3;//2016.1.12 如果在修改输入文字的时候不等于局级的名字那一律按不显示复选框处理
					$scope.flagAdd_show = true;//添加按钮不能点
				}
			}
			
			$scope.KWList(rec.content);//字数超过9个后用...代替/
		}
	}
	function qErr(){}
	if(inputValue){
		entSvc.queryPartyInstallList({Action:'QueryEnts'},{
			orgCode:SYS_USER_INFO.orgCode,
			orgName:$scope.employeeEntity.orgName,
			pageNo:$scope.paginationConf.currentPage-1,
			pageSize:$scope.paginationConf.itemsPerPage
		},qSucc,qErr);
	}
};
	
	
	/*
	*点击搜索下拉框定位显示在input
	*/
	$scope.searBean = {};
	$scope.InputShow = function(parm,searBean,infoTitleBean,LiNumA,level,id,changeOrgId,changOrgName,code){//点击的值，scope后的属性名，属性名后的属性名，LiNumA为显示下方的flag，level为组织级别，
	
		if(parm){
			$scope[searBean][infoTitleBean] = parm;/* 需要 */
			$scope[searBean][changeOrgId] = id;
			$scope[searBean][changOrgName] = parm;
			$scope.changeOrgCode_ = code;
			if(level > 2){
				$scope.showLevel = false;//根据组织级别控制是否有显示下级的复选框，2以上为处级也就是没有下级不显示复选框
				$scope.employeeEntity.isInclude = false;//复选框控制
			} 
			if(level < 3){
				$scope.showLevel = true;
			}
			$scope[LiNumA] = false;
			return;
		}
		
	};
	
	/*
	*多余字体用...代替
	*/
	$scope.KWList = function(val){
		for(var i=0;i<val.length;i++){
			if(val[i].name.length > 9){
				$scope.KeyWordList[i].infoTitleA = val[i].name.substring(0,7)+"...";
        	}else{
        		$scope.KeyWordList[i].infoTitleA = val[i].name;
        	}
		}
	};
	
	/**
	 * 以下为12.29日编写的有关输入框叉号的一系列方法，其中包括：点击叉号清除输入框值焦点定位到输入框、点击输入框判断如果输入框有值就显示叉号，没有就清空、失去焦点推迟0.15秒失去叉号这样可以保证失去焦点的时候不会叉号直接就被清空了来不及点
	 * 顺序按照上面的描述排序
	 */
	$scope.flagShow = false;
	
	$scope.cleanDateFunEnd = function(){
		$scope.employeeEntity.orgName = '';
		$("#searchContent").focus();
		$scope.flagShow = false;
		if($scope.LiNumA == true){
			$scope.LiNumA = false;
		}
	};
	
	$scope.clickInput = function(obj){
		if(obj.length > 0){
			$scope.flagShow = true;
		}else{
			$scope.flagShow = false;
		}
	};
	
	$scope.blurInput = function(){
		$timeout(function() { // 延迟0.15秒这样能优先执行清除日期的方法达到赋值，要不点击会直接清除叉号不会执行清除日期的方法不能赋值 
			$scope.flagShow = false;
			$scope.LiNumA = false;
			$scope.KeyWordList = [];
	     },150);
		
		if($scope.employeeEntity.orgName == ''){//失去焦点时如果当前单位是空的默认查询当前登录人信息
			$scope.flagAdd_show = false;//当为空的时候离可点添加
			$scope.employeeEntity.orgName = SYS_USER_INFO.orgName;
			
			$scope.employeeEntity.code=SYS_USER_INFO.orgCode;
			$scope.employeeEntity.changeOrgId = SYS_USER_INFO.orgId;
			if(SYS_USER_INFO.orgLevel == 2){
				$scope.userInfo.orgLevel_show = 2;
			}          
			if(SYS_USER_INFO.orgLevel == 1){
				$scope.userInfo.orgLevel_show = 1;
			}
			if(SYS_USER_INFO.orgLevel == 3){
				$scope.userInfo.orgLevel_show = 3;
			}
		}
	};
	
	
	
	$scope.equQryBean = {};
	$scope.equQryBean.isInclude = 0;
	$scope.equQryBean.isCrecOrg = 0;
	$scope.equQryBean.equAtOrgNameSelect = SYS_USER_INFO.orgName;
	$scope.equQryBean.equAtOrgNameInput = SYS_USER_INFO.proName;
	$scope.inputDeptName = SYS_USER_INFO.orgName;
	
	/* 资源管理列表查询分页标签参数配置 */
	$scope.paginationConfOrgORProject = {
		currentPage: 1,/** 当前页数 */
		totalItems: 1,/** 数据总数 */
		itemsPerPage: 10,/** 每页显示多少 */
		pagesLength: 10,/** 分页标签数量显示 */
		perPageOptions: [10, 20, 30, 40],
		onChange: function(currentPage){
			if($scope.queryEquAtEmployer.currOrgId){
				$scope.clickEquAtProjects(currentPage);
				}
		}
	};
	
	$scope.equAtEmployers = [];
	$scope.equAtEmployer = {};
	$scope.queryEquAtEmployer = {};
	$scope.equAtCheck = true;	//	项目选项 显示标志
	$scope.queryEquAtEmployer.check = false;	//	项目选项值
	$scope.checkEquAtTrEmployer = true;	//	列名称 - 单位名称 显示标志
	$scope.checkEquAtTrProjects = false;	//	列名称 - 项目名称 显示标志
	

	$scope.openEquAtEmployerModel = function(){
		if($scope.equAtEmployers.length==0){//	首次打开
			var orgLv;
			if(1==$scope.userInfo.orgLevel){
				orgLv = 9;
			}
			else if(2==$scope.userInfo.orgLevel){
				orgLv = 1;
			}
			else if(3==$scope.userInfo.orgLevel){
				orgLv = 2;
			}

			$scope.queryEquAtEmployer.currOrgId = $scope.userInfo.orgId;

			/** 放入单位信息，且查询该组织下的机构/项目 */
			$scope.equAtEmployers = [{name: $scope.userInfo.orgName, currOrgId: $scope.userInfo.orgId, orgFlag: orgLv}];

			$scope.queryEquAtEmployer.pageNo = 0;
			$scope.queryEquAtEmployer.pageSize = $scope.paginationConfOrgORProject.itemsPerPage;

			if(2==orgLv){
				$scope.checkEquAtTrProjects = true;
				$scope.checkEquAtTrEmployer = false;
				$scope.queryEquAtEmployer.check = true;
				$scope.equAtCheck = false;

				/** 根据currOrgId，查询该组织下的项目 begin */
				function qSucc(rec){
					$scope.equAtEmployerList = rec.content;
					$scope.paginationConfOrgORProject.totalItems = rec.totalElements;
					$('#equAtEmployerModel').modal('show');
				}
				function qErr(){
					
				}
				proSvc.queryPartyInstallList($scope.queryEquAtEmployer, qSucc, qErr);
				/** 根据currOrgId，查询该组织下的项目 end */
				}
			else{
				$scope.checkEquAtTrProjects = false;
				$scope.checkEquAtTrEmployer = true;
				$scope.queryEquAtEmployer.check = false;
				$scope.equAtCheck = true;

				/** 根据currOrgId，查询该组织下的机构 begin */
				function qSucc2(rec){
					$scope.equAtEmployerList = rec.content;
					$scope.paginationConfOrgORProject.totalItems = rec.totalElements;
					$('#equAtEmployerModel').modal('show');
				}
				function qErr2(){
					
				}
				entSvc.queryPartyInstallList($scope.queryEquAtEmployer, qSucc2, qErr2);
				/** 根据currOrgId，查询该组织下的机构 end */
			}
		}
		else{//	非首次打开
			$('#equAtEmployerModel').modal('show');
		}
	};
	

	/* 点击查询下级单位，且保存点击的机构信息 */
	$scope.clickEquAtEmployer = function(currentPage, orgInfo){
		if(currentPage)
		{
			$scope.paginationConfOrgORProject.currentPage = currentPage;
		}

		var orgLv;
		if(1==orgInfo.orgLevel){
			orgLv = 9;
		}
		else if(2==orgInfo.orgLevel){
			orgLv = 1;
		}
		else if(3==orgInfo.orgLevel){
			orgLv = 2;
		}

		/** 保存点击的机构信息 */
		$scope.equAtEmployer = {};

		$scope.equAtEmployer.name = orgInfo.name;
		$scope.equAtEmployer.currOrgId = orgInfo.currOrgId;
		$scope.equAtEmployer.orgFlag = orgLv;
		//$scope.equAtEmployer.code = orgInfo.code;
		$scope.equAtEmployers.push($scope.equAtEmployer);

		$scope.queryEquAtEmployer.currOrgId = orgInfo.currOrgId;

		if(2==orgLv){/** 处级单位 */
			$scope.checkEquAtTrProjects = true;
			$scope.checkEquAtTrEmployer = false;
			$scope.queryEquAtEmployer.check = true;
			$scope.equAtCheck = false;

			$scope.qryEquAtProject();
		}
		else{/** 总公司/局级单位 */
			$scope.checkEquAtTrProjects = false;
			$scope.checkEquAtTrEmployer = true;
			$scope.queryEquAtEmployer.check = false;
			$scope.equAtCheck = true;

			$scope.qryEquAtEmployer();
		}
	};
	
	/* 点击项目，变更保存的项目信息 */
	$scope.clickEquAtProject = function(orgInfo){
		/** 变更保存点击的项目信息 */
		$scope.equAtEmployer = {};
		//$scope.equAtEmployer.code = orgInfo.code; 
		$scope.equAtEmployer.name = orgInfo.name;
		$scope.equAtEmployer.currOrgId = orgInfo.currOrgId;
		$scope.equAtEmployer.orgFlag = 3;

		var employersLength = $scope.equAtEmployers.length;
		if(employersLength>0 && 3==$scope.equAtEmployers[employersLength - 1].orgFlag){
			$scope.equAtEmployers.splice(employersLength - 1, 1);
		}
		$scope.equAtEmployers.push($scope.equAtEmployer);
	};
	
	
	/* 点击当前位置的单位/项目，变更当前位置、单位/项目列表 */
	$scope.clickEquAtEmployers = function(currentPage, orgInfo, employersIndex){
		if(currentPage)
		{
			$scope.paginationConfOrgORProject.currentPage = currentPage;
		}

		/** 变更当前位置 */
		var employersLength = $scope.equAtEmployers.length;
		if(employersLength<=0){
			return ;
		}

		$scope.equAtEmployers.splice(employersIndex + 1, employersLength - employersIndex - 1);

		/** 保存点击的机构信息 */
		$scope.queryEquAtEmployer.currOrgId = orgInfo.currOrgId;

		var orgLv = $scope.equAtEmployers[employersIndex].orgFlag;
		if(3==orgLv){/** 项目 */
			return ;
		}
		else if(2==orgLv){/** 处级单位 */
			$scope.checkTrProjects = true;
			$scope.checkTrEmployer = false;
			$scope.queryEquAtEmployer.check = true;
			$scope.equAtCheck = false;

			$scope.qryEquAtProject();
		}
		else{/** 总公司/局级单位 */
			$scope.checkEquAtTrProjects = false;
			$scope.checkEquAtTrEmployer = true;
			$scope.queryEquAtEmployer.check = false;
			$scope.equAtCheck = true;

			$scope.qryEquAtEmployer();
		}
	};

	/* 勾选项目，根据当前位置的最下级单位id，查询单位/项目列表 */
	$scope.clickEquAtProjects = function(currentPage) {
		if(currentPage)
		{
			$scope.paginationConfOrgORProject.currentPage = currentPage;
		}

		var employersLength = $scope.equAtEmployers.length;
		if(employersLength<=0){
			return ;
		}

		if($scope.equAtEmployers[employersLength - 1].orgFlag==3){
			return ;
		}

		$scope.queryEquAtEmployer.currOrgId = $scope.equAtEmployers[employersLength - 1].currOrgId;

		if($scope.queryEquAtEmployer.check){
			$scope.checkEquAtTrProjects = true;
			$scope.checkEquAtTrEmployer = false;

			$scope.qryEquAtProject();
		}
		else{
			$scope.checkEquAtTrProjects = false;
			$scope.checkEquAtTrEmployer = true;

			$scope.qryEquAtEmployer();
		}
	};
	
	/* 根据currOrgId，查询该组织下的机构 */
	$scope.qryEquAtEmployer = function(){
		$scope.queryEquAtEmployer.pageNo = $scope.paginationConfOrgORProject.currentPage - 1;
		$scope.queryEquAtEmployer.pageSize = $scope.paginationConfOrgORProject.itemsPerPage;

		/** 根据currOrgId，查询该组织下的机构 begin */
		function qSucc(rec){
			$scope.equAtEmployerList = rec.content;
			$scope.paginationConfOrgORProject.totalItems = rec.totalElements;
		}
		function qErr(){
			
		}
		entSvc.queryPartyInstallList($scope.queryEquAtEmployer, qSucc, qErr);
		/** 根据currOrgId，查询该组织下的机构 end */
	};
	
	/* 根据currOrgId，查询该组织下的项目 */
	$scope.qryEquAtProject = function(){
		$scope.queryEquAtEmployer.pageNo = $scope.paginationConfOrgORProject.currentPage - 1;
		$scope.queryEquAtEmployer.pageSize = $scope.paginationConfOrgORProject.itemsPerPage;

		/** 根据currOrgId，查询该组织下的项目 begin */
		function qSucc(rec){
			$scope.equAtEmployerList = rec.content;
			$scope.paginationConfOrgORProject.totalItems = rec.totalElements;
		}
		function qErr(){
			
		}
		proSvc.queryPartyInstallList($scope.queryEquAtEmployer, qSucc, qErr);
		/** 根据currOrgId，查询该组织下的项目 end */
	};
	
	/* 变更并关闭 选择单位/项目模态框 */
	$scope.modifyEquAtEmployerModel = function(val){
		$('#equAtEmployerModel').modal('hide');

		var employersLength = $scope.equAtEmployers.length;
		if(employersLength<=0){
			return ;
		}

		$scope.equAtEmployer = $scope.equAtEmployers[employersLength - 1];
		
		//$scope.equQryBean.orgCode =  $scope.equAtEmployer.code;
		
		$scope.equQryBean.equAtOrgFlag = $scope.equAtEmployer.orgFlag;
		
		$scope.equQryBean.equAtOrgPartyId = $scope.equAtEmployer.currOrgId;
		
		$scope.equQryBean.equAtOrgNameSelect = $scope.equAtEmployer.name;

	};
	
	/* 取消并关闭 选择单位/项目模态框 */
	$scope.closeEquAtEmployerModel = function(){
		$('#equAtEmployerModel').modal('hide');
	} 
	
	$scope.clearEquAtEmployerModel = function(){
		$scope.equQryBean.equAtOrgFlag = null;
		$scope.equQryBean.equAtOrgPartyId = null;
		$scope.equQryBean.equAtOrgNameSelect = null;

		$scope.equAtEmployers = [];
		$scope.equAtEmployer = {};
		$scope.queryEquAtEmployer = {};
		$scope.equAtCheck = true;	//	项目选项 显示标志
		$scope.queryEquAtEmployer.check = false;	//	项目选项值
		$scope.checkEquAtTrEmployer = true;	//	列名称 - 单位名称 显示标志
		$scope.checkEquAtTrProjects = false;	//	列名称 - 项目名称 显示标志

		$('#equAtEmployerModel').modal('hide');
	};
	
	
	
	
});
