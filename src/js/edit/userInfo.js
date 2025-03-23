import { AuthAPI } from '/src/api/authAPI.js';
import Validator from '/src/js/utils/validate.js';
import { fileToBase64 } from '/src/js/utils/fileToBase64.js';

const nicknameInput = document.getElementById('nickname');
const nicknameErrorMsg = document.querySelector('.nickname-error');
const profileInput = document.getElementById('profile');
const profileErrorMsg = document.querySelector('.profile-error');
const thumbnail = document.querySelector('.thumbnail-btn');
const myEmail = document.getElementById('myEmail');
const editBtn = document.getElementById('editBtn');
const deleteAccountBtn = document.getElementById('deleteAccountBtn');

document.addEventListener('DOMContentLoaded', async () => {
  const user = AuthAPI.getCurrentUser();
  myEmail.textContent = user.email;
  thumbnail.style.backgroundImage = `url(${user.profileImage})`;
  thumbnail.classList.add('has-image');
  nicknameInput.value = user.nickname;
});

const handleInput = () => {
  const isNicknameValid = Validator.nickname(nickname, nicknameErrorMsg);

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

const handleUpdate = async (e) => {
  e.preventDefault();

  const user = AuthAPI.getCurrentUser();
  const newNickname = nicknameInput.value.trim();
  const profileFile = profileInput.files[0];

  if ((await AuthAPI.isNicknameDuplicate(newNickname)) && user.nickname !== newNickname) {
    nicknameErrorMsg.textContent = '이미 사용 중인 닉네임입니다.';
    editBtn.disabled = false;
    return;
  }

  try {
    let profileImageBase64 = '';
    if (profileFile) {
      profileImageBase64 = await fileToBase64(profileFile);
    }

    if (user.nickname === newNickname && profileImageBase64 === '') {
      editBtn.disabled = false;
      return;
    }

    const updateData = {
      nickname: newNickname,
      profileImage: profileImageBase64 || user.profileImage,
    };

    const res = await AuthAPI.updateUserInfo(user.id, updateData);

    if (res.success) {
      window.alert('회원정보가 수정되었습니다.');
    } else {
      window.alert(res.message);
    }
  } catch (error) {
    console.error('회원정보 수정 중 오류 발생:', error);
    alert('회원정보 수정 중 오류가 발생했습니다.');

    editBtn.disabled = false;
  }
};

const deleteAccount = async () => {
  try {
    const user = AuthAPI.getCurrentUser();
    const res = await AuthAPI.deleteAccount(user.id);

    console.log(user.id);
    if (res.success) {
      window.alert('회원탈퇴가 성공적으로 처리되었습니다');
      window.location.href = '/pages/auth/login.html';
    } else {
      window.alert(res.message);
    }
  } catch (error) {
    console.error('회원탈퇴 중 오류 발생:', error);
    alert('회원탈퇴 중 오류가 발생했습니다.');

    editBtn.disabled = false;
  }
};

nicknameInput.addEventListener('input', handleInput);
profileInput.addEventListener('change', updateThumbnail);
editBtn.addEventListener('click', handleUpdate);
deleteAccountBtn.addEventListener('click', deleteAccount);
