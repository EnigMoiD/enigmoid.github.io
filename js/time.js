(function TimeManager() {
	Date.prototype.timeSince = function(date) {
		var delta = date.getTime() - this.getTime();

		var date = new Date(delta);

		return {
			date: date,
			months: date.getMonth(),
			days: date.getDate(),
			years: date.getFullYear()-1970
		}
	}

	var yearTitles = [
		'Freshman',
		'Sophomore',
		'Junior',
		'Senior'
	]

	var now = new Date(),
		birth = new Date(1994, 1, 26),
		graduation = new Date(2016, 4, 20);

	var age = birth.timeSince(now).years;

	var year = yearTitles[4+graduation.timeSince(now).years];
	console.log(year);
})()