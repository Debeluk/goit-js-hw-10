import Notiflix from 'notiflix';

const form = document.querySelector('.form');

form.addEventListener('submit', event => {
  event.preventDefault();

  const { delay, step, amount } = event.target.elements;

  for (let i = 0; i < amount.value; i++) {
    const currentDelay = Number(delay.value) + Number(step.value) * i;

    createPromise(i, currentDelay)
      .then(({ position, delay }) =>
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        )
      )
      .catch(({ position, delay }) =>
        Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`)
      );
  }
});

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(
      () =>
        shouldResolve
          ? resolve({ position, delay })
          : reject({ position, delay }),
      delay
    );
  });
};
