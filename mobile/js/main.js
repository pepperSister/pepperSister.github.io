$(function(){
    $.extend({
        'goAnchor':function(to, time){
            $obj = (window.opera)?(document.compatMode=="CSS1Compat"?$('html'):$('body')):$('html,body');
            $($obj).animate({scrollTop:to}, time);
        }
    });
    //定义一个函数，获取锚链接，并跳转的相应的模块
    $('#next1').click(function(){
        $.goAnchor($('#one').offset().top, 1000);
        $("#one .box").animate({
            left:0
        },1000);//六边形从左边滑入
        $("#one .lineF").animate({
            left:0
        },1000);
        $("#one .bannerWord").fadeIn();//文字淡入效果
    });

    setInterval('play()',100);//每0.1秒执行一次Play()函数检测#one的位置
    high();
    $(".slideBto").click(function(){//报名按钮点击时间
        $(".slideBto").hide();//按钮隐藏
        $("#mask").fadeIn(500);//遮罩淡入
        $(".show img").animate({
            right:25+'em'
        },600);//产品演示图片左移
        $(".slideRight").animate({
            right:0//报名栏出现
        },600);
    });
});
$(".back").click(function(){//报名栏隐藏按钮
    $(".imgChange").attr("src","images/pic22.png");//改变图片
    $("#mask").fadeOut(500);//遮罩层淡出
    $(".slideRight").animate({
        right:-115+'vw'
    },2000);
    $(".show img").animate({
        right:0
    },1000);
    $(".slideBto").show();//报名按钮出现
});
function play(){
    var mTop = $('#one').offset().top;
    var sTop = $(window).scrollTop();
    var result = mTop - sTop;
    if(result<998){
       $("#one .box").animate({
           left:0
       },1000);
       $("#one .lineF").animate({
           left:0
       },1000); 
   }
    };
function high(){
    var box=$(".boxT");
    var about=$("#about .aboutWord");
    $(about[0]).show();
    $(box[0]).mouseover(function(){
        $("#about1").addClass("highlight").show();
        $(".aboutWord:not(#about1)").hide();
        $(this).css({
            "background-image":"url(images/pic15.png)",
            "background-size":"cover"
        });
    }).mouseout(function(){
        $("#about1").removeClass("highlight");
        $(this).css("background-image","url(images/pic10.png)");
    });//第一个六边形鼠标移入，相应的部门介绍高亮且六边形图片更换，移出还原

    $(box[1]).mouseover(function(){
        $("#about2").addClass("highlight").show();
        $(".aboutWord:not(#about2)").hide();
        $(this).css({
            "background-image":"url(images/pic16.png)",
            "background-size":"cover"
        });
    }).mouseout(function(){
        $("#about2").removeClass("highlight");
        $(this).css("background-image","url(images/pic11.png)");
    });

    $(box[2]).mouseover(function(){
        $("#about3").addClass("highlight").show();
        $(".aboutWord:not(#about3)").hide();
        $(this).css({
            "background-image":"url(images/pic17.png)",
            "background-size":"cover"
        });
    }).mouseout(function(){
        $("#about3").removeClass("highlight");
        $(this).css("background-image","url(images/pic12.png)");
    });

    $(box[3]).mouseover(function(){
        $("#about4").addClass("highlight").show();
        $(".aboutWord:not(#about4)").hide();
        $(this).css({
            "background-image":"url(images/pic18.png)",
            "background-size":"cover"
        });
    }).mouseout(function(){
        $("#about4").removeClass("highlight");
        $(this).css("background-image","url(images/pic13.png)");
    }); 

    $(box[4]).mouseover(function(){
        $(".aboutWord").hide();
        $("#about5").show();
        $("#about5").addClass("highlight");
        $(this).css({
            "background-image":"url(images/pic19.png)",
            "background-size":"cover"
        });
    }).mouseout(function(){
        $("#about5").removeClass("highlight");
        $(this).css("background-image","url(images/pic14.png)");                  
    });

    $("#about1").mouseover(function(){
        $(this).addClass("highlight");
        $(box[0]).css({
            "background-image":"url(images/pic15.png)",
            "background-size":"cover"
        });
    }).mouseout(function(){
        $(this).removeClass("highlight");
        $(box[0]).css("background-image","url(images/pic10.png)");
    });
//第一个部门介绍鼠标移入高亮显示且相应的部门六边形图片更换。移出还原
    $("#about2").mouseover(function(){
        $(this).addClass("highlight");
        $(box[1]).show().css({
            "background-image":"url(images/pic16.png)",
            "background-size":"cover"
        });
    }).mouseout(function(){
        $(this).removeClass("highlight");
        $(box[1]).css("background-image","url(images/pic11.png)");
    });
    $("#about3").mouseover(function(){
        $(this).addClass("highlight");
        $(box[2]).show().css({
            "background-image":"url(images/pic17.png)",
            "background-size":"cover"
        });
    }).mouseout(function(){
        $(this).removeClass("highlight");
        $(box[2]).css("background-image","url(images/pic12.png)");
    });
    $("#about4").mouseover(function(){
        $(this).addClass("highlight");
        $(box[3]).show().css({
            "background-image":"url(images/pic18.png)",
            "background-size":"cover"
        });
    }).mouseout(function(){
        $(this).removeClass("highlight");
        $(box[3]).css("background-image","url(images/pic13.png)");
    });
}
function slide(){
    $("#registerFrom").hide();
    $("#success").show();
}
function fail(){
    $("#registerFrom").hide();
    $("#fail").show();
    setTimeout("$('#fail').hide()",1500);
    $("#registerFrom").show();
}