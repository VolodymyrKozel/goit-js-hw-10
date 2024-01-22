
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

/* const inputDate = document.getElementById('datetime-picker'); */
const btn = document.querySelector('[data-start]');
const btnStop = document.querySelector('[data-stop]');
const days = document.querySelector('[data-days]');
const hours = document.querySelector('[data-hours]');
const minutes = document.querySelector('[data-minutes]');
const seconds = document.querySelector('[data-seconds]');
let userSelectedDate = {};

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
            alert("Please choose a date in the future");
            btn.disabled = true;
        } else {
            userSelectedDate = selectedDates[0]
            btn.disabled = false;
        }
        console.log(selectedDates[0]);
    },
};
console.log(options);
flatpickr('#datetime-picker', options);
btnStop.addEventListener('click', () => {
    clearInterval(IntervalId);
})
btn.addEventListener('click', () => {
    const currentTime = new Date().getTime();
    let msToCount = userSelectedDate.getTime() - currentTime;
    const IntervalId = setInterval(function () {
        msToCount -= 1000;
        const timerObj = convertMs(msToCount);
                days.textContent = timerObj.days;
                hours.textContent = timerObj.hours;
                minutes.textContent = timerObj.minutes;
                seconds.textContent = timerObj.seconds;
        if (msToCount < 0) {
            clearInterval(IntervalId);
        }
    }, 1000);
})

console.log(btn);