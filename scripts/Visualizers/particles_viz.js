//////////////////////////////////////////////////////////////
//                                                            //
// Created by: Asher Andargachew                              //
// (Re)Created on: Oct. 24th, 2021                            //
// Description: Audio visualizer. Inspired by the coding      //
//              train video on youtube                        //
//              https://www.youtube.com/watch?v=UoTxOVEecbI   //
//                                                            //
////////////////////////////////////////////////////////////////

//  change color mode
// colorMode()
// show image
class Balls {
  constructor(location) {
    this.x = random(width);
    this.y = 0;
    this.r = 3;
    this.speed = random(1, 10);
    this.location = location;
    this.path = [];
  }

  update() {
    this.y += this.speed * (averageVol + 0.02 * 2);

    if (this.y > height) {
      this.y = -5;
      this.x = random(width);
    }
  }

  show() {
    fill("rgb(0, 200, 20)");
    // noFill()
    // stroke(0, 200, 20);
    noStroke();
    ellipse(this.x, this.y, this.r);
    // let v = createVector(this.x, this.y);
    // this.path.push(v);

    // for (let i = 0; i < this.path.length; i++) {
    //   let pos = this.path[i];
    //   let brightness = map(i, 0, this.path.length, 0, 1);
    //   fill(`rgba(0, 200, 20, ${brightness})`);
    //   // stroke(0, 200, 20, brightness);
    //   ellipse(pos.x, pos.y, this.r);
    // }

    // if (this.path.length > 10) {
    //   this.path.splice(0, 1);
    // }
    this.update();
  }
}

// particles to show image
// class Particles {
//   constructor() {
//     this.x = random(width);
//     this.y = 0;
//     this.speed = 0;
//     this.velocity = random((height * 0.2) / 100);
//     if (width > height) {
//       this.size = random((height * 1) / 7 / 100, (height * 0.352) / 100);
//     } else {
//       this.size = random((height * 1) / 5 / 100, (height * 0.25) / 100);
//     }
//     // index positions for image data
//     this.pos1 = floor(this.y);
//     this.pos2 = floor(this.x);
//   }
//   show() {
//     // draw particles
//     noStroke();

//     // show image color using particles
//     fill(mappedImage[this.pos1][this.pos2][1]);

//     ellipse(this.x, this.y, this.size);

//     this.update();
//   }

//   update() {
//     // making sure index positions are rounded down
//     this.pos1 = floor(this.y);
//     this.pos2 = floor(this.x);

//     // speed of the particles depending on how bright the image pixel is
//     this.speed = mappedImage[this.pos1][this.pos2][0];
//     let movement = 3 - this.speed + this.velocity;

//     this.y += movement;

//     // when the particle exists screen
//     if (this.y > height) {
//       this.y = 0;
//       this.x = random(width);
//     }
//   }
// }
