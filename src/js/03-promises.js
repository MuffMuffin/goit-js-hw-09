import Notiflix from 'notiflix';

const formArea = document.querySelector('.form');
const inputFields = document.querySelectorAll('input');
const submitButton = document.querySelector('button[type="submit"]');

// ------------------- STYLES BEGIN -------------------

// POPULATING HTML:

const headTitle = document.head.querySelector('title');

headTitle.insertAdjacentHTML(
  'afterend',
  `<link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=VT323&display=swap"
      rel="stylesheet"
    />
    <link
      rel="preload"
      href="https://upload.wikimedia.org/wikipedia/commons/8/8a/10x10_checkered_board_transparent.svg"
      as="image"
      type="image/svg+xml"
      crossorigin
    />`
);

const label = document.querySelectorAll('label');

[...label].forEach(element => {
  element.insertAdjacentHTML(
    'beforeend',
    `<div class="input-background"></div>`
  );
});

label[label.length - 1].insertAdjacentHTML(
  'afterend',
  `<div class="progress">
        <div class="generator"></div>
        <div class="spiner"></div>
      </div>`
);

formArea.insertAdjacentHTML('afterend', `<div class="fancy"></div>`);

// POPULATING STYLES:

document.body.style.cssText = `overflow: hidden; width: 100vw; height: 100vh; background: radial-gradient(transparent, #e9e9e9);`;

document.styleSheets[0].insertRule(`@-webkit-keyframes anim-gradient {
  0% {
    background-position: -50% -50%;
  }
  25% {
    background-position: 75% 200%;
  }
  50% {
    background-position: 200% -50%;
  }
  75% {
    background-position: 75% -200%;
  }
  100% {
    background-position: -50% -50%;
  }
}`);

document.styleSheets[0].insertRule(`@keyframes anim-gradient {
  0% {
    background-position: -50% -50%;
  }
  25% {
    background-position: 75% 200%;
  }
  50% {
    background-position: 200% -50%;
  }
  75% {
    background-position: 75% -200%;
  }
  100% {
    background-position: -50% -50%;
  }
}`);

document.styleSheets[0].insertRule(`.fancy {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 200%;
  height: 200%;
  transform: translate(-50%, -50%) rotate(-45deg);
  overflow: hidden;
  z-index: -1;
  background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' height='19px' width='330px'><text x='0' y='15' fill='%23eeeeee' font-size='20' style='font-family:Arial, sans-serif'>Sorry mate, no fancy styling this time.</text></svg>");
  background-size: 200%;
  -webkit-filter: blur(1px);
  filter: blur(1px);
  -webkit-animation: anim-gradient 180s linear infinite;
  animation: anim-gradient 180s linear infinite;
}`);

document.styleSheets[0].insertRule(`.form {
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  height: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px;
  background-color: #00f;
  box-shadow: 0 0 0 3px #0ff, 0 0 0 5px #00f, 0 0 0 8px #0ff, 0 0 0 12px #00f,
    15px 15px 0px 10px #00000099;
  color: #0ff;
  font-family: 'VT323', monospace;
  font-size: 20px;
  -webkit-font-smoothing: none;
}`);

document.styleSheets[0].insertRule(`.form::before {
  content: 'PROMISE GENERATOR';
  position: absolute;
  top: 0%;
  left: 50%;
  height: 15px;
  transform: translate(-50%, -11px);
  background-color: #0ff;
  color: #00f;
  padding: 1px 5px 0px 5px;
  vertical-align: text-top;
  line-height: 12px;
}`);

document.styleSheets[0].insertRule(`label {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-top: 10px;
}`);

document.styleSheets[0].insertRule(`label:first-of-type {
  margin-top: 100px;
}`);

document.styleSheets[0].insertRule(`.input-background {
  pointer-events: none;
  position: absolute;
  right: 30px;
  display: block;
  width: 180px;
  height: 22px;
  background-color: #00ffff96;
  -webkit-mask-image: url(https://upload.wikimedia.org/wikipedia/commons/8/8a/10x10_checkered_board_transparent.svg);
  mask-image: url(https://upload.wikimedia.org/wikipedia/commons/8/8a/10x10_checkered_board_transparent.svg);
  -webkit-mask-size: 12%;
  mask-size: 12%;
  -webkit-mask-repeat: repeat;
  mask-repeat: repeat;
}`);

document.styleSheets[0].insertRule(`.focused {
  -webkit-mask-image: none !important;
  mask-image: none !important;
}`);

