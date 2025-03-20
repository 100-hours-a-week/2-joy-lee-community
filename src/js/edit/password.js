import { AuthAPI, initAuthData } from '/src/api/authAPI.js';
import Validator from '/src/js/utils/validate.js';

const passwordInput = document.getElementById('password');
const password2Input = document.getElementById('password2');
const password1ErrorMsg = document.querySelector('.password1-error');
const password2ErrorMsg = document.querySelector('.password2-error');
const editBtn = document.getElementById('editBtn');

document.addEventListener('DOMContentLoaded', async () => {
  await initAuthData();
});

const handleInput = () => {
  const password = passwordInput.value;
  const password2 = password2Input.value;

  const isPasswordValid = Validator.password(password, password1ErrorMsg);
  const isPasswordConfirmValid = Validator.passwordConfirm(password, password2, password2ErrorMsg);

  if (isPasswordValid || isPasswordConfirmValid) {
    editBtn.classList.add('active');
    editBtn.disabled = false;
  } else {
    editBtn.classList.remove('active');
    editBtn.disabled = true;
  }
};

const handleUpdate = async (e) => {
  e.preventDefault();

  const user = AuthAPI.getCurrentUser();
  const password = passwordInput.value.trim();

  try {
    const res = AuthAPI.updateUserInfo(user.id, { password: password });

    if (res.success) {
      window.alert('비밀번호가 수정되었습니다.');
    } else {
      window.alert(res.message);
    }
  } catch (error) {
    console.error('회원가입 처리 중 오류 발생:', error);
    alert('회원가입 처리 중 오류가 발생했습니다.');

    editBtn.disabled = false;
  }
};

passwordInput.addEventListener('input', handleInput);
password2Input.addEventListener('change', handleInput);
editBtn.addEventListener('click', handleUpdate);
