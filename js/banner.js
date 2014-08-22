// Generated by CoffeeScript 1.8.0
(function() {
	var banner, bannerImg, isBannerClosed, setTransition, sizeBanner;

	bannerImg = $("#post-banner");

	banner = $("div.post.banner");

	isBannerClosed = true;


	/*
	Size the banner before the image has loaded
	Because it doesn't depend on the image size
	And it's jarring if this doesn't happen
	 */

	banner.css({
		"height": banner.width() / 5
	});

	$(bannerImg).load(function() {
		return sizeBanner($(this), true);
	});

	$(window).resize(function() {
		return sizeBanner(bannerImg, isBannerClosed);
	});

	banner.click(function() {
		var elsProps = [
			{
				el: banner,
				prop: "height"
			},
			{
				el: bannerImg,
				prop: "margin-top"
			}
		]
		window.setTransition(true, elsProps);
		setTimeout((function() {
			window.setTransition(false, elsProps);
		}), 200);
		if (isBannerClosed) {
			banner.css({
				"height": bannerImg.height()
			});
			bannerImg.css({
				"margin-top": 0
			});
			banner.find(".banner-content").css({
				"opacity": 0
			});
		} else {
			sizeBanner(bannerImg, true);
			banner.find(".banner-content").css({
				"opacity": 1
			});
		}
		return isBannerClosed = !isBannerClosed;
	});

	sizeBanner = function(b, closed) {
		var bannerPosition, h;
		h = b.height();
		bannerPosition = banner.attr("bannerPosition");
		if (closed) {
			banner.css({
				"height": banner.width() / 5
			});
			b.css({
				"margin-top": -bannerPosition * h
			});
		} else {
			banner.css({
				"height": bannerImg.height()
			});
		}
	};

})()
