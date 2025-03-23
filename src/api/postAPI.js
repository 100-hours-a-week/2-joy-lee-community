import * as API from './endpoints.js';

const PostAPI = {
  getAll: async () => {
    const response = await fetch(API.POSTS);
    if (!response.ok) throw new Error('게시글 목록을 가져오는데 실패했습니다.');
    return await response.json();
  },

  getPostById: async (postId) => {
    const response = await fetch(API.POST(postId));
    if (!response.ok) throw new Error('게시글을 가져오는데 실패했습니다.');
    return await response.json();
  },

  create: async (newPostData) => {
    try {
      const response = await fetch(API.POSTS, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...newPostData,
          createdAt: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        throw new Error('게시글 생성에 실패했습니다.');
      }

      const createdPost = await response.json();

      return {
        success: true,
        message: '게시글이 작성되었습니다.',
        post: createdPost,
      };
    } catch (error) {
      console.error('게시글 작성 중 오류 발생:', error);
      return {
        success: false,
        message: '게시글 작성 중 오류가 발생했습니다.',
      };
    }
  },

  update: async (postId, updatedPostData) => {
    try {
      const response = await fetch(API.POST(postId), {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...updatedPostData,
          updatedAt: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        throw new Error('게시글 수정에 실패했습니다.');
      }

      const updatedPost = await response.json();

      return {
        success: true,
        message: '게시글이 수정되었습니다.',
        post: updatedPost,
      };
    } catch (error) {
      console.error('게시글 수정 중 오류 발생:', error);
      return {
        success: false,
        message: '게시글 수정 중 오류가 발생했습니다.',
      };
    }
  },

  delete: async (postId) => {
    try {
      const response = await fetch(API.POST(postId), {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('게시글 삭제에 실패했습니다.');
      }

      return {
        success: true,
        message: '게시글이 삭제되었습니다.',
      };
    } catch (error) {
      console.error('게시글 삭제 중 오류 발생:', error);
      return {
        success: false,
        message: '게시글 삭제 중 오류가 발생했습니다.',
      };
    }
  },
};

export { PostAPI };
