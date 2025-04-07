import { createSlice, nanoid } from '@reduxjs/toolkit';

// Load posts from localStorage
const loadFromStorage = () => {
  try {
    const data = localStorage.getItem('posts');
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

// Save posts to localStorage
const saveToStorage = (posts) => {
  localStorage.setItem('posts', JSON.stringify(posts));
};

const initialState = {
  posts: loadFromStorage(),
};

const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    addPost: {
      reducer: (state, action) => {
        state.posts.unshift(action.payload);
        saveToStorage(state.posts);
      },
      prepare: ({ username, avatar, content, image }) => ({
        payload: {
          id: nanoid(),
          username,
          avatar,
          content,
          image,
          likes: 0,
          likedByUser: false,
          timestamp: new Date().toLocaleString(),
        },
      }),
    },
    toggleLike: (state, action) => {
      const post = state.posts.find((p) => p.id === action.payload);
      if (post) {
        post.likedByUser = !post.likedByUser;
        post.likes += post.likedByUser ? 1 : -1;
        saveToStorage(state.posts);
      }
    },
  },
});

export const { addPost, toggleLike } = postSlice.actions;
export default postSlice.reducer;
