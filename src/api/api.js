async function initData() {
  try {
    const response = await fetch('/src/api/data.json');
    if (!response.ok) {
      throw new Error('유저정보를 불러오는데 실패했습니다.');
    }

    const data = await response.json();

    localStorage.setItem('users', JSON.stringify(data.users));
  } catch (error) {
    console.error('데이터 로드 오류:', error);
  }
}

const UserAPI = {
  getAll: () => {
    return JSON.parse(localStorage.getItem('users') || '[]');
  },

  getByEmail: (email) => {
    const users = UserAPI.getAll();
    return users.find((user) => user.email === email) || null;
  },

  login: (email, password) => {
    const user = UserAPI.getByEmail(email);

    if (user && user.password === password) {
      // 비밀번호 제외한 사용자 정보 저장
      const { password, ...userInfo } = user;
      localStorage.setItem('currentUser', JSON.stringify(userInfo));

      return {
        success: true,
        message: '로그인 성공',
        user: userInfo,
      };
    }

    return {
      success: false,
      message: '이메일 또는 비밀번호가 올바르지 않습니다.',
    };
  },

  logout: () => {
    localStorage.removeItem('currentUser');
    return {
      success: true,
      message: '로그아웃 되었습니다.',
    };
  },

  getCurrentUser: () => {
    const userInfo = localStorage.getItem('currentUser');
    return userInfo ? JSON.parse(userInfo) : null;
  },
};

export default {
  initData,
  user: UserAPI,
};
