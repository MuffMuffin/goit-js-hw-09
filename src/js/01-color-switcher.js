function getRandomHexColor() {
  let color = '';
  do {
    color = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  } while (color.length < 7);
  return color;
}

function getRandomGradient() {
  return (
    'linear-gradient(' +
    Math.random() * 360 +
    'deg, ' +
    getRandomHexColor() +
    ' 0%, ' +
    getRandomHexColor() +
    ' 100%)'
  );
}

const bodyArea = document.body;
bodyArea.insertAdjacentHTML('afterbegin', `<div class="fader"></div>`);
const fader = document.querySelector('.fader');
const startButton = document.querySelector('[data-start]');
const stopButton = document.querySelector('[data-stop]');
stopButton.disabled = true;

// ---------- STYLES START ----------
bodyArea.style.height = '100vh';
bodyArea.style.width = '100vw';

document.styleSheets[0].insertRule(
  `button {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100px;
  height: 50px;
  transform: translate(-50%, -50%);
  border: none;
  border-radius: 6px;
  font-size: 20px;
  font-weight: 800;
  cursor: pointer;
  mix-blend-mode: difference;
}`
);

document.styleSheets[0].insertRule(`button:disabled {
  display: none;
}`);

document.styleSheets[0].insertRule(`.fader {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: -1;
  opacity: 0;
  pointer-events: none;
  transition: opacity 500ms cubic-bezier(0.4, 0, 0.2, 1);
}`);

document.styleSheets[0].insertRule(`.fader.fadein {
  opacity: 1;
}`);

// ----------- STYLES END -----------

const colorChanger = () => {
  bodyArea.style.background = getRandomGradient();
  fader.style.background = getRandomGradient();
  if (fader.classList.contains('fadein')) {
    fader.classList.remove('fadein');
  } else {
    fader.classList.add('fadein');
  }
};
let timerId = null;

bodyArea.addEventListener('click', event => {
  if (event.target.dataset.start === '' && !event.target.disabled) {
    timerId = setInterval(colorChanger, 1000);
    event.target.disabled = true;
    stopButton.disabled = false;
  }
  if (event.target.dataset.stop === '' && !event.target.disabled) {
    clearInterval(timerId);
    event.target.disabled = true;
    startButton.disabled = false;
  }
});
