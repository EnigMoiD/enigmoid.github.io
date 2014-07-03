(function() {
	window.onload = function() {
		var dates = $('.experience.snippet')

		var intervals = []

		var end, start, interval
		dates.each(function() {
			today = Date.parse(new Date())/1000/3600/24
			end = Date.parse($(this).attr("end"))/1000/3600/24 || today
			start = Date.parse($(this).attr("start"))/1000/3600/24
			interval = end-start

			$(this).css({
				height: interval+"px",
				top: (today-end)+"px"
			})

			intervals.push(interval)
		})
	}
})()