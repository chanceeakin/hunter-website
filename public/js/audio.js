// html5media enables <video> and <audio> tags in all major browsers
// External File: http://api.html5media.info/1.1.8/html5media.min.js


// Add user agent as an attribute on the <html> tag...
// Inspiration: http://css-tricks.com/ie-10-specific-styles/
var b = document.documentElement;
b.setAttribute('data-useragent', navigator.userAgent);
b.setAttribute('data-platform', navigator.platform);

function setVolume() {
    let mediaClip = document.getElementById("audio1");
    audio1.volume = document.getElementById("volume").value;
}

// HTML5 audio player + playlist controls...
// Inspiration: http://jonhall.info/how_to/create_a_playlist_for_html5_audio
// Mythium Archive: https://archive.org/details/mythium/
jQuery(function ($) {
    var supportsAudio = !!document.createElement('audio').canPlayType;
    if (supportsAudio) {
        var index = 0,
            playing = false,
            mediaPath = '../audio/',
            extension = '',
            tracks = [{
                "track": 1,
                "name": "Hai già vinta la causa...",
                "length": "04:39",
                "file": "count"
            }, {
                "track": 2,
                "name": "Votre Toast, Je Peux vous le rendre",
                "length": "03:41",
                "file": "votreToast"
            }, {
                "track": 3,
                "name": "Ya vas lyubylu",
                "length": "04:42",
                "file": "yaVasLyublyu"
            }],
            trackCount = tracks.length,
            npAction = $('#npAction'),
            npTitle = $('#npTitle'),
            audio = $('#audio1').bind('play', function () {
                playing = true;
                npAction.text('Now Playing');
            }).bind('pause', function () {
                playing = false;
                npAction.text('Paused');
            }).bind('ended', function () {
                playing = false;
                npAction.text('Ready to Play');
                if ((index + 1) < trackCount) {
                    index++;
                    loadTrack(index);
                    audio.play();
                } else {
                    audio.pause();
                    index = 0;
                    loadTrack(index);
                }
            }).get(0),
            playButton = $('#play').click(() => {
                if(!playing) {
                    audio.play();
                }
            }),
            pauseButton = $('#pause').click(() => {
                if(playing) {
                    audio.pause();
                }
            }),
            stopButton = $('#stop').click(() => {
                if(playing) {
                    audio.pause();
                    audio.currentTime = 0;
                }
            }),
            btnPrev = $('#btnPrev').click(function () {
                if ((index - 1) > -1) {
                    index--;
                    loadTrack(index);
                    if (playing) {
                        audio.play();
                    }
                } else {
                    audio.pause();
                    index = 0;
                    loadTrack(index);
                }
            }),
            btnNext = $('#btnNext').click(function () {
                if ((index + 1) < trackCount) {
                    index++;
                    loadTrack(index);
                    if (playing) {
                        audio.play();
                    }
                } else {
                    audio.pause();
                    index = 0;
                    loadTrack(index);
                }
            }),
            li = $('#plList li').click(function () {
                var id = parseInt($(this).index());
                if (id !== index) {
                    playTrack(id);
                }
            }),
            loadTrack = function (id) {
                $('.plSel').removeClass('plSel');
                $('#plList li:eq(' + id + ')').addClass('plSel');
                npTitle.text(tracks[id].name);
                index = id;
                audio.src = mediaPath + tracks[id].file + extension;
            },
            playTrack = function (id) {
                loadTrack(id);
                audio.play();
            };

        extension = audio.canPlayType('audio/mpeg') ? '.mp3' : audio.canPlayType('audio/ogg') ? '.ogg' : '';
        loadTrack(index);


    }
});
