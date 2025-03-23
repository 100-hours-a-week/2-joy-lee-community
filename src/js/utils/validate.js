const Validator = {
  email: (email, error) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

    if (!email) {
      error.textContent = '*이메일을 입력해주세요.';
      return false;
    }

    if (!emailRegex.test(email) || email.length < 5) {
      error.textContent = '*올바른 이메일 주소 형식을 입력해주세요.';
      return false;
    }

    const isDuplicate = false; // API 응답으로 확인
    if (isDuplicate) {
      error.textContent = '*중복된 이메일입니다.';
      return false;
    }

    if (error) error.textContent = '';
    return true;
  },

  password: (password, error) => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,20}$/;

    if (!password) {
      error.textContent = '*비밀번호를 입력해주세요.';
      return false;
    }

    // if (password.length < 8 || password.length > 20) {
    //   error.textContent = '*비밀번호는 8자 이상, 20자 이하여야 합니다.';
    //   return false;
    // }

    if (!passwordRegex.test(password)) {
      error.textContent =
        '비밀번호는 8자 이상, 20자 이하이며, 대문자, 소문자, 숫자, 특수문자를 각각 최소 1개 포함해야 합니다.';
      return false;
    }

    if (error) error.textContent = '';
    return true;
  },

  passwordConfirm: (password1, password2, error) => {
    if (!password2) {
      error.textContent = '*비밀번호를 한번 더 입력해주세요.';
      return false;
    }

    if (password1 !== password2) {
      error.textContent = '*비밀번호가 다릅니다.';
      return false;
    }

    if (error) error.textContent = '';
    return true;
  },

  nickname: (nickname, error) => {
    if (!nickname) {
      error.textContent = '*닉네임을 입력해주세요.';
    }

    if (nickname.length > 10) {
      error.textContent = '*닉네임은 최대 10자까지 작성 가능합니다.';
      return false;
    }

    const isDuplicate = false; // API 응답으로 확인
    if (isDuplicate) {
      error.textContent = '*중복된 닉네임입니다.';
      return false;
    }

    if (error) error.textContent = '';
    return true;
  },

  profileImage: (imageFile, error) => {
    if (!imageFile) {
      error.textContent = '*프로필 사진을 추가해주세요.';
      return false;
    }

    if (error) error.textContent = '';
    return true;
  },
};

export default Validator;
