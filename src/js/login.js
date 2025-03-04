import Validator from './utils/validate.js';

const loginBtn = document.getElementById('loginBtn');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const emailErrorMsg = document.querySelector('#loginPage .email-error');
const passwordErrorMsg = document.querySelector('#loginPage .password-error');

emailInput.addEventListener('blur', () => {
  const email = emailInput.value.trim();
  Validator.email(email, emailErrorMsg);
});

passwordInput.addEventListener('blur', () => {
  const password = passwordInput.value;
  Validator.password(password, passwordErrorMsg);
});

const handleInput = () => {
  const email = emailInput.value.trim();
  const password = passwordInput.value;

  if (email && password) {
    loginBtn.classList.add('active');
    loginBtn.disabled = false;
  } else {
    loginBtn.classList.remove('active');
    loginBtn.disabled = true;
  }
};

const handleLogin = (e) => {
  e.preventDefault();

  const email = emailInput.value.trim();
  const password = passwordInput.value;
  const isEmailValid = Validator.email(email, emailErrorMsg);
  const isPasswordValid = Validator.password(password, passwordErrorMsg);

  console.log(password, isEmailValid, isPasswordValid);
  if (isEmailValid && isPasswordValid) {
    // 로그인 API
    localStorage.setItem('user', email);
    window.location.href = '../post/list.html';
  }
};

emailInput.addEventListener('input', handleInput);
passwordInput.addEventListener('input', handleInput);
loginBtn.addEventListener('click', handleLogin);

loginBtn.classList.remove('active');
loginBtn.disabled = true;
