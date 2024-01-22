import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const inputDate = document.getElementById('datetime-picker');
const btn = document.querySelector('[data-start]');
const btnStop = document.querySelector('[data-stop]');
const days = document.querySelector('[data-days]');
const hours = document.querySelector('[data-hours]');
const minutes = document.querySelector('[data-minutes]');
const seconds = document.querySelector('[data-seconds]');
let userSelectedDate = {};
//disable button
btn.disabled = true;

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

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < new Date()) {
      /* alert('Please choose a date in the future'); */
      iziToast.show({
        theme: 'dark',
        class: 'popup-window',
        timeout: 8000,
        messageColor: '#fff',
        iconUrl: '../img/octagon.svg',
        message: 'Please choose a date in the future',
        position: 'topRight', // bottomRight, bottomLeft, topLeft, topCenter, bottomCenter
    });
      btn.disabled = true;
    } else {
      userSelectedDate = selectedDates[0];
      btn.disabled = false;
    }
  },
};
flatpickr('#datetime-picker', options);
btn.addEventListener('click', () => {
  inputDate.disabled = true;
  const currentTime = new Date().getTime();
  let msToCount = userSelectedDate.getTime() - currentTime;
  const IntervalId = setInterval(function () {
    msToCount -= 1000;
    const timerObj = convertMs(msToCount);
    console.log(timerObj.days.toString().padStart(2, '0'));
    days.textContent = timerObj.days.toString().padStart(2, '0');
    hours.textContent = timerObj.hours.toString().padStart(2, '0');
    minutes.textContent = timerObj.minutes.toString().padStart(2, '0');
    seconds.textContent = timerObj.seconds.toString().padStart(2, '0');
    console.log(msToCount);
    if (msToCount <= 1000) {
      clearInterval(IntervalId);
    }
  }, 1000);
});

iziToast.settings({
    maxWidth: 302,
    timeout: 10000,
    resetOnHover: true,
    icon: 'octagon',
    position: topRight,
    transitionIn: 'flipInX',
    transitionOut: 'flipOutX',
});
