function timeToString(time) {
  let diffInHrs = time / 3600000;
  let hh = Math.floor(diffInHrs);

  let diffInMin = (diffInHrs - hh) * 60;
  let mm = Math.floor(diffInMin);

  let diffInSec = (diffInMin - mm) * 60;
  let ss = Math.floor(diffInSec);

  let formattedMM = mm.toString().padStart(2, "0");
  let formattedSS = ss.toString().padStart(2, "0");

  return `${formattedMM}:${formattedSS}`;
}

let startTime;
let elapsedTime = 0;
let timerInterval;

function start() {
  startTime = Date.now() - elapsedTime;
  timerInterval = setInterval(function printTime() {
    elapsedTime = Date.now() - startTime;
    if(elapsedTime > 15000) {
      pause();
    }
    console.log(elapsedTime, 'ini elapsed');
  }, 1000);
}

function pause() {
  clearInterval(timerInterval);
}


function print(txt) {
  console.log(txt);
}

start();
