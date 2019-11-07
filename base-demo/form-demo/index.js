function popWinS(title,url,width,height){
	title=title?title:'绩效考核管理系统';
	width=width?width:600;
	height=height?height:400;
	$("<div id='easyui_dial'></div>").appendTo("body");
	$('#easyui_dial').dialog({
		title: title,
		content:'<iframe id="easyui_dial_iframe" src='+url+' style="width:100%;height:100%;" frameborder="0"></iframe>',
		width:width,
		height:height,
		onClose:function(){
			if(fn&&typeof fn === 'function'){
				eval("fn();");
			}
			$('#easyui_dial').remove();
		},
		modal:true
	});
}
function initSys(){
//initIt("0");
selectType();
}

function selectType(){
	var id = document.all["select_id"].value;
	var tableName = document.all["tableNameStr"].value;
	var nameStr = tableName.split("@");
	for(var i=0;i<nameStr.length;i++){
		var name = nameStr[i];
		if(name==id)
			document.all[name].style.display="block";
		else
			document.all[name].style.display="none";
	}
	if(id==='EvaInd'){
		Fuzzy('EvaIndBank','bnk');
		Fuzzy('dir_product','prd');
	}else if(id==='IndPrd'){
		Fuzzy('IndPrdBank','bnk');
		Fuzzy('productID','mprd');
	}else if(id==='EpmInd'){
		Fuzzy('dirprd','prd');
	}
}
function SelectValue(item,id){

	document.all["hid_product"].value=item;
	var oldId = document.all["hid_oldId"].value;
	if(oldId != null && oldId != ""){
		document.all["cd"+oldId].className ="";
	}
	document.all["cd"+id].className ="productbg"
	document.all["hid_oldId"].value=id;
}

function insert()
{
	var string = "";
	var id = document.all["select_id"].value;
	var filterStr = document.all[id+"_filter"].value;
	var filterName = filterStr.split("@");
	var item = $("#"+id); //获得选中过滤器父对象
	if(id!="IndPrd" && id!="EvaInd"){
		string += id+"@";
	}
	var flag = false;
	for(var i=0;i<filterName.length;i++){
		if(item.find("#"+filterName[i]+"_text").text().indexOf("CUR")<0 && item.find("#"+filterName[i]+"_text").text().indexOf("SLF")<0){
			if(i>0 && flag && filterName[i-1].indexOf(id)>=0 && filterName[i].indexOf(id)<0){
				string += ":";
			}else if(string!="" && string!=id+"@"){
				string += ".";
			}
			if(filterName[i].indexOf(id)>=0)
				flag = true;
			var s = item.find("#"+filterName[i]+"_text").text().replace(":","").replace("[","").replace("]","[")
			if(s.indexOf("[")>=0){
				s += "]";
			}else{
				s = s.replace(/[^x00-xff]/,"").replace(/[^x00-xff]/,"");
				if(s.length==5){
					var a = s.substring(4,5);
					s = s.substring(0,4)+"0"+a;
				}
			}
			string += s;
		}
	}
	inputStr(string);
}

function input(string)
{
	//document.all["gongshi-inputEl"].focus();
	//if(this.selectedIndex)
	//	document.selection.createRange().text=string+"("+document.selection.createRange().text+")";
	//else
		//document.all["gongshi-inputEl"].value=document.all["gongshi-inputEl"].value+string;
	var obj=document.getElementById("gongshi-inputEl");
	obj.focus();
	if(document.selection){//IE6+10
		document.selection.createRange().text=string+"("+document.selection.createRange().text+")";
	}else{//FF,Chrome,IE10+
		var startPos=obj.selectionStart;
		var endPos=obj.selectionEnd;
		var cursorPos=startPos;
		var tmpStr=obj.value;
		obj.value=tmpStr.substring(0,startPos)+string+"("+document.getSelection()+")"+tmpStr.substring(endPos,tmpStr.length);
		cursorPos+=string.length;
		obj.selectionStart=obj.selectionEnd=cursorPos;
	}
}

function inputStr(string)
{
	var obj=document.getElementById("gongshi-inputEl");
	obj.focus();
	if(document.selection){//IE6+10
		document.selection.createRange().text=string;
	}else{//FF,Chrome,IE10+
		var startPos=obj.selectionStart;
		var endPos=obj.selectionEnd;
		var cursorPos=startPos;
		var tmpStr=obj.value;
		obj.value=tmpStr.substring(0,startPos)+string+tmpStr.substring(endPos,tmpStr.length);
		cursorPos+=string.length;
		obj.selectionStart=obj.selectionEnd=cursorPos;
	}
}

