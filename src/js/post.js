const postEdit = document.getElementById('postEdit');
const postDelete = document.getElementById('postDelete');
const commentDelete = document.getElementById('commentDelete');
const modal = document.getElementById('modal');
const modalOverlay = document.getElementById('modalOverlay');
const modalTitle = document.getElementById('modalTitle');
const cancelBtn = document.getElementById('cancelBtn');
const confirmBtn = document.getElementById('confirmBtn');

const showModal = () => {
  modal.style.display = 'block';
  modalOverlay.style.display = 'block';
};

const hideModal = () => {
  modal.style.display = 'none';
  modalOverlay.style.display = 'none';
};

const deleteItem = (e) => {
  const isPost = e.target.id === 'postDelete';
  modalTitle.textContent = isPost ? '게시글을 삭제하시겠습니까?' : '댓글을 삭제하시겠습니까?';
  showModal();
};

postEdit.addEventListener('click', () => {
  window.location.href = 'write.html';
});
postDelete.addEventListener('click', deleteItem);
commentDelete.addEventListener('click', deleteItem);
modalOverlay.addEventListener('click', hideModal);
cancelBtn.addEventListener('click', hideModal);
confirmBtn.addEventListener('click', () => {
  console.log('삭제 완료');
  hideModal();
});
