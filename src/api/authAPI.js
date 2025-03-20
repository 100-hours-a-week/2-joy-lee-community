async function initAuthData() {
  try {
    const response = await fetch('/src/api/data.json');
    if (!response.ok) {
      throw new Error('유저정보를 불러오는데 실패했습니다.');
    }

    const data = await response.json();

    localStorage.getItem('users') || localStorage.setItem('users', JSON.stringify(data.users));
  } catch (error) {
    console.error('데이터 로드 오류:', error);
  }
}

const AuthAPI = {
  getAll: () => {
    return JSON.parse(localStorage.getItem('users') || '[]');
  },

  getByEmail: (email) => {
    const users = AuthAPI.getAll();
    return users.find((user) => user.email === email) || null;
  },

  isEmailDuplicate: (email) => {
    return AuthAPI.getByEmail(email) !== null;
  },

  isNicknameDuplicate: (nickname) => {
    const users = AuthAPI.getAll();
    return users.some((user) => user.nickname === nickname);
  },

  register: (userData) => {
    const users = AuthAPI.getAll();

    if (AuthAPI.isEmailDuplicate(userData.email)) {
      return {
        success: false,
        message: '이미 사용 중인 이메일입니다.',
      };
    }

    if (AuthAPI.isNicknameDuplicate(userData.nickname)) {
      return {
        success: false,
        message: '이미 사용 중인 닉네임입니다.',
      };
    }

    const newUser = {
      ...userData,
      id: users.length + 1,
      createdAt: new Date().toISOString(),
    };

    users.push(newUser);
    console.log(newUser, users);
    localStorage.setItem('users', JSON.stringify(users));

    // 비밀번호 제외한 사용자 정보 반환
    const { password, ...userWithoutPassword } = newUser;

    return {
      success: true,
      message: '회원가입이 완료되었습니다.',
      user: userWithoutPassword,
    };
  },

  login: (email, password) => {
    const user = AuthAPI.getByEmail(email);

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

  updateUserInfo: (userId, updateData) => {
    const users = AuthAPI.getAll();
    const userIndex = users.findIndex((user) => user.id === userId);

    if (userIndex === -1) {
      return {
        success: false,
        message: '사용자를 찾을 수 없습니다.',
      };
    }

    users[userIndex] = {
      ...users[userIndex],
      ...updateData,
    };

    const { password, ...userInfo } = users[userIndex];
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('currentUser', JSON.stringify(userInfo));

    return {
      success: true,
      message: '회원정보가 성공적으로 수정되었습니다.',
      user: users[userIndex],
    };
  },

  deleteAccount: () => {
    const users = AuthAPI.getAll();
    const currentUser = AuthAPI.getCurrentUser();
    const newUserList = users.filter((user) => user.id !== currentUser.id);

    localStorage.setItem('users', JSON.stringify(newUserList));
    localStorage.removeItem('currentUser');

    return {
      success: true,
      message: '회원탈퇴가 성공적으로 처리되었습니다.',
    };
  },
};

export { initAuthData, AuthAPI };
