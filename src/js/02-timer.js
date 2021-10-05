import 'flatpickr/dist/flatpickr.min.css';
import flatpickr from 'flatpickr';

const dateSelectorEl = document.querySelector('#date-selector');
const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');

const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');

let selectedDate = null;
let currentDate = null;
let intervalId = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectedDate = selectedDates[0];
    currentDate = new Date();
    if (selectedDate < currentDate) {
      alert('Please choose a date in the future!');
      return;
    }
    startBtn.disabled = false;
  },
};

flatpickr(dateSelectorEl, options);

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

const addLeadingZero = function (value) {
  if (value.length < 2) {
    return value.padStart(2, '0');
  }
  return value;
};

const startCount = function () {
  let difference = selectedDate - currentDate;

  intervalId = setInterval(() => {
    if (difference <= 0) {
      stopCount();
    } else {
      let timeObj = convertMs(difference);
      daysEl.textContent = addLeadingZero(timeObj.days.toString());
      hoursEl.textContent = addLeadingZero(timeObj.hours.toString());
      minutesEl.textContent = addLeadingZero(timeObj.minutes.toString());
      secondsEl.textContent = addLeadingZero(timeObj.seconds.toString());
      difference -= 1000;
    }
  }, 1000);
};

const stopCount = function () {
  clearInterval(intervalId);
};
startBtn.addEventListener('click', startCount);
stopBtn.addEventListener('click', stopCount);
