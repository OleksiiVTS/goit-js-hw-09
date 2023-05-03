import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const dateToday = new Date();
let timer = null;
let timerId = null;
let selectedDateSecond = null;
const buttonStart = document.querySelector('button[data-start]');
buttonStart.addEventListener('click', startTimer);
buttonStart.setAttribute('disabled', 'disabled');

let {spanDays, spanHours, spanMin, spanSec} = {
    spanDays: document.querySelector('span[data-days]'),
    spanHours: document.querySelector('span[data-hours]'),
    spanMin: document.querySelector('span[data-minutes]'),
    spanSec: document.querySelector('span[data-seconds]'),
};

const options = {
    enableTime: true,
    time_24hr: true,
    dateFormat: "Y-m-d H:i",
    defaultDate: new Date(),
    minuteIncrement: 1,
    onOpen() {
        clearInterval(timerId)
        timer = null;
        timerId = null;
        addItem(0);
    },
    onClose(selectedDates) {
        selectedDateSecond = selectedDates[0].getTime()
        checkDate(selectedDateSecond);
    },
};

flatpickr("#datetime-picker", options);

function checkDate(selectedDateSecond){
    if (dateToday - selectedDateSecond < 0 ) { 
        buttonStart.removeAttribute('disabled', 'disabled');
    } 
    else {
        Notify.failure('Please choose a date in the future');
        buttonStart.setAttribute('disabled', 'disabled');
    };
};

function startTimer(){
    if (timer) {
        Notify.warning('The timer has already started!');
        return
    }
    timerId = setInterval(() => {
        const dateNaw = new Date();
        timer = selectedDateSecond - dateNaw;
        if (timer < 0) {
            Notify.success('Timer is completed!');
            clearInterval(timerId);
            return
        }
        addItem(timer);
    }, 1000);  
};

function  addItem(timer) {
    const { days, hours, minutes, seconds } = convertMs(timer);
    spanDays.textContent = days;
    spanHours.textContent = hours;
    spanMin.textContent = minutes;
    spanSec.textContent = seconds;
};

function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    // Remaining days
    const days = addLeadingZero(Math.floor(ms / day));
    // Remaining hours
    const hours = addLeadingZero(Math.floor((ms % day) / hour));
    // Remaining minutes
    const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
    // Remaining seconds
    const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

    return { days, hours, minutes, seconds };
};

function addLeadingZero(value){
    return String(value).padStart(2, '0');
};

// console.dir(spanSec)