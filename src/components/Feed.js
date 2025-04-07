import React from 'react';
import {
  Avatar,
  Card,
  CardHeader,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
  Container,
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useSelector, useDispatch } from 'react-redux';
import { toggleLike } from '../features/auth/posts/postSlice';

const Feed = () => {
  const posts = useSelector((state) => state.posts.posts);
  const dispatch = useDispatch();

  return (
    <Container maxWidth="sm" sx={{ mt: 3 }}>
      {posts.map((post) => (
        <Card key={post.id} sx={{ mb: 3 }}>
          <CardHeader
            avatar={<Avatar src={post.avatar} />}
            title={post.username}
            subheader={post.timestamp}
          />
          {post.image && (
            <CardMedia
              component="img"
              height="200"
              image={post.image}
              alt="post"
            />
          )}
          <CardContent>
            <Typography variant="body1">{post.content}</Typography>
            <IconButton onClick={() => dispatch(toggleLike(post.id))}>
              {post.likedByUser ? (
                <FavoriteIcon color="error" />
              ) : (
                <FavoriteBorderIcon />
              )}
              <Typography sx={{ ml: 1 }}>{post.likes}</Typography>
            </IconButton>
          </CardContent>
        </Card>
      ))}
    </Container>
  );
};

export default Feed;
