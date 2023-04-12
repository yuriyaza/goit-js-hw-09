import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const INTERVAL = 1000;
let selectedDate = null;

const dateTimeInputEl = document.querySelector('input#datetime-picker');
const startButtonEl = document.querySelector('[data-start]');
startButtonEl.addEventListener('click', startTimer);

const outputEl = {
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

const flatpickrOptions = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  dateFormat: 'd M Y, H:i',
  onChange(selectedDates) {
    selectedDate = selectedDates[0];
    const checkResult = dateCheck(selectedDate);
    startButtonEl.disabled = checkResult ? false : true;
  },
  onClose(selectedDates) {
    const checkResult = dateCheck(selectedDate);
    if (checkResult) {
      const selectedDateRaw = selectedDate.getTime();
      const currentDateRaw = Date.now();
      displayInterval(selectedDateRaw - currentDateRaw);
    } else {
      Notify.failure('Please choose a date in the future');
      displayInterval(0);
    }
  },
};

flatpickr(dateTimeInputEl, flatpickrOptions);
startButtonEl.disabled = true;
Notify.init({ position: 'center-top' });

function dateCheck(selectedDate) {
  const selectedDateRaw = selectedDate.getTime();
  const currentDateRaw = Date.now();
  return selectedDateRaw > currentDateRaw ? true : false;
}

function displayInterval(interval) {
  const dateTimeObj = convertMs(interval);
  for (const element in dateTimeObj) {
    const padValue = addLeadingZero(dateTimeObj[element]);
    outputEl[element].textContent = padValue;
  }
}

function startTimer() {
  startButtonEl.disabled = true;
  timer = setInterval(() => {
    const currentDateRaw = Date.now();
    const selectedDateRaw = selectedDate.getTime();

    if (selectedDateRaw - currentDateRaw <= 0) {
      clearInterval(timer);
      return;
    }

    displayInterval(selectedDateRaw - currentDateRaw);
  }, INTERVAL);
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
