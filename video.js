/*
*	Vimeo Video Player
*	- Basic Vimeo video player built by Tom Lee
*/

var VimeoVideoPlayer = function(rootElement) {
	this.videoPlayerBody = rootElement;
	this.videoPlayer = this.videoPlayerBody.querySelector(".video-player");
	this.playerControls = this.videoPlayerBody.querySelector(".player-controls");
	this.playPauseButton = this.videoPlayerBody.querySelector(".play-pause-button");
    this.playIcon = this.videoPlayerBody.querySelector(".play-icon");
    this.pauseIcon = this.videoPlayerBody.querySelector(".pause-icon");  
    this.progressBarContainer = this.videoPlayerBody.querySelector('.progress-bar-container');		
    this.progressBar = this.videoPlayerBody.querySelector('.progress-bar');	
    this.bufferBar = this.videoPlayerBody.querySelector('.buffer-bar');	


    this.videoPlayer.controls = false; 
    this.videoPlayer.load();

    this.currentVideoProgress = 0;
	this.currentBufferProgress = 0;

};

VimeoVideoPlayer.prototype.updateProgressAndBufferBar = function() {
	console.log("getting called");
	this.videoPlayer.addEventListener('timeupdate', this.updateProgressBar(), false);
	this.videoPlayer.addEventListener('progress', this.updateBufferBar(this));
};

VimeoVideoPlayer.prototype.updateProgressBar = function() {
	var videoPlayer = document.getElementById('video-player');
    var progressBar = document.getElementById('progress-bar');
   	var percentage = (100 / videoPlayer.duration) * videoPlayer.currentTime;
   	console.log(percentage);
   	//currentVideoProgress = percentage;
   	progressBar.style.width = percentage + '%';  
   	//console.log("progress bar " + percentage);
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
	console.log(this.currentBufferProgress);
	document.getElementById('buffer-bar').style.width = loadPercentage + '%'; 
	
};

VimeoVideoPlayer.prototype.togglePlayPause = function() {

	if (this.videoPlayer.paused || this.videoPlayer.ended) {
		this.videoPlayer.play();
		this.playIcon.style.display = 'none';
		this.pauseIcon.style.display = 'block';
   	}
   	else {
    	this.videoPlayer.pause();
		this.playIcon.style.display = 'block';
		this.pauseIcon.style.display = 'none';
   	}

};

VimeoVideoPlayer.prototype.updateVideoProgressOnClick = function() {
	this.progressBarContainer.addEventListener("click", this.seek);
};

VimeoVideoPlayer.prototype.seek = function(e) {
	var videoPlayer = document.getElementById('video-player');
	var progressBar = document.getElementById('progress-bar');

    var percent = e.offsetX / this.offsetWidth;
    videoPlayer.currentTime = percent * videoPlayer.duration;
    progressBar.style.width = percent / 100;
};

VimeoVideoPlayer.prototype.showAndHidePlayerControls = function() {
	self = this;
	this.videoPlayerBody.onmouseover = function() { 
	    self.playerControls.style.visibility = "visible";
	}
	this.videoPlayerBody.onmouseout = function() { 
	    self.playerControls.style.visibility = "hidden";
	}

};

VimeoVideoPlayer.prototype.changePlayerButtonColor = function() {
	// At this moment in time: "this" is the VimeoVideoPlayer Object
	//var self = this;
	//var playPauseButton = document.getElementById('play-pause-button');

	this.playPauseButton.onmouseover = function() { 
		// At this moment in time: "this" is the playPauseButton DOM element.
	    this.style.background = "rgba(0, 173, 239,.75)";
	}	
	this.playPauseButton.onmouseout = function() { 
	    this.style.background = "rgba(23,35,34,.75)";
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

var vimeoVideoPlayer = new VimeoVideoPlayer(document.getElementById("vimeo-video-player"));
vimeoVideoPlayer.showAndHidePlayerControls(); 
vimeoVideoPlayer.changePlayerButtonColor();
vimeoVideoPlayer.updateProgressAndBufferBar();
vimeoVideoPlayer.updateVideoProgressOnClick();


function cool() {
	console.log("cool");
};
document.getElementById('video-player').addEventListener('timeupdate', cool, false);

//vimeoVideoPlayer.videoPlayer.addEventListener('timeupdate', vimeoVideoPlayer.updateProgressBar(), false);
document.getElementById('video-player').addEventListener('timeupdate', vimeoVideoPlayer.updateProgressBar(), false);
//vimeoVideoPlayer.videoPlayer.addEventListener('progress', vimeoVideoPlayer.updateBufferBar());
document.getElementById('video-player').addEventListener('progress', vimeoVideoPlayer.updateBufferBar());



function togglePlayPause() {
	vimeoVideoPlayer.togglePlayPause();
}


//document.addEventListener("DOMContentLoaded", function() { initialiseMediaPlayer(); }, false);


