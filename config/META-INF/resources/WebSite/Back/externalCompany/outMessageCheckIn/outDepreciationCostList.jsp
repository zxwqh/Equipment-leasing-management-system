<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
<title>折旧费登记</title>
<style>
.container {width: 1500px !important;}
.form-horizontal .control-label {
	padding-top: 7px;
	margin-bottom: 0;
	text-align: right;
	min-width : 0px;
}
/**
*新分页的样式css
*/
.page-list .pagination {float:left;}
.page-list .pagination span {cursor: pointer;}
.page-list .pagination .separate span{cursor: default; border-top:none;border-bottom:none;}
.page-list .pagination .separate span:hover {background: none;}
.page-list .page-total {float:left; margin: 25px 20px;}
.page-list .page-total input, .page-list .page-total select{height: 26px; border: 1px solid #ddd;}
.page-list .page-total input {width: 40px; padding-left:3px;}
.page-list .page-total select {width: 50px;}
::-ms-clear, ::-ms-reveal{display: none;} 
</style>


<style>
.container {width: 1500px !important;}  

.form-horizontal .control-label {
padding-top: 7px;
margin-bottom: 0;
text-align: right;
min-width : 0px;
}

.abc {
	position: absolute;
	top: 100%;
	left: 0;
	z-index: 1000;
	float: left;
	min-width: 160px;
	padding: 5px 0;
	margin: 2px 0 0;
	font-size: 14px;
	text-align: left;
	list-style: none;
	background-color: #fff;
	-webkit-background-clip: padding-box;
	background-clip: padding-box;
	border: 1px solid #ccc;
	border: 1px solid rgba(0, 0, 0, .15);
	border-radius: 4px;
	-webkit-box-shadow: 0 6px 12px rgba(0, 0, 0, .175);
	box-shadow: 0 6px 12px rgba(0, 0, 0, .175)
}

::-ms-clear, ::-ms-reveal{display: none;}

.page-list .pagination {float:left;}
.page-list .pagination span {cursor: pointer;}
.page-list .pagination .separate span{cursor: default; border-top:none;border-bottom:none;}
.page-list .pagination .separate span:hover {background: none;}
.page-list .page-total {float:left; margin: 25px 20px;}
.page-list .page-total input, .page-list .page-total select{height: 26px; border: 1px solid #ddd;}
.page-list .page-total input {width: 40px; padding-left:3px;}
.page-list .page-total select {width: 50px;}

/* ======================================================================================================== */

/* textarea {
margin:0px 0px 0px 0px;
} */

.style_compact {
padding: 0px 0px 0px 0px; /* 自定义样式内边距为0 用在tr上*/
margin:0px 0px 0px 0px;
}

.style_margin{
margin:0px 0px 0px 0px;
}

.form-control_test {
  display: block;
  width: 100%;
  height: 20px;/* 输入框高 */
  padding: 0px;/* 输入框内边距 */
  font-size: 14px;
  line-height: 1.428571429;/* 光标高 */
  color: #555555;
  vertical-align: middle;
  background-color: #ffffff;
  background-image: none;
  border: 1px solid #cccccc;
  border-radius: 0px;/* 输入框圆角 默认4px */
  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
          box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
  -webkit-transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;
          transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;
}

.modal-header_test {
  min-height: 0px;
  padding: 0px;
  border-bottom: 1px solid #e5e5e5;
   margin-top: 0px;
}

.modal-body_test {
  position: relative;
  padding: 0px;
  margin:0px;
}

.table_test > thead > tr > th,
.table_test > tbody > tr > th,
.table_test > tfoot > tr > th,
.table_test > thead > tr > td,
.table_test > tbody > tr > td,
.table_test > tfoot > tr > td {
  padding: 0px 0px 0px 0px;/* 内边距 0  */
  line-height: 1;/* 边距比较重要 */
  vertical-align: none;/* 上下对其，不对齐 */
  border-top: 1px solid #dddddd;/* 这个不改 */
  margin:0px 0px 0px 0px;
}

.form-horizontal_ ,
.form-horizontal_ .radio_,
.form-horizontal_ .checkbox_,
.form-horizontal_ .radio-inline_,
.form-horizontal_ .checkbox-inline_ {
  padding: 0px;
  margin-top: 0;
  margin-bottom: 0;
  margin:2px 2px 2px 2px;
}

.form-horizontal_ .form-group_ {
  margin-right: 0px;
  margin-left: 0px;
  padding: 0px;
  margin:2px 2px 2px 2px;
}

.form-horizontal_ .form-group_:before,
.form-horizontal_ .form-group_:after {
  display: table;
  content: " ";
  padding: 0px;
  margin:2px 2px 2px 2px;
}

.form-horizontal_ .form-group_:after {
  clear: both;
  padding: 0px;
  margin:2px 2px 2px 2px;
}

.form-horizontal_ .form-group_:before,
.form-horizontal_ .form-group_:after {
  display: table;
  content: " ";
  padding: 0px;
  margin:2px 2px 2px 2px;
}

.form-horizontal_ .form-group_:after {
  clear: both;
  padding: 0px;
  margin:2px 2px 2px 2px;
}

.form-horizontal_ .form-control-static_ {
 padding: 0px;
 margin:2px 2px 2px 2px;
}

@media (min-width: 768px) {
  .form-horizontal_ {
    text-align: none;
    padding: 0px;
    margin:2px 2px 2px 2px;
  }
}


.btn_Under {
  display: inline-block;
  padding: 0px ;
  margin-bottom: 0;
  font-size: 18px;
  font-weight: normal;
  line-height: 1.428571429;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  cursor: pointer;
  background-image: none;
  border: 1px solid transparent;
  border-radius: 4px;
  -webkit-user-select: none;
     -moz-user-select: none;
      -ms-user-select: none;
       -o-user-select: none;
          user-select: none;
}

.btn_ {
  display: inline-block;
  padding: 0px ;
  margin-bottom: 0;
  font-size: 14px;
  font-weight: normal;
  line-height: 1.428571429;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  cursor: pointer;
  background-image: none;
  border: 1px solid transparent;
  border-radius: 4px;
  -webkit-user-select: none;
     -moz-user-select: none;
      -ms-user-select: none;
       -o-user-select: none;
          user-select: none;
}
</style>
<input type="hidden" id="USER_INFO_ORG_ID" value="${sessionScope.userInfo.orgId}">
<input type="hidden" id="USER_INFO_PARENT_CODE" value="${sessionScope.userInfo.code}">
<input type="hidden" id="USER_INFO_ORG_NAME" value="${sessionScope.userInfo.orgName}">
</head>
<body  class="container" >
	<ol class="breadcrumb" >
		<li style="font-size: 13px">您的位置：后台管理</li>
		<li style="font-size: 13px">外部企业用户</li>
		<li style="font-size: 13px">折旧费登记</li>
	</ol>
	<form action=""   style="width: 80%;margin-left:170px">
		<div class="form-horizontal" style="margin-top: 10px;">
			<ul>
				<div class="form-group">
					<div class="col-xs-4" style="margin-top:-17px;">
						<!-- 当前单位  -->
						<label contenteditable="false" class="col-xs-3 control-label">当前单位：</label>
						<div style="float:left;margin-top:6px;font-weight:bold"><span class="control-label" title="{{employeeEntity.orgName}}">{{employeeEntity.orgNameA}}</span></div>
					</div>
					<div class="col-xs-4" style="margin-top:-17px;margin-left:50px">
						<!-- 登记月份  -->
						<label contenteditable="false" class="col-xs-3 control-label"  >登记月份：</label>
				 		<div class="col-xs-3" style="float: left; width: 160px; margin-left: -10px; ">
							<input   id="endDateId" type="text" ng-init="getNowDateStr();"  ng-change="complienEnd();" class="form-control input-group date form_date" ng-model="queryData.endDate"><!-- 触发事件 --> 
	 						<span class="input-group-addon" style="display: none">
								<span class="glyphicon glyphicon-calendar"> </span>
							</span>
						</div>
						<div class="col-xs-2" >
							<input type="button" class="btn btn-primary" style="margin-top:6px" value="查询" ng-click="criteriaQueryDepreciationHist(1);" style="z-index:1;"/>
						</div>
					</div>
				</div>
			</ul>
		</div>
		<div>
			<table class="table table-hover" style="margin-left: 28px;z-index:3;margin:10px 0px 0px 0px;font-size:14px;width:90%">
				<thead>
					<tr class="success">
						<th style="text-align:center;white-space: nowrap;">序号</th>
						<th style="text-align:center;white-space: nowrap;">设备编号</th>
						<th style="text-align:center;white-space: nowrap;">资产编号</th>
						<th style="text-align:center;white-space: nowrap;">设备名称</th>
						<th style="text-align:center;white-space: nowrap;">品牌</th>
						<th style="text-align:center;white-space: nowrap;">规格</th>
						<th style="text-align:center;white-space: nowrap;">型号</th>
						<th style="text-align:center;white-space: nowrap;">原值（万元）</th>
						<th style="text-align:center;white-space: nowrap;">出厂日期</th>
						<th style="text-align:center;white-space: nowrap;">本月折旧(元)</th>
					</tr>
				</thead>
				<tbody>
					<tr ng-repeat="d in depreactionList" ng-click="check(d,$index+1);" style="text-align:center;">
					<!-- 	<td style="width:50px">
							<span style="margin-left:3px;">{{$index+1+(paginationConf.currentPage-1)*paginationConf.itemsPerPage}}</span>
						</td> -->
						<td>
							{{$index+1+(paginationConf.currentPage-1)*paginationConf.itemsPerPage}}
						</td>
                        <td title="{{d.equNo}}">{{d.equNoA}}</td>
						<td title="{{d.asset}}">{{d.assetA}}</td>
						<td style="width:200px" title="{{d.equipmentName}}">{{d.equipmentNameA}}</td>
						<td style="width:100px" title="{{d.brandName}}">{{d.brandNameA}}</td>
						<td style="width: 80px;text-align: center;" title="{{d.specifications}}">{{d.specifications}}</td>
						<td style="width: 80px;text-align: center;" title="{{d.models}}">{{d.models}}</td>
						<td style="width: 80px;text-align: center;" title="{{d.equipmentCost}}">{{d.equipmentCost}}</td>	
						<td style="width:150px" title="{{d.productionDate}}">{{d.productionDate}}</td>
						<td style="width:200px"><input ng-readonly="equState==3 || equState==4"  type="text" class="form-control" id="depreciation" style="margin-top:0px;margin-bottom:0px;height:15px;font-size:11px"  maxlength="18" title="{{d.depreciation}}" ng-model="d.depreciation" ng-change="formatMoney('depreactionList','depreciation',2,$index);"></td>
					</tr>
				</tbody>
			</table>
			<div class="form-horizontal" style="width: 90%;margin-top:14px;margin-left:-3px">
					<div class="form-group" >
						<div  ng-show="reveal">
							<input type="button" class="btn btn-primary" value="保存" style="text-align:left;margin-top:5px;" ng-click="saveClick(save);" ng-disabled="save">
						</div>
						<div style="text-align: right; float: right;margin-right:-10px;margin-top:-45px">
							<tm-pagination conf="paginationConf"></tm-pagination>
						</div> 
					</div>
			</div>
		</div>
	</form>
	 <script type="text/javascript">
		$('.form_date').datetimepicker({
			format: 'yyyy-mm',
			language : 'zh-CN',
			autoclose : 1,
			endDate:'setEndDate',
			todayHighlight : 1,
			startView : 3,
			minView : 3,
			forceParse : 0
		});
	</script>
</body>
</html>