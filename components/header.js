// 렌더링 시 헤더부분이 깜빡거리는 이슈
// import { renderHeader } from './components/header.js';
// renderHeader({
//   hasBackIcon: true,
//   hasUserIcon: false,
// });

const createHeader = ({ hasBackIcon = false, hasUserIcon = false }) => {
  const header = document.createElement('header');
  header.className = 'header';

  header.innerHTML = `
    <div class="container">
      <div>
        ${
          hasBackIcon
            ? '<a href="javascript:history.back()" class="icon-goback"><i class="fa-solid fa-chevron-left"></i></a>'
            : ''
        }
      </div>
      <a href="/"><img src="/src/assets/header.jpg" alt="아무 말 대잔치" /></a>
      <div>
        ${
          hasUserIcon
            ? `
          <div class="mypage-btn" id="myPage">
            <img src="/src/assets/default-profile.png" alt="profile" />
            <div class="dropdown">
              <a href="/pages/edit/userinfo.html">회원정보수정</a>
              <a href="/pages/edit/password.html">비밀번호수정</a>
              <a href="/pages/login.html">로그아웃</a>
            </div>
          </div>
        `
            : ''
        }
      </div>
    </div>
  `;

  if (hasUserIcon) {
    const myPageBtn = header.querySelector('#myPage');
    const dropdown = header.querySelector('.dropdown');

    myPageBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      dropdown.classList.toggle('show');
    });

    document.addEventListener('click', () => {
      dropdown.classList.remove('show');
    });
  }

  return header;
};

const renderHeader = (options = {}) => {
  const headerContainer = document.querySelector('body');
  const header = createHeader(options);
  headerContainer.prepend(header);
};

export { renderHeader };
