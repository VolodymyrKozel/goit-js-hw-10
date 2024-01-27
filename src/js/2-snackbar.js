import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const registerForm = document.querySelector('.form');
registerForm.addEventListener('submit', handleSubmit);
const options = {
  value: '',
  delay: 1000,
  shouldResolve: true,
};

iziToast.settings({
  theme: 'dark',
  icon: false,
  position: 'topRight',
  resetOnHover: true,
  transitionIn: 'flipInX',
  transitionOut: 'flipOutX',
});

function handleSubmit(e) {
  e.preventDefault();
  const form = e.target.elements;
  options.delay = form.delay.value;
  if (form.state.value === 'fulfilled') {
    options.shouldResolve = true;
    options.value = `Fulfilled promise in ${options.delay}ms`;
  } else  {
    options.shouldResolve = false;
    options.value = `Rejected promise in ${options.delay}ms`;
  }

  makePromise(options)
    .then(value =>
      iziToast.success({
        class: 'izi-toast-success-style',
        title: 'OK',
        message: value,
        backgroundColor: '#59A10D',
        iconUrl: '../img/ok.svg',
      })
    )
    .catch(error =>
      iziToast.error({
        class: 'izi-toast-error-style',
        title: 'Error',
        message: error,
        backgroundColor: '#EF4040',
        iconUrl: '../img/octagon.svg',
      })
    );
  form.reset();
}

const makePromise = ({ value, delay, shouldResolve }) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve(value);
      } else {
        reject(value);
      }
    }, delay);
  });
};
