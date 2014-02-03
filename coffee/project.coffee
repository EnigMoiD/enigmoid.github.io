# Wrapping images in boxes

images = $("#post-container img")

images.each ->
	img = $(@)

	if img.attr("nobox") isnt ""
		img.wrap "<div class='image-box'></div>"
		if img.attr "alt"
			img.parent().append "<div class='caption'>#{img.attr 'alt'}</div>"
		style = img.attr "box-style"
		boxClass = img.attr "box-class"
		if style
			img.parent().attr "style", style
		if boxClass
			img.parent().attr "class", img.parent().attr("class")+" #{boxClass}"