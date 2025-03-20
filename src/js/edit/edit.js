import { AuthAPI, initAuthData } from '/src/api/authAPI.js';
import Validator from '/src/js/utils/validate.js';

const nicknameInput = document.getElementById('nickname');
const nicknameErrorMsg = document.querySelector('.nickname-error');
const profileInput = document.getElementById('profile');
const profileErrorMsg = document.querySelector('.profile-error');
const thumbnail = document.querySelector('.thumbnail-btn');
const myEmail = document.getElementById('myEmail');
const editBtn = document.getElementById('editBtn');

document.addEventListener('DOMContentLoaded', async () => {
  await initAuthData();

  const user = AuthAPI.getCurrentUser();
  myEmail.textContent = user.email;
  thumbnail.style.backgroundImage = `url(${user.profileImage})`;
  thumbnail.classList.add('has-image');
  nicknameInput.value = user.nickname;
});

const handleInput = () => {
  const isNicknameValid =
    Validator.nickname(nickname, nicknameErrorMsg) && !AuthAPI.isNicknameDuplicate(nickname);

  if (isNicknameValid) {
    editBtn.classList.add('active');
    editBtn.disabled = false;
  } else {
    editBtn.classList.remove('active');
    editBtn.disabled = true;
  }
};

const updateThumbnail = (e) => {
  const file = e.target.files[0];

  if (file && file.type.startsWith('image/')) {
    const reader = new FileReader();
    reader.onload = function (e) {
      thumbnail.style.backgroundImage = `url(${e.target.result})`;
      thumbnail.classList.add('has-image');
      thumbnail.innerHTML = ''; // + 아이콘 제거
      Validator.profileImage(file, profileErrorMsg);
    };
    reader.readAsDataURL(file);
  }

  handleInput(); // 입력 상태 확인
};

const handleUpdate = (e) => {
  e.preventDefault();

  const user = AuthAPI.getCurrentUser();
  console.log(user);
  const nickname = nicknameInput.value.trim();
  const profile = profileInput.files[0];

  if (AuthAPI.isNicknameDuplicate(nickname)) {
    nicknameErrorMsg.textContent = '이미 사용 중인 닉네임입니다.';
    signupBtn.disabled = false;
    return;
  }

  const res = AuthAPI.updateUserInfo(user.id, {
    nickname: nickname,
    profileImage: profile || user.profileImage,
  });

  console.log(nickname, profile || user.profileImage);
  if (res.success) {
    window.alert('회원정보가 수정되었습니다.');
  } else {
    window.alert(res.message);
  }
};

nicknameInput.addEventListener('input', handleInput);
profileInput.addEventListener('change', updateThumbnail);
editBtn.addEventListener('click', handleUpdate);
