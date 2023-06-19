import React, { useState } from "react";
import {
  Box,
  Link,
  Card,
  Stack,
  Avatar,
  Typography,
  CardHeader,
  IconButton,
  Menu,
  MenuItem,
  Divider,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { fDate } from "../../utils/formatTime";
import { MoreVert } from "@mui/icons-material";
import PostReaction from "./PostReaction";
import CommentForm from "../comment/CommentForm";
import CommentList from "../comment/CommentList";
import useAuth from "../../hooks/useAuth";
import { useDispatch, useSelector } from "react-redux";
import { deletePost, toggleUpdatePost } from "./postSlice";

function PostCard({ post }) {
  const { user } = useAuth();

  const [anchorEl, setAnchorEl] = useState(null);

  const handleTogglePostMenu = (event) => {
    if (!anchorEl) {
      setAnchorEl(event.currentTarget);
    } else {
      setAnchorEl(null);
    }
  };

  const dispatch = useDispatch();

  const handleDeletePost = () => {
    const confirmed = window.confirm("Are you sure you want to delete?");
    if (confirmed) {
      // Perform deletion logic here
      // Call your delete API or update the state to remove the post/comment
      dispatch(deletePost({ postId: post._id }));
    }
  };

  const handleEditPost = () => {
    dispatch(toggleUpdatePost({ postId: post._id }));
  };

  const renderPostMenu = (
    <Menu
      id="menu-appbar"
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={Boolean(anchorEl)}
      onClose={handleTogglePostMenu}
    >
      <MenuItem onClick={handleDeletePost} sx={{ mx: 1 }}>
        Delete Post
      </MenuItem>
      <Divider sx={{ borderStyle: "dashed" }} />
      <MenuItem onClick={handleEditPost} sx={{ mx: 1 }}>
        Edit Post
      </MenuItem>
    </Menu>
  );

  return (
    <>
      <Card>
        <CardHeader
          disableTypography
          avatar={
            <Avatar src={post?.author?.avatarUrl} alt={post?.author?.name} />
          }
          title={
            <Link
              variant="subtitle2"
              color="text.primary"
              component={RouterLink}
              sx={{ fontweight: 600 }}
              to={`/user/${post.author._id}`}
            >
              {post?.author?.name}
            </Link>
          }
          subheader={
            <Typography
              variant="caption"
              sx={{ display: "block", color: "text.secondary" }}
            >
              {fDate(post.createdAt)}
            </Typography>
          }
          action={
            <IconButton onClick={handleTogglePostMenu}>
              <MoreVert sx={{ fontSize: 30 }} />
              {user._id === post.author._id && renderPostMenu}
            </IconButton>
          }
        />

        <Stack spacing={2} sx={{ p: 3 }}>
          <Typography>{post.content}</Typography>
          {post.image && (
            <Box
              sx={{
                borderRadius: 2,
                overflow: "hidden",
                height: 300,
                "& img": { objectfit: "cover", width: 1, height: 1 },
              }}
            >
              <img src={post.image} alt="post" />
            </Box>
          )}

          <PostReaction post={post} />
          <CommentList postId={post._id} />
          <CommentForm postId={post._id} />
        </Stack>
      </Card>
      <Box m={2} />
    </>
  );
}

export default PostCard;
