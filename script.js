//////////////////////////////////////////////////////////////
//                                                            //
// Created by: Asher Andargachew                              //
// Created on: Oct 27, 2021                                   //
// Description: This is just a small easter egg section       //
//                (planning on having multiple)               //
//                                                            //
////////////////////////////////////////////////////////////////

const greetingTxt = document.getElementById("Greeting");

// list of easter eggs
easterEggs = ["General Kenobi", "*R2 Noises*"];

// if it is clicked
greetingTxt.addEventListener("click", () => {
  randomEasterEgg = easterEggs[Math.floor(Math.random() * easterEggs.length)];
  if (greetingTxt.innerText === "Hello there!") {
    greetingTxt.innerText = randomEasterEgg;
  } else {
    greetingTxt.innerText = "Hello there!";
  }
});
