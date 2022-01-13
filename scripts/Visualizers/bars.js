//////////////////////////////////////////////////////////////
//                                                            //
// Created by: Asher Andargachew                              //
// (Re)Created on: Oct. 10th, 2021                            //
// Description: Audio visualizer. Inspired by the coding      //
//              train video on youtube                        //
//              https://www.youtube.com/watch?v=2O3nm0Nvbi4   //
//                                                            //
////////////////////////////////////////////////////////////////

function barVizualizer(bufferLength, frequencyData, averageVol) {
  noStroke();

  //bin number
  var binNum = 128;
  var brightness = map(averageVol, 0, 1, 40, 100);

  // loop to draw bars
  for (let i = 0; i < bufferLength; i++) {
    // color of bars
    var color = map(i, 0, binNum, 360, 0);
    fill(color, 80, brightness);

    // draw bars
    var barHeight = frequencyData[i];
    var y = map(barHeight, 0, 256, height * 0.995, 0);
    rect((i * width) / binNum, y, width / binNum - 4, height - y);
  }
}
