import React, { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Container,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { addPost } from '../features/auth/posts/postSlice';

const PostForm = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const [content, setContent] = useState('');
  const [image, setImage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    dispatch(
      addPost({
        username: user.username,
        avatar: user.avatar,
        content,
        image,
      })
    );

    setContent('');
    setImage('');
  };

  return (
    <Container maxWidth="sm" sx={{ mb: 4 }}>
      <Paper elevation={3} sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom>
          Create Post
        </Typography>
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            label="What's on your mind?"
            fullWidth
            multiline
            rows={3}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Image URL (optional)"
            fullWidth
            value={image}
            onChange={(e) => setImage(e.target.value)}
            sx={{ mb: 2 }}
          />
          <Button type="submit" variant="contained">
            Post
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default PostForm;