function inputFun(string)
{	
	var gs = document.all["gongshi-inputEl"].value;
	if(gs.indexOf("VMAX(")>=0||gs.indexOf("VMIN(")>=0||gs.indexOf("RANK(")>=0||gs.indexOf("VSUM(")>=0||gs.indexOf("VAVG(")>=0||gs.indexOf("VCNT(")>=0){
		alert("行际计算函数只能有一个!");
	}else{
		document.all["gongshi-inputEl"].value=string+"("+document.all["gongshi-inputEl"].value+")";
	}
	//document.all["gongshi-inputEl"].focus();
	//if(this.selectedIndex)
	//	document.selection.createRange().text=string;
	//else
		//document.all["gongshi-inputEl"].value=document.all["gongshi-inputEl"].value+string;
}

function replaceAll(str,str1,str2)
{
	while(str.indexOf(str1)>=0)
		str=str.replace(str1,str2);
    return str;
}

function trim(str)
{
	return str.replace(/(^\s*)|(\s*$)/g, "");
}
function trimString(str)
{
	str=str.replace(/^\[|\]|[\u4e00-\u9fa5]/g, "");
	str=replaceAll(str,"[","");
	str=replaceAll(str,"]","");
	return str;
}


function getParam_new(str,leftFlag,rightFlag)
{
    var param="";
	
	if(str.indexOf(rightFlag)<str.indexOf(leftFlag))
	return param;
	else{
		var leftpos=str.indexOf(leftFlag);  //记录第一个leftFlag所在位置
		var strTmp=str; 
		while(strTmp.indexOf(rightFlag)>=0){
			var lefttemp = strTmp.substring(0,strTmp.indexOf(rightFlag));
			if(lefttemp.substring(0,lefttemp.lastIndexOf(leftFlag))==leftpos)
				break;
			strTmp = lefttemp.substring(0,lefttemp.lastIndexOf(leftFlag))+'{'+lefttemp.substring(lefttemp.lastIndexOf(leftFlag)+1)+'}'+strTmp.substring(strTmp.indexOf(rightFlag)+1);
			
		}
		
		return str.substring(leftpos+1,strTmp.indexOf(rightFlag));
	
	}
}

//函数有问题
function getParam(str,leftFlag,rightFlag)
{
    var param="";
	
	if(str.indexOf(rightFlag)<str.indexOf(leftFlag))
	return param;
	else{
	var pos=0;
	var leftpos=str.indexOf(leftFlag);  //记录第一个leftFlag所在位置
	var rightpos=0;
	var rightStr=str;
	var leftStr=str.substring(leftpos+1,str.indexOf(rightFlag)); //截取str中第一个leftFlag 与第一个rightFlag中的部分
	while(leftStr.indexOf(leftFlag)>=0){	//循环累积string中所包含的leftFlag数量
		pos++;
		leftStr=leftStr.substring(leftStr.indexOf(leftFlag)+1);
	}
	while(pos>=0){
		rightpos=rightStr.indexOf(rightFlag);
		rightStr=rightStr.replace(rightFlag,leftFlag);
		pos--;
	}
	return str.substring(leftpos+1,rightpos);
	
	}
}

function changeName(str){
	var value=str.replace(/\[([^\[\]])+]/g,"");
	return value;
}

