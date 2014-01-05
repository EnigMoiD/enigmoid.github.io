bannerImg = $("#post-banner")
banner = $("div.post.banner")
bannerClosed = true

$(bannerImg).load ->
	sizeBanner($(@), true)

$(window).resize ->
	sizeBanner(bannerImg, bannerClosed)

banner.click ->
	if bannerClosed
		banner.height bannerImg.height()
		bannerImg.css("margin-top", 0)
	else
		sizeBanner(bannerImg, true)

	bannerClosed = !bannerClosed

sizeBanner = (b, closed) ->
	if closed
		h = b.height()

		banner.height banner.width()/5
		b.css("margin-top", -h/3)
	else
		banner.height bannerImg.height()