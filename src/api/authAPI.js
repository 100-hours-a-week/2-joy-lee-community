import * as API from './endpoints.js';

const AuthAPI = {
  getAll: async () => {
    const response = await fetch(API.USERS);
    if (!response.ok) throw new Error('유저 정보를 가져오는데 실패했습니다.');
    return await response.json();
  },

  isEmailDuplicate: async (email) => {
    const users = await AuthAPI.getAll();
    return users.some((user) => user.email === email);
  },

  isNicknameDuplicate: async (nickname) => {
    const users = await AuthAPI.getAll();
    return users.some((user) => user.nickname === nickname);
  },

  register: async (userData) => {
    try {
      const response = await fetch(API.USERS, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...userData,
          createdAt: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        throw new Error('회원가입에 실패했습니다.');
      }

      const newUser = await response.json();

      return {
        success: true,
        message: '회원가입이 완료되었습니다.',
        user: newUser,
      };
    } catch (error) {
      console.error('회원가입 처리 중 오류 발생:', error);
      return {
        success: false,
        message: '회원가입 처리 중 오류가 발생했습니다.',
      };
    }
  },

  login: async (email, password) => {
    try {
      const response = await fetch(API.USERS);

      // const response = await fetch(API.LOGIN, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email, password }),
      // });

      if (!response.ok) throw new Error('유저 정보를 가져오는데 실패했습니다.');

      const users = await response.json();
      const user = users.find((user) => user.email === email && user.password === password);

      if (!user) {
        return {
          success: false,
          message: '이메일 또는 비밀번호가 올바르지 않습니다.',
        };
      }

      const { password: _, ...userInfo } = user;
      localStorage.setItem('currentUser', JSON.stringify(userInfo));

      return {
        success: true,
        message: '로그인 성공',
        user: userInfo,
      };
    } catch (error) {
      console.error('로그인 중 오류 발생:', error);
      return {
        success: false,
        message: '로그인 중 오류가 발생했습니다.',
      };
    }
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

  updateUserInfo: async (userId, updatedData) => {
    try {
      const response = await fetch(API.USER(userId), {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) {
        throw new Error('회원정보 수정에 실패했습니다.');
      }

      const updatedUser = await response.json();

      const { password, ...userInfo } = updatedUser;
      localStorage.setItem('currentUser', JSON.stringify(userInfo));

      return {
        success: true,
        message: '회원정보 수정이 완료되었습니다.',
        user: updatedUser,
      };
    } catch (error) {
      console.error('회원정보 수정 중 오류 발생:', error);
      return {
        success: false,
        message: '회원정보 수정 중 오류가 발생했습니다.',
      };
    }
  },

  deleteAccount: async (userId) => {
    try {
      await fetch(API.USER(userId), {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      });

      localStorage.removeItem('currentUser');

      return {
        success: true,
        message: '회원탈퇴가 성공적으로 처리되었습니다.',
      };
    } catch (error) {
      console.error('회원탈퇴 중 오류 발생:', error);
      return {
        success: false,
        message: '회원탈퇴 중 오류가 발생했습니다.',
      };
    }
  },
};

export { AuthAPI };
