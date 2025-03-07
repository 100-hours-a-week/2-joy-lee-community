import { AuthAPI } from '../api/authAPI.js';

const myPageBtn = document.getElementById('myPage');

const createDropdown = () => {
  const dropdown = document.createElement('div');
  dropdown.className = 'dropdown';
  dropdown.innerHTML = `
      <a href="/pages/edit/userinfo.html">회원정보수정</a>
      <a href="/pages/edit/password.html">비밀번호수정</a>
      <a id="logout" href="#">로그아웃</a>
  `;

  myPageBtn.appendChild(dropdown);

  const logoutBtn = dropdown.querySelector('#logout');
  logoutBtn.addEventListener('click', (e) => {
    e.preventDefault();

    const logout = AuthAPI.logout();

    if (logout.success) {
      alert(logout.message);
      window.location.href = '/pages/auth/login.html';
    }
  });

  myPageBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    dropdown.classList.toggle('show');
  });

  document.addEventListener('click', () => {
    dropdown.classList.remove('show');
  });
};

document.addEventListener('DOMContentLoaded', () => {
  const currentUser = AuthAPI.getCurrentUser();

  if (!currentUser) {
    window.location.href = '/pages/auth/login.html';
    return;
  }

  createDropdown();
});
