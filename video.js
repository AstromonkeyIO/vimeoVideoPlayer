/*
*	Vimeo Video Player
*	- Basic Vimeo video player built by Tom Lee
*/
var VimeoVideoPlayer = function(rootElement) {

	// video player properties
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

	var self = this;

	// update current video time
	this.videoPlayer.addEventListener('timeupdate', function() { 

   		self.currentVideoProgress = (100 / this.duration) * this.currentTime;
   		self.progressBar.style.width = self.currentVideoProgress + '%'; 

	}, false);

	// update current buffer time
	this.videoPlayer.addEventListener('progress', function() {

	    var range = 0;
	    var bf = this.buffered;
	    var time = this.currentTime;

	    if(typeof(bf) !== "undefined") {
		    while(!(bf.start(range) <= time && time <= bf.end(range))) {
		        range += 1;
		    }
		    var loadStartPercentage = bf.start(range) / this.duration;
		    var loadEndPercentage = bf.end(range) / this.duration;
		    var loadPercentage = (loadEndPercentage - loadStartPercentage)*100;
			self.bufferBar.style.width = loadPercentage + '%';  
		}

	});

	// update video time when the user clicks on the progress bar
	this.progressBarContainer.addEventListener("click", function(e) {

	    var percent = e.offsetX / this.offsetWidth;
	    self.videoPlayer.currentTime = percent * self.videoPlayer.duration;
	    self.progressBar.style.width = percent / 100;

	});

	// setup for play-pause button toggle
	this.playPauseButton.addEventListener("click", function() {
		self.togglePlayPause();
	});

};

// toggle play-pause button on click
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

// show video player controls on mouse over and hide it on mouse leave
VimeoVideoPlayer.prototype.showAndHidePlayerControls = function() {
	
	self = this;
	this.videoPlayerBody.onmouseover = function() { 
	    self.playerControls.style.visibility = "visible";
	}
	this.videoPlayerBody.onmouseout = function() { 
	    self.playerControls.style.visibility = "hidden";
	}

};

// highlight play-pause button on mouse over
VimeoVideoPlayer.prototype.changePlayerButtonColor = function() {

	this.playPauseButton.onmouseover = function() { 
	    this.style.background = "rgba(0, 173, 239,.75)";
	}	
	this.playPauseButton.onmouseout = function() { 
	    this.style.background = "rgba(23,35,34,.75)";
	}

};

//Initialize and setup video player
var vimeoVideoPlayer = new VimeoVideoPlayer(document.getElementById("vimeo-video-player-example"));
vimeoVideoPlayer.showAndHidePlayerControls(); 
vimeoVideoPlayer.changePlayerButtonColor();
