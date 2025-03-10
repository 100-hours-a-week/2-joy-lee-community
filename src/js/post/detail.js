import { showModal } from '/src/js/utils/modal.js';
import { PostAPI, initPostData } from '/src/api/postAPI.js';

const currentUser = JSON.parse(localStorage.getItem('currentUser'));

document.addEventListener('DOMContentLoaded', async () => {
  await initPostData();

  // URL에서 게시글 ID 가져오기
  const urlParams = new URLSearchParams(window.location.search);
  const postId = urlParams.get('id');

  displayPostById(postId);
});

function displayPostById(postId) {
  const postHeaderSection = document.querySelector('.post-header');
  const postBodySection = document.querySelector('.post-body');

  const post = PostAPI.getPostById(postId);
  const isMyPost = post.authorId === currentUser.id;

  const postHeader = document.createElement('div');
  const postBody = document.createElement('div');

  postHeader.innerHTML = `
    <h1>${post.title}</h1>
    <div class="post-meta">
      <img src="${post.authorProfile}" alt="${post.author}" />
      <span class="author">${post.author}</span>
      <span class="created-at">2021-01-01 00:00:00</span>
    </div>
   ${
     isMyPost
       ? `<ul class='post-action action-btns'>
        <button id='postEdit'>수정</button>
        <button id='postDelete'>삭제</button>
      </ul>`
       : ''
   }`;

  postBody.innerHTML = `
    <img src="https://placehold.co/700x400" alt="" class="post-image" />
    <div class="post-text">
      <p>${post.content}</p>
    </div>
    <ul class="count-box">
      <li><span>${post.likes}</span>좋아요수</li>
      <li><span>${post.views}</span>조회수</li>
      <li><span>${post.commentCount}</span>댓글</li>
    </ul>
  `;

  postHeaderSection.appendChild(postHeader);
  postBodySection.appendChild(postBody);

  if (isMyPost) {
    document.getElementById('postEdit').addEventListener('click', () => {
      window.location.href = `/pages/post/write.html?id=${postId}`;
    });

    document.getElementById('postDelete').addEventListener('click', () => {
      document.querySelector('.modal-overlay').style.display = 'block';
      document.querySelector('.modal').style.display = 'block';
      document.querySelector('.modal').dataset.postId = postId;

      showModal();
    });
  }
}
