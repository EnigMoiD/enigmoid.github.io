(function TimeManager() {
	Date.prototype.timeSince = function(date) {
		var delta = this.getTime() - date.getTime()

		var date = new Date(delta)

		return {
			date: date,
			seconds: date.getSeconds(),
			minutes: date.getMinutes(),
			hours: date.getHours(),
			months: date.getMonth(),
			days: date.getDate(),
			years: date.getFullYear()-1970
		}
	}

	function yearText(years, id) {
		if (id != 'graduation')
			return "<span class='number'>" + years + "</span> year" + ((years > 1)? "s" : "")

		else return "<span class='number'>" + yearTitles[years] + "</span>";
	}

	var yearTitles = [
		'Freshman',
		'Sophomore',
		'Junior',
		'Senior'
	]

	var now = new Date()
	// Important dates
	window.dates = {
		birth: new Date(1994, 1, 26),
		graduation: new Date(2016, 4, 20),
		programming: new Date(2009, 10, 22),
		violin: new Date(2004, 0, 1),
		fire: new Date(2012, 10, 11)
	}

	var Evan = {}
	for (var date in dates)
		Evan[date] = Math.abs(dates[date].timeSince(now).years) - 1

	for (var id in Evan)
		document.getElementById(id).innerHTML = yearText(Evan[id], id)
})()