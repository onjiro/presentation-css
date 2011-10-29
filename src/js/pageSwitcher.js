var createPageSwitcher = function(defaultUrl) {
    return function(from, to) {
        var pages = $(".page");
        if (from) {
            // 表示範囲の調整
            var altWidth = $("body").width();
            $("#wrapper").css({
                marginLeft: -altWidth * pages.index($(from)),
                width: altWidth,
            });
            $(".navigation").css("display", "none")
            // ページの配置を変更
            var cnt = 0;
            pages.each(function() {
                $(this).css({
                    display: "block",
                    position: "absolute",
                    marginLeft: -$(this).width() / 2,
                    left: 50 + cnt * 100 + "%",
                });
                cnt++;
            });

            $("#wrapper").animate(
                {
                    marginLeft: -altWidth * pages.index($(to))
                },
                {
                    duration: 150 * (1 + Math.abs(pages.index($(from)) - pages.index($(to)))/ 3),
                    complete: function() {
			// 変更したページの配置をもとに戻す
			pages.css({
			    position: "relative",
			    marginLeft: "auto",
			    left: 0,
			});
			pages.not(to || defaultUrl).css("display", "none");
			$("#wrapper").css({
			    marginLeft: "auto",
			    width: altWidth,
			});
			$(".navigation").css("display", "block")
                    }
                }
            );
        } else {
            pages.not(to || defaultUrl).css("display", "none");
        };
        $("#wrapper").css("marginTop", ($(window).height() - $($(".page")[0]).height()) / 2);
    };
};