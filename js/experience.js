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

		var tracks = $('.track')

		window.openTrack = false

		tracks.click(function() {
			if (openTrack === true) {
				tracks.css("width", window.trackWidth)
				$(this).css("width", window.trackWidth)

				openTrack = false
			}
			else {
				tracks.css("width", "0%")
				$(this).css("width", "100%")

				openTrack = true
			}
		})
	}
})()