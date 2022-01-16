//////////////////////////////////////////////////////////////
//                                                            //
// Created by: Asher Andargachew                              //
// (Re)Created on: Oct. 24th, 2021                            //
// Description: Audio visualizer. Inspired by the coding      //
//              train video on youtube                        //
//              https://www.youtube.com/watch?v=UoTxOVEecbI   //
//                                                            //
////////////////////////////////////////////////////////////////

function particlesSetup() {
  // populate particles
  var bigger = width >= height ? width : height;

  particles = new Array(Math.floor(bigger / 2.5));
  for (let i = 0; i < particles.length; i++) {
    particles[i] = new Particle(particles.length, i);
  }
}

class Particle {
  constructor(partLength, partIndex) {
    this.partLength = partLength;
    this.x = width / 2 - this.partLength / 2 + partIndex;
    this.y = height / 2 - this.partLength / 2;
    this.r = random(1, 2.5);
    this.speed = 0;
    this.velocity = random(0, 0.5);
    this.pixPosX = Math.floor(this.x);
    this.pixPosY = Math.floor(this.y);
  }

  show(averageVol) {
    // particle reacting to music
    var sizeIncrease = map(averageVol, 0, 1, 1, 2.5);

    // draw particle using colors from cover image
    fill(mappedCover[this.pixPosY][this.pixPosX][1]);
    noStroke();
    ellipse(this.x, this.y, this.r * sizeIncrease);
  }

  update(mappedCover, averageVol) {
    // particle reacting to music
    var musicBoost = map(averageVol, 0, 1, 0, 2);

    // so the index of the particle position is always an integer
    this.pixPosX = Math.floor(this.x);
    this.pixPosY = Math.floor(this.y);

    // make particles move at different speed depending on image pixel brightness
    this.speed = mappedCover[this.pixPosY][this.pixPosX][0];
    var movement = 4 - this.speed + this.velocity; //2.5 is a relative brightness calculated from image, might need to change to more accurate number

    // fall animation
    this.y = this.y + movement + musicBoost;

    // after it exists screen
    if (this.y > height / 2 + this.partLength / 2) {
      this.y = height / 2 - this.partLength / 2;
    }
  }
}
