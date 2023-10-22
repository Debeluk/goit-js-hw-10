import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix';

const data = {
  input: document.querySelector('input#datetime-picker'),
  btn: document.querySelector('[data-start]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

let selectedDate = null;
let intervalId = null;
data.btn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0].getTime() < Date.now()) {
      return Notify.failure('Please choose a date in the future');
    } else {
      Notify.success('The selected date is valid!');
      selectedDate = selectedDates[0].getTime();
      return (data.btn.disabled = false);
    }
  },
};

flatpickr(data.input, options);

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
};

data.btn.addEventListener('click', function () {
  data.btn.disabled = true;
  intervalId = setInterval(() => {
    const countdown = selectedDate - Date.now();
    const { days, hours, minutes, seconds } = convertMs(countdown);

    if (countdown <= 0) {
      clearInterval(intervalId);
      Notify.success('Countdown ended!')
      return;
    }

    updateTimer({ days, hours, minutes, seconds });
  }, 1000);
});

function convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    const days = addLeadingZero(Math.floor(ms / day));
    const hours = addLeadingZero(Math.floor((ms % day) / hour));
    const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
    const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));
  
    return { days, hours, minutes, seconds };
};

function updateTimer({days, hours, minutes, seconds}) {
    data.days.textContent = `${days}`;
    data.hours.textContent = `${hours}`;
    data.minutes.textContent = `${minutes}`;
    data.seconds.textContent = `${seconds}`;
};