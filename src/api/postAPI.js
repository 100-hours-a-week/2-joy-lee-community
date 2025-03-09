async function initPostData() {
  try {
    const response = await fetch('/src/api/data.json');
    if (!response.ok) {
      throw new Error('게시글 정보를 불러오는데 실패했습니다.');
    }

    const data = await response.json();

    localStorage.setItem('posts', JSON.stringify(data.posts));
  } catch (error) {
    console.error('게시글 데이터 로드 오류:', error);
  }
}

const PostAPI = {
  getAll: () => {
    return JSON.parse(localStorage.getItem('posts') || '[]');
  },
};

export { initPostData, PostAPI };
