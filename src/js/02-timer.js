import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const startCounter = document.querySelector('[data-start]');
const counterInput = document.querySelector('#datetime-picker');
const daysCounter = document.querySelector('[data-days]');
const hoursCounter = document.querySelector('[data-hours]');
const minutesCounter = document.querySelector('[data-minutes]');
const secondsCounter = document.querySelector('[data-seconds]');

// ------------------- STYLES BEGIN -------------------

const labelSpan = document.querySelectorAll('.label');

[...labelSpan].forEach(element => {
  switch (element.textContent) {
    case 'Days':
      element.textContent = 'DAY';
      break;
    case 'Hours':
      element.textContent = 'HRS';
      break;
    case 'Minutes':
      element.textContent = 'MIN';
      break;
    case 'Seconds':
      element.textContent = 'SEC';
      break;
  }
});

const headTitle = document.head.querySelector('title');

headTitle.insertAdjacentHTML(
  'afterend',
  `<link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Poiret+One&display=swap"
      rel="stylesheet"
    />`
);

const timer = document.body.querySelector('.timer');

timer.insertAdjacentHTML(
  'beforebegin',
  `<div class="progress">
      <div class="circle"></div>
      <span class="percentage"></span>
    </div>
    <div class="end"></div>`
);

timer.insertAdjacentHTML('afterend', `<div class="overlay"></div>`);

document.body.style.cssText = `width: 100vw; height: 100vh; overflow: hidden; background-color: #212121;`;

document.styleSheets[0].insertRule(`@-webkit-keyframes circle-in-center {
  from {
    -webkit-clip-path: circle(125%);
    clip-path: circle(125%);
  }
  to {
    -webkit-clip-path: circle(0%);
    clip-path: circle(0%);
  }
}`);

document.styleSheets[0].insertRule(`@keyframes circle-in-center {
  from {
    -webkit-clip-path: circle(125%);
    clip-path: circle(125%);
  }
  to {
    -webkit-clip-path: circle(0%);
    clip-path: circle(0%);
  }
}`);

document.styleSheets[0].insertRule(`#datetime-picker {
  display: inline-block;
  min-width: 200px;
  height: 40px;
  margin-top: -5px;
  padding-left: 8px;
  vertical-align: middle;
  color: #212121;
  background-color: #fafafa;
  border: 2px solid #212121;
  font-size: 17px;
  font-weight: 500;
}`);

document.styleSheets[0].insertRule(`#datetime-picker:disabled {
  cursor: not-allowed;
  color: #cacaca;
}`);

document.styleSheets[0].insertRule(`button {
  display: inline-block;
  width: 100px;
  height: 40px;
  margin-left: 5px;
  color: #212121;
  background-color: #fafafa;
  border: 2px solid #212121;
  cursor: pointer;
  font-family: 'Bebas Neue', cursive;
  font-size: 22px;
  font-weight: 500;
}`);

document.styleSheets[0].insertRule(`button:hover,
button:focus {
  background-color: #569ff7;
}`);

document.styleSheets[0].insertRule(`button:disabled {
  cursor: not-allowed;
  color: #cacaca;
}`);

document.styleSheets[0].insertRule(`button:disabled:hover {
  background-color: #fafafa;
}`);

document.styleSheets[0].insertRule(`.progress {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  align-items: center;
  height: 350px;
  width: 350px;
  border-radius: 50%;
}`);

document.styleSheets[0].insertRule(`.percentage {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-family: 'Bebas Neue', cursive;
  font-size: 115px;
  color: #fafafa;
}`);

document.styleSheets[0].insertRule(`.circle {
  display: block;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  transform: rotate(-180deg);
  -webkit-mask-image: radial-gradient(
    circle at 50% 50%,
    transparent 60%,
    black 40%
  );
  mask-image: radial-gradient(circle at 50% 50%, transparent 60%, black 40%);
}`);

document.styleSheets[0].insertRule(`.end {
  position: absolute;
  bottom: 10vw;
  right: 2vw;
  color: #fafafaee;
  font-family: 'Bebas Neue', cursive;
  font-size: 2vw;
  transform: perspective(400px) rotatex(60deg) skew(15deg, 0);
}`);

