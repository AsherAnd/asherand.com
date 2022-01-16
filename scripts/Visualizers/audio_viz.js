//////////////////////////////////////////////////////////////
//                                                            //
// Created by: Asher Andargachew                              //
// Created on: Sep 19, 2021                                   //
// Description: This is music visualizer                      //
//              continued from a google CSSI project          //
//              I did with a team                             //
//                                                            //
////////////////////////////////////////////////////////////////

// get static properties from html
const musicContainer = document.getElementById("musicContainer");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");

const volumeBtn = document.getElementById("volume");
const volumeSlider = document.getElementById("myRange");
const visualizerBtn = document.getElementById("visualizer");

const audio = document.getElementById("audio");
const progress = document.getElementById("progress");
const progressContainer = document.getElementById("progressContainer");
const title = document.getElementById("musicTitle");
const artist = document.getElementById("musicArtist");
const cover = document.getElementById("musicCover");

// playlist
let playlist = [];
const covers = [];

// keep track of song, vol and visualizer
let songIndex = 0;
let visualIndex = 3;
let visualIndexMax = 3;
let muted = false;

// create reusable audio context
const audioContext = new AudioContext();
let audioSource;
let analyzer;

let bufferLength;
let frequencyData;
let timeData;
let ampData;

// average volume of track
let averageVol = 0;

// visualizer variables
let circleViz = [];
let polyViz = [];
let mappedCover = [];
let star;
let particles;

// when screen size changes
function windowResized() {
  resizeCanvas(windowWidth, windowHeight * 0.88);

  // reset values
  clear();
  mappedCover = [];
  star = [];
  particles = [];

  starSetup();
  particlesSetup();
}

// setup
function setup() {
  createCanvas(windowWidth, windowHeight * 0.88);
  pixelDensity(1);
  angleMode(DEGREES);
  imageMode(CENTER);
  colorMode(HSB, 360, 100, 100, 255);

  // load song
  loadJSON("../scripts/soundtracks.json", function (data) {
    playlist = data;
    // get availabe album covers for songs
    loadJSON("../scripts/covers.json", function (coverData) {
      for (let i = 0; i < coverData.covers.length; i++) {
        covers.push(coverData.covers[i]["file name"]);
      }
      loadSong(playlist.tracks[songIndex]);
    });
  });

  // setup audio stuff
  audioSetup();

  // event listeners for button controls
  playBtn.addEventListener("click", playButton);
  nextBtn.addEventListener("click", nextButton);
  prevBtn.addEventListener("click", previousButton);

  // event listener for volume button
  volumeBtn.addEventListener("click", muteVolume);

  // progress bar of track
  audio.addEventListener("timeupdate", songTime);

  // click on progress bar
  progressContainer.addEventListener("click", clickTime);

  // when song ends play next
  audio.addEventListener("ended", nextButton);

  // change volume
  volumeSlider.addEventListener("input", volumeSliding);

  // change visualizer
  visualizerBtn.addEventListener("click", visualizerButton);

  // setup star visual
  starSetup();
}

// display visuals
function draw() {
  // clear background for each visual
  // clear();

  // get audio data
  analyzeMusic();
  getAverageVolume();

  // visualizers
  // bar visualizer
  if (visualIndex === 0) {
    barVizualizer(bufferLength, frequencyData, averageVol);
  }

  // star visualizer
  else if (visualIndex === 1) {
    // translate canvas position
    translate(width / 2, height / 2);

    for (let i = 0; i < star.length; i++) {
      star[i].update(averageVol);
    }
  }

  // circle visualizer
  else if (visualIndex === 2) {
    circleVizual(circleViz, averageVol);
  }

  // cover/particles visualizer
  else if (visualIndex === 3) {
    // if cover image is not mapped
    if (mappedCover.length === 0) {
      loadCovers(cover.src);

      // set up particles
      particlesSetup();
    } else {
      for (let i = 0; i < particles.length; i++) {
        particles[i].show();
        particles[i].update(mappedCover);
      }
    }
  }

  ///////////////////////// under construction////////////////////////////

  // // polygraph visualizer
  // else if (visualIndex === 3) {
  //   clear();
  //   polyVizual(polyViz, averageVol);
  // }

  // // particles visualizer
  // else if (visualIndex === 4) {
  //   // background transparency
  //   background(0, 0, 0, 10);
  //   background(0, 0, 0, 14);

  //   for (let i = 0; i < balls.length; i++) {
  //     balls[i].show();
  //   }
  // }

  ///////////////////////// under construction////////////////////////////
}

// get average volume from audio
function getAverageVolume() {
  // for (let i = 0; i < bufferLength; i++) {
  //   averageVol += frequencyData[i] * frequencyData[i];
  // }

  // averageVol = Math.sqrt(averageVol / bufferLength) / 100;
  // console.log(averageVol);

  let sumSquares = 0.0;
  for (const i of ampData) {
    sumSquares += i * i;
  }

  averageVol = Math.sqrt(sumSquares / ampData.length);
  // console.log(averageVol);
}
