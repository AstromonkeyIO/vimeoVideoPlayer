/*
*	Vimeo Video Player
*	- Basic Vimeo video player built by Tom Lee
*/

var VimeoVideoPlayer = function() {
	this.vimeoVideoPlayer = "";
	this.videoPlayer = "";
	this.videoPlayerControls = "";
	this.playPauseButton = "";
	this.progressBarContainer = "";
	this.progressBar = "";
	this.bufferBar = "";
	this.currentVideoProgress = 0;
	this.currentBufferProgress = 0;
};

VimeoVideoPlayer.prototype.init = function() {
	this.vimeoVideoPlayer = document.getElementById('vimeo-video-player');	
	this.videoPlayer = document.getElementById('video-player');
	this.videoPlayerControls = document.getElementById('player-controls');
	this.playPauseButton = document.getElementById('play-pause-button');

	console.log(document.getElementById('play-pause-button'));
    this.progressBarContainer = document.getElementById('progress-bar-container');	
    this.progressBar = document.getElementById('progress-bar');
    this.bufferBar = document.getElementById('buffer-bar');

    document.getElementById('video-player').controls = false;
    document.getElementById('video-player').load();
};

VimeoVideoPlayer.prototype.updateProgressAndBufferBar = function() {
	document.getElementById('video-player').addEventListener('timeupdate', this.updateProgressBar, false);
	document.getElementById('video-player').addEventListener('progress', this.updateBufferBar);
};

VimeoVideoPlayer.prototype.updateProgressBar = function() {
	var videoPlayer = document.getElementById('video-player');
    var progressBar = document.getElementById('progress-bar');
   	var percentage = (100 / videoPlayer.duration) * videoPlayer.currentTime;
   	this.currentVideoProgress = percentage;
   	progressBar.style.width = percentage + '%';  
   	console.log("progress bar " + percentage);
};

VimeoVideoPlayer.prototype.updateBufferBar = function() {
    var range = 0;
    var bf = this.buffered;
    var time = this.currentTime;

    while(!(bf.start(range) <= time && time <= bf.end(range))) {
        range += 1;
    }
    var loadStartPercentage = bf.start(range) / this.duration;
    var loadEndPercentage = bf.end(range) / this.duration;
    var loadPercentage = (loadEndPercentage - loadStartPercentage)*100;
    this.currentBufferProgress = loadPercentage;
	document.getElementById('buffer-bar').style.width = loadPercentage + '%';  
};

VimeoVideoPlayer.prototype.togglePlayPause = function() {
	if (this.videoPlayer.paused || this.videoPlayer.ended) {
		this.videoPlayer.play();
		document.getElementById('play-icon').style.display = 'none';
		document.getElementById('pause-icon').style.display = 'block';
   	}
   	else {
    	this.videoPlayer.pause();
		document.getElementById('play-icon').style.display = 'block';
		document.getElementById('pause-icon').style.display = 'none';
   	}
};

VimeoVideoPlayer.prototype.updateVideoProgressOnClick = function() {
	document.getElementById('progress-bar-container').addEventListener("click", this.seek);
};

VimeoVideoPlayer.prototype.seek = function(e) {
	var videoPlayer = document.getElementById('video-player');
	var progressBar = document.getElementById('progress-bar');

    var percent = e.offsetX / this.offsetWidth;
    videoPlayer.currentTime = percent * videoPlayer.duration;
    progressBar.style.width = percent / 100;
};

VimeoVideoPlayer.prototype.showAndHidePlayerControls = function() {
	this.vimeoVideoPlayer.onmouseover = function() { 
	    document.getElementById('player-controls').style.visibility = "visible";
	}
	this.vimeoVideoPlayer.onmouseout = function() { 
	    document.getElementById('player-controls').style.visibility = "hidden";
	}

};

VimeoVideoPlayer.prototype.changePlayerButtonColor = function() {
	
	var playPauseButton = document.getElementById('play-pause-button');

	this.playPauseButton.onmouseover = function() { 
	    playPauseButton.style.background = "rgba(0, 173, 239,.75)";
	}	
	this.playPauseButton.onmouseout = function() { 
	    playPauseButton.style.background = "rgba(23,35,34,.75)";
	}

};


/*
var mediaPlayer;

function initialiseMediaPlayer() {
	mediaPlayer = document.getElementById('video-player');
	mediaPlayer.controls = false;
	mediaPlayer.addEventListener('timeupdate', updateProgressBar, false);
	mediaPlayer.addEventListener('progress', updateBufferBar);

	videoBody = document.getElementById('vimeo-video-player');
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
	mediaPlayer = document.getElementById('video-player');
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
		document.getElementById('play-icon').style.display = 'none';
		document.getElementById('pause-icon').style.display = 'block';
   	}
   	else {
     	btn.title = 'play';
    	mediaPlayer.pause();
		document.getElementById('play-icon').style.display = 'block';
		document.getElementById('pause-icon').style.display = 'none';
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
*/

var vimeoVideoPlayer = new VimeoVideoPlayer();
vimeoVideoPlayer.init();
vimeoVideoPlayer.showAndHidePlayerControls(); 
vimeoVideoPlayer.changePlayerButtonColor();
vimeoVideoPlayer.updateProgressAndBufferBar();
vimeoVideoPlayer.updateVideoProgressOnClick();

document.getElementById('video-player').addEventListener('progress', vimeoVideoPlayer.updateBufferBar());

function togglePlayPause() {
	vimeoVideoPlayer.togglePlayPause();
}


//document.addEventListener("DOMContentLoaded", function() { initialiseMediaPlayer(); }, false);


