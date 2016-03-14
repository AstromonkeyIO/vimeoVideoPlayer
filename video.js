document.addEventListener("DOMContentLoaded", function() { initialiseMediaPlayer(); }, false);

var mediaPlayer;

function initialiseMediaPlayer() {
	mediaPlayer = document.getElementById('media-video');
	mediaPlayer.controls = false;
	mediaPlayer.addEventListener('timeupdate', updateProgressBar, false);
	mediaPlayer.addEventListener('progress', updateBufferBar);

	videoBody = document.getElementById('media-player');
	playerControls = document.getElementById('player-controls');
	videoBody.onmouseover = function() { 
	    playerControls.style.visibility = "visible";
	}
	videoBody.onmouseout = function() { 
	    playerControls.style.visibility = "hidden";
	}

	playPauseButton = document.getElementById('play-pause-button');
	playPauseButton.onmouseover = function() { 
	    playPauseButton.style.background = "rgba(0, 173, 239,.75)";
	}	
	playPauseButton.onmouseout = function() { 
	    playPauseButton.style.background = "rgba(23,35,34,.75)";
	}

	playerControls.style.visibility = "hidden";

	mediaPlayer.addEventListener('loadeddata', function() {
	   	playerControls.style.visibility = "visible";
	}, false);	

    var progressBarContainer = document.getElementById('progress-bar-container');
	progressBarContainer.addEventListener("click", seek);

}

function seek(e) {
	mediaPlayer = document.getElementById('media-video');
	var progressBar = document.getElementById('progress-bar');
    var percent = e.offsetX / this.offsetWidth;
    mediaPlayer.currentTime = percent * mediaPlayer.duration;
    progressBar.style.width = percent / 100;
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
   var percentage = (100 / mediaPlayer.duration) * mediaPlayer.currentTime;
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

