var audio = document.getElementById('audio-player');

$(document).ready(function () {
	$("#play-button").click(function () {
		if ($(this).hasClass('unchecked')) {
			$(this)
				.addClass("play-active")
				.removeClass("play-inactive")
				.removeClass("unchecked");
			setTimeout(function () {
				$('#play-button').css({'background-color' : '#444'})}, 400);
			$(".info-two")
				.addClass("info-active");
			setTimeout(function () {
				$('.icon-list')
					.removeClass('hide');
			}, 400);
			$('.icon-list-play')
				.addClass('hide');
			$("#pause-button")
				.addClass("scale-animation-active");
			$(".waves-animation-one, #pause-button, .seek-field, .volume-icon, .volume-field, .info-two").show();
			$(".waves-animation-two").hide();
			$("#pause-button")
				.children('.icon')
				.addClass("icon-pause")
				.removeClass("icon-play");
			setTimeout(function () {
				$(".info-one").hide();
			}, 400);
			audio.play();
			audio.currentTime = 0;
		} else {
			$(this)
				.removeClass("play-active")
				.addClass("play-inactive")
				.addClass("unchecked")
				.css({'background-color' : '#26a69a'});
			$("#pause-button")
				.children(".icon")
				.addClass("icon-pause")
				.removeClass("icon-play");
			$('.icon-list')
				.addClass('hide');
			$('.icon-list-play')
				.removeClass('hide');
			$(".info-two")
				.removeClass("info-active");
			$(".waves-animation-one, #pause-button, .seek-field, .volume-icon, .volume-field, .info-two").hide();
			$(".waves-animation-two").show();
			setTimeout(function () {
				$(".info-one").show();
			}, 150);
			audio.pause();
			audio.currentTime = 0;
		}
	}); $("#pause-button").click(function () {
	var self = $(this);

	if (audio.paused) {
		$('.icon-pause').removeClass('hide');
		$('.icon-pause-play').addClass('hide');
		audio.play();
	} else {
		$('.icon-pause').addClass('hide');
		$('.icon-pause-play').removeClass('hide');
		audio.pause();
	}
}); $("#play-button").click(function () {
	setTimeout(function () {
		$("#play-button").children(".icon")
			.toggleClass("icon-play")
			.toggleClass("icon-cancel");
	}, 350);
});
});

function CreateSeekBar() {
	var seekbar = document.getElementById("audioSeekBar");
	seekbar.min = 0;
	seekbar.max = audio.duration;
	seekbar.value = 0;
}

function EndofAudio() {
	document.getElementById("audioSeekBar").value = 0;
}

function audioSeekBar() {
	var seekbar = document.getElementById("audioSeekBar");
	audio.currentTime = seekbar.value;
}

function SeekBar() {
	var seekbar = document.getElementById("audioSeekBar");
	seekbar.value = audio.currentTime;
}

audio.addEventListener("timeupdate", function () {
	var duration = document.getElementById("duration");
	var s = parseInt(audio.currentTime % 60, 10);
	var ss;
	if (s < 10) {
		ss = '0' + s;
	} else {
		ss = s;
	}
	var m = parseInt((audio.currentTime / 60) % 60);
	duration.innerHTML = m + ':' + ss;
}, false);

Waves.attach("#play-button", ["waves-button", "waves-float"]);
Waves.attach("#pause-button", ["waves-button", "waves-float"]);
Waves.init();
