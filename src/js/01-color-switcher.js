function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, '0')}`;
}

let timespan;

document.getElementById('startButton').addEventListener('click', function () {
  if (!timespan) {
    this.disabled = true;

    document.getElementById('stopButton').disabled = false;

    timespan = setInterval(function () {
      document.body.style.backgroundColor = getRandomHexColor();
    }, 1000);
  }
});

document.getElementById('stopButton').addEventListener('click', function () {
  clearInterval(timespan);

  document.getElementById('startButton').disabled = false;

  this.disabled = true;

  timespan = undefined;
});
