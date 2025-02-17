const signupBtn = document.getElementById('signupBtn');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const password2Input = document.getElementById('password2');
const nicknameInput = document.getElementById('nickname');
const profileInput = document.getElementById('profile');
const thumbnail = document.querySelector('.thumbnail-btn');

const isValid = true; // 유효성 검사 로직 추가

const updateThumbnail = (e) => {
  const file = e.target.files[0];
  console.log(file);

  if (file && file.type.startsWith('image/')) {
    const reader = new FileReader();
    reader.onload = function (e) {
      thumbnail.style.backgroundImage = `url(${e.target.result})`;
      thumbnail.classList.add('has-image');
    };
    reader.readAsDataURL(file);
  }
};

const handleInput = () => {
  const email = emailInput.value;
  const password = passwordInput.value;
  const password2 = password2Input.value;
  const nickname = nicknameInput.value;

  if (email && password && password2 && nickname && isValid) {
    signupBtn.classList.add('active');
    signupBtn.disabled = false;
  } else {
    signupBtn.classList.remove('active');
    signupBtn.disabled = true;
  }
};

const handlesignup = (e) => {
  e.preventDefault();
  if (isValid) {
    window.location.href = 'login.html';
  }
};

[emailInput, passwordInput, password2Input, nicknameInput].forEach((input) => {
  input.addEventListener('input', handleInput);
});

profileInput.addEventListener('change', updateThumbnail);
signupBtn.addEventListener('click', handlesignup);

signupBtn.classList.remove('active');
signupBtn.disabled = true;
