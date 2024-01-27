import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const inputDate = document.getElementById('datetime-picker');
const btn = document.querySelector('[data-start]');
const days = document.querySelector('[data-days]');
const hours = document.querySelector('[data-hours]');
const minutes = document.querySelector('[data-minutes]');
const seconds = document.querySelector('[data-seconds]');
let userSelectedDate = {};
//disable button
btn.disabled = true;

iziToast.settings({
  theme: 'dark',
  class: 'popup-window',
  timeout: 8000,
  messageColor: '#fff',
  iconUrl: './img/octagon.svg',
  resetOnHover: true,
  position: 'topRight',
  transitionIn: 'flipInX',
  transitionOut: 'flipOutX',
});

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < new Date()) {
      iziToast.show({
        message: 'Please choose a date in the future',
      });
      btn.disabled = true;
    } else {
      userSelectedDate = selectedDates[0];
      btn.disabled = false;
    }
  },
};
flatpickr('#datetime-picker', options);

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

btn.addEventListener('click', () => {
  inputDate.disabled = true;
  btn.disabled = true;
  const currentTime = new Date().getTime();
  let msToCount = userSelectedDate.getTime() - currentTime;
  const IntervalId = setInterval(function () {
    const timerObj = convertMs(msToCount);
    days.textContent = timerObj.days.toString().padStart(2, '0');
    hours.textContent = timerObj.hours.toString().padStart(2, '0');
    minutes.textContent = timerObj.minutes.toString().padStart(2, '0');
    seconds.textContent = timerObj.seconds.toString().padStart(2, '0');
    msToCount -= 1000;
    if (msToCount <= 1000) {
      clearInterval(IntervalId);
      iziToast.show({
        message: 'Time up',
      });
    }
  }, 1000);
});
