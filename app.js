const bells = new Audio('./sounds/bell.wav'); 
const startBtn = document.querySelector('.btn-start'); 
const session = document.querySelector('.minutes'); 
const secondDiv = document.querySelector('.seconds');

// Create and insert reset button next to start button
const resetBtn = document.createElement('button');
resetBtn.textContent = 'Reset';
resetBtn.className = 'btn-reset';
startBtn.parentNode.insertBefore(resetBtn, startBtn.nextSibling);

// Create and insert pause button next to reset button
const pauseBtn = document.createElement('button');
pauseBtn.textContent = 'Pause';
pauseBtn.className = 'btn-pause';
resetBtn.parentNode.insertBefore(pauseBtn, resetBtn.nextSibling);

let myInterval; 
let state = true;
let paused = false;
let totalSeconds;
let initialSession = Number.parseInt(session.textContent);

const appTimer = () => {
  if(state) {
    state = false;
    paused = false;
    totalSeconds = Number.parseInt(session.textContent) * 60;

    const updateSeconds = () => {
      if (paused) return;
      const minuteDiv = document.querySelector('.minutes');
      const secondDiv = document.querySelector('.seconds');

      totalSeconds--;

      let minutesLeft = Math.floor(totalSeconds/60);
      let secondsLeft = totalSeconds % 60;

      if(secondsLeft < 10) {
        secondDiv.textContent = '0' + secondsLeft;
      } else {
        secondDiv.textContent = secondsLeft;
      }
      minuteDiv.textContent = `${minutesLeft}`;

      if(minutesLeft === 0 && secondsLeft === 0) {
        bells.play();
        clearInterval(myInterval);
        state = true;
      }
    };

    myInterval = setInterval(updateSeconds, 1000);
  } else {
    alert('Session has already started.');
  }
};

const resetTimer = () => {
  clearInterval(myInterval);
  state = true;
  paused = false;
  session.textContent = initialSession;
  secondDiv.textContent = '00';
};

const pauseTimer = () => {
  paused = !paused;
  pauseBtn.textContent = paused ? 'Resume' : 'Pause';
};

startBtn.addEventListener('click', appTimer);
resetBtn.addEventListener('click', resetTimer);
pauseBtn.addEventListener('click', pauseTimer);

