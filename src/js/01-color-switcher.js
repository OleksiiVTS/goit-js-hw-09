
const buttonStart = document.querySelector('button[data-start]');
const buttonStop = document.querySelector('button[data-stop]');
buttonStart.addEventListener('click', startColorSwitcher);
buttonStop.addEventListener('click', stopColorSwitcher);
let timerId = null;

buttonStop.setAttribute('disabled', 'disabled');

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
  };

function startColorSwitcher(){
    if (timerId) {
       return 
    };
    timerId = setInterval(() => {
        document.body.style.backgroundColor = `${getRandomHexColor()}`
    }, 1000);
    buttonStart.setAttribute('disabled', 'disabled');
    buttonStop.removeAttribute('disabled', 'disabled');
};

function stopColorSwitcher(){
    buttonStart.removeAttribute('disabled', 'disabled');
    clearInterval(timerId);
    timerId = null;
    buttonStop.setAttribute('disabled', 'disabled');
};

