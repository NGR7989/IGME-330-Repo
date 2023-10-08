/*
	main.js is primarily responsible for hooking up the UI to the rest of the application 
	and setting up the main event loop
*/

// We will write the functions in this file in the traditional ES5 way
// In this instance, we feel the code is more readable if written this way
// If you want to re-write these as ES6 arrow functions, to be consistent with the other files, go ahead!

import * as utils from './utils.js';
import * as audio from './audio.js';
import * as canvas from './canvas.js';

const drawParams =
{
  showGradient  : true,
  showBars      : true,
  showCircles   : true,
  showNoise     : true,
  showInvert    : false,
  showEmboss    : false
};

// 1 - here we are faking an enumeration
const DEFAULTS = Object.freeze({
	sound1  :  "media/ULTRAKILL.mp3"
});

function loop(){
  /* NOTE: This is temporary testing code that we will delete in Part II */
    requestAnimationFrame(loop);
    canvas.draw(drawParams);

  // Old debug information below 

    // 1) create a byte array (values of 0-255) to hold the audio data
    // normally, we do this once when the program starts up, NOT every frame
   // let audioData = new Uint8Array(audio.analyserNode.fftSize/2);
    
    // 2) populate the array of audio data *by reference* (i.e. by its address)
    //audio.analyserNode.getByteFrequencyData(audioData);
    
    // 3) log out the array and the average loudness (amplitude) of all of the frequency bins
      // console.log(audioData);
      
      // console.log("-----Audio Stats-----");
      // let totalLoudness =  audioData.reduce((total,num) => total + num);
      // let averageLoudness =  totalLoudness/(audio.analyserNode.fftSize/2);
      // let minLoudness =  Math.min(...audioData); // ooh - the ES6 spread operator is handy!
      // let maxLoudness =  Math.max(...audioData); // ditto!
      // // Now look at loudness in a specific bin
      // // 22050 kHz divided by 128 bins = 172.23 kHz per bin
      // // the 12th element in array represents loudness at 2.067 kHz
      // let loudnessAt2K = audioData[11]; 
      // console.log(`averageLoudness = ${averageLoudness}`);
      // console.log(`minLoudness = ${minLoudness}`);
      // console.log(`maxLoudness = ${maxLoudness}`);
      // console.log(`loudnessAt2K = ${loudnessAt2K}`);
      // console.log("---------------------");
  }

function init(){
  audio.setupWebaudio(DEFAULTS.sound1);
	console.log("init called");
	console.log(`Testing utils.getRandomColor() import: ${utils.getRandomColor()}`);
	let canvasElement = document.querySelector("canvas"); // hookup <canvas> element
	setupUI(canvasElement);

  canvas.setupCanvas(canvasElement,audio.analyserNode);
  loop();
}

function setupUI(canvasElement){
  // A - hookup fullscreen button
  const fsButton = document.querySelector("#fsButton");
	
  // add .onclick event to button
  fsButton.onclick = e => {
    console.log("goFullscreen() called");
    utils.goFullscreen(canvasElement);
  };


  playButton.onclick = e => 
  {
    console.log(`audioCtx.state before = ${audio.audioCtx.state}`);

    if(audio.audioCtx.state == "suspended")
    {
      audio.audioCtx.resume();
    }

    if(e.target.dataset.playing == "no")
    {
      audio.playCurrentSound();
      e.target.dataset.playButton = "yes";
    }
    else
    {
      audio.pauseCurrentSound();
      e.target.dataset.playing = "no";
    }
  }

  // Hookup track
  let trackSelect = document.querySelector("#trackSelect");
  trackSelect.onchange = e =>
  {
    audio.loadSoundFile(e.target.value);
    if(playButton.dataset.playing == "yes")
    {
      playButton.dispatchEvent(new MouseEvent("click"));
    }
  }


  // Set up checkboxes 
  const btnGradient = document.querySelector("#gradientCB");
  btnGradient.checked = true;
  btnGradient.onclick = () => {
    drawParams.showGradient = btnGradient.checked;
  };

  const btnBars = document.querySelector("#barsCB");
  btnBars.checked = true;
  btnBars.onclick = () => {
    drawParams.showBars = btnBars.checked;
  };

  const btnCircles = document.querySelector("#circlesCB");
  btnCircles.checked = true;
  btnCircles.onclick = () => {
    drawParams.showCircles = btnCircles.checked;
  };

  const btnNoise = document.querySelector("#noiseCB");
  btnNoise.checked = true;
  btnNoise.onclick = () => {
    drawParams.showNoise = btnNoise.checked;
  };

  const btnInvert = document.querySelector("#invertCB");
  btnInvert.checked = false;
  btnInvert.onclick = () => {
    drawParams.showInvert = btnInvert.checked;
  };

  const btnEmboss = document.querySelector("#embossCB");
  btnEmboss.checked = false;
  btnEmboss.onclick = () => {
    drawParams.showEmboss = btnEmboss.checked;
  };
} // end setupUI


export {init};