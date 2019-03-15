var strVar = "";
    strVar += "<div id=\"mask\" style=\"display: none;\"><\/div>";
    strVar += "<div id=\"j-show\"  class=\"slideBto\" style=\"right: 0px;\"><\/div>";
    strVar += "<div id=\"join-plugin\" style=\"display: none;\">";
    strVar += "	<div class=\"j-container\">";
    strVar += "		<div class=\"j-input-container\">";
    strVar += "			<div class=\"j-title\">";
    strVar += "				<span style=\"color: #F85670\">加入我们<\/span>";
    strVar += "				<span><\/span>";
    strVar += "			<\/div>";
    strVar += "			<div id=\"j-close\">";
    strVar += "				<div class=\"line-l\"><\/div>";
    strVar += "				<div class=\"line-r\"><\/div>";
    strVar += "			<\/div>";
    strVar += "			<div class=\"j-input\">";
    strVar += "				<select name=\"department_id\" id=\"department_id\">";
    strVar += "				<\/select>";
    strVar += "				<div>";
    strVar += "					<input type=\"tel\" name=\"student_id\" onclick=\"hideNotify();\" placeholder=\"请输入学号\" maxlength=\"16\"><\/div>";
    strVar += "				<div>";
    strVar += "					<input type=\"text\" name=\"username\" onclick=\"hideNotify();\" placeholder=\"请输入姓名\"><\/div>";
    strVar += "				<div>";
    strVar += "					<input type=\"text\" name=\"email\" onclick=\"hideNotify();\" placeholder=\"请输入邮箱\"><\/div>";
    strVar += "				<div>";
    strVar += "					<input type=\"tel\" name=\"phone_number\" onclick=\"hideNotify();\" placeholder=\"请输入手机号\"><\/div>";
    strVar += "				<div>";
    strVar += "					<input type=\"text\" name=\"introduction\" onclick=\"hideNotify();\" placeholder=\"请写自我简介\"><\/div>";
    strVar += "				<div id=\"join\">Join Us<\/div>";
    strVar += "			<\/div>";
    strVar += "			<div id=\"notify\" style=\"display: none;\"><\/div>";
    strVar += "		<\/div>";
    strVar += "	<\/div>";
    strVar += "	<div class=\"j-background\"><\/div>";
    strVar += "	<div id=\"success\">";
    strVar += "		<div><\/div>";
    strVar += "	<\/div>";
    strVar += "<\/div>";
$(window).load(function() {
	$("head").append('<link rel="stylesheet" type="text/css" href="css/join.css">');
	$("body").append(strVar);
	$(window).resize();
	setTimeout(function(){$(window).resize();},100);
});
function hideNotify() {
    $('#notify').text("");
	$('#notify').hide();
}
$(function(){
	$(window).resize(function () {
		var left = ($(window).width() - $(".j-container").width()) * 0.5;
		var top = ($(window).height() - $(".j-container").height()) * 0.5;
		$("#join-plugin").css({
			'top':top,
			'left':left
			});
	});
	$("body").on("click","#j-close",function(){
		$("#join-plugin").fadeOut(500);
		$("#mask").delay(300).fadeOut(500);
		$("#j-show").fadeIn(100);
	});
	$("body").on("click","#j-show",function(){
    $.ajax({
        url:"https://blog.ecjtu.org/joinApi.php?act=getDepart",
        type:"get",
        dataType:"json",
        success:function(depart){
                var options = '<option value="">请选择部门</option>';
                for (var i = 0; i < depart.length; i++) {
                        options += '<option value="' + depart[i].id + '">' + depart[i].department_name + '</option>';
                }
                $('#department_id').append(options);
        }
    });
		$("#join-plugin").fadeIn(500);
		$("#mask").delay(300).fadeIn(500);
		$("#j-show").fadeOut(100);
	});
    $("body").on("click","#join",function(){
    	var student_id = $("input[name='student_id']").val();
    	var username = $("input[name='username']").val();
    	var email = $("input[name='email']").val();
    	var phone_number = $("input[name='phone_number']").val();
    	var introduction = $("input[name='introduction']").val();
    	var department_id = $("#department_id").val();
    	
    	var msg = '';
		var numreg = new RegExp("^[0-9]*$");
		var hanreg = new RegExp('^[\u4e00-\u9fa5]+$');
		var mailreg = new RegExp('^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+');
    	if (student_id.length > 16 || student_id.length < 1) {
    		msg = "学号长度？(╯‵□′)╯︵┻━┻";
    	} else if (!numreg.test(student_id)) {
    		msg = "学号不对！（〃｀д´ ) 👚﻿";
    	} else if (username.length > 7 || username.length < 1) {
    		msg = "姓名长度？(╯‵□′)╯︵┻━┻";
    	} else if (!hanreg.test(username)) {
    		msg = "姓名不对！（〃｀д´ ) 👚﻿";
    	} else if (email.length < 1) {
    		msg = "邮箱长度？(╯‵□′)╯︵┻━┻";
    	} else if (!mailreg.test(email)) {
    		msg = "邮箱不对！（〃｀д´ ) 👚﻿";
    	} else if (phone_number.length != 11 || phone_number.length < 1) {
    		msg = "手机号长度？(╯‵□′)╯︵┻━┻";
    	} else if (!numreg.test(phone_number)) {
    		msg = "手机号不对！（〃｀д´ ) 👚﻿";
    	} else if (introduction.length < 1) {
    		msg = "给咱介绍下自己呗ლ(╹◡╹ლ)﻿";
    	} else if (department_id.length < 1) {
    		msg = "部门呢？（〃｀д´ ) 👚﻿";
    	}
    	if (msg.length > 0) {
    		$('#notify').text(msg);
    		$('#notify').show();
    		return;
    	}
        $.ajax({
            url:"http://www.ecjtu.org/joinApi.php?act=join",
            type:"POST",
            dataType: "json",
            data:"student_id=" + student_id + "&username=" + username + "&email=" + email + "&phone_number=" + phone_number + "&introduction=" + introduction + "&department_id=" + department_id,
            success:function(data){
		console.log(data);
		console.log(data.status);
                if (data.status == true) {
                	$("#success div").html(":)<br />报名成功!<br />请等待短信或邮件提醒");
                	$("#success").show();
                	setTimeout(function(){
				$("#j-close").click()
				$("#success").hide();
			},3000);

                }else{
                	$("#success div").html(":(<br /> 失败<br />" + data.msg);
                	$("#success").show();
                	$("#success").hide(2000);

                }
            }
        });
    });
})
