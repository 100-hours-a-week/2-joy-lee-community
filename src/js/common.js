const myPageBtn = document.getElementById('myPage');

const createDropdown = () => {
  const dropdown = document.createElement('div');
  dropdown.className = 'dropdown';
  dropdown.innerHTML = `
      <a href="/pages/edit/userinfo.html">회원정보수정</a>
      <a href="/pages/edit/password.html">비밀번호수정</a>
      <a href="/pages/login.html">로그아웃</a>
  `;

  myPageBtn.appendChild(dropdown);

  myPageBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    dropdown.classList.toggle('show');
  });

  document.addEventListener('click', () => {
    dropdown.classList.remove('show');
  });
};

document.addEventListener('DOMContentLoaded', createDropdown);
