const START = 'START';
const STOP = 'STOP';

const progressBar = document.querySelector('.outerRing'),
  timerMin = document.querySelector('#minutes'),
  timerSec = document.querySelector('#seconds'),
  startStop = document.querySelector('#start-stop'),
  settings = document.querySelector('#settings');

let minutes = timerMin.innerHTML,
  seconds = timerSec.innerHTML,
  progress = null,
  progressStart = 0,
  progressEnd = parseInt(minutes) * 60 + parseInt(seconds),
  speed = 1000,
  degTravel = 360 / progressEnd,
  toggleSettings = false,
  secRem = 0,
  minRem = 0;

function progressTrack() {
  progressStart++;

  secRem = Math.floor((progressEnd - progressStart) % 60);
  minRem = Math.floor((progressEnd - progressStart) / 60);

  timerSec.innerHTML = secRem.toString().length == 2 ? secRem : `0${secRem}`;
  timerMin.innerHTML = minRem.toString().length == 2 ? minRem : `0${minRem}`;

  progressBar.style.background = `conic-gradient(
      #9d0000 ${progressStart * degTravel}deg, 
      #17171a ${progressStart * degTravel}deg
      )`;

  if (progressStart == progressEnd) {
    progressBar.style.background = `conic-gradient(
      #00aa51 360deg, 
      #00aa51 360deg
      )`;
    clearInterval(progress);
    startStop.innerHTML = START;
    progress = null;
    progressStart = 0;
  }
}

function startStopProgress() {
  if (!progress) {
    progress = setInterval(progressTrack, speed);
  } else {
    clearInterval(progress);
    progress = null;
    progressStart = 0;
    progressBar.style.background = `conic-gradient(
      #17171a 360deg, 
      #17171a 360deg
      )`;
  }
}

function resetValues() {
  if (progress) {
    clearInterval(progress);
  }

  minutes = timerMin.innerHTML;
  seconds = timerSec.innerHTML;
  toggleSettings = false;
  timerMin.contentEditable = false;
  timerMin.style.borderBottom = 'none';
  timerSec.contentEditable = false;
  timerSec.style.borderBottom = 'none';
  progress = null;
  progressStart = 0;
  progressEnd = parseInt(minutes) * 60 + parseInt(seconds);
  degTravel = 360 / progressEnd;
  progressBar.style.background = `conic-gradient(
      #17171a 360deg, 
      #17171a 360deg
      )`;
}

startStop.onclick = function () {
  if (startStop.innerHTML === START) {
    if (!(parseInt(minutes) === 0 && parseInt(seconds) === 0)) {
      startStop.innerHTML = STOP;
      startStopProgress();
    } else {
      alert('Enter the time value in your Timer!');
    }
  } else {
    startStop.innerHTML = START;
    startStopProgress();
  }
};

settings.onclick = function () {
  if (!toggleSettings) {
    toggleSettings = true;
    timerMin.contentEditable = true;
    timerMin.style.borderBottom = `1px dashed #ffffff50`;
    timerSec.contentEditable = true;
    timerSec.style.borderBottom = `1px dashed #ffffff50`;
  } else {
    resetValues();
  }
};

timerMin.onblur = function () {
  resetValues();
};

timerSec.onblur = function () {
  resetValues();
};
