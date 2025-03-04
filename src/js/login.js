const loginBtn = document.getElementById('loginBtn');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');

const isValid = true; // 유효성 검사 로직 추가

const handleInput = () => {
  const email = emailInput.value;
  const password = passwordInput.value;

  if (email && password && isValid) {
    loginBtn.classList.add('active');
    loginBtn.disabled = false;
  } else {
    loginBtn.classList.remove('active');
    loginBtn.disabled = true;
  }
};

const handleLogin = (e) => {
  e.preventDefault();
  if (isValid) {
    window.location.href = '../post/list.html';
  }
};

emailInput.addEventListener('input', handleInput);
passwordInput.addEventListener('input', handleInput);
loginBtn.addEventListener('click', handleLogin);

loginBtn.classList.remove('active');
loginBtn.disabled = true;
