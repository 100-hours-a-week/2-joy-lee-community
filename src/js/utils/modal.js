import { PostAPI } from '/src/api/postAPI.js';

const modal = document.querySelector('.modal');
const modalOverlay = document.querySelector('.modal-overlay');
const closeBtn = document.getElementById('cancelBtn');
const deleteBtn = document.getElementById('confirmBtn');

export const showModal = () => {
  closeBtn.addEventListener('click', () => closeModal());

  if (deleteBtn) {
    deleteBtn.addEventListener('click', async () => {
      const postId = modal.dataset.postId;

      if (postId) {
        const result = await PostAPI.delete(postId);

        if (result.success) {
          alert('게시글이 삭제되었습니다.');
          window.location.href = '/';
        } else {
          alert('게시글 삭제에 실패했습니다.');
        }

        closeModal();
      }
    });
  }

  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
      closeModal();
    }
  });
};

const closeModal = () => {
  modalOverlay.style.display = 'none';
  modal.style.display = 'none';
};
