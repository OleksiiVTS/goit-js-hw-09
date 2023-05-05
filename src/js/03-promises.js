import { Notify } from 'notiflix/build/notiflix-notify-aio';

const form = document.querySelector('.form');
form.addEventListener("submit", beforeCreatePromise)

function beforeCreatePromise(event) {
  event.preventDefault()
  const {delay, step, amount} = getInputValue();
  for (let i = 0; i < amount; i+=1) {
    const time = delay + (i * step)
    setTimeout(() => createPromise(i+1, time), time)
  }
};

function getInputValue() {
  return dataForm = {
    delay: Number(form.elements.delay.value),
    step: Number(form.elements.step.value),
    amount: Number(form.elements.amount.value),
  };
};

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  obg = {position, delay};
  const promise = new Promise((resolve, reject) => {
      if (shouldResolve) {
        resolve(obg);
      } else {
        reject(obg);
      }
  });

  promise
  .then(({position, delay}) => {
    Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
  })
  .catch(({position, delay}) => {
    Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
  });

};

