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

	var yearTitles = {
		'-4': 'Freshman',
		'-3': 'Sophomore',
		'-2': 'Junior',
		'-1': 'Senior'
	}

	window.dates = {

		birth: new Date(1994, 1, 26),
		graduation: new Date(2016, 4, 20),
		programming: new Date(2009, 10, 22),
		violin: new Date(2004, 0, 1),
		fire: new Date(2012, 10, 11)
	}

	var now = new Date(),
		interval
	for (var title in dates) {
		interval = now.timeSince(dates[title]).years
		document.getElementById(title).innerHTML = yearText(interval, title)
	}

})()