function checkNew(){

	var formula=trimString(trim(changeName(document.all["gongshi-inputEl"].value)));
	if(trim(formula)=="")
		return "公式不能为空";
	else{
		if(formula.indexOf("SQL")>0){return "";}
		formula=replaceAll(formula,"max(","MIN(");
		formula=replaceAll(formula,"min(","MIN(");
		formula=replaceAll(formula,"int(","MIN(");
		formula=replaceAll(formula,"fil(","MIN(");
		formula=replaceAll(formula,"grd(","MIN(");
		formula=replaceAll(formula,"sgn(","MIN(");
		formula=replaceAll(formula,"lmt(","MIN(");
		formula=replaceAll(formula,"abs(","MIN(");
		formula=replaceAll(formula,"pgs(","MIN(");
		formula=replaceAll(formula,"VMAX(","MIN(");
		formula=replaceAll(formula,"VMIN(","MIN(");
		formula=replaceAll(formula,"RANK(","MIN(");
		formula=replaceAll(formula,"VAVG(","MIN(");
		formula=replaceAll(formula,"VCNT(","MIN(");
		formula=replaceAll(formula,"VSUM(","MIN(");
		formula=replaceAll(formula,"+","@@");
		formula=replaceAll(formula,"-","@@");
		formula=replaceAll(formula,"*","@@");
		formula=replaceAll(formula,"/","@@");
		if((formula.indexOf("MAX")<0)&&(formula.indexOf("INT")<0)&&(formula.indexOf("MIN")<0)){
			formula=replaceProduct(formula);
		}
		else{
			formula=doSpecialFormula(formula,"MAX");
			formula=doSpecialFormula(formula,"MIN");
			formula=doSpecialFormula(formula,"INT");
		}
		formula=replaceAll(formula,"MAX","Math.max");
		formula=replaceAll(formula,"MIN","Math.min");
		formula=replaceAll(formula,"INT","Math.round");
		formula=replaceAll(formula,"fil","");
		formula=replaceAll(formula,"grd","");
		formula=replaceAll(formula,"sgn","");
		formula=replaceAll(formula,"LMT","");
		formula=replaceAll(formula,"MAP","");
		formula=replaceAll(formula,"SQL","");
	
		formula=replaceAll(formula,"@SUMSUB","");
		formula=replaceAll(formula,"@PARENT","");
		formula=replaceAll(formula,"@RANK","");
		formula=replaceAll(formula,"@ZONE","");
		formula=replaceAll(formula,"@SIBLINGS()","1");
	}
	
	if(formula.indexOf("@@@@")>-1)
		return "指标间缺少运算符！";
	formula=replaceAll(formula,";",",");
	formula=replaceAll(formula,"@@","+");
	
	try{
		var result=eval(formula);
		
		return "";
	}catch(exception)
	{
		return "公式错误："+exception.description;
	}

}


//处理特殊函数，如果包含特殊函数，则将处理整个公式
function doSpecialFormula(str,flag){
	var pos=str.indexOf(flag);
	var pos2;
	if(pos<0)
		return str;
	else{
		var lfor=str.substring(0,pos);	//str的前半部分 截至flag前
		if(lfor.indexOf("MAX")<0&&lfor.indexOf("MIN")<0&&lfor.indexOf("INT")<0)
			lfor=replaceProduct(lfor);			//前半部分不包含 flag 则处理	
		var str2=str.substring(pos+flag.length,str.length);	//str的后半部分 从flag开始 不包含flag
		var tempparam=getParam_new(str2,"(",")");
	//alert("tempparam:"+tempparam);//((R4001111@@R4002222)@@9);0
	
		var str3="";
		if(str2!="("+tempparam+")"){
		str3=str2.substring(tempparam.length+2);  //str中第一个flag函数后所有部分  2包括()
		if(str3.indexOf("MAX")>=0)
		str3=doSpecialFormula(str3,"MAX");
		else if(str3.indexOf("MIN")>=0)
		str3=doSpecialFormula(str3,"MIN");
		else if(str3.indexOf("INT")>=0)
		str3=doSpecialFormula(str3,"INT");
		else{ 
		str3=replaceProduct(str3);
		}
		/*
		if(str3.indexOf("MAX")<0&&str3.indexOf("MIN")<0&&str3.indexOf("INT")<0)
			str3=replaceProduct(str3);			//后半部分不包含 flag 则处理
			*/	
		}
		
		var tempstr = new Array();
		//alert("tempstr:"+tempstr);
		if(tempparam.indexOf("MAX")>=0 || tempparam.indexOf("MIN")>=0 || tempparam.indexOf("INT")>=0){
			var ss = tempparam.substring(tempparam.indexOf("("),tempparam.lastIndexOf(")")+1);
			//var repss = ss.replace(";",",");
			var repss = replaceAll(ss,";",",");
			tempparam = tempparam.replace(ss,repss);
		}
		tempstr=tempparam.split(";");
		tempparam="";
		var param="";
		var param1="";
		for(var i=0;i<tempstr.length;i++){
			tempstr[i] = replaceAll(tempstr[i],",",";");
			if(tempstr[i].indexOf("MAX")>=0){
			tempstr[i]=doSpecialFormula(tempstr[i],"MAX");
			}
			else if(tempstr[i].indexOf("MIN")>=0){
				tempstr[i]=doSpecialFormula(tempstr[i],"MIN");
			}
			else if(tempstr[i].indexOf("INT")>=0){
				tempstr[i]=doSpecialFormula(tempstr[i],"INT");
			}
			else{
				tempstr[i]=replaceProduct(tempstr[i]);
			}
			tempparam=addstr(tempparam,tempstr[i],";");
		}
	//alert(lfor+"___"+flag+"___("+tempparam+")___"+str3);
		str=lfor+flag+"("+tempparam+")"+str3;	//拼合str;
		}
	//alert("return:"+str);
		return str;
	
}
//处理运算符号之间的指标或者数据
function replaceProduct(str){
		str=replaceAll(str,"+","@@");
		str=replaceAll(str,"-","@@");
		str=replaceAll(str,"*","@@");
		str=replaceAll(str,"/","@@");
	if(str=="" || str=="@@")
	return str;
	var tempstr=new Array();
    tempstr=str.split("@@");
	if(tempstr.length==1){		//!0的时候需要
		if(tempstr[0].indexOf('(')==-1&&tempstr[0].indexOf(')')==-1)
			return '0';
		else
			return tempstr[0];
	}
    str="";
    var j=0;
	for(var i=0;i<tempstr.length;i++){
		if(j>=tempstr.length)
			break;
		j = j+1;
	
		if((trim(tempstr[i])=="")){
		str+="@@";
		continue;
		}
		if(tempstr[i]=="("||tempstr[i]==")"){
			str=addstr(str,tempstr[i],"@@");	
		continue;
		}
		else if(tempstr[i].indexOf("(")>=0 ){
			//if(tempstr[i].indexOf(")")>=0)
			//	str=addstr(str,tempstr[i].substring(0,tempstr[i].lastIndexOf(")")+1),"@@");
			//else
				str=addstr(str,tempstr[i].substring(0,tempstr[i].lastIndexOf("(")+1)+"0","@@");
		continue;
		}
		else if(tempstr[i].indexOf(")")>=0){
			var o = getOccur(tempstr[i],")");
			var ss = "0";
			for(var m=0;m<o;m++){
				ss += ")";
			}
		str=addstr(str,ss,"@@");
		continue;
		}
		else
			str=addstr(str,"0","@@");
	}
	return str;
}
function getOccur(src,find){
  var o = 0;
  var index=-1;
  while((index=src.indexOf(find,index))>-1){
   ++index;
   ++o;
  }
  return o;
 }

