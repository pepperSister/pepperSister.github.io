$(function () {
	reset();
	mumberItem();
	addClassName(".burgerCont", ".burger");
	addClassName(".burgerCont", ".frame");
	addClassName(".burgerCont", ".burgerCont");
	addClassName(".burgerCont", ".menuIcon");
	addClassName(".burgerCont", ".menuWord");
	addClassName(".burgerCont", ".arrow");
	addClassName(".burgerCont", ".bg2");
	addClassName(".burgerCont", ".footer");
	showPage(".show_team", ".teamCon");
	showPage(".show_stack", ".stackCon");
	showPage(".show_contact", ".contactCon");
	showPage(".show_work", ".workCon");
	showWork(".workCon .page");
	turn(".mumberFace", ".mumberData")
	showPage(".join", ".joinCon");
				$("#success").html("请用校园网进入页面报名（用ecjtu的wifi或宿舍宽带或图书馆wifi）");
				$("#success").show();
				setTimeout(function(){$("#success").hide();},3000);
});
$(window).resize(function () {
	reset();
	window.location.reload();
});

function reset() {
	var borderWidth = $(window).width() - 88;
	var borderHeight = $(window).height() - 88;
	$(".topFrame,.bottomFrame").attr("style", 'width:' + borderWidth + "px");
	$(".rightFrame,.leftFrame").attr("style", 'height:' + borderHeight + "px");
	$(".iconTeam,.iconProduct").attr("style", "left:" + parseInt((borderWidth / 2) - 23) + "px");
	$(".iconAbout,.iconDepartment").attr("style", "top:" + parseInt((borderHeight / 2) - 23) + "px;");
	$(".pageCont,.teamCon,.workCon,.stackCon,.contactCon,.joinCon").attr("style", "width:" + borderWidth + "px;height:" + parseInt(borderHeight + 2) + "px;");
	$(".burgerCont").attr("style", "left:" + parseInt(borderWidth / 2 - 17) + "px;");
}

function mumberItem() {
	var item = $(".teamMumberItem");
	var itemLength = item.length;
	var itemWidth = $(item).width();
	for (var i = 0; i < itemLength; i++) {
		$(item[i]).attr("style", "left:" + parseInt(itemWidth * i + 40 * i) + "px;");
	}
	var a = 0;
	var m = 0;
	$(".teamCon").bind('mousewheel', function (event, delta, deltaX, deltaY) { //鼠标滚动事件，增加相片排列的left值
		var left = $('.teamBoxes').position().left;
		if (delta == -1) {
			a += 213; //滚动一次移动的值
			if (left >= -((itemLength - 1) * 231)) {
				var newLeft = parseInt(left - 462) + "px";
				if ($(".teamBoxes").is(":animated")) {} else {
					$(".teamBoxes").animate({
						"left": newLeft
					}, 'easein'); //设置left值
				}

			}

			m++; //滚动次数
		} else {
			if (left <= 0) {
				var get = $('.teamBoxes').position().left - m * 213; //向上滚动时减少一个单位
				for (var i = 0; i < itemLength; i++) {

					var newLeft = parseInt(left + 462) + "px";
					if ($(".teamBoxes").is(":animated")) {} else {
						$(".teamBoxes").animate({
							"left": newLeft
						}, 'easein'); //设置left值
					}
				}
			}

		}

	});
	// using the event helper

	// }
}

function addClassName(target, name) {
	var className = $(name);
	$(target).bind("click", function () {
		for (var i = 0; i < className.length; i++) {

			var classAll = $(className[i]).attr("class")
			var classAll = classAll.split(" ");

			if ($($(className)[i]).hasClass(classAll[0] + (i + 1) + "Animate")) {
				$(className[i]).removeClass(classAll[0] + (i + 1) + "Animate");
			} else {
				$(className[i]).addClass(classAll[0] + (i + 1) + "Animate");
			}
		}
	});
}

