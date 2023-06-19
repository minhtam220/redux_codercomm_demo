import React, { useState } from "react";
import { Avatar, Box, Paper, Stack, Typography } from "@mui/material";
import { fDate } from "../../utils/formatTime";
import CommentReaction from "./CommentReaction";
import { MoreVert } from "@mui/icons-material";
import { IconButton, Menu, MenuItem } from "@mui/material";
import useAuth from "../../hooks/useAuth";
import { useDispatch, useSelector } from "react-redux";
import { deleteComment } from "./commentSlice";

function CommentCard({ comment }) {
  const { user } = useAuth();

  const [anchorEl, setAnchorEl] = useState(null);

  const handleToggleCommentMenu = (event) => {
    if (!anchorEl) {
      setAnchorEl(event.currentTarget);
    } else {
      setAnchorEl(null);
    }
  };

  const dispatch = useDispatch();

  const handleDeleteComment = () => {
    const confirmed = window.confirm("Are you sure you want to delete?");
    if (confirmed) {
      // Perform deletion logic here
      // Call your delete API or update the state to remove the post/comment
      dispatch(deleteComment({ commentId: comment._id }));
    }
  };

  const renderCommentMenu = (
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
      onClose={handleToggleCommentMenu}
    >
      <MenuItem onClick={handleDeleteComment} sx={{ mx: 1 }}>
        Delete Comment
      </MenuItem>
    </Menu>
  );

  return (
    <Stack direction="row" spacing={2}>
      <Avatar alt={comment.author?.name} src={comment.author?.avatarUrl} />
      <Paper sx={{ p: 1.5, flexGrow: 1, bcolor: "background.neutral" }}>
        <Stack
          direction=" row"
          alignItems={{ sm: "center" }}
          justifyContent="space-between"
          sx={{ mb: 0.5 }}
        >
          <Typography variant="subtitle2" sx={{ fontweight: 600 }}>
            {comment.author?.name}
          </Typography>
          <div>
            <Typography variant="caption" sx={{ color: "text.disabled" }}>
              {fDate(comment.createdAt)}
            </Typography>
            <IconButton onClick={handleToggleCommentMenu}>
              <MoreVert sx={{ fontSize: 20 }} />
              {user._id === comment.author._id && renderCommentMenu}
            </IconButton>
          </div>
        </Stack>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {comment.content}
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <CommentReaction comment={comment} />
        </Box>
      </Paper>
    </Stack>
  );
}

export default CommentCard;
