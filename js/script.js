// $(function () {
//     var bodyWidth = $(".container").width();
//     var items = $(".item");
//     var depart = $(".Depart");
//     items.each(function (index, item) {
//         console.log(index, item)
//         this.oldStyle = {
//             left: $(this).position().left,
//             'z-index': $(this).css('z-index')
//         };
//         this.addEventListener("click", function () {
//             if ($(items[3]).position().left > 0) {
//                 var left = Math.ceil($(this).position().left);
//                 console.log(left);
//                 $(items).removeClass("first");
//                 $(this).addClass("first");
//                 var other = items.not(".first");
//                 if (left >= (bodyWidth / 4)) {
//                     console.log("执行1.1");
//                     $(this).css("z-index", 3);
//                     $(this).animate({
//                         left: 0
//                     }, 800);
//                 } else {
//                     console.log("执行1.2");
//                     $(this).css("z-index", 3);
//                 }
//                 other.animate({
//                     left: 0
//                 }, 800);
//                 $(depart[index]).show()
//             } else {
//                 items.each(function (index, item) {
//                     $(item).animate({
//                         left: item.oldStyle.left,
//                         'z-index': 2
//                     }, 800);
//                 });
//                 $(this).removeClass("first");
//                 console.log("执行2");
//                 setTimeout(function () {
//                     $(depart[index]).hide();
//                     console.log("hide")
//                 }, 800);
//                 clearTimeout();
//             }

//         });
//     })
// });