# Wrapping images in boxes

images = $("#post-container img")

images.each ->
	img = $(@)

	if img.attr("nobox") isnt ""
		img.wrap "<div class='image-box'></div>"
		if img.attr "alt"
			img.parent().append "<div class='caption'>#{img.attr 'alt'}</div>"
		style = img.attr "box-style"
		if style
			img.parent().attr "style", style