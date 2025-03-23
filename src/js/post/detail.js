import { showModal } from '/src/js/utils/modal.js';
import { PostAPI } from '/src/api/postAPI.js';
import { dateFormatter } from '../utils/dateFormatter.js';

const currentUser = JSON.parse(localStorage.getItem('currentUser'));

document.addEventListener('DOMContentLoaded', async () => {
  // URL에서 게시글 ID 가져오기
  const urlParams = new URLSearchParams(window.location.search);
  const postId = urlParams.get('id');

  displayPostById(postId);
  displayComments(postId);
});

const displayPostById = async (postId) => {
  const postHeaderSection = document.querySelector('.post-header');
  const postBodySection = document.querySelector('.post-body');

  const post = await PostAPI.getPostById(postId);
  const isMyPost = post.authorId === currentUser.id;
  const formattedDate = dateFormatter(new Date(post.createdAt));

  const postHeader = document.createElement('div');
  const postBody = document.createElement('div');

  postHeader.innerHTML = `
    <h1>${post.title}</h1>
    <div class="post-meta">
      <img src="${post.authorProfile}" alt="${post.author}" />
      <span class="author">${post.author}</span>
      <span class="created-at">${formattedDate}</span>
    </div>
   ${
     isMyPost
       ? `<div class='post-action action-btns'>
        <button id='postEdit'>수정</button>
        <button id='postDelete'>삭제</button>
      </div>`
       : ''
   }`;

  postBody.innerHTML = `
    ${post.image ? `<img src=${post.image} alt="" class="post-image" />` : ''}
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
};

const displayComments = async (postId) => {
  const posts = await PostAPI.getPostById(postId);
  const comments = posts.comments;
  const commentList = document.querySelector('.comment-list');

  comments.forEach((comment) => {
    const commentItem = document.createElement('li');
    const formattedDate = dateFormatter(new Date(comment.createdAt));
    const isMyComment = comment.authorId === currentUser.id;

    commentItem.innerHTML = `
      <li class="comment-item">
        <div class="post-meta">
          <img src=${comment.authorProfile} alt="" />
          <span class="author">${comment.author}</span>
          <span class="created-at">${formattedDate}</span>
        </div>
        <p class="comment-text">${comment.content}</p>
           ${
             isMyComment
               ? `<div class='comment-action action-btns'>
                  <button id='commentEdit'>수정</button>
                  <button id='commentDelete'>삭제</button>
                </div>`
               : ''
           }`;

    commentList.appendChild(commentItem);
  });
};
