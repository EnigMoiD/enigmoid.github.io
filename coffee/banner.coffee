bannerImg = $("#post-banner")
banner = $("div.post.banner")
bannerClosed = true

$(bannerImg).load ->
	sizeBanner($(@), true, true)

$(window).resize ->
	sizeBanner(bannerImg, bannerClosed, false)

banner.click ->
	if bannerClosed
		banner.animate
			"height": bannerImg.height(),
			200
		bannerImg.animate
			"margin-top": 0,
			200
	else
		sizeBanner(bannerImg, true, true)

	bannerClosed = !bannerClosed

sizeBanner = (b, closed, animate) ->
	if closed
		h = b.height()

		if animate
			banner.animate
				"height": banner.width()/5,
				200
			b.animate
				"margin-top": -h/3,
				200
		else
			banner.height banner.width()/5
			b.css "margin-top", -h/3

	else
		if animate
			banner.animate
				"height": bannerImg.height(),
				200
		else 
			banner.css "height", bannerImg.height()