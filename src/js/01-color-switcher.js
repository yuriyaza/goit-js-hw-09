const startButtonEl = document.querySelector('[data-start]');
const stopButtonEl = document.querySelector('[data-stop]');
const bodyEl = document.body;

startButtonEl.addEventListener('click', onStartClick);
stopButtonEl.addEventListener('click', onStopClick);

const INTERVAL = 1000;
let intervalID = null;
inProgress(false);

function onStartClick() {
  intervalID = setInterval(() => {
    bodyEl.style.backgroundColor = getRandomHexColor();
  }, INTERVAL);
  inProgress(true);
}

function onStopClick() {
  clearInterval(intervalID);
  bodyEl.style = false;
  inProgress(false);
}

function inProgress(status) {
  startButtonEl.disabled = status;
  stopButtonEl.disabled = !status;
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
