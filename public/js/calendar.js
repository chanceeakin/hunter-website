function groupBy (array, f) {
	var groups = {};
	array.forEach((o) => {
		var group = JSON.stringify(f(o));
		groups[group] = groups[group] || [];
		groups[group].push(o);
	});
	return Object.keys(groups).map((group) => {
		return groups[group];
	});
}

function consoleShit (item, index) {
	for (var i = 0; i < item.length; i++) {
		$('#calendarFill').append('<div class="col s12 m6 center calendar-ajax ' + item[i].summary + '"><div class="calendar-summary">' + item[i].summary + '</div><div class="calendar-date">' + moment(item[i].start.dateTime, moment.ISO_8601).format('MMM-DD-YYYY', 'en') + '</div><div class="calendar-time">' + moment(item[i].start.dateTime, moment.ISO_8601).format('hh:mm a') + '</div></div>');
		$('.'+ item[i].summary).css("background-color", 'tomato');
	}
}

$(document).ready(() => {
	$('#download-button').click(() => {
		$('html, body').animate({
			scrollTop: $('#scroll-here').offset().top
		}, 2000);
	});
	$.ajax({
		url: '/api',
		type: 'GET',
		dataType: 'JSON'
	}).done((response) => {
		if (!response.items) {
			return;
		}
		let operas = groupBy(response.items, (item) => {
			return [item.summary];
		});
		console.log('operas', operas);
		operas.forEach(consoleShit);
			// console.log(moment(operas[i].start.dateTime, moment.ISO_8601).format('HH:mm'));
			// if (response.items[i].description) {
				// $('#calendarFill').append('<div class="calendar-ajax"><div class="calendar-summary">' + response.items[i].summary + '</div><div class="calendar-date">' + moment(response.items[i].start.dateTime, moment.ISO_8601).format('MMM-DD-YYYY', 'en') + '</div><div class="calendar-time">' + moment(response.items[i].start.dateTime, moment.ISO_8601).format('hh:mm a') + '</div></div>');
	});
});
