const username = document.querySelector('.username');
const email = document.querySelector('.email');
const password = document.querySelector('.password');
const passwordConfirm = document.querySelector('.passwordConfirm');

const faUser = document.querySelector('.fa-user');
const faEmail = document.querySelector('.fa-envelope');
const faPassword = document.querySelector('.fa-lock');
const faPasswordConfirm = document.querySelector('.fa-unlock');
const faEyes = document.querySelectorAll('.fa-eye');

username.addEventListener('input', () => {
  const regex = /[^a-zA-Z0-9]/;

  if (username.value.length === 0) {
    faUser.classList.remove('invalid', 'valid');
  } else if (regex.test(username.value)) {
    faUser.classList.add('invalid');
    faUser.classList.remove('valid');
  }
    else {
    faUser.classList.add('valid');
    faUser.classList.remove('invalid');
  }

})

email.addEventListener('input', () => {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (email.value.length === 0) {
    faEmail.classList.remove('valid', 'invalid');
  } else if (regex.test(email.value)) {
    faEmail.classList.add('valid');
    faEmail.classList.remove('invalid');
  } else {
    faEmail.classList.add('invalid');
    faEmail.classList.remove('valid');
  }
})

password.addEventListener('input', () => {
  if (password.value.length === 0) {
    faPassword.classList.remove('valid', 'invalid');
  } else if (password.value.length > 5) {
    faPassword.classList.add('valid');
    faPassword.classList.remove('invalid');
  } else {
    faPassword.classList.add('invalid');
    faPassword.classList.remove('valid');
  };
  if (passwordConfirm.value.length === 0) {
    faPasswordConfirm.classList.remove('valid', 'invalid')
  } else if (password.value !== passwordConfirm.value || passwordConfirm.value.length < 6) {
    faPasswordConfirm.classList.add('invalid');
    faPasswordConfirm.classList.remove('valid');
  } else {
    faPasswordConfirm.classList.add('valid');
    faPasswordConfirm.classList.remove('invalid');
  }
})

passwordConfirm.addEventListener('input', () => {
  if (passwordConfirm.value.length === 0) {
    faPasswordConfirm.classList.remove('valid', 'invalid')
  } else if (passwordConfirm.value !== password.value || passwordConfirm.value.length < 6 ) {
    faPasswordConfirm.classList.add('invalid');
    faPasswordConfirm.classList.remove('valid');
  } else {
    faPasswordConfirm.classList.add('valid');
    faPasswordConfirm.classList.remove('invalid');
  }
})

faEyes.forEach(faEye => {
  faEye.addEventListener('click', () => {
    let passwordField = faEye.nextElementSibling;
    let isPasswordHidden = passwordField.type === 'password';
    isPasswordHidden ? passwordField.type = 'text' : passwordField.type = 'password';
    faEye.classList.toggle('fa-eye');
    faEye.classList.toggle('fa-eye-slash');
  })
})
