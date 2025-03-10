async function initPostData() {
  try {
    const response = await fetch('/src/api/data.json');
    if (!response.ok) {
      throw new Error('게시글 정보를 불러오는데 실패했습니다.');
    }

    const data = await response.json();

    localStorage.setItem('posts', localStorage.getItem('posts') || JSON.stringify(data.posts));
  } catch (error) {
    console.error('게시글 데이터 로드 오류:', error);
  }
}

const PostAPI = {
  getAll: () => {
    return JSON.parse(localStorage.getItem('posts') || '[]');
  },

  getPostById: (id) => {
    const posts = PostAPI.getAll();
    return posts.find((post) => post.id === parseInt(id)) || null;
  },

  create: (postData) => {
    const posts = PostAPI.getAll();
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    const newPost = {
      id: Date.now(),
      title: postData.title,
      content: postData.content,
      authorId: currentUser.id,
      author: currentUser.nickname,
      authorProfile: currentUser.profileImage || '/src/assets/default-profile.png',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      likes: 0,
      views: 0,
      commentCount: 0,
      comments: [],
    };

    posts.push(newPost);
    localStorage.setItem('posts', JSON.stringify(posts));

    console.log(posts);
    return {
      success: true,
      message: '게시글이 작성되었습니다.',
      post: newPost,
    };
  },
};

export { initPostData, PostAPI };
