bannerImg = $("#post-banner")
banner = $("div.post.banner")
isBannerClosed = true

$(bannerImg).load ->
	sizeBanner($(@), true, false)

$(window).resize ->
	sizeBanner(bannerImg, isBannerClosed, false)

banner.click ->
	if isBannerClosed
		banner.animate "height": bannerImg.height(),
			200
		bannerImg.animate "margin-top": 0,
			200
		banner.find(".banner-content").fadeOut(200)
	else
		sizeBanner(bannerImg, true, true)
		banner.find(".banner-content").fadeIn(200)

	isBannerClosed = !isBannerClosed

sizeBanner = (b, closed, animate) ->
	h = b.height()

	bImgClosed = "margin-top": -h/3
	bannerClosed =
		"height": banner.width()/5

	bannerOpen = "height": bannerImg.height()

	if closed

		if animate
			banner.animate bannerClosed,
				200
			b.animate bImgClosed,
				200
		else
			banner.css bannerClosed
			b.css bImgClosed

	else
		if animate
			banner.animate bannerOpen,
				200
		else 
			banner.css bannerOpen