document.styleSheets[0].insertRule(`.timer {
  position: absolute;
  bottom: 0;
  right: 0;
  display: flex;
  color: #fafafa;
}`);

document.styleSheets[0].insertRule(`.field {
  display: inherit;
  align-items: center;
}`);

document.styleSheets[0].insertRule(`.value {
  display: block;
  min-width: 13vw;
  min-height: 10vw;
  font-family: 'Poiret One', cursive;
  font-size: 7vw;
  font-weight: 700;
  text-align: end;
}`);

document.styleSheets[0].insertRule(`.label {
  display: block;
  text-align: center;
  width: 6vw;
  height: 5vw;
  transform: rotate(90deg);
  font-family: 'Bebas Neue', cursive;
  font-size: 5vw;
}`);

document.styleSheets[0].insertRule(`.overlay {
  pointer-events: none;
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: -1;
  background-color: #fafafa;
}`);

document.styleSheets[0].insertRule(`.obscure {
  -webkit-animation: 500ms ease-out circle-in-center both;
  animation: 500ms ease-out circle-in-center both;
}`);

// -------------------- STYLES END --------------------

const progressCircle = document.querySelector('.circle');
const progressPercent = document.querySelector('.percentage');
const endDiv = document.querySelector('.end');
const overlay = document.querySelector('.overlay');

let currentDate = null;
let setDate = null;
let progressDate = null;

let timerId1 = null;
let timerId2 = null;

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  if (value < 10) {
    return value.toString().padStart(2, '0');
  } else {
    return value;
  }
}

function populateEnd() {
  endDiv.textContent = `Time until ${setDate.getDate()}.${
    setDate.getMonth() + 1
  }.${setDate.getFullYear()} ${setDate.getHours()}:${setDate.getMinutes()}`;
}

const progressBar = () => {
  let nowDate = new Date();
  let hundredPercent = setDate.getTime() - progressDate.getTime();
  let currentProgress = setDate.getTime() - nowDate.getTime();
  let percentCoeficient = (hundredPercent - currentProgress) / hundredPercent;
  if (percentCoeficient > 1) {
    percentCoeficient = 1;
  }
  let progressDegrees = Math.round(360 * percentCoeficient);
  let progressNumber = Math.round(percentCoeficient * 100);
  progressCircle.style.background = `conic-gradient(#fafafa 0deg ${progressDegrees}deg, transparent ${progressDegrees}deg 360deg)`;
  progressPercent.textContent = `${progressNumber}%`;
};

const countDown = () => {
  currentDate = new Date();
  let remainingTime = setDate.getTime() - currentDate.getTime();
  if (remainingTime >= 0) {
    remainingTime = convertMs(remainingTime);
    let { days, hours, minutes, seconds } = remainingTime;
    daysCounter.textContent = addLeadingZero(days);
    hoursCounter.textContent = addLeadingZero(hours);
    minutesCounter.textContent = addLeadingZero(minutes);
    secondsCounter.textContent = addLeadingZero(seconds);
  } else {
    progressCircle.style.background = `conic-gradient(#fafafa 0deg 360deg, transparent 360deg 360deg)`;
    progressPercent.textContent = `100%`;
    document.body.style.backgroundColor = 'rgb(50, 198, 130)';
    startCounter.style.border = '2px solid rgb(50, 198, 130)';
    counterInput.style.border = '2px solid rgb(50, 198, 130)';
    Notiflix.Notify.success('The countdown has completed!');
    clearInterval(timerId1);
    clearInterval(timerId2);
  }
};

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    currentDate = new Date();
    setDate = selectedDates[0];
    if (setDate.getTime() - currentDate.getTime() > 0) {
      startCounter.disabled = false;
    } else {
      Notiflix.Notify.failure('Please choose a date in the future!');
    }
  },
};

flatpickr('#datetime-picker', options);

startCounter.disabled = true;

startCounter.addEventListener('click', () => {
  progressDate = new Date();
  overlay.classList.add('obscure');
  populateEnd();
  timerId1 = setInterval(countDown, 1000);
  timerId2 = setInterval(progressBar, 100);
  startCounter.disabled = true;
  counterInput.disabled = true;
});