function addstr(str,str2,partStr){
			if(str==""||str==partStr)
				str+=str2;
			else
				str+=partStr+str2;
				return str;
}

function doCheck()
{
	var result=checkNew();
	if(result=="")
	{
		alert("公式正确");
	}
	else
		alert(result);
}


function doClear()
{
	document.all["gongshi-inputEl"].value ="";
}

function doOk()
{
	//var result=checkNew();
	//if(result=="")
	//{	
		if(document.all["gongshi-inputEl"].value.indexOf("VSQL(")!=-1)
			window.returnValue=trim(document.all["gongshi-inputEl"].value);
		else
			window.returnValue=trimString(trim(changeName(document.all["gongshi-inputEl"].value)));
		window.close ();
	//}
	//else
	//	alert(result);
}

//清除([R10000]考核得分.[00]实际值)格式指标等名称
function delName(str){ 
	    	var sflag = "(+-*/^;)";
			var rstr="",nstr="";
			var result = "";
			var j=0,bflag=0,x=0,cflag=0,y=0;
			for (var i=0; i<str.length; i++) {
				 var ch = str.charAt(i);
				 if(cflag==1 && ")".indexOf(ch)==0){
				 	if (bflag == 0) j=i;
					 bflag = 1;
					 cflag = 0;
					 continue;
				 }else if (sflag.indexOf(ch)<0) {
					 if (bflag == 0) j=i;
					 bflag = 1;
					 continue;
				 } 
				 
				 if (ch=='(' && i!=0 && !(/[\u4e00-\u9fa5]+/).test(str.charAt(i-1))) { 
					 bflag = 0;
					 j=i;
					 result += str.substring(x,j); 
					 x=j;
					 y=j;
					 continue;
				 }else if(ch=='(' && i!=0 && (/[\u4e00-\u9fa5]+/).test(str.charAt(i-1))){
				 	
				 	if (bflag == 0) j=i;
					 bflag = 1;
					 cflag = 1;
				 	continue
				 }
				 if (bflag == 0) continue;
				 if(j>0){
				 	if(y==0){
				 		result += str.substring(j-1,j);
				 	}else{
					 	result += str.substring(y,j);
					}
				 }
				 nstr=str.substring(j,i);
				 var subStr = nstr.split(".");
				 for(var g=0;g<subStr.length;g++){
					 if(g!=0)
						 result += ".";
					 if(subStr[g].indexOf("]")!=-1){
					 	 //if(y==0){
						 	result += subStr[g].substring(0,subStr[g].indexOf("]"));
						 //}else{
						// 	if(subStr[g].indexOf("YBG:")==0)
						 //		result += subStr[g].substring(0,subStr[g].indexOf("]"));
						 //	else
						 //		result += subStr[g].substring(0,subStr[g].indexOf("]"));
						 //}
					 }else
						 result += subStr[g];
				 }
				 y = i;
				 x = i;
				 rstr += nstr + "@";
				 bflag = 0;
				 }
			 if (bflag==1) {
				 var ssStr = str.substring(x).split(".");
				 for(var k=0;k<ssStr.length;k++){
					 if(k!=0)
						 result += ".";
					 if(ssStr[k].indexOf("]")!=-1){
						 result += ssStr[k].substring(0,ssStr[k].indexOf("]"));
					 }else
					 	result += ssStr[k];
				 }
			 }else{
				 result += str.substring(x);
			 }
			 return result;
}
function clearOne(){
	var formula=document.all["gongshi-inputEl"].value;
	formula=formula.substring(0,formula.length-1);
	document.all["gongshi-inputEl"].value=formula;

}
function mousemo(){
  var e=window.event;
  var S=e.srcElement;
  S.style.color ="red";
  S.bgColor ="#fff899";
  //S.style.cursor= "hand";
}

