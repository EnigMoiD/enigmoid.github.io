(function() {
	window.onload = function() {
		function expsOverlap(exp1, exp2) {
			var dates1 = expDates(exp1)
			var dates2 = expDates(exp2)

			var overlap = (dates1.end > dates2.start && dates1.start < dates2.end)

			return overlap
		}

		function expDates(exp) {
			var today = Date.parse(new Date())/1000/3600/24
			var end = Date.parse(exp.attr("end"))/1000/3600/24 || today
			var start = Date.parse(exp.attr("start"))/1000/3600/24

			return {
				start: start,
				end: end,
				interval: end-start
			}
		}

		// Customized for headers in .textbox divs
		function intersect(header1, header2) {
			header1 = $(header1)
			header2 = $(header2)

			var r1 = {
				x: header1.offset().left,
				y: header1.offset().top,
				w: header1.width(),
				h: header1.parent().height()
			}

			var r2 = {
				x: header2.offset().left,
				y: header2.offset().top,
				w: header2.width(),
				h: header2.parent().height()
			}

			var offset = r1.y+r1.h - r2.y
			if (((r1.x+r1.w > r2.x)&&(r1.x <= r2.x)) && ((r1.y+r1.h > r2.y)&&(r1.y <= r2.y))) {
				return {
					int: true,
					offset: offset
				}
			}
			return {
				int: false,
				offset: 0
			}
		}

		var experiences = $('.experience.snippet')

		var maxOffset = 0
		experiences.each(function() {
			var dates = expDates($(this))
			var today = Date.parse(new Date())/1000.0/3600/24

			maxOffset = _.max([maxOffset, 2*dates.interval+2*(today-dates.end)])

			$(this).css({
				height: 2*dates.interval+"px",
				top: 2*(today-dates.end)+"px"
			})
		})
		$("#container").css("height", maxOffset+"px")

		var titles = $('.title')

		titles.each(function() {
			$(this).parent().css("top", "0px")
		})

		function moveOutTitles() {
			for (var i = 0; i < titles.length-1; i++) {
				for (var j = i+1; j < titles.length; j++) {
					var intersection = intersect(titles[i], titles[j])
					if (intersection.int) {
						$(titles[j]).parent().css({
							top: "+="+intersection.offset
						})
					}
				}
			}
		}

		// function positionTitles() {

		// }

		var tracks = $('.track')

		window.openTrack = false

		tracks.click(function() {
			if (openTrack === true) {
				tracks.css("width", window.trackWidth)
				$(this).css("width", window.trackWidth)
				$(this).removeClass("selected")

				openTrack = false
			}
			else {
				tracks.css("width", "0%")
				$(this).css("width", "100%")
				$(this).addClass("selected")

				openTrack = true
			}
		})

		moveOutTitles()
		window.onresize = moveOutTitles
	}
})()