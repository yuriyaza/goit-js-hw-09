const startButtonEl = document.querySelector('[data-start]');
const stopButtonEl = document.querySelector('[data-stop]');
const bodyEl = document.body;

const INTERVAL = 1000;
let intervalID = null;

startButtonEl.addEventListener('click', onStartClick);
stopButtonEl.addEventListener('click', onStopClick);

function onStartClick() {
  intervalID = setInterval(() => {
    bodyEl.style.backgroundColor = getRandomHexColor();
  }, INTERVAL);
  startButtonEl.disabled = true;
}

function onStopClick() {
  clearInterval(intervalID);
  bodyEl.style = false;
  startButtonEl.disabled = false;
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
