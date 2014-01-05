bannerImg = $("#post-banner")
banner = $("div.post.banner")

$(bannerImg).load ->
	sizeBanner($(@))

$(window).resize ->
	sizeBanner(bannerImg)

sizeBanner = (b) ->
	h = b.height()

	banner.height banner.width()/5
	b.css("margin-top", -h/3)