document.styleSheets[0].insertRule(`input[type='number'] {
  z-index: 1;
  width: 180px;
  height: 22px;
  padding: 0 5px 0;
  font-family: inherit;
  font-size: inherit;
  outline: none;
  caret-color: #f00;
  border: solid 2px transparent;
  background-color: transparent;
  color: #fff;
  -moz-appearance: textfield;
}`);

document.styleSheets[0]
  .insertRule(`input[type='number']::-webkit-outer-spin-button,
input[type='number']::-webkit-inner-spin-button {
  -webkit-appearance: none;
}`);

document.styleSheets[0].insertRule(`input[type='number']:focus {
  border: dotted 2px #00ffff96;
}`);

document.styleSheets[0].insertRule(`.progress {
  position: absolute;
  top: 280px;
  left: 50%;
  width: 135px;
  height: 30px;
  transform: translate(-50%, 0);
  display: flex;
  align-items: center;
  justify-content: space-between;
}`);

document.styleSheets[0].insertRule(`.generator {
  width: 105px;
}`);

document.styleSheets[0].insertRule(`.spiner {
  width: 25px;
  text-align: center;
}`);

document.styleSheets[0].insertRule(`.done {
  width: 100%;
  text-align: center;
}`);

document.styleSheets[0].insertRule(`button[type='submit'] {
  cursor: pointer;
  display: block;
  width: 150px;
  height: 50px;
  background-color: #fff;
  border: none;
  outline: none;
  box-shadow: 5px 5px 0px 0px #00000099;
  font-family: inherit;
  font-size: inherit;
  text-transform: uppercase;
  text-align: center;
  margin-top: 120px;
}`);

document.styleSheets[0].insertRule(`button[type='submit']:focus,
button[type='submit']:hover {
  background-color: #ff0;
}`);

document.styleSheets[0].insertRule(`button[type='submit']:active {
  background-color: #ff0;
  box-shadow: none;
  transform: translate(5px, 5px);
}`);

document.styleSheets[0].insertRule(`button[type='submit']:disabled {
  cursor: not-allowed;
  background-color: silver;
  color: gray;
}`);

document.styleSheets[0]
  .insertRule(`button[type='submit']:disabled:focus, button[type='submit']:disabled:hover {
  background-color: silver;
}`);

document.styleSheets[0].insertRule(`button[type='submit']:disabled:active {
  transform: none;
  box-shadow: 5px 5px 0px 0px #00000099;
}
`);

// ADDING ANIMATIONS:

[...inputFields].forEach(element => {
  element.addEventListener('focus', event => {
    event.target.nextElementSibling.classList.add('focused');
  });
  element.addEventListener('blur', event => {
    event.target.nextElementSibling.classList.remove('focused');
  });
});

const progressBar = {
  progress: document.querySelector('.progress'),
  generator: document.querySelector('.generator'),
  spiner: document.querySelector('.spiner'),
  generatorTimer: null,
  spinerTimer: null,
  genStepVar: 1,
  spinStepVar: 1,

  start() {
    this.generatorTimer = setInterval(() => {
      switch (this.genStepVar) {
        case 1:
          this.generator.textContent = 'Generating';
          this.genStepVar += 1;
          break;
        case 2:
          this.generator.textContent = 'Generating.';
          this.genStepVar += 1;
          break;
        case 3:
          this.generator.textContent = 'Generating..';
          this.genStepVar += 1;
          break;
        case 4:
          this.generator.textContent = 'Generating...';
          this.genStepVar = 1;
          break;
      }
    }, 500);
    this.spinerTimer = setInterval(() => {
      switch (this.spinStepVar) {
        case 1:
          this.spiner.textContent = '╱';
          this.spinStepVar += 1;
          break;
        case 2:
          this.spiner.textContent = '──';
          this.spinStepVar += 1;
          break;
        case 3:
          this.spiner.textContent = '╲';
          this.spinStepVar += 1;
          break;
        case 4:
          this.spiner.textContent = '│';
          this.spinStepVar = 1;
          break;
      }
    }, 200);
  },

  done() {
    clearInterval(this.generatorTimer);
    clearInterval(this.spinerTimer);
    this.progress.innerHTML = `<div class="done">Done!</div>`;
    setTimeout(() => {
      this.progress.innerHTML = `<div class="generator"></div>
        <div class="spiner"></div>`;
    }, 2000);
  },
};

// -------------------- STYLES END --------------------

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  if (shouldResolve) {
    // Fulfill
  } else {
    // Reject
  }
}

formArea.addEventListener('submit', event => {
  event.preventDefault();
  progressBar.start();
  submitButton.disabled = true;
  [...inputFields].forEach(element => {
    element.disabled = true;
  });
  console.log(event);
});
