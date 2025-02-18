# 커뮤니티 레이아웃 만들기

Vanila JS 로 커뮤니티 서비스 레이아웃을 만들고 필요한 REST API를 설계했습니다.

## 폴더 구조

```bash
├── index.html
├── pages
│   ├── board.html
│   ├── edit
│   │   ├── password.html
│   │   └── userInfo.html
│   ├── post
│   │   ├── detail.html
│   │   └── write.html
│   ├── login.html
│   └── signup.html
└── src
    ├── assets
    ├── css
    │   ├── reset.css
    │   ├── styles.css
    │   └── variables.css
    └── js
        ├── board.js
        ├── common.js
        ├── home.js
        ├── login.js
        ├── post.js
        └── signup.js
```

<br/>

## REST API 설계 해보기

### 1. 사용자 인증 - 회원가입

- method : `POST`
- endpoint : `/api/auth/signup`
- request body

```json
{
  "email": "joylee.dev@gmail.com",
  "password": "iamjoy",
  "nickname": "joy.lee",
  "profile_image": "https://image.kr/joy.jpg" // optional
}
```

- response body

```json
{
  "status": "success",
  "message": "User created successfully",
  "user_id": 1
}
```

### 2. 사용자 인증 - 로그인

- method : `POST`
- endpoint : `/api/auth/login`
- request body

```json
{
  "email": "joylee.dev@gmail.com",
  "password": "iamjoy"
}
```

- response body

```json
{
  "status": "success",
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### 3. 사용자 인증 - 로그아웃

- method : `POST`
- endpoint : `/api/auth/logout`
- request body ❌
- response body

```json
{
  "status": "success",
  "message": "Logout successful"
}
```

### 4. 사용자 인증 - 회원정보/비밀번호 수정

- method : `PUT`
- endpoint : `/api/auth/user`
- request body

```json
// 회원정보 수정
{
  "nickname": "iamnewjoy",
  "profile_image": "https://image.kr/newjoy.jpg"
}
// 비밀번호 수정
{
    "password" :"newpassword"
}
```

- response body

```json
{
  "status": "success",
  "message": "User information updated successfully"
}
```

### 5. 게시판 - 게시글 목록 조회

- method : `GET`
- endpoint : `/api/posts`
- **response** body

```json
{
  "status": "success",
  "data": [
    {
      "post_id": 1,
      "title": "첫 번째 게시글",
      "author": "joy",
      "created_at": "2025-02-18T12:00:00Z"
    },
    {
      "post_id": 2,
      "title": "두 번째 게시글",
      "author": "newjoy",
      "created_at": "2025-02-19T14:30:00Z"
    }
  ]
}
```

### 6. 게시판 - 상세 게시글

- method : `GET`
- endpoint : `/api/posts:id`
- response body

```json
{
  "status": "success",
  "data": {
    "post_id": 1,
    "title": "첫 번째 게시글",
    "content": "REST API 작성 예시입니다.",
    "author": "joy",
    "created_at": "2025-02-18T12:00:00Z",
    "comments": [
      {
        "comment_id": 1,
        "content": "좋은 글 감사합니다!",
        "author": "logan",
        "created_at": "2025-02-18T13:00:00Z"
      }
    ]
  }
}
```

### 7. 게시판 - 게시글 작성

- method : `POST`
- endpoint : `/api/posts`
- request body

```json
{
  "title": "새로운 게시글",
  "content": "게시글 내용을 작성합니다."
}
```

- response body

```json
{
  "status": "success",
  "message": "Post created successfully",
  "post_id": 123
}
```

### 8. 게시판 - 게시글 수정

- method : `PUT`
- endpoint : `/api/posts:id`
- request body

```json
{
  "title": "수정된 게시글",
  "content": "게시글 내용을 수정합니다."
}
```

- response body

```json
{
  "status": "success",
  "message": "Post updated successfully"
}
```

### 9. 게시판 - 게시글 삭제

- method : `DELETE`
- endpoint : `/api/posts:id`
- response body

```json
{
  "status": "success",
  "message": "Post deleted successfully"
}
```

<br/>

## 리팩토링 해보고 싶은 것

html 페이지 별로 모두 헤더가 들어가 있는데 컴포넌트 (components/header.html) 를 만들어서 각 js파일에 동적으로 렌더링 시켰더니 헤더부분이 상대적으로 늦게 렌더링 되어서 깜빡이는 이슈가 발생했다. 스켈레톤을 만들게 아니면 SSR을 도입해야 해결되는 이슈이지 않을까.. 일단은 하드코딩으로 모든 html에 헤더를 추가해두었다.

다른 분들 레포를 보니 기능별로 폴더를 만들어서 한 폴더에 js,css,html 를 모두 작성하는 경우가 많았다. 리액트 같은 라이브러리를 쓸 때는 종종 기능별로 폴더를 만들었는데 vanila js로 하려니 기본적인 폴더구조로 만들게 되었다. 나중에 폴더구조 리팩토링도 해봐야겠다.
