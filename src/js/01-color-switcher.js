const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
let timerId = null;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const changeOnClick = function () {
  timerId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
  startBtn.disabled = true;
};

const stopOnClick = function () {
  clearInterval(timerId);
  startBtn.disabled = false;
};

startBtn.addEventListener('click', changeOnClick);
stopBtn.addEventListener('click', stopOnClick);
