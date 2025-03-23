// Base URL
const BASE_URL = 'http://localhost:3000';

export const USERS = `${BASE_URL}/users`;
export const LOGIN = `${BASE_URL}/users/login`;
export const LOGOUT = `${BASE_URL}/users/logout`;
export const USER = (userId) => `${BASE_URL}/users/${userId}`;

export const POSTS = `${BASE_URL}/posts`;
export const POST = (postId) => `${BASE_URL}/posts/${postId}`;
export const COMMENTS = (postId) => `${BASE_URL}/posts/${postId}/comments`;
