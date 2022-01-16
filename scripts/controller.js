// setup audio stuff
function audioSetup() {
  // Make sure it is not suspended (just incase, not really needed)
  if (audioContext.state === "suspended") {
    audioContext.resume();
  }

  audioSource = audioContext.createMediaElementSource(audio);

  // audio context analyzer variable
  analyzer = audioContext.createAnalyser();
  audioSource.connect(analyzer);
  analyzer.connect(audioContext.destination);
  analyzer.fftSize = 1024;

  // analyze sound data
  bufferLength = analyzer.frequencyBinCount;
  frequencyData = new Uint8Array(bufferLength);
  timeData = new Uint8Array(bufferLength);
  ampData = new Float32Array(analyzer.fftSize);
}

// locate song using properties
function loadSong(track) {
  title.innerText = track.title;
  artist.innerText = track.artist;
  audio.src = `../assets/music/audio/${track["file name"]}`;

  // remove special characters from album name
  var tempAlbum =
    track.album != null
      ? track.album.replace(/[\/\\#,+()$~%":*?<>{}]/g, "") + ".jpg"
      : null;

  // check if album cover exists
  if (tempAlbum != null && covers.includes(tempAlbum)) {
    cover.src = `../assets/music/images/${tempAlbum}`;
  } else {
    cover.src = `../assets/music/images/Unknown.png`;
  }

  mappedCover = [];
  particles = [];

  console.log(tempAlbum);
}

function playSong() {
  musicContainer.classList.add("play");
  // play audio
  audio.play();
}

function pauseSong() {
  musicContainer.classList.remove("play");
  // change icon
  audio.pause();
}

// button controls
function playButton() {
  const isPlaying = musicContainer.classList.contains("play");

  // change button state
  if (isPlaying) {
    pauseSong();
    playBtn.innerHTML =
      '<span class="material-icons" style="font-size:30px;">play_arrow</span>';
  } else {
    playSong();
    playBtn.innerHTML =
      '<span class="material-icons" style="font-size:30px;">pause</span>';
  }
}

function nextButton() {
  const isPlaying = musicContainer.classList.contains("play");
  songIndex += 1;

  if (songIndex >= playlist.tracks.length) {
    songIndex = 0;
  }

  loadSong(playlist.tracks[songIndex]);

  if (isPlaying) {
    playSong();
  }
}

function previousButton() {
  const isPlaying = musicContainer.classList.contains("play");
  songIndex -= 1;

  if (songIndex < 0) {
    songIndex = playlist.tracks.length - 1;
  }

  loadSong(playlist.tracks[songIndex]);

  if (isPlaying) {
    playSong();
  }
}

// progress bar
function songTime(e) {
  const { duration, currentTime } = e.target;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;
}

function clickTime(e) {
  const width = progressContainer.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;

  audio.currentTime = (clickX / width) * duration;
}

// visual button
function visualizerButton() {
  if (visualIndex < visualIndexMax) {
    visualIndex += 1;
  } else {
    visualIndex = 0;
  }
  console.log(visualIndex);
}

// volume
function volumeSliding(e) {
  if (!muted) {
    audio.volume = this.value / 100;
  }
  console.log(this.value);
}

// analyze song
function analyzeMusic() {
  // smoothing
  analyzer.smoothingTimeConstant = 0.85;

  // get analyzer data
  analyzer.getByteFrequencyData(frequencyData);
  analyzer.getByteTimeDomainData(timeData);
  analyzer.getFloatTimeDomainData(ampData);
  // console.log(frequencyData);
  // console.log(timeData);
}

// mute button
function muteVolume() {
  if (volume.innerHTML === "volume_up") {
    volumeBtn.innerHTML = "volume_off";
    audio.volume = 0;
    muted = true;
  } else {
    volumeBtn.innerHTML = "volume_up";
    muted = false;
    audio.volume = volumeSlider.value / 100;
  }
}