function mousemu(){
  var e=window.event;
  var S=e.srcElement;
  S.style.color ="#666666";
  S.bgColor ="#e2dede";
}
function Fuzzy(id,type){
	if($("img[id='"+id+"_img']").length!=0){
		return;
	}
	$("#"+id+"_text").before("<img id=\""+id+"_img\" title=\"点击模糊检索\" src=\"../filterpage/js/jquery-easyui-1.3.2/themes/icons/search.png\" style=\"cursor:hand;margin:0px 2px -2px -1px;border:0\"/>");
	var bnkdiv=$("<div style=\"display:none;height:auto;background:#F8F8FF;border:1px solid #9AC0CD;font-family:宋体;font-size:12px\"><input id=\""+id+"_inpt\" type=\"text\" style=\"width:180px\"/><br>输入编号或名称，进行模糊检索</div>").appendTo('body');
	$("#"+id+"_img").powerFloat({
		eventType:'click',
		target:	bnkdiv
	});
	var url="";
	if(type&&type==='bnk'){
		url = baseUrl+'evalUnit/evalUnitMaintain.do?event=104';
	}else if(type&&type==='prd'){
		url = baseUrl+"product/productMaintain.do?type=FuzzyProdList&mode=expr&rdm="+Math.random();
	}else if(type&&type==='mprd'){//基础指标
		url = baseUrl+"product/productMaintain.do?type=FuzzyProdList&mode=mprd";
	}
 	$("#"+id+"_inpt").autocomplete(url, {
		delay:5,
	    width: 200,
	    max:500,
	    dataType:'json',
	    matchContains:true,
	    extraParams: {branch: function(){return $("#"+id+"_inpt").val();},product: function(){
	    	return $("#"+id+"_inpt").val();
	    }},
	    parse: function(data) {//解释返回的数据，把其存在数组里
	        var parsed = [];
	        for (var i = 0; i < data.length; i++) {
	            var d = data[i];
	            var value = d.id;
	            var result = d.id + ":" + d.text;
	            parsed[parsed.length] = {
	                data: d,
	                value: value,
	                result: result //返回的结果显示内容
	            };
	        }
	        return parsed;
	    },
	    formatItem: function(row, i, max) {
	        return row.id + ":" + row.text;
	    },
	
	    formatResult: function(row) {
	        return row.id;
	    }
	}).result(function(event, data, formatted) {
		document.getElementsByName(id)[0].value=data.id;
		document.getElementById(id+"_text").innerText=":"+"["+data.id+"]"+data.text;
		$.powerFloat.hide();
	});
}
function ProductSubmit(){
	
	if($("#product_id").val()===''){
		alert("请输入指标号");
		return;
	}
	if($.trim($("#product_id").val()).length<=3||$.trim($("#product_id").val()).substring(0,1)!='R'){
		alert("指标编码长度不能少于三位,且必须以R开头");
		return;
	}
	if($("#pr_name").val()===''){
		alert("请输入指标名");
		return;
	}
	if($("#prec").val()===''){
		alert("请输入指标精度");
		return;
	}
	if($("#data_type").combobox("getValue")===''){
		alert("请选择指标数据来源");
		return;
	}
	if($("#ratio").val()===''){
		alert("请输入指标权重");
		return;
	}
	var evaluate_id = $("#evaluate_id").combobox("getValue");
	var pc_unit = $("#pc_unit").combotree("getValue");
	if(evaluate_id=='2' && (pc_unit===''||pc_unit==undefined)){
		alert("请录入评分机构");
		return;
	}
	if(checkNew()!=''){
		alert("公式不正确");
		return;
	}
	
	var gs='';
	if(document.all["gongshi-inputEl"].value.indexOf("VSQL(")!=-1)
		gs=trim(document.all["gongshi-inputEl"].value);
	else
		gs=trimString(trim(changeName(document.all["gongshi-inputEl"].value)));
	var url="";
	if(type==='add'){
		$.ajax({
			url: "../product/productMaintain.do?type=validateProduct&projectId="+project_no+"&productId="+$("#product_id").val(),
			type: 'POST',
			dataType: 'text',
			async:false,
			success: function(result){
				if(parseInt(result)>0){
					alert("指标已存在，请更改指标号");
				}else{					
					$.ajax({
						url: '../product/productMaintain.do?type=addProduct',
						type: 'POST',
						dataType: 'text',
						data:"product_project_id_add="+project_no
							+"&parent_product_no="+parent_product_no
							+"&product_id_add="+$("#product_id").val()
							+"&pr_name_add="+encodeURI(encodeURI($("#pr_name").val()))
							+"&ratio_add="+$("#ratio").val()
							+"&prec_add="+$("#prec").val()
							+"&formula_add="+encodeURIComponent(gs)
							+"&data_type_add="+$("#data_type").combobox("getValue")
							+"&isstandard="+$("#isstandard").combobox("getValue")
							+"&evaluateId="+$("#evaluate_id").combobox("getValue")
							+"&unitId="+$("#unit_id").combobox("getValue")
							+"&pcUnit="+pc_unit
							+"&projectId="+project_no,
						async:false,
						error: function(){
							alert('提取菜单信息出错');
						},
						success: function(result){
							$("#product_manage",parent.document)[0].innerHTML=result;
							parent.initInfo();
							alert("添加完成");
							//window.close();
							CleanProduct();
						}
					});
				}
			}
		});
	}else if(type==='edit'){
		$.ajax({
			url: '../product/productMaintain.do?type=validateProduct&projectId='+project_no
				+"&productId="+$("#product_id").val()+"&id="+old_product_id,
			type: 'POST',
			dataType: 'text',
			async:false,
			success: function(result){
				if(parseInt(result)>0){
					alert("指标已存在，请更改指标号");
				}else{
					$.ajax({
						url: '../product/productMaintain.do?type=doEditProduct',
						type: 'POST',
						dataType: 'text',
						data:"product_project_id_edit="+project_no
							+"&product_id_edit="+$("#product_id").val()
							+"&product_id_org="+old_product_id
							+"&pr_name_edit="+encodeURI(encodeURI($("#pr_name").val()))
							+"&ratio_edit="+$("#ratio")[0].value
							+"&prec_edit="+$("#prec")[0].value
							+"&formula_edit="+encodeURIComponent(gs)
							+"&data_type_edit="+$("#data_type").combobox("getValue")
							+"&isstandard="+$("#isstandard").combobox("getValue")
							+"&evaluateId="+$("#evaluate_id").combobox("getValue")
							+"&unitId="+$("#unit_id").combobox("getValue")
							+"&pcUnit="+pc_unit
							+"&projectId="+project_no,
						async:false,
						error: function(){
							alert('提取菜单信息出错');
						},
						success: function(result){
							$("#product_manage",parent.document)[0].innerHTML=result;
							parent.initInfo();
							alert("完成编辑");
							window.close();
						}
					});
				}
			}
		});
	}
}
function CleanProduct(){
	$("#product_id").val('');
	$("#pr_name").val('');
	$("#ratio").val(0.000000);
	$("#prec").val('1');
	$("#data_type").combobox('setValue','');
	$("#gongshi-inputEl").val('');
}







// ajax
$.ajax({ 
    url: "test.html", 
    data:{test:1},
    success: function(res){
        console.log(res)
    }
});



