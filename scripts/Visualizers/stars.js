//////////////////////////////////////////////////////////////
//                                                            //
// Created by: Asher Andargachew                              //
// (Re)Created on: Oct. 11th, 2021                            //
// Description: Audio visualizer. Inspired by the coding      //
//              train video on youtube                        //
//              https://www.youtube.com/watch?v=17WoOqgXsRM   //
//                                                            //
////////////////////////////////////////////////////////////////

function starSetup() {
  // populate star
  var bigger = width >= height ? width : height;

  star = new Array(Math.round(bigger * 2));
  for (let i = 0; i < star.length; i++) {
    star[i] = new Star();
  }
}

class Star {
  //single star properties
  constructor() {
    this.x = random(-width, width);
    this.y = random(-height, height);
    this.z = random(width);
    this.pz = this.z;
    this.color;
  }

  //use average vol to control color of the stars
  update(averageVol) {
    //map the average vol to speed
    let speed = map(averageVol, 0, 1, width / 2, 2);
    this.z = speed;
    this.color = map(this.z, width / 2, 0, 0, 325);

    if (this.z == 0) {
      this.z = width;
    }

    this.show();
  }

  //draw the dots
  show() {
    // positions
    var sx = map(this.x / this.z, 0, 1, 0, width);
    var sy = map(this.y / this.z, 0, 1, 0, height);
    var r = map(this.z, 0, width, 8, 0);
    //ellipse(sx, sy, r);

    var px = map(this.x / this.pz, 0, 1, 0, width);
    var py = map(this.y / this.pz, 0, 1, 0, height);

    this.pz = this.z;

    stroke(this.color, 80, 80);
    line(px, py, sx, sy);
  }
}
