$(document).ready(function () {
	$('#download-button').click(function () {
	$('html, body').animate({
		scrollTop: $('#scroll-here').offset().top
	}, 2000);
});
	$.ajax({
		url: '/api',
		type: 'GET',
		dataType: 'JSON'
	}).done((response) => {
		console.log('success');
		if (!response.items) {
			return;
		}
		for (var i = 0; i < response.items.length; i++) {
			console.log(response.items[i]);
			console.log(response.items[i].description);
			if (response.items[i].description === 'Evening') {
				$('#evening').append('<div class="calendar-ajax"><div class="calendar-summary">' + response.items[i].summary + '</div><div class="calendar-date">' + moment(response.items[i].start.dateTime, moment.ISO_8601).format("MMM-DD-YYYY", 'en') + '</div><div class="calendar-time">'+ moment(response.items[i].start.dateTime, moment.ISO_8601).format("hh:mm a") +'</div></div>');
				};
			if (response.items[i].description === 'Matinee') {
				$('#matinee').append('<div class="calendar-ajax"><div class="calendar-summary">' + response.items[i].summary + '</div><div class="calendar-date">' + moment(response.items[i].start.dateTime, moment.ISO_8601).format("MMM-DD-YYYY", 'en') + '</div><div class="calendar-time">'+ moment(response.items[i].start.dateTime, moment.ISO_8601).format("hh:mm a") +'</div></div>');
				};
			if (response.items[i].description === undefined || response.items[i].description === 'other') {
				$('#calendarFill').append('<div class="calendar-ajax"><div class="calendar-summary">' + response.items[i].summary + '</div><div class="calendar-date">' + moment(response.items[i].start.dateTime, moment.ISO_8601).format("MMM-DD-YYYY", 'en') + '</div><div class="calendar-time">'+ moment(response.items[i].start.dateTime, moment.ISO_8601).format("hh:mm a") +'</div></div>');
			}
		}
	});
});
