import { PostAPI } from '/src/api/postAPI.js';

document.addEventListener('DOMContentLoaded', () => {
  const postForm = document.getElementById('postForm');
  const titleInput = document.getElementById('title');
  const contentInput = document.getElementById('content');
  const postBtn = document.getElementById('postBtn');
  const formErrorMsg = document.querySelector('.form-error');

  const handleInput = () => {
    const title = titleInput.value.trim();
    const content = contentInput.value.trim();

    if (!title || !content) {
      formErrorMsg.textContent = '*제목, 내용을 모두 작성해주세요.';
      postBtn.classList.remove('active');
      postBtn.disabled = true;
    } else {
      formErrorMsg.textContent = '';
      postBtn.classList.add('active');
      postBtn.disabled = false;
    }
  };

  postForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    try {
      const title = titleInput.value.trim();
      const content = contentInput.value.trim();

      const postData = {
        title,
        content,
      };

      let result;

      result = PostAPI.create(postData);

      if (result.success) {
        window.location.href = `/pages/post/detail.html?id=${result.post.id}`;
      } else {
        alert(result.message || '게시글 작성에 실패했습니다.');
        postBtn.disabled = false;
      }
    } catch (error) {
      console.error('게시글 작성 오류:', error);
    }
  });

  titleInput.addEventListener('input', handleInput);
  contentInput.addEventListener('input', handleInput);
});
