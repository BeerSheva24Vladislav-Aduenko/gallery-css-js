const startBtn = document.querySelector('.button-start');
const stopBtn = document.querySelector('.button-stop');
const rotatingWrapper = document.querySelector('.rotating-wrapper');

startBtn.addEventListener('click', () => {
  rotatingWrapper.classList.add('rotate');
});

stopBtn.addEventListener('click', () => {
  rotatingWrapper.classList.remove('rotate');
});