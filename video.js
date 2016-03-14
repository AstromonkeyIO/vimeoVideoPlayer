document.addEventListener("DOMContentLoaded", function() { initialiseMediaPlayer(); }, false);

var mediaPlayer;

function initialiseMediaPlayer() {
   mediaPlayer = document.getElementById('media-video');
   mediaPlayer.controls = false;
   mediaPlayer.addEventListener('timeupdate', updateProgressBar, false);
   mediaPlayer.addEventListener('progress', updateBufferBar);
}

function togglePlayPause() {
   var btn = document.getElementById('play-pause-button');
   if (mediaPlayer.paused || mediaPlayer.ended) {
      btn.title = 'pause';
      mediaPlayer.play();
   }
   else {
      btn.title = 'play';
      mediaPlayer.pause();
   }
}

function changeButtonType(btn, value) {
   btn.title = value;
   btn.innerHTML = value;
   btn.className = value;
}

function stopPlayer() {
   mediaPlayer.pause();
   mediaPlayer.currentTime = 0;
}

function changeVolume(direction) {
   if (direction === '+') mediaPlayer.volume += mediaPlayer.volume == 1 ? 0 : 0.1;
   else mediaPlayer.volume -= (mediaPlayer.volume == 0 ? 0 : 0.1);
   mediaPlayer.volume = parseFloat(mediaPlayer.volume).toFixed(1);
}

function replayMedia() {
   resetPlayer();
   mediaPlayer.play();
}

function resetPlayer() {
	mediaPlayer.currentTime = 0;
    progressBar.value = 0;
	changeButtonType(playPauseBtn, 'play');
}

function updateProgressBar() {
   var progressBar = document.getElementById('progress-bar');
   var percentage = (100 / mediaPlayer.duration) *
   mediaPlayer.currentTime;
   progressBar.style.width = percentage + '%';  
   console.log("progress bar " + percentage);
}

function updateBufferBar() {
    var range = 0;
    var bf = this.buffered;
    var time = this.currentTime;

    while(!(bf.start(range) <= time && time <= bf.end(range))) {
        range += 1;
    }
    var loadStartPercentage = bf.start(range) / this.duration;
    var loadEndPercentage = bf.end(range) / this.duration;
    var loadPercentage = (loadEndPercentage - loadStartPercentage)*100;
    console.log("buffer bar" + loadPercentage);
	var bufferBar = document.getElementById('buffer-bar');
	bufferBar.style.width = loadPercentage + '%';  
}