function showPage(target, page) {
	var target = $(target);
	var page = $(page);
	var classname = $(page).attr("class") + "1Animate";
	var other = $(".pageCont>div").not(".burgerCont").not(page);

	target.bind("click", function () {
		if ($(page).hasClass(classname)) {
			$(page).removeClass(classname);
		} else {
			$(page).addClass(classname);
		}
		for (var i = 0; i < other.length; i++) {
			if ($(other[i]).hasClass("teamCon1Animate")) {
				$(other[i]).removeClass("teamCon1Animate");
			}
			if ($(other[i]).hasClass("workCon1Animate")) {
				$(other[i]).removeClass("workCon1Animate");
			}
			if ($(other[i]).hasClass("contactCon1Animate")) {
				$(other[i]).removeClass("contactCon1Animate");
			}
			if ($(other[i]).hasClass("stackCon1Animate")) {
				$(other[i]).removeClass("stackCon1Animate");
			}
			if ($(other[i]).hasClass("joinCon1Animate")) {
				$(other[i]).removeClass("joinCon1Animate");
			}
		}
	})
	// target.bind("clikck",funciton(){

	// });
}
// function toPage(a){
// 	var name=['first',"second","third","fourth"];
// 	var a = $(a).html()[1] - 1;
// 	console.log(this,a);
// 	var left = $(".pageCont").width() * a;
// 	console.log(left);
// 	$("."+name[a]+"Page").css("left",left);
// }
function showWork(clas) { //delta 滚动反向，正上负下。
	var pages = $(clas);
	var name = ['first', "second", "third", "fourth"];

	for (var i = 0; i < pages.length - 1; i++) {
		pages[i].index = i;
		$(pages[i]).bind("mousewheel", function (event, delta, deltaX, deltaY) {
			if (delta == -1) {
				$(this).addClass(name[this.index] + "PageAnimate");
				$(pages[this.index + 1]).addClass(name[this.index + 1] + "PageAnimate");

			} else {
				$(this).removeClass(name[this.index] + "PageAnimate");
				$(pages[this.index - 1]).removeClass(name[this.index - 1] + "PageAnimate");

			}
		});
	}
	$(pages[pages.length - 1]).bind("mousewheel", function (event, delta, deltaX, deltaY) {
		if (delta == 1) {
			$(this).removeClass(name[pages.length - 1] + "PageAnimate");
		}
	})
}

function turn(face, data) {
	var $face = $(face),
		$data = $(data);
	$face.each(function (index) {
		$(this).mouseover(function () {
			{
				console.log("over")
			}
		})
	})
}

function subJoin() {
	var name = $("input.joinName").val().trim();
	var phone = $("input.joinPhone").val().trim();
	var QQ = $("input.joinQQ").val().trim();
	var college = $("input.joinCollege").val().trim();
	var depart = $(".joinDepart").val().trim();
	var mail = $("input.joinMail").val().trim();

	var msg = '';
	var numreg = new RegExp("^[0-9]*$");
	var hanreg = new RegExp('^[\u4e00-\u9fa5]+$');
	var mailreg = new RegExp('^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$');
	if (name.length > 7 || name.length < 1) {
		msg = "姓名长度？(╯‵□′)╯︵┻━┻";
	} else if (!hanreg.test(name)) {
		msg = "姓名不对！（〃｀д´ ) 👚﻿";
	} else if (!mailreg.test(mail)) {
		msg = "请输入正确的邮箱";
	} else if (phone.length != 11 || phone.length < 1) {
		msg = "手机号长度？(╯‵□′)╯︵┻━┻";
	} else if (!numreg.test(phone)) {
		msg = "手机号不对！（〃｀д´ ) 👚﻿";
	} else if (college.length < 1) {
		msg = "学院呢？（〃｀д´ ) 👚﻿";
	} else if (depart.length < 1) {
		msg = "部门呢？（〃｀д´ ) 👚﻿";
	}
	if (msg.length > 0) {
		$('#notify').text(msg);
		$('#notify').show();
		$('#notify').hide(1000);
		return false;
	}
	$.post("http://fresh.ecjtu.org/fresh/join/index", 'name=' + name + '&college=' + college + '&QQ=' + QQ + '&phone=' + phone + '&depart=' + depart + '&mail=' + mail,function (data) {
			data=JSON.parse(data);
			if (data.status == 200) {
				$("#success").html("报名成功!请等待短信或邮件提醒");
				$("#success").show();
				setTimeout(function(){$("#success").hide();},3000);

			} else if(data.status == 300){
				$("#success").html("你已经报名了");
				$("#success").show();
				setTimeout(function(){$("#success").hide();},3000);

			} else if(data.status==400){
				$("#success").html(data.msg);
				$("#success").show();
				setTimeout(function () { $("#success").hide(); }, 3000);
			}else {
				$("#success").html(":(失败了");
				$("#success").show();
				setTimeout(function(){$("#success").hide();},3000);
			}
		});
}
