//////////////////////////////////////////////////////////////
//                                                            //
// Created by: Asher Andargachew                              //
// (Re)Created on: Oct. 11th, 2021                            //
// Description: Audio visualizer. Inspired by the coding      //
//              train video on youtube                        //
//              https://www.youtube.com/watch?v=2O3nm0Nvbi4   //
//                                                            //
////////////////////////////////////////////////////////////////

function circleVizual(circleViz, averageVol) {
  var bigger = width >= height ? width : height;
  var smaller = width >= height ? height : width;

  // inner visual
  // inner circle properties
  var size = map(averageVol, 0, 1, bigger / 10, bigger / 4);
  var vizColor = map(averageVol, 0, 1, 0, 360);

  stroke(vizColor, 80, 80);
  noFill();

  // draw inner circle
  ellipse(width / 2, height / 2, size);

  // outer visual
  // get value of each averageVol to then graph line
  circleViz.push(averageVol);
  push();

  // outer circle properties
  strokeWeight(14);

  stroke(vizColor, 80, 80);
  beginShape();
  translate(width / 2, height / 2);

  // loop through each average volume pushed
  for (var i = 0; i < circleViz.length; i++) {
    var r = map(circleViz[i], 0, 1, smaller / 6, bigger / 3);
    var x = r * cos(i);
    var y = r * sin(i);
    point(x, y);
    // vertex(y, x);
  }
  endShape();
  pop();

  // remove previous averageVols to then keep drawing
  if (circleViz.length > 360) {
    // removes previous index
    circleViz.splice(0, 1);
  }
}
