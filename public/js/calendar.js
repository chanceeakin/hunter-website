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
		for (let i = 0; i < operas.length; i++) {
			$('#calendarFill').append('<div class="row" id="' + operas[i][0].summary + '"><div class="col s12 center"><h5 class="brown-text">' + operas[i][0].summary + '</h5></div></div>');
			let activeID = operas[i];
			for (let k = 0; k < activeID.length; k++) {
				$('#' + activeID[k].summary).append('<div class="col s12 m6 l4 center calendar-ajax ' + activeID[k].summary + '"><div class="card teal lighten-1 z-depth-2 text-black"><div class="card-content white-text"><span class="card-title">' + activeID[k].summary + '</span><p class="calendar-date">' + moment(activeID[k].start.dateTime, moment.ISO_8601).format('MMM-DD-YYYY', 'en') + '</p><p class="calendar-time">' + moment(activeID[k].start.dateTime, moment.ISO_8601).format('hh:mm a') + '</p><div class="card-action"><a class="left amber-text text-accent-1" href="' + activeID[k].description + '">Tickets</a></div></div></div>');
			}
		}
			// console.log(moment(operas[i].start.dateTime, moment.ISO_8601).format('HH:mm'));
			// if (response.items[i].description) {
				// $('#calendarFill').append('<div class="calendar-ajax"><div class="calendar-summary">' + response.items[i].summary + '</div><div class="calendar-date">' + moment(response.items[i].start.dateTime, moment.ISO_8601).format('MMM-DD-YYYY', 'en') + '</div><div class="calendar-time">' + moment(response.items[i].start.dateTime, moment.ISO_8601).format('hh:mm a') + '</div></div>');
	});
});
