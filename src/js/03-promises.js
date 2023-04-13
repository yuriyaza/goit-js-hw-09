import { Notify } from 'notiflix/build/notiflix-notify-aio';

const parametersForm = document.querySelector('.form');
const submitButton = document.querySelector('.form button');

parametersForm.addEventListener('submit', onFormSubmit);

function onFormSubmit(event) {
  event.preventDefault();
  submitButton.disabled = true;

  const { delay, step, amount } = parametersForm.elements;
  let promiseDelay = Number(delay.value);
  const promiseStep = Number(step.value);
  const promiseAmount = Number(amount.value);

  for (let i = 1; i <= promiseAmount; i++) {
    createPromise(i, promiseDelay)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    promiseDelay += promiseStep;
  }

  setTimeout(() => {
    submitButton.disabled = false;
  }, promiseDelay);
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  const promiseObject = { position, delay };

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve(promiseObject);
      } else {
        reject(promiseObject);
      }
    }, delay);
  });
}
